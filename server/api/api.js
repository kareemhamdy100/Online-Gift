
const router = require('express').Router();


const defualtOrErrorRequest = (req, res) => {
    res.statusCode = 404;
    res.json(
        {
            msg: "this URL not found you can use",
            availableUrls: [
                "auth/login           POST",
                "auth/signup          POST",
                "api/gifts            GET {POST DELETE, auth: true, admin: true}",
                "api/gifts/:id        GET {PUT DELETE,  auth: true, admin: true }",
                "api/gifts/:id/upload {POST,  auth: true, admin: true }  ",
                "api/gifts/:id/image    GET",
                "api/orders          POST {GET DELETE, auth: true, same_user: true }",
                "api/orders/:id      {GET PUT DELETE,  auth: true, same_user: true }",
                "api/drivers         {GET POST DELETE, auth: true, admin: true}",
                "api/drivers/:id     {GET PUT DELETE,  auth: true, admin: true}",
                "api/drivers/me      {GET DELETE ,      auth: true , driver : true   }",
                "api/users           {GET POST DELETE, auth: true, admin: true}",
                "api/users/:id      {GET PUT DELETE,   auth: true, admin: true} ",
                "api/users/me      {GET PUT DELETE ,    auth: true }"

            ]
        });
}

router.use('/gifts/', require('./gift/giftRoutes'));
router.use('/drivers/', require('./driver/driverRoutes'));
router.use('/orders/', require('./order/orderRoutes'));
router.use('/users/', require('./user/userRoutes'));
router.use('/', defualtOrErrorRequest);

module.exports = router;
