const app = require("./index");
const correct = require("./configs/db");
app.listen(6000, async()=>{
    try{
        await correct();
        console.log("listening at port 6000");
    }
    catch(err){
        console.log(err.message);
    }
})