
const router = require('express').Router();
const VendorController = require('../controller/VendorController.js');
// route("/vendor")
router.get('/',VendorController.read);
router.put('/',VendorController.update);
router.delete('/',VendorController.delete);
router.get('/article/:id',VendorController.readArticleById);
router.get('/article/:offset/:limit',VendorController.readArticle);
router.post('/article',VendorController.createArticle);
router.put('/article/:id',VendorController.updateArticle);
router.delete('/article/:id',VendorController.deleteArticleById);
router.get('/command',VendorController.readCommandes);
router.use('/stats',require('./statsVendor.js'))
module.exports = router;