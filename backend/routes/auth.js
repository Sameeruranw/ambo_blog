const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//register
router.post("/register",async(req,res,next)=>{
    try{
        const {username,email,password} = req.body;
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hashSync(password,salt)
        const newUser = new User({username,email,password:hashedPassword})
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    }catch(err){
        res.status(500).json(err)
    }

})


//login
router.post("/login",async(req,res,next)=>{
    try{
       const user =  await User.findOne({email:req.body.email})
       if(!user){
            return res.status(404).json("user not found")
       }
       const match =await bycrypt.compare(req.body.password,user.password)
       if(!match){
        return res.status(401).json("wrong credentials")
       }
       const token = jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"3d"}  )
       const {password,...info} = user._doc
       res.cookie("token",token).status(200).json(info)
       
    }catch(err){
        return res.status(500).json(err)
    }
})

//logout
router.get("/logout",async(req,res,next)=>{
    try{
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("user logged out successfully")
    }catch(err){
        res.status(500).json(err)
    }
})
//refetch user after refreshing user doesn't automatically logout 

router.get("/refetch", (req, res) => {
    const token = req.cookies.token;
    const secret = process.env.SECRET; // Retrieve the secret key from environment variables

    jwt.verify(token, secret, async (err, data) => {
        if (err) {
            return res.status(404).json(err);
        }
        res.status(200).json(data);
    });
});

module.exports=router