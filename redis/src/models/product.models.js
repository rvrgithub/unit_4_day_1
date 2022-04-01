const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    whenTosells:{type:Date,required:true},
    isDone:{type:Date,required:false,default:false}
},
{
versionKey:false,
timestamps:true
});
module.exports = mongoose.model("product",productSchema);