
const mongoose = require("mongoose");
const adminSeeder = require("../adminSeeder");

exports.connectDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI
    );
    console.log("MongoDB connected successfully");
    adminSeeder();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};


