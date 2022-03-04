const books =require("express");
const app =books();

app.get("/books" ,function(req,res){
    res.send({
        "book_1": "Java_Scripts",
        "book_2": "Python",
        "book_3": "Monogse",
        "book_4": "Programming",
    });
});
app.listen(5000,()=>{
    console.log("Books are here");
});