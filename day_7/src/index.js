const express = require("express");

const mongoose =  require("mongoose");

const app = express();
app.use(express.json());

module.exports =app;

const User = require("./models/users.models")
const Student = require("./models/students.models")
const Batch = require("./models/batch.models")

const usercontrollers =  require("./controllers/user.controllers")
const studentcontrollers =  require("./controllers/student.controllers")
const batchcontrollers =  require("./controllers/batch.controllers")

app.use("/user",usercontrollers);
app.use("/students",studentcontrollers);
app.use("/batchs", batchcontrollers);


// app.listen(4400, async()=>{
//     try{
//         await connectDB();
//     }
//     catch(err){
//         console.log("err",err);
//     }
//     console.log("listening on port 4400")
// })
