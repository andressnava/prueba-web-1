const passport = require('passport');
const localStategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new localStategy({
    usernameField: "username",
    passwordField: "password"
}, async (username, password, done) => {
    //match username
    const user = await User.findOne({ username });

    if (!user) {
        return done(null, false, { message: "Not user found" });
    } else {
        //Match password
        const match = await user.matchPassword(password);

        if(match){
            return done(null, user);
        }else{
            return done(null, false, { message: 'Incorrect Password' });
        }
    }

}));

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) =>{
        done(err, user);
    })
});