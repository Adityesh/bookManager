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

router.post('/incoming/respond', isAuth, booksController.respondRequest);

// Export the router handler;
module.exports = router;