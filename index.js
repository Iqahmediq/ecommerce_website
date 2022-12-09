const express = require ("express");
const app = express();
const cookieParser = require('cookie-parser');
require('./config/db')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/api',require('./route'));
app.use((req,res)=>{
    return res.status(404).json({message:"notFound"})
    
})
app.use((err,req,res,next)=>{
    console.error(err);
    if (err.code) return res.status(err.code).json({name:err.name,message:err.message})
    return res.status(500).json({message:"error"}) 
})
app.listen(process.env.PORT,()=>{
    console.log(`server running on port=${process.env.PORT} ...`);
})