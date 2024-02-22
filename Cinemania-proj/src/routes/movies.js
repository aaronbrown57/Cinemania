const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const cors = require('cors');

const Pin = require('../models/Movie');

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

router.post('/', (req,res) => {
    const body = req.body;
    Movie.create(body)
    .then((item) => res.json({msg: 'Movie added successfully'}))
    .catch((err) => console.log(err));
}); 

router.get('/', (req, res) => {
    Movie.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(404).json(err));
});

router.get('/:id', (req, res) => {
    Movie.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json("Connection failed"));
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Movie.findByIdAndUpdate(id, body)
    .then((item) => res.json({msg: 'Updated successfully'}))
    .catch((err) => res.status(404).json(err));
});

router.delete('/:id', (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
    .then((item) => res.json({msg: 'Item entry deleted successfully'}))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;