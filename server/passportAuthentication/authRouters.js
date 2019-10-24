//this line to compile the passportlocal file
// eslint-disable-next-line no-unused-vars
const local = require('./passportLocal');

const router = require('express').Router();
const passport = require('passport');



const User = require('./UserModel');
const JWT_Auth = require('./JWT_authentication');

const singUp = (req, res, next) => {
    User.register(new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        driver: req.body.driver
    }),
        req.body.password,
        (err, user) => {
            if (err) {
                err.status = 500;
                next(err);
            } else {
                passport.authenticate('local')(req, res, () => {
                    const token = JWT_Auth.getToken({ _id: user._id });
                    res.statusCode = 201;
                    res.json({ sucess: true, status: 'Registration Successful!', token });
                });
            }
        });
}

const login = (req, res) => {
    const token = JWT_Auth.getToken({ _id: req.user._id });
    res.json({
        sucess: true,
        token: token,
        status: 'You are successfully loggin'
    });
}




router.post('/signup', singUp);
router.post('/login', passport.authenticate('local'), login);


module.exports = router;