const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express")
const userRoute = require("./routes/user.routes");
const authRoute = require("./routes/auth.routes.js")
const logger = require('./middleware/logger.middlware.js')
const connectDB = require('./config/db.js')
const app = express();
connectDB()
const PORT = 5000
app.use(express.json());
app.use(logger)
app.get("/" , (req , res)=>{
    res.send("Forger Server is Running")
})

app.use("/api/users" ,userRoute)
app.use("/api/auth" , authRoute)
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
