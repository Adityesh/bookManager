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
        if(!email || !username || !password || !city || !state) {
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
                        bio : !bio ? 'N/A' : bio
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
    },

    updateBio : async (req, res) => {
        const {updatedBio, username, email} = req.body;
        if(!updatedBio || !username || !email) {
            res.json({error : true, message : "One or more parameters missing"});
        } else {
            // All parameters valid
            try {
                const user = await User.findOne({username, email});
                if(!user) {
                    res.json({error : true, message : "No user with that email or username found."})
                } else {
                    // User is valid
                    user.bio = updatedBio;
                    await user.save();
                    req.session.destroy();
                    res.clearCookie('connect.sid')
                    res.json({error : false, message : "Bio updated succesfully."})
                }
            } catch(err) {
                console.log(err);
                res.json({error : true, message : "Internal server error."})
            }
        }
    },

    changePassword : async (req, res) => {
        const {username, email, oldPass, newPass} = req.body;
        if(!username || !email || !oldPass || !newPass) {
            res.json({error : true, message : "One or more parameters are missing"})
        } else {
            // All parameters are valid
            if(oldPass === newPass) res.json({error : true, message : "New Password cannot be same as old Password"});
            else {
                try {
                    const user = await User.findOne({email, username});
                    if(!user) {
                        res.json({error : true, message : "No user with that email or username found"});
                    } else {
                        // User is valid
                        // Check if the oldPass is same as the password in the database.
                        const isSame = await bcrypt.compare(oldPass, user.password);
                        if(isSame) {
                            // Passwords are same
                            // Check if new password is atleast 6 chars long
                            if(newPass.length <= 5) {
                                res.json({error : true, message : "New password must be atleast 6 characters long."})
                            } else {
                                const hashedPass = await bcrypt.hash(newPass, 10);
                                user.password = hashedPass;
                                await user.save();
                                req.session.destroy();
                                res.clearCookie('connect.sid')
                                res.json({error : false, message : "Password updated successfully."})
                            }
                        } else {
                            // Passwords don't match
                            res.json({error : true, message : "Incorrect password."})
                        }
                    }
                } catch(err) {
                    console.log(err);
                    res.json({error : true, message : "Internal server error"})
                }
            }
            
        }
    },

    logOut : async (req, res) => {
        req.session.destroy();
        res.clearCookie('connect.sid')
        res.json({error : false, message : 'Logout'})
    }
}