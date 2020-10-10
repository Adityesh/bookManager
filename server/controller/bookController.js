// User Model for registering the user
const User = require('../model/User');
const UserBooks = require('../model/UserBooks');
// Import bcrypt for hashing the password
// const bcrypt = require('bcrypt');

module.exports = {
    newBook : async (req, res) => {
        // Schema 
        // const userBookSchema = mongoose.Schema({
        //     userId : {type : String, required : true},
        //     username : {type : String, required : true},
        //     bookTitle : {type : String, required : true},
        //     bookAuthor : {type : String, required : true},
        //     bookDate : {type : String, required : true},
        //     bookDescription : {type : String, requried :true},
        //     bookUrl : {type : String, required : true},
        //     pageCount : {type : Number, required : true},
        //     tradeUser : {type : String, default : ''},
        //     isRequested : {type : Boolean, default : false}
        // }, {versionKey : false})

        const { username, bookTitle, bookAuthor, bookDate, bookDescription, bookUrl, pageCount, email} = req.body;

        // Check if all parameters were provided or not
        if(!username || !bookTitle || !bookAuthor ||  !bookDate || !bookDescription || !bookUrl || !pageCount || !email) {
            res.json({error : true, message : "One or more parameters were not provided."});
    
        } else {
            // All Parameters present
            // Now find an user with the given email and username
            try {
                const user = await User.findOne({username, email});
                if(!user) {
                    // No user with the given email and username
                    res.json({error : true, message : "No user found."})
                } else {
                    // Valid user
                    // Insert a new book for the given user
                    // Check if the book already exists in the database
                    const book = await UserBooks.findOne({userId : user._id, bookTitle, bookAuthor, bookDescription});
                    if(book) res.json({error : true, message : "Book already exists."})
                    else {
                        const newBook = new UserBooks({
                            userId : user._id,
                            username : username,
                            email,
                            bookTitle,
                            bookAuthor,
                            bookDate,
                            pageCount,
                            bookDescription,
                            bookUrl,
                            tradeUser : '',
                            isRequested : false
                        })
    
                        await newBook.save();
                        res.json({error : false, message : "New Book Added"})
                    }
                    
                }
            } catch(err) {
                console.log(err);
                res.json({error : true, message : err});
            }
        }


    },

    getBooks : async (req, res) => {
        const {username, email} = req.body;

        // Check if all the parameters are provided or not
        if(!username || !email) {
            res.json({error : true, message : "One or more parameters missing"});
        } else {
            // All parameters provided
            try {
                const user = await User.findOne({email, username});
                if(!user) {
                    // No user with the given email and username
                    res.json({error : true, message : "No user found"})
                } else {
                    // User valid
                    const id = user._id;
                    const books = await UserBooks.find({userId : id});
                    if(!books) {
                        res.json({error :false, message : 'No books found'});
                    } else {
                        res.json({error : false, message : "All books", books : books});
                    }
                }
            } catch (err) {
                res.json({error : true, message : err});
            }
        }
    },


    getAllBooks : async (req, res) => {
        // Get all books by all user to display in the home page
        try {
            const books = await UserBooks.find({isRequested : false});
            if(!books) {
                res.json({error : true, message : "No books found"});
            } else {
                res.json({error : false, message : "Success", books});
            }
        } catch(err) {
            res.json({error : true, message : err})
        }
    },

    requestBook : async (req, res) => {
        // Get the email of both the person and the bookTitle of the book
        const { requestEmail, userEmail, bookTitle, requestUsername } = req.body;
        
        if(!requestEmail || !userEmail || !bookTitle) {
            res.json({error : true, message : "One or more parameters were not provided."})
        } else {
            // All parameters were provided
            // Check if the requestEmail has the book with the bookTitle
            try {
                const books = await UserBooks.findOne({email : requestEmail, bookTitle, username : requestUsername});
                if(!books) {
                    // No book available
                    res.json({error : true, message : "No book found."});
                } else {
                    // Book found 
                    // Check if its requested or not and the trade user field is empty or not
                    const flag = (!books.isRequested && books.tradeUser.length === 0) ? true : false;
                    if(flag) {
                        // Book can be requested for trade
                        // Set the isRequested flag to true and put trade user for the email of the requesting user
                        // Add the book to the incoming requests of the user with the book
                        books.isRequested = true;
                        books.tradeUser = userEmail; // User email is the user requesting the book
                        const requestedUser = await User.findOne({_id : books.userId, email : requestEmail}); // User to be traded with
                        const tradeUser = await User.findOne({email : userEmail}); // User who wants to trade
                        requestedUser.incomingRequests.push({

                            userId : tradeUser._id,
                            username : tradeUser.username,
                            email : tradeUser.email,
                            bookTitle : bookTitle,
                            bookAuthor : books.bookAuthor,
                            bookUrl : books.bookUrl,
                            bookDescription : books.bookDescription,
                            bookDate : books.bookDate,
                            pageCount : books.pageCount,
                            accepted : false
                        });
                        await requestedUser.save();
                        await books.save();

                        res.json({error : false, message : "Book requested successfully"})

                    } else {
                        res.json({error : true, message : "Book is not available for trade."})
                    }
                }
            } catch(err) {
                console.log(err);
                res.json({error : true, message : err});
            }
        }
    }
}