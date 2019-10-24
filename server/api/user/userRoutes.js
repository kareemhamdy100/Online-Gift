const router = require('express').Router();
const controller = require('./userController');
const auth = require('../../passportAuthentication/JWT_authentication');

router.param('id', controller.params);

router.route('/')
    .all(auth.verifyUser, auth.verifyAdmin)
    .get(controller.get)
    .post(controller.post)
    .delete(controller.delete);

router.route('/me')
    .all(auth.verifyUser)
    .get(controller.getMe)
    .put(controller.updateMe)
    .delete(controller.deleteMe);

router.route('/:id')
    .all(auth.verifyUser, auth.verifyAdmin)
    .get(controller.getOne)
    .put(controller.updateOne)
    .delete(controller.deleteOne);

module.exports = router;