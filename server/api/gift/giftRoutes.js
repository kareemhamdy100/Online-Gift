const router = require('express').Router();
const controller = require('./giftController');
const upload = require("./uploadImage");
const auth = require('../../passportAuthentication/JWT_authentication');

router.param('id', controller.params);

router.route('/')
   .get(controller.get)
   .post(auth.verifyUser, auth.verifyAdmin, controller.post)
   .delete(auth.verifyUser, auth.verifyAdmin, controller.delete);

router.route('/:id')
   .get(controller.getOne)
   .put(auth.verifyUser, auth.verifyAdmin, controller.updateOne)
   .delete(auth.verifyUser, auth.verifyAdmin, controller.deleteOne);

//upload Images
router.route('/:id/upload')
   .post(auth.verifyUser,
      auth.verifyAdmin,
      upload.single("image"),
      controller.uploadImage);


router.route('/:id/image')
   .get(controller.getImage);

module.exports = router;