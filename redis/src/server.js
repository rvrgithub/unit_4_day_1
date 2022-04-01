const app =require("./index");
const connect = require("./configs/db")
app.listen(5000, async()=>{
try{
     await connect();
         console.log("listening at 5000 port")
}
catch(err){
console.log(err)
}
});