import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req , res)=>{
   try{
     const {email ,password} = req.body;
     if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Email and password are required"
        })
     }

     const normalizedEmail = email.toLowerCase().trim();

     const user = await User.findOne({email:normalizedEmail})
     

     if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
     }

     const isMatch = await bcrypt.compare(password , user.password);

     if(!isMatch){
        return res.status(401).json({
            success:false,
            message:"Invalid Credentials"
        })
     }

      const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
        success:true,
        message:"Login successfull", 
        token,
          user: {
        id: user._id,
        name: user.name,
        email: user.email,
        skills: user.skills,
        github: user.github,
        availability: user.availability,
        reputation: user.reputation,
      },
    });


   }catch(error){
    console.log("Login Error");

    return res.status(500).json({
        success:false,
        message:"Internal server error"
    });
    
   };
};