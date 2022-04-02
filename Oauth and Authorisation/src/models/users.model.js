const mongoose =require("mongoose");
const bcrypt = require("bcrypt")
const usersSchema =new mongoose.Schema({
    name :{type:String, required:false},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:[{type:String}]

},

{
    versionKey:false,
    timestamps:true
})
// there only plain function work not async

usersSchema.pre("save",function (next){
    console.log(this.password);
    // let hashedPassword = this.password+"new";
    // this.password =hashedPassword
    const hash = bcrypt.hashSync(this.password,8);
    this.password = hash;
    return next();
})

usersSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

module.exports = mongoose.model("users",usersSchema);