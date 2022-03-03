var a =10;
var b =12;

module.exports =function(){
    return (a/b);
}

const addition = require("./add");
function add(){
    console.log(`Additon= ${addition()}`);
}
add();