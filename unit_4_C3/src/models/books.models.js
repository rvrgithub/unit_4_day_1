
const mongoose =require("mongoose");

const booksSchema = new mongoose.Schema({
    likes :{type:Number, required:true},
    coverImage  :{ required:false},
    content :{type:String, required:false, unique:true},
},{
    timestamps:true,
    versionKey:false,
}
);

module.exports= mongoose.model("books",booksSchema);