const passport = require('passport');
const User = require('./UserModel');
const JWT_Auth = require('./JWT_authentication');

exports.addNewUserMiddleWare = (req, res) => {
    User.register(new User({ username: req.body.username }),
        req.body.password,
        (err) => {
            if (err) {
                res.statusCode = 500;
                res.json({ err: err });
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 201;
                    res.json({ sucess: true, status: 'Registration Successful!' });
                });
            }
        });
}

exports.signInMiddleWare = (req, res) => {
    const token = JWT_Auth.getToken({ _id: req.user._id });
    res.json({
        sucess: true,
        token: token,
        status: 'You are successfully loggin'
    });
}
