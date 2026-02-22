const express=require("express");
const verifytoken=require("../middleware/authmiddleware");
const router=express.Router();

router.get("/dashboard",verifytoken,(req,res)=>{
    res.json({message:"welcome to dashboard", user:req.user});

});

module.exports=router;