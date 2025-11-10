const express = require("express");
const router = express.Router();
const {registerUser, loginUser, forgotPassword, resetPassword} = require("../controllers/authController");
const { registerValidation, loginValidation } = require("../validators/authValidator");
const validate = require("../middleware/validate");

router.post("/signup", validate(registerValidation), registerUser);
router.post("/login", validate(loginValidation), loginUser);

//forgot pass
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;