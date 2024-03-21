const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
const router= require('./routes/movies');


// Connect Database
// app.use(cors({ origin: true, credentials: 'http://localhost:3000' }));
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();
// });
app.use(express.json({ extended: false }));
app.use('/movies', router);
const conn_str = "mongodb+srv://grantprusik5:Temppass2024@cluster0.m3q4sbt.mongodb.net/Cinemania?retryWrites=true&w=majority&appName=Cluster0";
mongoose.set('strictQuery', false);


app.get('/', (req, res) => res.send('Hello world!'));

mongoose.connect(conn_str, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
    console.log('MongoDB Connection Succeeded...');
    app.listen(port, () => console.log(`Server running on port ${port}`));
})
.catch(err => {
    console.error(`Error in DB Connection: ${err.message}`);
});
   
