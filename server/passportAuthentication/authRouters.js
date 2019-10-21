//this line to compile the passportlocal file
// eslint-disable-next-line no-unused-vars
const local = require('./passportLocal');

const router = require('express').Router();
const passport = require('passport');
const middleware = require('./JWT_middleware');


router.post('/signup', middleware.addNewUserMiddleWare);
router.post('/login', passport.authenticate('local'), middleware.signInMiddleWare);

module.exports = router;