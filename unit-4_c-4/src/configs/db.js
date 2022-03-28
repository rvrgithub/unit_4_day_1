const mongoose= require("mongoose");
 
 module.exports =()=>{
return mongoose.connect("mongodb+srv://soniya:12345@cluster0.ymjbv.mongodb.net/unit-4?retryWrites=true&w=majority");     
 }