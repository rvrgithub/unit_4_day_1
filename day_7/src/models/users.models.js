const mongoose =  require("mongoose");


const userSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    gender:{type:String, required:true},
    dateOfBirth:{type:String, required:true},
    // createdAt:{type:String, required:true}, 
    // updatedAt:{type:String, required:true}
},
    {
        versionKey:false,

    timestamps:true
},

);

const User = mongoose.model("users",userSchema );
module.exports = User;
