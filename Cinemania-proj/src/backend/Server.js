const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routerMovies = require('./routes/movies');
const routerUsers = require('./routes/users');

const app = express();
const port = process.env.PORT || 5000;
const conn_str = "mongodb+srv://grantprusik5:Temppass2024@cluster0.m3q4sbt.mongodb.net/Cinemania?retryWrites=true&w=majority&appName=Cluster0";

// Enable CORS with specific options
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// Handle preflight requests for all routes
app.options('*', cors());

// Parse JSON bodies in incoming requests
app.use(express.json({ extended: false }));

// Mount routers
app.use('/movies', routerMovies);
app.use('/users', routerUsers);

// Connect to MongoDB
mongoose.connect(conn_str, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
    console.log('MongoDB Connection Succeeded...');
    // Start the server
    app.listen(port, () => console.log(`Server running on port ${port}`));
})
.catch(err => {
    console.error(`Error in DB Connection: ${err.message}`);
});
