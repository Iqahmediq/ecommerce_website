const router = require('express').Router();
const updateValidator= require('../middlewares/validator/User/update.validator')
const createCommandValidator= require('../middlewares/validator/User/createCommand.validator')
const UserController = require('../controller/UserController.js');
router.get('/',UserController.read);                                                          /* ✔️ */
router.put('/',updateValidator,UserController.update);                                       /* ✔️ */
router.delete('/',UserController.delete);                                                   /* ✔️ */
router.get('/article/:id',UserController.readArticleById);                                 /* ✔️ */
router.get('/article/',UserController.readArticle);                                       /* ✔️ */
router.post('/command',createCommandValidator,UserController.createCommand);             /* ✔️ */
router.get('/command/:id',UserController.readCommandById);                              /* ✔️ */
router.get('/command',UserController.readCommand);                                     /* ✔️ */
router.delete('/command/:id',UserController.deleteCommand);
// router.put('/command/:id',UserController.updateCommand);
// router.post('/vendor/subscribe',UserController.subscribe);
// router.delete('/:id',UserController.deleteAcc);
module.exports = router;