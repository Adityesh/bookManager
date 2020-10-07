// Passport 
const passport = require('passport');

// Import express
const express = require('express');
// Add router handler
const router = express.Router();

// Import userController functions
const userController = require('../controller/userController');

// Register route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', passport.authenticate('local', {
    successRedirect : '/user/success', // redirect to the secure profile section
    failureRedirect : '/user/failure', // redirect back to the signup page if there is an error
}), userController.loginUser);

// Success route
router.get('/success', (req, res) => {
    let userObj = {
        username : req.user.username,
        email : req.user.email,
        city : req.user.city,
        state : req.user.state,
        bio : req.user.bio
    }
    res.json({error : false, message : "Login success", user : userObj});

})

// Failure route
router.get('/failure', (req, res) => {
    res.json({error : true, message : "Login not succesful, Check your credentials."});
})


// Export the router handler;
module.exports = router;