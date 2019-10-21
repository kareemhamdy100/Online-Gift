const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const driverSchema = new Schema({
    name: { type: String, maxlength: 100, required: true },
    phone: { type: String, maxlength: 25, unique: true, required: true },
    future_orders: [
        {
            order: { type: Schema.Types.ObjectId, ref: 'order' },
            date: {type: Date}
        }],
    completed_orders: [{ type: Schema.Types.ObjectId, ref: 'order' }]
}
);


module.exports = mongoose.model('driver', driverSchema); 