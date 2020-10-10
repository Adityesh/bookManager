// require mongoose for modelling
const mongoose = require('mongoose');



// Create user schema
const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    bio: { type: String, default: 'N/A' },
    incomingRequests : [
        {
            userId : {type : String, required : true},
            username : {type :String, required : true},
            email : {type : String, required : true},
            accepted : {type : Boolean, default : false},
            bookTitle : {type : String, required : true},
            bookAuthor : {type : String, required : true},
            bookDate : {type : String, required : true},
            bookDescription : {type : String, requried :true},
            bookUrl : {type : String, required : true},
            pageCount : {type : Number, required : true},
        }
    ],

    outgoingRequests : [
        {
            userId : {type : String, required : true},
            username : {type :String, required : true},
            email : {type : String, required : true},
            accepted : {type : Boolean, default : false},
            bookTitle : {type : String, required : true},
            bookAuthor : {type : String, required : true},
            bookDate : {type : String, required : true},
            bookDescription : {type : String, requried :true},
            bookUrl : {type : String, required : true},
            pageCount : {type : Number, required : true},
            status : {type : String, default : 'Pending'},
        }
    ]
}, { versionKey: false })


// Model the schema 
module.exports = mongoose.model('User', userSchema, 'Users');