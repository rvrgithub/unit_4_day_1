const express = require("express");

const app = express();

app.use(logger);
// app.use(loogerIn);

app.use(checkPermission);
app.get("/books", function(req, res){
    console.log("books");
return res.send("books");
});

app.get("/author" ,checkPermission("auth"),(req,res)=>{
return res.send("author_name");
});
app.get("/libraries" ,checkPermission("lib"),(req,res)=>{
    return res.send("author_name");
    });

function logger(role){
    return function checkPermission(req, res, next){
      if(role == "auth"){ 
      return next ();
    }
    else if(role =="lib"){
        return next();
    }
    
   return res.send("return value");
}}

app.get("/libraries ", function(req, res){
    // console.log("libraries");
   return res.send("libraries ");
    });
    
    app.get("/author", function(req, res){
        // console.log("author")
    return  res.send("Author");
        });
app.listen(23450 , ()=>{
    console.log("this is book page");
});

