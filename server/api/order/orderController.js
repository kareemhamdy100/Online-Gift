const Order = require('./orderModel');
const helper = require('./helper');


exports.params = async (req, res, next, id) => {
    console.log(id);
    try {
        const order = await Order.findById(id);
        if (order) {
            req.order = order;
            next();
        } else {
            throw Error('you do not create an order with that id');
        }
    } catch (err) {
        next(err);
    }
};


// find all is not correct ("should by customer id")
exports.get = async (req, res, next) => {
    try {
        const allorders = await Order.find({ customer: req.user._id });
        res.json(allorders);
    } catch (err) {
        next(err);
    }
};


exports.post = async (req, res, next) => {
    try {
        const body = req.body;
        body.customer = req.user._id;

        const mNewOerder = new Order(body);
        const driver = await helper.getAvailableDriver(mNewOerder.date);
        mNewOerder.driver = driver._id;

        const neworder = await mNewOerder.save();

        //assign the order to driver  
        driver.future_orders.push({ date: neworder.date, order: neworder._id });
        await driver.save();
        res.json(neworder);
    } catch (err) {
        res.statusCode = 500;
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const allorders = await Order.find({ customer: req.user._id });
        // using this because I need to fire middleware;
        allorders.forEach(async (order) => { await order.remove() })
        res.json(allorders);
    } catch (err) {
        next(err);
    }
}

exports.getOne = (req, res, next) => {
    console.log(req.order.customer + "\n", req.user._id);
    if (req.order.customer.equals(req.user._id)) {
        res.json(req.order);
    } else {
        next(new Error('you do not create an order with that id'));
    }
};

exports.updateOne = async (req, res, next) => {
    if (req.order.customer.equals(req.user._id)) {
        const body = req.body;
        const currOrder = req.order;
        // unavailable to update these fields 
        delete body.customer;
        try {
            if (body.date) {
                const newDate = new Date(body.date);
                if (newDate.getTime() != currOrder.date.getTime()) {
                    await helper.removeOrderFromDriver(currOrder._id, currOrder.driver);
                    const newDriver = await helper.getAvailableDriver(newDate, currOrder._id);
                    body.driver = newDriver._id;
                }
            }
            req.order.set(body);
            const updatedOrder = await currOrder.save();
            res.json(updatedOrder);
        } catch (err) {
            next(err);
        }
    } else {
        next(new Error('you do not create an order with that id'));
    }
};

exports.deleteOne = async (req, res, next) => {
    if (req.order.customer.equals(req.user._id)) {
        try {
            const deletedOrder = await req.order.remove();
            res.json(deletedOrder);
        } catch (err) {
            next(err);
        }

    } else {
        next(new Error('you do not create an order with that id'));
    }
};
