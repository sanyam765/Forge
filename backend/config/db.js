const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.conn);
        console.log("MongoDB connection successful");
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = connectDB;