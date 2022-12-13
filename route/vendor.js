
const router = require('express').Router();
const VendorController = require('../controller/VendorController.js');
const updateValidator = require('../middlewares/validator/vendor/update.validator');
const updateArticleValidator = require('../middlewares/validator/vendor/updateArticle.validator');
const createArticleValidator = require('../middlewares/validator/vendor/createArticle.validator');
// route("/vendor")
router.get('/',VendorController.read);                                              /* ✔️ */
router.put('/',updateValidator,VendorController.update);                            /* ✔️ */
router.delete('/',VendorController.delete);                                         /* ✔️ */
router.get('/article/:id',VendorController.readArticleById);                        /* ✔️ */
router.get('/article',VendorController.readArticle);                                /* ✔️ */
router.post('/article',createArticleValidator,VendorController.createArticle);      /* ✔️ */
router.put('/article/:id',updateArticleValidator,VendorController.updateArticle);   /* ✔️ */
router.delete('/article/:id',VendorController.deleteArticleById);                   /* ✔️ */
router.get('/command',VendorController.readCommandes);                              /* ✔️ */
/* router.use('/stats',require('./statsVendor.js')) */
module.exports = router;