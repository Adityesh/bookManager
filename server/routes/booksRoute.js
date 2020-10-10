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
// All Books Route for a particular user
router.post('/all', isAuth,  booksController.getBooks);
// All Books for unauthenticated users and authenticated user alike
router.get('/allbooks', booksController.getAllBooks);
// Request books trade
router.post('/new/request', isAuth, booksController.requestBook);

// Export the router handler;
module.exports = router;