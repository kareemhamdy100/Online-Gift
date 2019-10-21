const Driver = require('./driverModel');


exports.params = async (req, res, next, id) => {
    try {
        const driver = await Driver.findById(id);
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
        const alldrivers = await Driver.find({});
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
    delete  body.future_orders;
    delete  body.completed_orders;

    req.driver.set(body);
    try {
      const updatedDriver = await req.driver.save();
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
