const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const UserSchema = new Schema({
    id: String ,
    name : String,
    lastName : String ,
    address : String ,
    password: String,
    email : String ,
    phone : String ,
    role : "guest"|"user"|"admin"|"vendor"
})
const vendorSchema = new Schema()
vendorSchema.add(UserSchema).add({article : []});
const Vendor = mongoose.model('Vendor',vendorSchema);
const User =mongoose.model('User',UserSchema);
module.exports = {User,Vendor};