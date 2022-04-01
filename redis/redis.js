const {createClient}  =require("redis");
//clinet.on meaning:- any time coonect to get erreroro then it shor the error and then it explore ther client 
const client =createClient({url:""});
// wjen client not able to connet to redis ot throw an event =>"error"
 clinet.on("error",function(err){
console.log("message",message)
 })