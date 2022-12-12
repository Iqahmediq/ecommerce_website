const joi = require('joi');
const createError = require('../../../utils/createError');
const UPDATE_SCHEMA = joi.object().keys({
    name:joi.string().min(3).max(30).optional(),
    description:joi.string().min(20).max(150).optional(),
    qte:joi.number().min(0).optional(),
    price:joi.number().min(0).optional(),
    image:joi.string().min(8).optional().default(''),
    category:joi.string().min(2).optional()
})
.or('name','description','qte','price','category')
.required();

const updateArticleValidator = (req,res,next) => {
    const body = UPDATE_SCHEMA.validate(req.body);
    if(body.error) return next(createError('invalid request',body.error.message,400));
    return next();
}

module.exports = updateArticleValidator;