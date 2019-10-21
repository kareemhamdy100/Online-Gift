
const router = require('express').Router();


const defualtOrErrorRequest =  (req, res) => {
    res.statusCode = 404;
    res.json(
        {
            msg: "this URL not found you can use",
            avaliapleUrls: [
                "auth/login           POST",
                "auth/signup          POST",
                "api/gifts           GET {POST DELETE, auth: true, admin: true}",
                "api/gifts/:id       GET {PUT DELETE,  auth: true, admin: true }",
                "api/orders          POST {GET DELETE, auth: true, same_user: true }",
                "api/orders/:id      {GET PUT DELETE,  auth: true, same_user: true }",
                "api/drivers         {GET POST DELETE, auth: true, admin: true}",   
                "api/drivers/:id     {GET PUT DELETE,  auth: true, admin: true}"        

            ]
        });
}

router.use('/gifts/', require('./gift/giftRoutes'));
router.use('/drivers/',require('./driver/driverRoutes'));
router.use('/orders/', require('./order/orderRoutes'));
router.use('/',defualtOrErrorRequest);

module.exports = router;
