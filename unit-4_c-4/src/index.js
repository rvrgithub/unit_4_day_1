const express = require("express");
const app = express();
app.use(express.json());

const userContorllers = require("./controllers/user.controllers");
app.use("/user",userContorllers);


const todoContorllers = require("./controllers/todo.controllers");
app.use("/todo",todoContorllers);
const {register, login} = require("./controllers/auth.controllers");

app.post("/register",register);
app.get("/register",register);
app.post("/login",login);
module.exports = app;