// const express = require(express);
const connect = require("./conifgs/db");
const app = require("./index");
 app.listen(5400 , async()=>{
    try{
     await connect();
        console.log("listning at port 5400");
    }
    catch(err){
        console.log(err);
    }
 })