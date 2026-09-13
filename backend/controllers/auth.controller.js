const registerUser = require("../services/auth.service");
const register = async (req , res )=>{
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);

      res.json({
        user
    });

}

module.exports = register;