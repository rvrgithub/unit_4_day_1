
const app =require("./index");
const connectDB = require("./configs/db");

app.listen(4400, async()=>{
    try{
        await connectDB();
    }
    catch(err){
        console.log("err",err);
    }
    console.log("listening on port 4400")
})
