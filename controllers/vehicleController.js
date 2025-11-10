const Vehicle = require("../models/Vehicle");

//User: Get all their vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    let vehicles;

    // if (req.user.role === 'admin') {
    //   vehicles = await Vehicle.find().populate('createdBy', 'name email');
    // } else {
    //   vehicles = await Vehicle.find({ createdBy: req.user.id }).populate('createdBy', 'name email');
    // }
    vehicles = await Vehicle.find({}).populate('createdBy', 'name email');

    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vehicles', error: err.message });
  }
};

//User: Get vehicle by id 
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch vehicle", error: err.message });
  }
};

//Admin: Add a new vehicle
exports.addVehicle = async (req, res) => {
  try {
    const { createdBy, ...vehicleData } = req.body;

    if (!createdBy) {
      return res.status(400).json({ message: "Target user ID (createdBy) is required" });
    }

    const vehicle = await Vehicle.create({ ...vehicleData, createdBy, oldVehicle: req.body.oldVehicle || false });
    res.status(201).json({ message: "Vehicle added", vehicle });
  } catch (err) {
    res.status(500).json({ message: "Failed to add vehicle", error: err.message });
  }
};


//Admin: Update any vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle updated", vehicle: updatedVehicle });
  } catch (err) {
    res.status(500).json({ message: "Failed to update vehicle", error: err.message });
  }
};

//Admin: Delete any vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete vehicle", error: err.message });
  }
};
