const router = require('express').Router();
const AdminController = require('../controller/AdminController.js');
const UserController = require('../controller/UserController.js');
router.delete('/vendor/:id',AdminController.deleteVendor);
router.delete('/user/:id',AdminController.deleteUser);
router.delete('/article/:id',AdminController.deleteArticleByid);
router.use('/stats',require('./statsAdmin.js'))
module.exports = router;