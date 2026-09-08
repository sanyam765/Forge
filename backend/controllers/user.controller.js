
 const getUser = (req , res)=>{
    res.json({
        userId:req.params.id
    })
}

module.exports = getUser