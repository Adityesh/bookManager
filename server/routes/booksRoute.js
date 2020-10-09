// Passport 
const passport = require('passport');

// Import express
const express = require('express');
// Add router handler
const router = express.Router();

// Import userController functions
const isAuth = require('../middleware/isAuthenticated');
// Book controller 
const booksController = require('../controller/bookController');


// New Book Route
router.post('/new', isAuth, booksController.newBook);
router.post('/all', isAuth,  booksController.getBooks);

// Export the router handler;
module.exports = router;