const express = require("express");

const app =express();
const pro = require("./controllers/product.controllers");

app.use(express.json());



app.use("/product",pro)
module.exports =app;