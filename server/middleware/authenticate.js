// Import passport and passport-local and bcrypt
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../model/User');
const bcrypt = require('bcrypt');


//Serialize the user Object and store unique id in the session
passport.serializeUser((user, done) => {
    done(null, user._id)
})
//Deserialize the user object from the id stored in the session
passport.deserializeUser((_id, done) => {
    User.findById({_id},(err, user) => {
        done(err, user);
    })
})

//Handle auth route
passport.use(new LocalStrategy({usernameField : 'email',passwordField : 'password'}, (username, password, done) => {
    User.findOne({'email' : username},(err, user) => {
        if(err) return done(err, null)
        if(!user) {
            return done(err, null, {message : "No user found"})
        } else {
            
            let passwordGot = user.password;
            
            //Compare retireved password with the password in the database
            bcrypt.compare(password, passwordGot, (err2, result) => {
                if(err2) {
                    let message = "Incorrect Password!"
                    return done(null,null); 
                }
                if(result){
                    return done(null,user);
                } else {
                    let message = "Passwords don't match"
                    return done(null, null);
                }
            })
        }
        
    })
}))


module.exports = passport;