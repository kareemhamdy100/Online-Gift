const Gift = require('./giftModel');


exports.params = async (req, res, next, id) => {
  try {
    const gift = await Gift.findById(id);
    if (gift) {
      req.gift = gift;
      next();
    } else {
      throw Error('No Gift with that id');
    }
  } catch (err) {
    next(err);
  }
};


exports.get = async (req, res, next) => {
  try {
    const allGifts = await Gift.find({});
    res.json(allGifts);
  } catch (err) {
    next(err);
  }
};


exports.post = async (req, res, next) => {
  try {
    const newGift = await Gift.create(req.body);
    res.json(newGift);
  } catch (err) {
    res.statusCode = 500;
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deletedGifts = await Gift.deleteMany({});
    res.json(deletedGifts);
  } catch (err) {
    next(err);
  }
}

exports.getOne = (req, res) => {
  res.json(req.gift);
};

exports.updateOne = async (req, res, next) => {
  req.gift.set(req.body);
  try {
    const updatedGift = await req.gift.save();
    res.json(updatedGift);
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const deletedGift = await req.gift.remove();
    res.json(deletedGift);
  } catch (err) {
    next(err);
  }
};


exports.uploadImage = async (req, res) => {
  res.json({
    status: "upload successful",
    path: req.file.path,
  });
}