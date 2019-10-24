const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  passportLocalMongoose = require('passport-local-mongoose');

const Driver = require('../api/driver/driverModel');
var User = new Schema({
    firstname:{
        type:String,
        default: ''
    },
    lastname:{
        type:String,
        default: ''
    },
    phone: { type: String, maxlength: 25, required: true },
    driver: {type:Boolean, default: false},
    admin: Boolean
});



User.plugin(passportLocalMongoose);


User.pre('save',async function (next){
    if(this.driver){
        const driver = new Driver({user: this._id});
        try{
            await driver.save();
            next();
        }catch(e){
            throw   Error(e);
        }
    }
})


module.exports = mongoose.model('User', User);