const mongoose = require("mongoose");
const Schema = mongoose.Schema; //abrevia mongoose.Schema a Schema

// datos del modelo
const CommentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    date: Date,
    body: String,
});


// se compila el modelo de Campground
const Comment = mongoose.model("Comment", CommentSchema);
//exporto modelo Campground
module.exports = Comment ;
