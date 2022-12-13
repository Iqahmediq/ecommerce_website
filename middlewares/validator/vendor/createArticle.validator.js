const joi = require('joi');
const createError = require('../../../utils/createError');
const CREATE_SCHEMA = joi.object().keys({
    name:joi.string().min(3).max(30).required(),
    description:joi.string().min(20).max(150).required(),
    qte:joi.number().min(0).required(),
    price:joi.number().min(0).required(),
    image:joi.string().min(8).optional().default(''),
    category:joi.string().min(2).required()
}).required();

const createArticleValidator = (req,res,next) => {
    const body = CREATE_SCHEMA.validate(req.body);
    if(body.error) return next(createError('invalid request',body.error.message,400));
    return next();
}
module.exports = createArticleValidator;