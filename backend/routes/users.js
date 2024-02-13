const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const verifyToken = require("../VerifyToken");
const router = express.Router();
//update
router.put("/:id",verifyToken, async(req,res)=>{
    try{
            if(req.body.password){
                const salt= await bcrypt.genSalt(10)
                req.body.password= await bcrypt.hashSync(req.body.password,salt)
            }
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//delete
router.delete("/:id",verifyToken,async(req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        await Comment.deleteMany({userId:req.params.id})
        res.status(200).json("user has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})


//Get User
router.get("/:id",async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id)
        //not showing password by get method res didnt get password or will not show password 
        const {password,...info} = user._doc 
        res.status(200).json(info)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports=router