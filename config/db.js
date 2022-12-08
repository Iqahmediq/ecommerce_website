const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGOOSE_URI,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
    logger.info('db connected');
});