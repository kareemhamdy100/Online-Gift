const router = require('express').Router();
const controller = require('./driverController');
const auth = require('../../passportAuthentication/JWT_authentication');

router.param('id', controller.params);

router.route('/')
    .all(auth.verifyUser, auth.verifyAdmin)
    .get(controller.get)
    .post(controller.post)
    .delete(controller.delete);

router.route('/me')
    .all(auth.verifyUser, auth.verifyDriver, controller.oneMe)
    .get(controller.getMe)
    .delete(controller.deleteMe);

router.route('/:id')
    .all(auth.verifyUser, auth.verifyAdmin)
    .get(controller.getOne)
    .delete(controller.deleteOne);



module.exports = router;