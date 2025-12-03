const express = require('express');
const { userRegister, forgetPassword, verifyOtp, resetPassword } = require('../controller/auth/authController');
const { userLogin } = require('../controller/auth/authController');
const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/forget-password").post(forgetPassword);
router.route("/verify-otp").post(verifyOtp);
router.route("/reset-password").post(resetPassword);

module.exports = router;