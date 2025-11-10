const express = require("express");
const router = express.Router();
const {getAllVehicles, addVehicle, getVehicleById, updateVehicle, deleteVehicle} = require("../controllers/vehicleController");
const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");
const validate = require("../middleware/validate");
const { vehicleValidation } = require("../validators/vehicleValidator");

router.get("/", auth, getAllVehicles);
router.post("/", auth, adminOnly, validate(vehicleValidation), addVehicle);
router.get("/:id", auth, getVehicleById);
router.put("/:id", auth, adminOnly, validate(vehicleValidation), updateVehicle);
router.delete("/:id", auth, adminOnly, deleteVehicle);

module.exports = router;