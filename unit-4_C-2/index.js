const express = require("express");
const mongoose =require("mongoose");
 const app = express();

 app.use(express.json());

 const connectDB = ()=>{
     return mongoose.connect(" mongodb://127.0.0.1:27017/acount");
 }
const userSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    middleName:{type:String ,required:false},
    lastName :{type:String, required:true},
    age:{type:String, required:true},
    email:{type:String, required:true},
    gender:{type:String, required:true},
    address:{type:String, required:false},
    type:{type:String, required:false},
    createdAt:{type:String, required:true},
    updatedAt:{type:String, required:true},
   
},{
    versionkey:false,
    timestamps:true,
}
);


const User =  mongoose.model("user",userSchema);

const BranchDetailSchema = new mongoose.Schema({
name:{type:String, required:true},
    address:{type:String, required:false},
    type:{type:String, required:false},
    IFSC :{type:String, required:false},
    MICR:{type:Number, required:false},
    createdAt:{type:String, required:true},
    updatedAt:{type:String, required:true},
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
},
},
{
    versionkey:false,
    timestamps:true,
}
);

const Branch =  mongoose.model("branch",BranchDetailSchema);



const MasterAccountSchema =new mongoose.Schema({
    balance:{type:String, required:true},
    createdAt:{type:String, required:true},
    updatedAt:{type:String, required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    branchId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"branch",
        required:true
    },
},

    {
        versionkey:false,
        timestamps:true
    },
)

const Master =  mongoose.model("master",MasterAccountSchema);

const SavingsAccountSchema =new mongoose.Schema({
    account_number:{type:String,require:true, unique:true},
    balance:{type:String,require:true},
    interestRate:{type:String,require:true},
    createdAt:{type:String,require:true},
    updatedAt:{type:String,require:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    branchId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"branch",
        required:true
    },
},

    {
        versionkey:false,
        timestamps:true
    },
)

const Saving =  mongoose.model("saving",SavingsAccountSchema);



const FixedAccountSchema = new mongoose.Schema({
    account_number:{type:String,require:true, unique:true},
    balance:{type:String,require:true},
    interestRate:{type:String,require:true},
    createdAt:{type:String,require:true},
    updatedAt:{type:String,require:true},
    maturityDate:{type:String,require:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    branchId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"branch",
        required:true
    },
    savingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"saving",
        required:true
    },
},

    {
        versionkey:false,
        timestamps:true
    },
)

const Fixed =  mongoose.model("fixed",FixedAccountSchema);

// user data only...

app.get("/users" , async(res,req) =>{
    try{
        const user =   await User.find().lean().exec();
    return  res.status(201).send({user:user})
    }
    catch(err){
        return res.status(500).send({massege:"someting wrong"})
    }
});


app.post("/users" , async(res,req) =>{
    try{
        const user =   await User.create(req,body).lean().exec();
    return  res.status(201).send({user:user})
    }
    catch(err){
        return res.status(500).send({massege:err.massege})
    }
});


app.patch("/users/:Id" ,async(req,res)=>{
    try{
        const user =   await User.findByIdAndUpdate(req.params.Id,req.body,{
            new:true,
        }).lean().exec();
    return  res.status(201).send({user:user})
    }
    catch(err){
        return res.status(500).send({massege:err.massege})
    }
})
app.delete("/users/:Id" ,async(req,res)=>{
    try{
        const user =   await User.findByIdAndUpdate(req.params.Id,req.body,{
            new:true,
        }).lean().exec();
    return  res.status(201).send({user:user})
    }
    catch(err){
        return res.status(500).send({massege:err.massege})
    }
})




// user branch only...

app.get("/branch" , async(res,req) =>{
    try{
        const branch =   await Branch.find().lean().exec();
    return  res.status(201).send({ubranchser:branch})
    }
    catch(err){
        return res.status(500).send({massege:"someting wrong"})
    }
});


app.post("/branch" , async(res,req) =>{
    try{
        const branch =   await Branch.create(req,body).lean().exec();
        return  res.status(201).send({branch:branch})
    }
    catch(err){
        return res.status(500).send({massege:err.massege})
    }
});


app.patch("/branch/:Id" ,async(req,res)=>{
    try{
        const branch =   await Branch.findByIdAndUpdate(req.params.Id,req.body,{
            new:true,
        }).lean().exec();
    return  res.status(201).send({branch:branch})
    }
    catch(err){
        return res.status(500).send({massege:err.massege})
    }
})
















app.listen(5000, async (req,res) => {
    try {
      await connectDB();
    }
     catch (err) {
      console.log("err", err);
    }
    console.log("listening on 5000");
  });
  