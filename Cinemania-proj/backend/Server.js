const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');


const cors = require('cors');
// app.use(cors());
const router= require('./routes/movies');
const routerUser = require('./routes/users');


// Connect Database
 app.use(cors());
app.use(express.json({ extended: false }));
app.use('/movies', router);
app.use('/users', routerUser);
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
   
