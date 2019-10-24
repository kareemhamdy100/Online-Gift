const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const driverSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    future_orders: [
        {
            order: { type: Schema.Types.ObjectId, ref: 'Order' },
            date: { type: Date }
        }],
    completed_orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
}
);


module.exports = mongoose.model('driver', driverSchema); 