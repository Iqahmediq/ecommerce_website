const User = require('../model/Users')
const createError= require('../utils/createError')
const createAccessToken= require('../utils/createAccessToken')
const uuid = require('uuid').v4
class AuthController {
    static async login(req,res,next){
        const user = await User.findOne({email:req.body.email});
        if (!user) return next(createError("user not found","there is no acc with this email",404));
        if (!user.login(req.body.password)) return next(createError("wrong password","wrong password",403));
        const token = createAccessToken({id:user.id,email:user.email,role:user.role});
        res.cookie("accessToken",token);
        return res.status(202).json({
            accessToken:token
        });
    } 
    static async signUp(req,res,next){
        console.log(__filename);
        const data = req.body
        console.log(data);
        var user = await User.findOne({}).or([{phone:data.phone},{email:data.email}]);
        if (user && user.email==data.email) return next(createError("taken email","email all ready exist",400));
        if (user && user.phone==data.phone) return next(createError("taken phone","phone all ready exist",400));
        
        user  =  new User({...data,id:uuid(),article:{}});
        
        console.log(user);
        
        user.save();
        
        return res.status(202).json(user);
    }
    
}
module.exports = AuthController;