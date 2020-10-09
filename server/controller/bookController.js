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
                    const newBook = new UserBooks({
                        userId : user._id,
                        username : username,
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
    }
}