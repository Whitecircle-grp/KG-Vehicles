const express = require("express");
const router = express.Router();
const { getAllUsers, getPendingUsers, approveUser, approveAllUsers, suspendUser, deleteUser} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");

router.get("/users", authMiddleware, adminOnly, getAllUsers);
router.get("/pending-users", authMiddleware, adminOnly, getPendingUsers);
router.put("/approve/:id", authMiddleware, adminOnly, approveUser);
router.put("/approve-all", authMiddleware, adminOnly, approveAllUsers);
router.put("/suspend/:id", authMiddleware, adminOnly, suspendUser);
router.delete("/delete/:id", authMiddleware, adminOnly, deleteUser);


module.exports = router;
