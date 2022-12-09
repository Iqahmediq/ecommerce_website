const User = require('../model/Users')
const createError= require('../utils/createError')
const createAccessToken= require('../utils/createAccessToken')
const joi = require('joi')
const uuid = require('uuid').v4
class AuthController {
    static async login(req,res,next){
        const user = await User.findOne({email:req.body.email});
        if (!user) return next(createError("there is no acc with this email",404));
        if (!user.login(req.body.password)) return next(createError("wrong password",403));
        const token = createAccessToken({id:user.id,email:user.email,role:user.role});
        res.cookie("accessToken",token);
        return res.status(202);
    }
    static async signUp(req,res,next){
        const body = joi.object().keys({
        name : joi.string().min(3).max(30).required(),
        lastName : joi.string().min(3).max(30).required() ,
        address : joi.string().min(10).max(60).required() ,
        password : joi.string().min(8).required() ,
        email : joi.string().email().required() ,
        phone : joi.string().length(8).required() ,
        role : joi.string().valid("user","vendor").required(),
        }).required();
        const data = body.validate(req.body);
        if (data.error) return next(createError(data.error.message,400));
        var user= await User.findOne({}).or([{phone:data.value.phone},{email:data.value.email}]);
        if (user && user.email==data.value.email)return next(createError("email all ready exist",400));
        if (user && user.phone==data.value.phone)return next(createError("phone all ready exist",400));
        user= await User.Vendor.findOne({}).or([{phone:data.value.phone},{email:data.value.email}]);
        if (user && user.email==data.value.email)return next(createError("email all ready exist",400));
        if (user && user.phone==data.value.phone)return next(createError("phone all ready exist",400));
        if(data.value.role== "user"){
            user = await User.create({...data.value,id:uuid()});
        }else{
            user = await User.Vendor.create({...data.value,id:uuid()});
        }
        return res.status(202).json(user);
    }
    
}
module.exports = AuthController;