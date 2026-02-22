const jwt=require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretkey="secret";
const verifytoken=(req,res,next)=>{
    const authheader=req.headers.authorization;
    if(!authheader){
        res.status(401).send({message:"NO TOKEN PROVIDED"});
    }
    const token=authheader.split(" ")[1];
    
     try{
        const decoded=jwt.verify(token,secretkey);
        req.user=decoded;
        next();
     }
     catch(err){
        res.status(403).send({message:"INVALID TOKEN"})
     }

};
module.exports=verifytoken;