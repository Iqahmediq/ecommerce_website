const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGOOSE_URI,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log("db connected");
});