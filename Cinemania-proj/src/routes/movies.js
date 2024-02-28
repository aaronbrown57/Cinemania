const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
//const auth = require("../middleware/auth");
const bodyParser = require('body-parser')
const cors = require('cors');
const User = require('../models/Movie');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.use(cors({ origin: true, credentials: 'http://localhost:3000' }));
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});




module.exports = router;