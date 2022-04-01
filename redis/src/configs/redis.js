const {createClient} =require("redis");
// / when client not able to connect to redis it throw an event "error"
const  client =createClient({url:"redis://localhost:6379"});
client.on("error" ,function(err){
    console.error({message:err.message});
});
module.exports= client;