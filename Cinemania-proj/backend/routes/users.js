const express = require('express');
const router = express.Router();

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

router.post('/newUser', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json({ msg: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            res.json({ success: true, message: 'Login successful', user });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to login', error: error.message });
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


module.exports = router;