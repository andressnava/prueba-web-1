const { Router } = require('express');
const router = Router();

const { renderSignupForm, renderLoginForm, createNewUser, login, logout } = require('../controllers/users.controller');

//new user
router.get('/users/signup', renderSignupForm);
router.post('/users/new-user', createNewUser);

//login
router.get('/users/login', renderLoginForm);
router.post('/users/login-entry', login);

router.get('/users/logout', logout);

module.exports = router;