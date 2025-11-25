const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const User = require("./model/userModel");
const Product = require("./model/productModel");
require("dotenv").config();
const { connectDatabase } = require("./database/database");
connectDatabase();
const cors = require("cors");

const bcrpyt = require("bcryptjs");
const { JsonWebTokenError } = require("jsonwebtoken");
app.use(express.json()); // for JSON body
app.use(express.urlencoded({ extended: true })); // for form data

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);


app.use("", require("./routes/authRoutes")); 
app.use("/api", require("./routes/productRoutes")); 
app.use("", require("./routes/userRoutes")); 
app.use("", require("./routes/reviewRoutes")); 
app.use("", require("./routes/profileRoutes"));
app.use("", require("./routes/cartRoutes"));

const port = Number(process.env.PORT) || 3000;
app.listen(port,"0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/test", (req, res) => {
  res.json({ message: "Backend works!" });
});


module.exports = app;

