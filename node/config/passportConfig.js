const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password,done) => {
    //         console.log("email"+req.body.email);
    
            User.findOne({ email: username },
                (err, user) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!user)
                        return done(null, false, { message: 'Email is not registered' });
                    // wrong password
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                        // else if (user.publickey != req.body.publickey)
                        // return done(null, false, { message: 'Wrong private key.' });
                    // authentication succeeded
                    else                    
                        return done(null, user);
                });
        })
);
