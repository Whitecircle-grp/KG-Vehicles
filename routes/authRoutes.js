const express = require("express");
const router = express.Router();
const {registerUser, loginUser, forgotPassword, resetPassword} = require("../controllers/authController");
const { registerValidation, loginValidation } = require("../validators/authValidator");
const validate = require("../middleware/validate");
const sendExpiryReminders = require("../utils/sendExpiryReminders");

router.post("/signup", validate(registerValidation), registerUser);
router.post("/login", validate(loginValidation), loginUser);

//forgot pass
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

//cron
router.get("/run-expiry-cron", async (req, res) => {
  if (req.query.key !== process.env.CRON_KEY) {
    return res.status(403).send("Forbidden");
  }

  await sendExpiryReminders();
  res.send("Cron executed");
});

module.exports = router;