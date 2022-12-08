const express = require ("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',require('./route'));
app.use((req,res)=>{
    res.status(404).json({message:"notFound"})
})
app.use((err,req,res,next)=>{
    res.status(500).json({message:"error"})
    return next();
})
app.listen(process.env.PORT,()=>{
    console.log("app is running");
})