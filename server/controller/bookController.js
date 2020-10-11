// User Model for registering the user
const { request } = require('express');
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

    getAllBooksForAuthUser : async (req, res) => {
        const {username, email} = req.body; 
        if(!username || !email) {
            res.json({error : true, message : "One or more parameters are missing"})
        } else {
            // Get all books by all user
            try {
                const books = await UserBooks.find({});
                if(!books) {
                    res.json({error : true, message : "No books found in the database"})
                } else {
                    const booksRes = books.filter((book, index) => {
                        return book.username !== username && book.email !== email && book.isRequested === false && book.tradeUser.length === 0;
                    })

                    res.json({error : false, message : "Success", books : booksRes});
                }
            } catch(err) {
                res.json({error : true, message : "Internal server error"})
            }
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
                        // Add the request in the requestUser's request array
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

                        // Add the request to the outgoing requests array of the user willing to trade
                        tradeUser.outgoingRequests.push({
                            userId : books.userId,
                            username : books.username,
                            email : books.email,
                            accepted : false,
                            bookTitle : books.bookTitle,
                            bookAuthor : books.bookAuthor,
                            bookDate : books.bookDate,
                            bookDescription : books.bookDescription,
                            bookUrl : books.bookUrl,
                            pageCount : books.pageCount

                        })

                        await tradeUser.save();
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
    },

    getRequests : async (req, res) => {
        const {username, email} = req.body;
        

        if(!username || !email) {
            res.json({error : true, message : "One or more parameters missing."});
        } else {
            try {
                // Get the user for the given email and username
                const user = await User.findOne({email, username});
                if(!user) {
                    // No user found
                    res.json({error : true, message : "No user found."})
                } else {
                    // User is found
                    // Get the requests array and send it
                    const requests = user.incomingRequests
                    if(requests.length === 0) {
                        res.json({error : false, message : "No trade requests.", requests : []})
                    } else {
                        const requestSend = requests.filter(request => {
                            return request.status === 'Pending';
                        })
                        res.json({error : false, message : "Success", requests : requestSend});
                    }
                }

            } catch(err) {
                console.log(err);
                res.json({error : true, message : "Internal server error."})
            }
        }
    },


    getOutgoingRequests : async (req, res) => {
        const {username, email} = req.body;
        

        if(!username || !email) {
            res.json({error : true, message : "One or more parameters missing."});
        } else {
            try {
                // Get the user for the given email and username
                const user = await User.findOne({email, username});
                if(!user) {
                    // No user found
                    res.json({error : true, message : "No user found."})
                } else {
                    // User is found
                    // Get the requests array and send it
                    const requests = user.outgoingRequests;
                    if(requests.length === 0) {
                        res.json({error : false, message : "No trade requests.", requests : []})
                    } else {
                        res.json({error : false, message : "Success", requests : requests});
                    }
                }

            } catch(err) {
                console.log(err);
                res.json({error : true, message : "Internal server error."})
            }
        }
    },

    respondRequest : async (req, res) => {
        const {flag, bookTitle, requestUserEmail, signedUserEmail} = req.body;
        //requestUserEmail is the user requesting for the book
        // signedUseremail is the user who has the book
        // flag can be true or false
        // true will accept the trade
        // false will reject the trade

        if(!bookTitle || !requestUserEmail || !signedUserEmail) {
            res.json({error : true, message : "One or more parameters missing."})
        } else {
            // All parameters provided
            // Find the signedUser in the database
            const signedUser = await User.findOne({email : signedUserEmail});
            const requestUser = await User.findOne({email : requestUserEmail});
            if(!signedUser || !requestUser) {
                res.json({error : true, message : "One or more users were not found"});
            } else if(signedUser && requestUser) {
                // Both the users are there in the database
                // Take out the incoming request from the signed user if the flag is true
                // and put the outgoind request in the requestUser's status to 'Accepted'
                // else if flag is false
                // put status to 'Rejected'

                signedUser.incomingRequests.forEach(request => {
                    if(request.bookTitle === bookTitle) {
                        request.accepted = flag;
                        request.status = flag ? 'Accepted' : 'Rejected';
                    }

                })

                if(flag === false) {
                    // If rejected make the book available again
                    const book = await UserBooks.findOne({email : signedUserEmail, bookTitle});
                    book.tradeUser = "";
                    book.isRequested = false;
                    await book.save();
                }

                
                

                

                requestUser.outgoingRequests.forEach(request => {
                    if(request.bookTitle === bookTitle) {
                        request.accepted = flag;
                        request.status = flag ? 'Accepted' : 'Rejected';

                        flag ? requestUser.borrowed.push({
                            userId : request.userId,
                            username : request.username,
                            email : request.email,
                            bookTitle : request.bookTitle,
                            bookAuthor : request.bookAuthor,
                            bookDate : request.bookDate,
                            bookDescription : request.bookDescription,
                            bookUrl : request.bookUrl,
                            pageCount : request.pageCount
                        }) : null;
                    }
                })

                await signedUser.save();
                await requestUser.save();
                res.json({error : false, message : "Request sent successfully."})
                
            }
        }

    },


    borrowedBooks : async (req, res) => {
        const {username, email} = req.body;

        if(!username || !email) {
            res.json({error : true, message : "One or more parameters missing."})
        } else {
            // All parameters provided
            const user = await User.findOne({username, email});
            if(!user) {
                res.json({error : true, message : 'No user found'});
            } else {
                // Valid user
                // Return the list of borrowed books
                res.json({error : false, message : 'Books found', books : user.borrowed.length === 0 ? [] : user.borrowed});
            }
        }
    },


    returnBook : async (req, res) => {
        const {signedUserEmail, requestUserEmail, bookTitle} = req.body;
        // SigneduserEmail is the user logged in who has the borrowed books
        // requestEmail is the user whose book is in the borrowed list of the signedUser
        // bookTitle is the book which is borrowed
        if(!signedUserEmail || !requestUserEmail || !bookTitle) {
            res.json({error : true, message : "One or more parameters missing."})
        } else {
            // All valid parameters
            // Get the borrowed books list of the signedUserEmail
            // Remove the book with that bookTitle
            try {
                const signedUser = await User.findOne({email : signedUserEmail});
                if(!signedUser) {
                    res.json({error : true, message : "No user found."});
                } else {
                    let borrowedBooks = signedUser.borrowed;
                    borrowedBooks = borrowedBooks.filter(book => {
                        if(book.bookTitle !== bookTitle) {
                            return book;
                        }
                    });
                    signedUser.borrowed = borrowedBooks;
                    // Book has been returned, make it available by making the 
                    // tradeUser = "" and isRequested = false
                    await signedUser.save();
                    const userOwnerBook = await UserBooks.findOne({email : requestUserEmail, bookTitle});
                    if(!userOwnerBook) {
                        res.json({error : true, message : "No owner for the book"})
                    } else {
                        userOwnerBook.tradeUser = "";
                        userOwnerBook.isRequested = false;
                    }

                    await signedUser.save();
                    await userOwnerBook.save();
                    res.json({error : false, message : "Book returned."})
                }
            } catch(err) {
                console.log(err);
                res.json({error : true, message : err});
            }
        }
    }
}