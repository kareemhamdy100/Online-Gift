const User = require('../../passportAuthentication/UserModel');

exports.params = async (req, res, next, id) => {
    try {
        const user = await User.findById(id);
        if (user) {
            req.mUser = user;
            next();
        } else {
            throw Error('No user with that id');
        }
    } catch (err) {
        next(err);
    }
};


exports.get = async (req, res, next) => {
    try {
        const allusers = await User.find({});
        res.json(allusers);
    } catch (err) {
        next(err);
    }
};

exports.post = async (req, res, next) => {
    try {
        const newuser = await User.create(req.body);
        res.json(newuser);
    } catch (err) {
        res.statusCode = 500;
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deletedUsers = await User.deleteMany({});
        res.json(deletedUsers);
    } catch (err) {
        next(err);
    }
}

exports.getOne = (req, res) => {
    res.json(req.mUser);
};

exports.updateOne = async (req, res, next) => {
    const body = req.body;
    req.mUser.set(body);
    try {
        const updatedUser = await req.mUser.save();
        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
};

exports.deleteOne = async (req, res, next) => {
    try {
        const deletedUser = await req.mUser.remove();
        res.json(deletedUser);
    } catch (err) {
        next(err);
    }
};


// MeRoutes

exports.getMe = async (req, res) => {
   res.json(req.user);
}

exports.updateMe= async (req, res, next) => {
    const body = req.body;
    //not allowed to update this field 
    delete body.admin;
    req.user.set(body);
    try {
        const updatedUser = await req.user.save();
        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
};

exports.deleteMe = async (req, res, next) => {
    try {
        const deletedUser = await req.user.remove();
        res.json(deletedUser);
    } catch (err) {
        next(err);
    }
};

