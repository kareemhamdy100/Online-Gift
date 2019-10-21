const DriverModel = require('../driver/driverModel');



/*this function chose the first driver that have no order on that day  */
exports.getAvailableDriver = async (dateObj, orderId = null) => {
    //TODO add more error handler;
    try {
        const driver = await DriverModel.findOne(
            { $expr: { $eq: [{ $indexOfArray: ["$future_orders.date", dateObj] }, -1] } }
        );
        if (driver == null) {
            throw new Error('all drivers are busy that day please choose other day');
        }
        //used on Update only
        if (orderId != null) {
            driver.future_orders.push({ date: dateObj, order: orderId });
            await driver.save();
        }
        return driver;
    } catch (err) {
        throw Error(err);
    }
}


exports.removeOrderFromDriver = async (currentOrderId, driverId) => {
    try {
        const driver = await DriverModel.findById(driverId);
        /*happend when delete driver 
        shouldn't happend at all need better handler */
        if(driver == null){
            return;
        }
        driver.future_orders = driver.future_orders
            .filter(el => !el.order.equals(currentOrderId));

        await driver.save();
    } catch (err) {
        throw Error(err);
    }
}