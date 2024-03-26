const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');

// const jwt = require("jsonwebtoken");
//const auth = require("../middleware/auth");
const bodyParser = require('body-parser')
const User = require('../models/User');
const UserVerification= require('../models/UserVerification')

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

 // Function to generate a random 4-digit verification code
const generateVerificationCode = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    secureConnection:false,
    debug:true,
    logger:true,
        auth: {
            user: 'cinemaniateam@gmail.com',
            pass: 'balx bias kmmh btku'
        },
    tls:{
        rejectUnauthorized:true
    }
});

const sendVerificationEmail = (email, uniqueCode) => {
    // Prepare email
    const mailOptions = {
        from: 'cinemaniateam@gmail.com',
        to: email,
        subject: 'Account Verification Code',
        text: `Your verification code is: ${uniqueCode}`
    };

    return transporter.sendMail(mailOptions);
}

///Signup Router
router.post("/signup", async (req, res) => {
    try {
        const { type,email, password, confirmPassword, firstName, lastName, phone, creditCard, billingAddress, homeAddress, promoSubscription } = req.body;

        // Check if all required fields are present in the request body
        if (!email || !password || !confirmPassword || !firstName || !lastName || !phone || !homeAddress) {
            return res.status(400).json({ msg: "Please enter all required fields" });
        }

        // Password length check
        if (password.length < 6) {
            return res.status(400).json({ msg: "Password should be at least 6 characters long" });
        }

        // Password matching check
        if (confirmPassword !== password) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User with the same email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 8);

        // Create a new user instance
        const newUser = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            creditCard, // Assuming creditCard is an object containing card details
            billingAddress,
            homeAddress,
            promoSubscription,
            status: 1,
            type: 1,
            verified: false
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Generate verification code
        const uniqueCode = generateVerificationCode();

        // Save verification code to database
        const newVerification = new UserVerification({
            userId: savedUser._id,
            verificationCode: uniqueCode,
            createdAt: Date.now(),
            expiresAt: Date.now() + 6000000, // gives user 10 minutes
        });

        await newVerification.save();

        // Send verification email
        await sendVerificationEmail(email, uniqueCode);

        res.status(201).json({ msg: 'User registered successfully. Verification email sent.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint for confirming account creation
router.post('/confirm-account', async (req, res) => {
    try {
        const { email, verificationCode } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Check if the verification code matches
        const verification = await UserVerification.findOne({ userId: user._id, verificationCode });

        if (!verification) {
            return res.status(400).json({ msg: 'Invalid verification code' });
        }

        // Check if the verification code has expired
        const currentTime = new Date();
        if (currentTime > verification.expiresAt) {
            return res.status(400).json({ msg: 'Verification code has expired' });
        }

        // Update the user's account status
        user.verified = true;
        await user.save();

        res.json({ msg: 'Account verified successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all the fields!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User with this email does not exist" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password." });
        }

        const token = jwt.sign({ id: user._id }, "passwordKey");

        // Include all user fields in the response
        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                creditCard: user.creditCard,
                billingAddress: user.billingAddress,
                homeAddress: user.homeAddress,
                promoSubscription: user.promoSubscription,
                status: user.status,
                type: user.type,
                verified: user.verified
                // Add more fields as needed
            }
        });
        console.log('Received login request');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//CHECK TOKEN VALID
router.post("/tokenIsValid", async(req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
        const verified = jwt.verify(token, "passwordKey");
        if (!verified) return res.json(false);
        const user = await User.findById(verified.id);
        if (!user) return res.json(false);
        console.log('Received token request');
        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

// Route to get all users
router.get('/allUsers', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ msg: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user route (no auth token required)
router.put('/updateUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('User ID:', userId); // Debugging statement

        // Check if the user ID is valid
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        // Fetch user data from the request body
        const { firstName, lastName, email, phone, creditCard, billingAddress, homeAddress, promoSubscription } = req.body;

        // Construct the updated user object
        const updatedUserData = {
            firstName,
            lastName,
            email,
            phone,
            creditCard,
            billingAddress,
            homeAddress,
            promoSubscription,
        };

        // Update the user
        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ msg: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'An error occurred while updating user' });
    }
});




//CHECK TOKEN VALID
router.post("/tokenIsValid", async(req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
        const verified = jwt.verify(token, "passwordKey");
        if (!verified) return res.json(false);
        const user = await User.findById(verified.id);
        if (!user) return res.json(false);
        console.log('Received token request');
        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

// to get the users credentials
// we provide a get request on the user / (root) route to get a user's username and token.
router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        username: user.username,
        id: user._id,
    });
});

router.post("/check-email", async (req, res) => {
    try {
        const { email } = req.body;
        
        const existingUser = await User.findOne({ email });

        const newPassword = generateRandomPassword();

        const hashedPassword = await bcryptjs.hash(newPassword, 8);

        existingUser.password = hashedPassword;
        await existingUser.save();

        res.json({ exists: true, email: email, newpassword: hashedPassword });

        await sendResetPasswordEmail(email, newPassword);

    } catch (error) {
        console.error('Error checking email existence:', error);
        
        res.status(500).json({ error: 'An error occurred while checking email existence' });
    }
});

const generateRandomPassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newPassword = '';
    for (let i = 0; i < 8; i++) {
        newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return newPassword;
};

const sendResetPasswordEmail = async (email, newPassword) => {
    try {
        const mailOptions = {
            from: 'cinemaniateam@gmail.com',
            to: email,
            subject: 'Account Password Reset',
            html: `
                <p>Your new password is: <strong>${newPassword}</strong></p>
                <p>In order to change your password, please edit your profile once logged in.</p>
            `
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error('Error sending reset password email: ' + error.message);
    }
};






module.exports = router;