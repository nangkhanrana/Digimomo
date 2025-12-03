const User = require("../../model/userModel");
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JsonWebTokenError } = require("jsonwebtoken");
const sendEmail = require("../../services/sendEmail");


exports.userRegister = async (req, res) => {
  const { email, password, name, phoneNumber } = req.body;
  if (!email || !password || !name || !phoneNumber) {
    return res.status(400).json({
      message: "Please provide all required fields"
    });
  }//else 
  const userFound = await User.find({ userEmail: email });
  if (userFound.length > 0) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  await User.create({
    userEmail: email,
    userPassword: bcrpyt.hashSync(password, 10),
    userName: name,
    userPhoneNumber: phoneNumber,
  });

  res.status(201).json({
    message: "User registered successfully"
  });
}

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password"
    });
  }

  const userFound = await User.find({ userEmail: email });
  if (userFound.length === 0) {
    return res.status(400).json({
      message: "User does not exist"
    });
  }
  //password check
  const isPasswordValid = bcrpyt.compareSync(password, userFound[0].userPassword);
  if (isPasswordValid) {//token generation 
    const token = jwt.sign({ id: userFound[0]._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    return res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } else {
    return res.status(400).json({
      message: "Invalid password"
    });
  }
}

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Validate email
    if (!email) {
      return res.status(400).json({
        message: "Please provide email",
      });
    }

    // 2. Check user existence
    const userExist = await User.find({ userEmail: email });

    if (!userExist) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    // 3. Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    userExist[0].otp = otp;
    await userExist[0].save();
    await sendEmail({
      email: email,
      subject : "Password Reset OTP",
      message : `Your OTP for password reset is ${otp}`,
    });

    return res.status(200).json({
      message: "OTP sent to email",
      otp: otp
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

exports.verifyOtp = async (req,res) => {
  const {email, otp} = req.body;
  if(!email || !otp){
    return res.status(400).json({
      message: "Please provide email and otp"
    }); 
  }

  const userExist = await User.find({userEmail: email});
  if(userExist.length ===0){
    return res.status(400).json({
      message: "Invalid email"
    });
  }
  if(userExist[0].otp!== otp){
    return res.status(400).json({
      message: "Invalid OTP"
    });
  }else userExist[0].otp = undefined;
  userExist[0].isOtpVerified = true;
  await userExist[0].save();
    return res.status(200).json({
      message:"OTP is verified"
    });
}

exports.resetPassword = async (req,res) => {
  const {email,newPassword, confirmPassword} = req.body;
  if(!email || !newPassword || !confirmPassword){
    return res.status(400).json({
      message: "please provide all required fields"
    });
  }

  if (newPassword !== confirmPassword){
    return res.status(400).json({
      message: "Passwords do not match"
    });
  }

  //check if that otp is verified or not 
  const userExist =await User.find({userEmail: email});
  if(userExist.length ===0){
    return res.status(400),json({
      message: "Invalid email"
    });
  }
  if(userExist[0].isOtpVerified !== true){
    return res.status(400).json({
      message: "You cannot perform this action"
    });
  }
  userExist[0].userPassword = bcrpyt.hashSync(newPassword,10);
  userExist[0].isOtpVerified = false;
  await userExist[0].save();
  return res.status(200).json({
    message: "Password reset successful"
  });
}