const express = require("express")
const userRoute = require("./routes/user.routes");

const app = express()

const PORT = 5000
app.use(express.json());
app.get("/" , (req , res)=>{
    res.send("Forger Server is Running")
})

app.use("/api/users" ,userRoute)
app.get("/api/projects" , (req , res)=>{
     res.json({
    skill: req.query.skill
});
})
app.post("/api/test" , (req , res)=>{
    res.json(
       req.body
    )
})

app.listen(PORT , ()=>{
    console.log("Forge server running on port 5000");
    
})
