
const mongoose =require("mongoose");

const commentSchema = new mongoose.Schema({
    body :{type:String, required:true},
},{
    timestamps:true,
    versionKey:false,
}
);

module.exports= mongoose.model("comments",commentSchema);