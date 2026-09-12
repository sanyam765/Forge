const getUserById = require("../services/user.service")
 const getUser = (req , res)=>{
    const user = getUserById(req.params.id)
    res.json(user)
}

module.exports = getUser