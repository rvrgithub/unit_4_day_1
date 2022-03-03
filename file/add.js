var a =10;
var b =12;

module.exports = function(){
//   var x= console.log(a+b)
    return (a+b);
}

const divide = require("./divide");
function div(){
    console.log(`divide= ${divide()}`);
}

div();