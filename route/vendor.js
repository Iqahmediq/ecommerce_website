
const router = require('express').Router();
const VendorController = require('../controller/UserController.js');
// route("/vendor")
router.get('/',VendorController.read);
router.put('/',VendorController.update);
router.delete('/:id',VendorController.delete);
router.get('/article/:id',VendorController.readArticleById);
router.get('/article/:offset/:limite',VendorController.readArticle);
router.post('/article',VendorController.createArticle);
router.put('/article/:id',VendorController.updateArticle);
router.delete('/article/:id',VendorController.deleteById);
router.get('/command',VendorController.Command);
router.use('/stats',require('./statsVendor.js'))
module.exports = router;