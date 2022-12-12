const mongoose  = require('mongoose');
const Article = require('./Article');
const bcrypt =require ('bcrypt');
const { boolean } = require('joi');
const Schema    = mongoose.Schema;
const UserSchema = new Schema({
    id:String ,
    name:String,
    lastName:String ,
    address:String ,
    password:{
        set:(password)=>bcrypt.hashSync(password,10),
        type : String
    },
    email : String ,
    phone : String ,
    role : String,
    article:{
        type:[],
        default:null
    },
    confirmed:Boolean,
    subscription:{},
    image:String
})

UserSchema.methods.getCommandes = function(){
    return this.article.map((item)=>item.comande)
}

UserSchema.methods.login=function (password){
    return bcrypt.compareSync(password,this.password);
}

const User = mongoose.model('User',UserSchema);

module.exports = User;