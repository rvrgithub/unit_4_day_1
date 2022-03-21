
const express = require("express");
const connect = require("./configs/db");
const app =express();
app.use(express.json());
const publicControllers = require("./controllers/publication.controllers");
const userControllers = require("./controllers/users.controllers");
const bookControllers = require("./controllers/books.controllers");
app.use("/users",userControllers);
app.use("/books",bookControllers);
app.use("/public",publicControllers);
app.listen(3000, async()=>{
    try{
        await connect();
        console.log("lesting on port 3000");
    }
    catch(err){
        console.log(err.mseeage);
       }
})