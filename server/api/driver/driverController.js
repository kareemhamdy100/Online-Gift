const Driver = require('./driverModel');


exports.params = async (req, res, next, id) => {
    try {
        const driver = await Driver.findById(id).populate('user');
        if (driver) {
            req.driver = driver;
            next();
        } else {
            throw Error('No driver with that id');
        }
    } catch (err) {
        next(err);
    }
};

exports.get = async (req, res, next) => {
    try {
        const alldrivers = await Driver.find({}).populate('user');
        res.json(alldrivers);
    } catch (err) {
        next(err);
    }
};

exports.post = async (req, res, next) => {
    try {
        const newDriver = await Driver.create(req.body);
        res.json(newDriver);
    } catch (err) {
        res.statusCode = 500;
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deletedDrivers = await Driver.deleteMany({});
        res.json(deletedDrivers);
    } catch (err) {
        next(err);
    }
}

exports.getOne = (req, res) => {
    res.json(req.driver);
};

exports.updateOne = async (req, res, next) => {
    const body = req.body;
    // unavailable to update these fields 
    delete body.future_orders;
    delete body.completed_orders;

    req.driver.set(body);
    req.driver.user.set(body.user);
    try {
        const updatedDriver = await req.driver.save();
        await req.driver.user.save();
        res.json(updatedDriver);
    } catch (err) {
        next(err);
    }
};

exports.deleteOne = async (req, res, next) => {
    try {
        const deletedDriver = await req.driver.remove();
        res.json(deletedDriver);
    } catch (err) {
        next(err);
    }
};



//Me 

exports.oneMe = async (req, res, next) => {
    try {
        const driver = await Driver.findOne({ user: req.user._id }).populate('user');
        if (driver) {
            // eslint-disable-next-line require-atomic-updates
            req.mDriver = driver;
            next();
        } else {
            throw Error('you are not a driver');
        }
    } catch (err) {
        next(err);
    }
}

exports.getMe = (req, res) => {
    res.json(req.mDriver);
}

exports.deleteMe = async (req, res, next) => {
    try {
        const deletedDriver = await req.mDriver.remove();
        // eslint-disable-next-line require-atomic-updates
        req.user.driver = false;
        await req.user.save();
        res.json(deletedDriver);
    } catch (err) {
        next(err);
    }
}