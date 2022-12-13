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
        type:{},
        default:null
    }
})
ArticleSchema.methods.returns = function(){
    return {
        ...this._doc,
        comande:undefined
    }
}
const Article = mongoose.model('Article',ArticleSchema);
module.exports = Article;