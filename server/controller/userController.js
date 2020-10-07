// User Model for registering the user
const User = require('../model/User');

// Import bcrypt for hashing the password
const bcrypt = require('bcrypt');

module.exports = {
    loginUser : async (req, res) => {
        // If this function is called then user is authenticated
    },


    registerUser : async (req, res) => {
        const { email, username, password, city, state, bio } = req.body;
        console.log(req.body);
        // Check if all the parameters are provided
        if(!email || !username || !password || !city || !state || !bio) {
            res.json({error : true, message : "All parameters were not provided."})
        } else {
            // All parameters are provided
            // Check if the username and email combination is found in the database
            try {
                const user = await User.findOne({username, email});
                if(user) {
                    // User already exists
                    res.json({error : true, message : "User already exists."})
                } else {
                    // User doesn't exist
                    // Hash the password
                    const hashedPassword = await bcrypt.hash(password, 10);

                    // Create a new user
                    const newUser = new User({
                        username,
                        email,
                        password : hashedPassword,
                        city,
                        state,
                        bio
                    })

                    // Save the new user to the database
                    await newUser.save();
                    res.json({error : false, message : "Registration success!"});


                }
            } catch(err) {
                console.log(err);
                res.json({error : true, message : err});
            }
        }
    }
}