const express = require("express");
const router = express.Router();
const sendExpiryReminders = require("../utils/sendExpiryReminders");

router.get("/", async (req, res) => {
  try {
    await sendExpiryReminders();
    res.status(200).json({ message: "Reminder sent manually" });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
});

module.exports = router;
