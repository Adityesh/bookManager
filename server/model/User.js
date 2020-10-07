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
            bookTitle: { type: String, required: true },
            accepted : {type : Boolean, default : false}
        }
    ],

    outgoingRequests : [
        {
            userId : {type : String, required : true},
            username : {type :String, required : true},
            bookTitle: { type: String, required: true },
            accepted : {type : Boolean, default : false}
        }
    ]
}, { versionKey: false })


// Model the schema 
module.exports = mongoose.model('User', userSchema, 'Users');