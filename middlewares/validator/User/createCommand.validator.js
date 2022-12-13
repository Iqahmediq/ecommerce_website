const joi = require('joi');
const createError = require('../../../utils/createError');
const cart_item=joi.object().keys({
    id:joi.string().uuid().required(),
    qte:joi.number().min(1).required()
}).required()
const Data_SCHEMA = joi.object().keys({
    description:joi.string().min(20).max(150).required(),
    address:joi.string().min(10).max(30).required(),
}).required();
const CREATE_SCHEMA = joi.object().keys({
    data:Data_SCHEMA,
    cart:joi.array().items(cart_item).min(1).required()
}).required();

const createCommandValidator = (req,res,next) => {
    const body = CREATE_SCHEMA.validate(req.body);
    if(body.error) return next(createError('invalid request',body.error.message,400));
    return next();
}
module.exports = createCommandValidator;