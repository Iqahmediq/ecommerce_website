const createError = require('../utils/createError');
const User = require('../model/Users')
const Article = require('../model/Article');
const Command = require('../model/Commande');
const uuidv4 = require('uuid').v4;

class VendorController {
   
    static async read(req,res,next) {
        const {user_id} = req.user;
        const user = await User.findOne({}).where('id').equals(user_id);
        if(!user)/* revoke token */ return next(createError('cant find your account','something went wrong, your account is not found',404));
        return res.status(200).json(user);
    }
    
    static async update(req,res,next) {
        const {user_id} = req.user;
        const data = req.body;
        const user = await User.findOne({}).where('id').equals(user_id);
        if(!user)/* revoke token */ return next(createError('cant find your account','something went wrong, your account is not found',404));
        
        var duplicate = null 
        if(data.email || data.phone) duplicate = await User.findOne({}).or([{phone:data.phone},{email:data.email}]);
        
        if(data?.email){
            if(duplicate && duplicate.email==data.email) return next(createError("taken email","email all ready exist,cannot update user",400));
            user.email = data.email;
        }
        if(data?.phone) {
            if(duplicate && duplicate.phone==data.phone) return next(createError("taken phone","phone all ready exist,cannot update user",400));
            user.phone = data.phone;
        }
        if(name)     user.name      = data.name;
        if(lastName) user.lastName  = data.lastName;
        if(address)  user.address   = data.address;
        if(password) user.password  = data.password;
        await user.save();
        return res.status(202).json({
            user
        })
    }
    
    static async delete(req,res,next) {
        const {user_id} = req.user;
        const user = await User.findOne({}).where('id').equals(user_id);
        if(!user)/* revoke token */ return next(createError('cant find your account','something went wrong, your account is not found',404));

        const data = await user.delete();
        return res.status(202).json(data);
    }
  
    static async readArticleById(req,res,next) {
        /* connected user id  */
        const {user_id} = req.user;
        /* connected article id  */
        const {id} = req.params;
        /* find article by id */
        const article = await Article.findOne({}).where('id').equals(id);
        if(!article)/* should revoke token ('front') */ return next(createError('article not found','something went wrong, article is not found',404));
        if(article.vendor !== user_id) /* not he's article not-permitted */ return next(createError('forbidden article','this article is not yours',403));
        return res.status(200).json(article); 
    }
    
    static async createArticle(req,res,next) {
        /* after create article validator */
        /* connected user id  */
        const {user_id} = req.user;
        const data = req.body;
        const article = new Article({...data,vendor:user_id,id:uuidv4(),comande:[]});
        return await article.save();
    }
    
    static async readArticle(req,res,next) {
        const {offset,limit} = req.params;
        const articles = await Article.find({}).skip(offset).limit(limit);
        return res.status(200).json({
            articles
        })
    }
    
    
    static async updateArticle(req,res,next) {
        /* connected user id  */
        const {user_id} = req.user;
        /* connected article id  */
        const {id} = req.params;
        /* new values */
        const data = req.body;
        /* find article by id */
        const article = await Article.findOne({}).where('id').equals(id);
        if(!article)/* should revoke token ('front') */ return next(createError('article not found','something went wrong, article is not found',404));
        if(article.vendor !== user_id) /* not he's article not-permitted */ return next(createError('forbidden article','this article is not yours',403));
        if(data?.name)         article.name        = data.name;
        if(data?.qte)          article.qte         = data.qte;
        if(data?.price)        article.price       = data.price;
        if(data?.image)        article.image       = data.image;
        if(data?.category)     article.category    = data.category;
        if(data?.description)  article.description = data.description;
        return await article.save();
    }
    
    static async deleteArticleById(req,res,next) {
        /* connected user id  */
        const {user_id} = req.user;
        /* connected article id  */
        const {id} = req.params;
        const response = await Article.deleteOne({}).where('id').equals(id);
        const code =  (response.deletedCount!=0)?202:404;
        /* 
            update commands here!
        */
        return res.status(code).json({
            response
        })
    }
    
    /* read all the vendor commandes on his article */
    static async readCommandes(req,res,next){
        /* connected user id  */
        const {user_id} = req.user;
        const vendor  = await User.findOne({}).where('id').equals(user_id);
        if(!vendor)/* revoke token */ return next(createError('cant find your account','something went wrong, your account is not found',404));
        const commandes = vendor.getCommandes();
        const code  = (commandes?.length!=0)?200:404;
        return res.status(code).json({
            commandes
        })             
    }
}

module.exports = VendorController;