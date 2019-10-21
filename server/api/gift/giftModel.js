const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const giftSchema = new Schema({
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },

  image: {
    type: Buffer
  },
  image_url: String
}
);

giftSchema.methods.toJSON = function () {
  const gift = this;
  const giftObject = gift.toObject();

  delete giftObject.image;

  return giftObject;
}

module.exports = mongoose.model('gift', giftSchema); 