const express = require("express");
const app = express();
app.use(express.json())
const user = require("./controllers/user.controllers");
app.use("/user",user)
console.log(user)
module.exports =app;