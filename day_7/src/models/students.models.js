
const mongoose =  require("mongoose");
const studentSchema = new mongoose.Schema({
    roll_id:{type:Number, required:true},
    current_batch:{type:String, required:true},
    // createdAt:{type:String, required:true}, 
    // updatedAt:{type:String, required:true},
   userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"users",
required:true,
   }
},
    {
        versionKey:false,
    timestamps:true},

);
module.exports  = mongoose.model("students",studentSchema );