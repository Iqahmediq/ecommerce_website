const jwt= require('jsonwebtoken')
require ('dotenv').config();
module.exports = (payload={id,email,role})=>{
    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1day"});
}