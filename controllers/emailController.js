const EmailList = require("../models/EmailList");

exports.getEmails = async (req, res) => {
  try {
    const emails = await EmailList.find({ addedBy: req.user.id });
    res.json(emails);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch emails", error: err.message });
  }
};

exports.addEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const userId = req.user.id;

    const emailExists = await EmailList.findOne({ email, addedBy: userId });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newEmail = new EmailList({
      email,
      addedBy: req.user.id,
    });
    await newEmail.save();
    res.status(201).json({ message: "Email added", email: newEmail });
  } catch (err) {
    res.status(500).json({ message: "Failed to add email", error: err.message });
  }
};

exports.updateEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const userId = req.user.id;

    const emailItem = await EmailList.findOne({
      _id: req.params.id,
      addedBy: userId,
    });

    if (!emailItem) {
      return res.status(404).json({ message: "Email not found or unauthorized" });
    }

    if (email && email !== emailItem.email) {
      const duplicate = await EmailList.findOne({ email, addedBy: userId });
      if (duplicate) {
        return res.status(400).json({ message: "This email already exists" });
      }
      emailItem.email = email;
    }

    await emailItem.save();
    res.json({ message: "Email updated", email: emailItem });
  } catch (err) {
    res.status(500).json({ message: "Failed to update email", error: err.message });
  }
};


exports.deleteEmail = async (req, res) => {
  try {
    const emailItem = await EmailList.findOneAndDelete({
      _id: req.params.id,
      addedBy: req.user.id,
    });

    if (!emailItem) {
      return res.status(404).json({ message: "Email not found or unauthorized" });
    }

    res.json({ message: "Email deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete email", error: err.message });
  }
};
