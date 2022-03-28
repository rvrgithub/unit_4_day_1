const app = require("./index.js");
const connect = require("./configs/db");
app.listen(6000, async(req,res)=>{
    try{
await connect();
console.log("using port 6000");
    }
    catch(err){
        return res.status(401).send(err.message);
    }
})
