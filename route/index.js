const router = require("express").Router()
const authRoute = require('./auth.js');
const adminRoute = require('./admin.js');
const vendorRoute = require('./vendor.js');
const userRoute = require('./user.js');
router.use('/auth',authRoute);
router.use('/admin',adminRoute);
router.use('/user',userRoute);
router.use('/vendor',vendorRoute);
module.exports = router;
