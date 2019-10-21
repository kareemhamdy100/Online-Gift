const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const giftSchema = new Schema({
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  image: {
    type: String,
    required: true
  }
}
);



module.exports = mongoose.model('gift', giftSchema); 