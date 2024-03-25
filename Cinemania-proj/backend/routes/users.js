const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const bcryptjs = require('bcryptjs');

// const jwt = require("jsonwebtoken");
//const auth = require("../middleware/auth");
const bodyParser = require('body-parser')
const User = require('../models/User');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
// router.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", 'http://localhost:5000');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();
// });

///Signup Router
router.post("/signup", async (req, res) => {
    try {
        const { email, password, confirmPassword, firstName, lastName, phone, creditCard, billingAddress, homeAddress, promoSubscription } = req.body;
        
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
            type: 1 
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // Return 201 for successful creation
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//Login Route
router.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({msg: "Please enter all the fields!"});
        }

        const user = await User.findOne({ email});
        if (!user) {
            return res
                .status(400)
                .send({msg: "User with this email does not exists"});
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).send({msg: "Incorrect password."});
        }
        const token = jwt.sign({ id: user._id}, "passwordKey");
        res.json({ token, user: { id: user._id, username: user.username } });
        console.log('Received login request');
    } catch (err) {
        res.status(500).json({ error: err.message});
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

router.put('/updateUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ msg: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
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



module.exports = router;