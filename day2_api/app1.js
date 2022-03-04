const hello = require("express");
const app = hello();


app.get("/hello" ,function(req,res){
    // console.log("hello");
    res.send("hello");
});
app.listen(6000,()=>{
    console.log("Hello .... new appi.")
})