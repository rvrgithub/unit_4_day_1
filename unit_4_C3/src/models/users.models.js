
const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    firstName :{type:String, required:true},
    lastName :{type:String, required:false},
    age:{type:Number, required:false},
    email:{type:String, required:false, unique:true},
    profileImages:{ required:true},
},{
    timestamps:true,
    versionKey:false,
}
);

module.exports= mongoose.model("users",userSchema);