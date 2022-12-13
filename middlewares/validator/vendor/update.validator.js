const joi = require('joi');
const createError = require('../../../utils/createError');
const UPDATE_SCHEMA = joi.object().keys({
    name:joi.string().min(3).max(30),
    lastName:joi.string().min(3).max(30),
    address:joi.string().min(10).max(60),
    password:joi.string().min(8),
    email:joi.string().email(),
    phone:joi.string().regex(new RegExp('[0-9]{1,8}')),
    image:joi.string()
})
.or('name','lastName','address','password','email','phone','image')
.required();

const updateValidator = (req,res,next) => {
    const body = UPDATE_SCHEMA.validate(req.body);
    if(body.error) return next(createError('invalid request',body.error.message,400));
    return next();
}

module.exports = updateValidator;