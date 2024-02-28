const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./routes/movies');
app.use('/movies', users);

// Connect Database
app.use(cors({ origin: true, credentials: 'http://localhost:3000' }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.use(express.json({ extended: false }));


const conn_str = "mongodb+srv://grantprusik5:fP0xugxfu5EERhQK@cluster0.m3q4sbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.set('strictQuery', false);
mongoose.connect(conn_str, {
    useUnifiedTopology : true,
    useNewUrlParser : true
})
.then(() => {
    console.log('MongoDB Connection Succeeded...');
    app.listen(port, () => console.log(`Server running on port ${port}`));
})
.catch(err => {
    console.log('Error in DB Connection ${err}');
});
