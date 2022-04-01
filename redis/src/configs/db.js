const  mongoose =require("mongoose");
module.exports= ()=>{
return mongoose.connect("mongodb+srv://soniya:12345@cluster0.ymjbv.mongodb.net/redis_data?retryWrites=true&w=majority")
} ;


// const app =require("./index");
