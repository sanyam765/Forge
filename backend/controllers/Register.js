import User from "../models/user.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req , res) =>{
    try{
    const { name , email , password , skills , github , availability} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
         success:false,
         message:"Name email and password are required",
        });
    }
    
      const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(409).json({
            success:false,
            message:"User already exists"
        })
    }
    const hashedPassword = bcrypt.hash(password , 10);

    const user = await User.create({
        name,
        email:normalizedEmail,
        password:hashedPassword,
        skills:skills || [],
        github:github || "",
        availability:availability ?? true,
        reputation: 0

    })

    const token = jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )


    return res.status(201).json({
        success:true,
        message:"User registered successfully",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            skills:user.skills,
            github:user.github,
            availability: user.availability,
            reputation: user.reputation,


        },

    })

} catch(error){
    console.log("Register error");
    
    return res.status(500).json({
        success:false,
        message : "Internal server error"
    })
}
}

