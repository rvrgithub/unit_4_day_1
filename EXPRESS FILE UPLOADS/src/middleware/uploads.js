// const express = require('express')
const path =require("path");
const multer =require("multer");
const req =require("express/lib/request");
 



const storage =multer.diskStorage({
    destination:function (req, file,callback){
        callback(null,path.join(__dirname,"../uploads"));
    },
    filename:function(req,file,callback){
const uniquePrefix =Date.now();
callback(null,uniquePrefix+"-"+file.originalname);
    },
})
const fileFilter =(req,file,callback)=>{
    // This function should call 'callback' with a boolean
    // to indicate if the file should be accepted

    if(file.mimetype ==="image/jpeg" || file.mimetype ==="image/png"){
        callback(null,true)
    }
    else{
   // To reject this file pass `false`, like so:
   callback(new Error("Incorrect mime type"), false);
    }
};




const options ={
    storage : storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:1024* 1024*5,
    },
    
}
const uploads = multer(options);
module.exports = uploads; 


// -- Refactor code ----
// const uploadFiles = (formKey, method) => {
//   return function (req, res, next) {
//     let uploadedItem;
//     if (method == "single") {
//       uploadedItem = uploads.single(formKey);
//     } else if (method == "multiple") {
//       uploadedItem = uploads.any(formKey);
//     }

//     return uploadedItem(req, res, function (err) {
//       if (err instanceof multer.MulterError) {
//         // A Multer error occurred when uploading.
//         return res.status(500).send({ message: err.message });
//       } else if (err) {
//         // An unknown error occurred when uploading.
//         return res.status(501).send({ message: err.message });
//       }
//       // Everything went fine.
//       return next();
//     });
//   };
// };