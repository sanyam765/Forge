const getUser =  require("../controllers/user.controller")
const express = require("express");
const router = express.Router()
const app = express()

router.get("/:id" , getUser)

module.exports = router;