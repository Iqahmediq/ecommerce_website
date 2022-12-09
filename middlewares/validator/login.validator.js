const joi = require('joi');
const createError = require('../../utils/createError');
module.exports = (req,res,next) => {
    const body = joi.object().keys({
        email : joi.string().email().required() ,
        password : joi.string().min(8).required() ,
    }).required();
    const data = body.validate(req.body);
    /* declined request */
    if(data.error) return next(createError('invalid request',data.error.message,400));
    /* accepted request */
    return next();
}