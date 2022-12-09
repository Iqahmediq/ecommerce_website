const joi = require('joi');
const createError = require('../../utils/createError');
module.exports = (req,res,next) => {
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
    /* declined request */
    if(data.error) return next(createError('invalid request',data.error.message,400));
    /* accepted request */
    return next();
}