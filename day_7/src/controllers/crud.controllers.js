const { model } = require("mongoose");

const post = (model)=> async(req,res)=>{
    try{
        const items  = await model.create(req.body).lean().exec();
        return res.status(201).send(items);
    }
    catch(err){
        return res.status(500).send({massege:err.massege});
    }
};




const deleteOne = (model)=> async(req,res)=>{
    try{
        const items  = await model.findByIdAndDelete(req.params.id).lean().exec();
  
        return res.status(201).send(items);
    }
    catch(err){
        return res.status(500).send({massege:err.massege});
    }
};


module.exports =(model)=>{
    return {
        post: post(model),
        deleteOne :deleteOne(model)
    };
};