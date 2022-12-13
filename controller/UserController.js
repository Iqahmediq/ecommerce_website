const createError = require('../utils/createError');
const User = require('../model/Users')
const Article = require('../model/Article');
const Commande = require('../model/Commande');
const decodeAccessToken = require('../utils/decodeAccessToken')
const uuidv4 = require('uuid').v4;
const jwt= require('jsonwebtoken')
require ('dotenv').config();

class UserController {
    
    static async read(req,res,next) {
        const accessToken= req.cookies?.accessToken;
        const decode = decodeAccessToken(accessToken,next);
        const user_id= decode.id; 
        const user = await User.findOne({}).where('id').equals(user_id);
        if(!user)/* revoke token */ return next(createError('cant find your account','something went wrong, your account is not found',404));
        return res.status(200).json({
            user:user.returns()
        });
    }
    
    static async update(req,res,next) {
        const accessToken= req.cookies?.accessToken;
        const decode = decodeAccessToken(accessToken,next);
        const user_id= decode.id; 
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
        if(data.name)     user.name      = data.name;
        if(data.lastName) user.lastName  = data.lastName;
        if(data.address)  user.address   = data.address;
        if(data.password) user.password  = data.password;
        await user.save();
        return res.status(202).json({
            user
        })
    }
    
    static async delete(req,res,next) {
        const accessToken= req.cookies?.accessToken;
        const decode = decodeAccessToken(accessToken,next);
        const user_id= decode.id;
        const user = await User.findOne({}).where('id').equals(user_id);
        if(!user)/* revoke token */ return next(createError('cant find your account','something went wrong, your account is not found',404));
        const data = await user.delete();
        return res.status(202).json(data);
    }
  
    static async readArticleById(req,res,next) {
        /* connected article id  */
        const id = req.params.id;
        /* find article by id */
        const article = await Article.findOne({}).where('id').equals(id);
        if(!article)/* should revoke token ('front') */ return next(createError('article not found','something went wrong, article is not found',404));
        
        return res.status(200).json(article.returns()); 
    }
    static async readArticle(req,res,next) {
        var articles= await Article.find({})
        
        return res.status(200).json({
            articles:articles.map(article=>{
                return article.returns();
            })
        })
    }
    static async createCommand(req,res,next){
        /* after create command validator */
        /* connected user id  */
        const accessToken = req.cookies?.accessToken;
        const token  = decodeAccessToken(accessToken,next)
        const user_id= token.id
        const data   = req.body.data;
        const cart = req.body.cart.sort((item1,item2)=>item1.id-item2.id)
        const requete    = cart.map(item=>({id:item.id}))
        const article = await Article.find({}).or(requete).sort({id:"desc"})
        
        const total = article.map((art,index)=>({id:art.id,price:art.price,qte:cart[index].qte}))
        .reduce((sum,item)=>sum+=item.price*item.qte,0) 
        console.log(article);
        const commande = new Commande({...data,userId:user_id,id:uuidv4(),status:"not payed",cart:article.map(item=>item.returns()),total:total});
        article.forEach((item)=>{
            item.comande={
                ...item.comande,
                [commande.id]:commande
            }
            item.save().catch(err=>{
                next(err);
            })
        })
        try{
            await commande.save();
            return res.status(202).json({
                commande
            });
        }catch(err){
            return next(createError("something went wrong","internal server error",500));
        }
    }
    static async readCommandById (req,res,next){
        const id = req.params.id ;
        const commandes = await Commande.findOne({}).where('id').equals(id);
        console.log(commandes)
        return res.status(200).json({
            commandes
        })
    }
    static async readCommand (req,res,next){
        const accessToken = req.cookies?.accessToken;
        const token = decodeAccessToken(accessToken,next)
        const user_id= token.id
        const commandes = await Commande.find({}).where('userId').equals(user_id);
        console.log(commandes)
        return res.status(200).json({
            commandes
        })
    } 
    static async deleteCommand (req,res,next){
        const accessToken = req.cookies?.accessToken;
        const token = decodeAccessToken(accessToken,next)
        const user_id= token.id
        const id = req.params.id ;
        const commande = await Commande.findOne({}).where('id').equals(id);
        const article  = await Article.findOne({}).
        console.log(article);
        if(!commande) return next(createError("commande not found","there's no commande with this id",404))
        article.comande = {
            ...article.comande,
            [id]:undefined 
        }
        await article.save();
        await commande.delete();
        const code =  (response.deletedCount!=0)?202:404;
        /* 
            update commands here!
        */
        return res.status(code).json({
            response
        })
    }
}

module.exports = UserController;