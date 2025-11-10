const express = require("express");
const router = express.Router();
const {getPhones, addPhone, updatePhone, deletePhone } = require("../controllers/phoneController");
const auth = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { phoneValidation } = require("../validators/phoneValidator");

router.get("/", auth, getPhones);
router.post("/", auth, validate(phoneValidation), addPhone);
router.put("/:id", auth, validate(phoneValidation), updatePhone);
router.delete("/:id", auth, deletePhone);

module.exports = router;