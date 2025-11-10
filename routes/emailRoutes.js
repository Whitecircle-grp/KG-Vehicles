const express = require("express");
const router = express.Router();
const {getEmails, addEmail, updateEmail, deleteEmail } = require("../controllers/emailController");
const auth = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { emailValidation } = require("../validators/emailValidator");

router.get("/", auth, getEmails);
router.post("/", auth, validate(emailValidation), addEmail);
router.put("/:id", auth, validate(emailValidation), updateEmail);
router.delete("/:id", auth, deleteEmail);

module.exports = router;