const mongoose  = require('mongoose');
const bcrypt =require ('bcrypt');
const { boolean } = require('joi');
const Schema    = mongoose.Schema;
const UserSchema = new Schema({
    id: String ,
    name : String,
    lastName : String ,
    address : String ,
    password : {set:(password)=>{
        return bcrypt.hashSync(password,1);
    },type : String},
    email : String ,
    phone : String ,
    role : "guest"|"user"|"admin"|"vendor"
})
UserSchema.methods.login=function (password){
    return bcrypt.compareSync(password,this.password);
}
const vendorSchema = new Schema()
vendorSchema.add(UserSchema).add({article : {type :[],default:[]},comfirmed:{type: Boolean , default: false},subscrition:{type:{}, default:{}},image:{type:String,default:""}});
const User =mongoose.model('User',UserSchema);
const Vendor = mongoose.model('Vendor',vendorSchema);
User.Vendor=Vendor;
module.exports = User;