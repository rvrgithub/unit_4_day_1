const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{
        type:String,required:false
    },
    email :{type:String,required:true},
    pincode:{type:Number,required:true},
    age:{type:Number,required:false},
    gender:{type:String,required:false,enum:["Male", "Female"]
},
},
{
    versionKey:false,
timestamps:true 
});


module.exports = mongoose.model("user",userSchema);