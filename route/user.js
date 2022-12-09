const router = require('express').Router();
const UserController = require('../controller/UserController.js');
router.get('/',UserController.read);
router.put('/',UserController.update);
router.delete('/:id',UserController.delete);
router.get('/article/:id',UserController.readArticleById);
router.get('/article/:offset/:limite',UserController.readArticle);
router.post('/command',UserController.createCommand);
router.get('/command/:id',UserController.readCommandById);
router.get('/command',UserController.readCommand);
router.delete('/command/:id',UserController.delecteCommand);
router.put('/command/:id',UserController.updateCommand);
router.post('/vendor/subscribe',UserController.subscribe);
router.delete('/:id',UserController.deleteAcc);
module.exports = router;