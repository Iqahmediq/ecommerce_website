const mongoose  = require('mongoose');

const Schema    = mongoose.Schema;
const ArticleSchema = new Schema({
    id: String ,
    name : String,
    description : String ,
    qte: Number,
    price : Number ,
    image : String,
    vendor : String ,
    category : String
})
const Article =mongoose.model('Article',ArticleSchema);
module.exports = Article;