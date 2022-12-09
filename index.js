const express = require ("express");
const app = express();
require('./config/db')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',require('./route'));
app.use((req,res)=>{
    return res.status(404).json({message:"notFound"})
    
})
app.use((err,req,res,next)=>{
    if (err.code) return res.status(err.code).json({message:err.message})
    res.status(500).json({message:"error"})
    return next();
})
app.listen(process.env.PORT,()=>{
    console.log("app is running");
})