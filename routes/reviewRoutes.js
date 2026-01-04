const express = require('express');
const isAuthenticated = require("../middleware/isAuthenticated")
const { createReview, getProductReview, deleteReview, getMyReviews } = require('../controller/admin/user/review/reviewController');
const router = express.Router();
const catchAsync = require("../services/catchAsync");

router.route("/create-review/:id").post(isAuthenticated,createReview);
router.route("/review/:id").get(catchAsync(getProductReview));
router.route("/review/:id").delete(isAuthenticated,deleteReview);
router.route("/reviews").get(isAuthenticated,getMyReviews);

module.exports = router;