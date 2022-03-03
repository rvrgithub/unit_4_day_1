var a =10;
var b =12;

module.exports =function(){
    return (a*b);
    
}

const subb = require("./subtract");
function sub(){
    console.log(`subtraction= ${subb()}`)
}

sub();