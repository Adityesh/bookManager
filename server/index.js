// environment variables
const dotenv = require('dotenv').config();

const cors = require('cors')

// Passport related imports
const passport = require('passport');
const session = require('express-session');

// Local strategy for login
const authenticate = require('./middleware/authenticate');


// Import user Route
const userRoute = require('./routes/userRoute');


// Require express
const express = require('express');
// require mongoose for db connection
const mongoose = require('mongoose');

// Connection to the database
const db = mongoose.connection;

// Init the express app
const app = express();

// Get the port from the .env
const PORT = 5000 || process.env.PORT;
// DB string stored in the .env file
const DB = 'mongodb://localhost:27017/BookTrading' || process.env.DB;

app.use(cors())

// Use body-parser middleware for json bodies
app.use(express.json());
// Form body requests middleware
app.use(express.urlencoded({extended : false}));

// Session middleware
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
    cookie : {
        httpOnly : true,
        maxAge : 3600000
    }
}))

// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// Connection to the database
mongoose.connect(DB, {useNewUrlParser : true, useUnifiedTopology : true});

// Check if the database has been connected or not
db.once('open', () => console.log(`Connected to the database..`))

app.get('/profile', require('./middleware/isAuthenticated', (req, res) => {
    console.log(req.user);
}))

app.use('/user', userRoute);

// Listen on port 5000 for dev and not on production
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));