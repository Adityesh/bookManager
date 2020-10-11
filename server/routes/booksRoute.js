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
const bookController = require('../controller/bookController');


// New Book Route
router.post('/new', isAuth, booksController.newBook);
// All Books Route for a particular user
router.post('/all', isAuth,  booksController.getBooks);
// All Books for authenticated user 
router.post('/allbooks', isAuth, booksController.getAllBooksForAuthUser);
// Get all books for the unauthenticated user
router.get('/all', booksController.getAllBooks);
// Request books trade
router.post('/new/request', isAuth, booksController.requestBook);

// Get all requests for a particular user
router.post('/all/requests', isAuth, booksController.getRequests);

// Get all outgoing requests for a particular user
router.post('/all/outgoing', isAuth, booksController.getOutgoingRequests);
// Respond reject or accept books route
router.post('/incoming/respond', isAuth, booksController.respondRequest);

// Get all borrowed books for a user
router.post('/borrowed', isAuth, booksController.borrowedBooks);

// Return a book
router.post('/return', isAuth, bookController.returnBook);

// Export the router handler;
module.exports = router;