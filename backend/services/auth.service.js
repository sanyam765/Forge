const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const registerUser =  async (name, email, password) => {
  
   const existingUser = await User.findOne({ email });
   if(existingUser){
      throw new Error("User Already registered")
   }
    const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
   name,
   email,
   password:hashedPassword
  })

 return user;
}

module.exports = registerUser;