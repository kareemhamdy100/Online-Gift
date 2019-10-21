const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const helper = require('./helper');


const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },

    location: {
        lat: { required: true, type: Number },
        long: { required: true, type: Number },
    },
    reciverInfo: {
        name: { type: String, maxlength: 100, required: true },
        phone: { type: String, maxlength: 25, required: true },

    },
    date: {
        type: Date,
        required: true,
        validate(value) {
            if ((new Date(value) - new Date()) <= 0) {
                throw new Error('you should enter future date');
            }
        }
    },
    driver: { type: Schema.Types.ObjectId, ref: 'driver', required: true },
    gifts: [{ type: Schema.Types.ObjectId, ref: 'Gift' }]
}, {
    timestamps: true
}
);

orderSchema.pre('remove', { document: true }, function (next) {
    helper.removeOrderFromDriver(this._id, this.driver);
    next();
});

module.exports = mongoose.model('order', orderSchema); 