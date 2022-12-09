const jwt= require('jsonwebtoken')
require ('dotenv').config();
module.exports = (payload)=>{
    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1day"});
}