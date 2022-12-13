const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const CommandeSchema = new Schema({
    id: String,
    userId : String,
    description : String,
    total : Number,
    cart : [],
    status: "payed"|"not payes",
    address : String ,
})
const Commande =mongoose.model('Commande',CommandeSchema);
module.exports = Commande;