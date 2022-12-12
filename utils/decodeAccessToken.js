const createError = require('./createError');
const jwt= require('jsonwebtoken')
require ('dotenv').config();

const decode = (payload,next) => {
    try{
        return jwt.verify(payload,process.env.SECRET_KEY);
    }catch(err){
        return next(createError('invalid session','plz login using your username and password',403));
    }
}

module.exports = decode;