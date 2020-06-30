const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
require('./config/passport');

app.set('port', 3000);
app.set('views', path.join(__dirname, "views"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


app.use(require('./routes/index.routes'));
app.use(require('./routes/albums.routes'));
app.use(require('./routes/users.routes'));

app.use(express.static(path.join(__dirname, 'public/')));


app.listen(app.get('port'), () => {
    console.log('[+]'.brightYellow + ` Connected on port ${app.get('port')}`.blue);
});
