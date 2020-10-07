// require mongoose for modelling
const mongoose = require('mongoose');



// Create user schema
const userBookSchema = mongoose.Schema({
    userId : {type : String, required : true},
    username : {type : String, required : true},
    bookTitle : {type : String, required : true},
    bookAuthor : {type : String, required : true},
    bookPublisher : {type : String, required : true},
    bookDescription : {type : String, requried :true},
    bookUrl : {type : String, required : true},
    pageCount : {type : Number, required : true},
    tradeUser : {type : String, default : ''},
    isRequested : {type : Boolean, default : false}
}, {versionKey : false})


// Model the schema
module.exports = mongoose.model('UserBooks', userBookSchema, 'Books');