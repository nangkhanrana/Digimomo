const express = require ('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const catchAsync = require('../services/catchAsync');
const { getMyProfile } = require('../controller/admin/user/profile/profileController');
const router = express.Router();

router.route("/profile").get(isAuthenticated,catchAsync(getMyProfile));

module.exports = router; 