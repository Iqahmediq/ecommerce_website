const mongoose  = require('mongoose');

const Schema    = mongoose.Schema;
const ArticleSchema = new Schema({
    id: String ,
    vendor : String ,
    name : String,
    description : String ,
    qte: Number,
    price : Number,
    image : String,
    category : String,
    comande:{
        type:[],
        default:null
    }
})
const Article = mongoose.model('Article',ArticleSchema);
module.exports = Article;