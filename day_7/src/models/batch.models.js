
const mongoose =  require("mongoose");
const batchSchema = new mongoose.Schema({
    batch_name:{type:String, required:true},
    // createdAt:{type:String, required:true}, 
    // updatedAt:{type:String, required:true},
   userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"users",
required:true,
   },
   studentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"students",
    required:true,
       }
},
    {
        versionKey:false,
    timestamps:true},

);
module.exports   = mongoose.model("batchs ",batchSchema );