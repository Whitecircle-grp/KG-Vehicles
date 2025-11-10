const Phone = require("../models/PhoneList");

// GET all phones
exports.getPhones = async (req, res) => {
  try {
    const phones = await Phone.find({ addedBy: req.user.id });
    res.json(phones);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching phones." });
  }
};

exports.addPhone = async (req, res) => {
  try {
    // const existingPhones = await Phone.find({ createdBy: req.user.id });
    // if (existingPhones && existingPhones.length >= 3) {
    //   return res.status(400).json({ message: "You can only add up to 3 phone numbers." });
    // }
    
    const newPhone = new Phone({
          phone: req.body.phone,
          addedBy: req.user.id,
        });
        await newPhone.save();
    res.status(201).json(newPhone);
  } catch (err) {
    res.status(500).json({ message: "Error adding phone number." });
  }
};

// UPDATE a specific phone
exports.updatePhone = async (req, res) => {
  try {
    const phone = await Phone.findOneAndUpdate(
      { _id: req.params.id, addedBy: req.user.id },
      { phone: req.body.phone },
      { new: true }
    );

    if (!phone) {
      return res.status(404).json({ message: "Phone not found or unauthorized." });
    }

    res.json(phone);
  } catch (err) {
    res.status(500).json({ message: "Error updating phone number." });
  }
};

// DELETE a phone
exports.deletePhone = async (req, res) => {
  try {
    const deleted = await Phone.findOneAndDelete({
      _id: req.params.id,
      addedBy: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Phone not found or unauthorized." });
    }

    res.json({ message: "Phone number deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error deleting phone number." });
  }
};
