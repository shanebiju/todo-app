const user=require('../models/user')
const jwt=require('jsonwebtoken')

const createToken=(_id)=>{
    return jwt.sign({_id},process.env.JSONWEBTOKEN_SECRET,{expiresIn:'3d'})
}
const loginUser=async(req,res)=>{
    const {email,password}=req.body
    try {
        const newUser=await user.login(email,password)
        const token=createToken(newUser._id)
        res.status(200).json({success:true,data:{email,token}})
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}

const signupUser=async(req,res)=>{
    const {email,password}=req.body
    try {
        const newUser=await user.signup(email,password)
        const token=createToken(newUser._id)
        res.status(200).json({success:true,data:{email,token}})
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}

module.exports={loginUser,signupUser}