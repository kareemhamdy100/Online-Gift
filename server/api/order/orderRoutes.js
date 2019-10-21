const router = require('express').Router();
const controller = require('./orderController');
const auth = require('../../passportAuthentication/JWT_authentication');

router.param('id', controller.params);

router.route('/')
    .all(auth.verifyUser)
    .get(controller.get)
    .post(controller.post)
    .delete(controller.delete);

router.route('/:id')
    .all(auth.verifyUser)
    .get(controller.getOne)
    .put(controller.updateOne)
    .delete(controller.deleteOne);




module.exports = router;