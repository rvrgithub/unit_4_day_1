var a =10;
var b =12;

module.exports =function(){
    // console.log(a-b);
    return (a-b);
    
}


const multiply = require("./multiply");

function mult(){
    console.log(`Multiply= ${multiply()}`)
}

mult();
