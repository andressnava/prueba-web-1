const User = require('../models/User');
const passport = require('passport');

const usersCtrl = {};

usersCtrl.renderSignupForm = (req, res) => {
    res.render('Users/signup.html', { title: 'Sign up' });
};

usersCtrl.createNewUser = async (req, res) => {
    try {

        const { mail, username, password } = req.body;


        if (username.length < 4) {
            req.flash('error_msg', 'Username must have at leat 4 characters');
            res.redirect('/users/signup');
        }
        if (username.length > 16) {
            req.flash('error_msg', 'Username can have maximum 16 characters');
            res.redirect('/users/signup');
        }
        if (password.length < 4) {
            req.flash('error_msg', 'Password must have at least 4 characters');
            res.redirect('/users/signup');
        }
        else {
            const emailUser = await User.findOne({ mail: mail });
            const nameUser = await User.findOne({ username: username });

            if (emailUser) {
                req.flash('error_msg', 'This e-mail is already in use. Try again');
                res.redirect('/users/signup');
            }
            if (nameUser) {
                req.flash('error_msg', 'This username is already in use. Try again');
                res.redirect('/users/signup');
            }
            else {
                const newUser = new User({ mail, username, password });
                newUser.password = await newUser.encryptPassword(password);
                console.log(newUser);
                await newUser.save();

                req.flash('success_msg', 'You are registered!!!');
                res.redirect('/users/login');
            }


        }


    } catch (err) {
        console.log(err);
        res.redirect('/users/signup');
    }

};

usersCtrl.renderLoginForm = (req, res) => {
    res.render('Users/login.html', { title: 'Log in' });
};

usersCtrl.login = passport.authenticate('local', {
    failureRedirect: '/users/login',
    successRedirect: '/albums',
    failureFlash: true
});

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Good Bye!!!');
    res.redirect('/users/login');
};

module.exports = usersCtrl;