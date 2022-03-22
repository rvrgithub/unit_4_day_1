
const express =require("express");
const connect = require("./configs/db");
const app =express();
app.use(express.json());
const {register, login} = require("./controllers/auth.controllers");
const usersControllers= require("./controllers/users.controllers");
const productController = require("./controllers/product.controllers")
app.use("/users",usersControllers);
app.use( "/product", productController)
app.post("/register",register);
app.get("/register",register);
app.post("/login",login);
app.listen(5000, async()=> {
    try{
    await connect();
console.log("listening on port 5000")
}
catch(err){
    console.log(err.message)
}
})