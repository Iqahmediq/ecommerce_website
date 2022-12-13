const jwt = require('jsonwebtoken');
const createError = require('../utils/createError');
const decodeAccessToken = require('../utils/decodeAccessToken');

const hasRole = (...roles) => (req,res,next) => {
    const accessToken = req.cookies?.accessToken || req.headers?.['x-access-token'] || req.body?.accessToken
    if(!accessToken) return next(createError('there\'s no session','plz login using your username and password',403));
    /* try decode the jwt */
    const decode = decodeAccessToken(accessToken,next);
    if(!roles.includes(decode.role)) return next(createError('you\'re not permitted ','you cannot access this url',403));
    req.user = {
        user_id:decode.id
    }
    return next();
}

module.exports = hasRole;