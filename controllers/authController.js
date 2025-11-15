const User = require("../models/User")
const EmailList = require("../models/EmailList");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const brevo = require("@getbrevo/brevo");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })

    if (userExists)
      return res.status(400).json({ message: "User already exists" })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isApproved: false
    })

    await EmailList.create({
      email: user.email,
      addedBy: user._id
    });

    res.status(201).json({ message: "User registered successfully! Waiting for admin approval." })
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" })

    if (!user.isApproved) {
      return res.status(403).json({ message: "Your account is awaiting admin approval." });
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" })

    // Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    })

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    })
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message })
  }
}


// Forgot pass

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // --- Brevo API client ---
    const client = new brevo.TransactionalEmailsApi();
    client.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const emailData = {
      sender: {
        name: "AutoTrack Support",
        email: process.env.SENDER_EMAIL,
      },
      to: [{ email }],
      subject: "AutoTrack - Password Reset Request",
      htmlContent: `
        <div style="font-family:Arial, sans-serif; background:#f7f7f7; padding:20px;">
        <div style="max-width:500px; margin:auto; background:white; border-radius:10px; padding:25px; border:1px solid #eee;">
            
            <h2 style="color:#4b18ef; text-align:center;">🔒 Password Reset Request</h2>
            <p>Hello,</p>
            <p>We received a password reset request for your AutoTrack account.</p>

            <div style="text-align:center; margin:25px 0;">
            <a href="${resetLink}" style="background:#4b18ef; color:white; padding:12px 25px; text-decoration:none; border-radius:6px;">
                Reset Password
            </a>
            </div>

            <p>This link is valid for 15 minutes.</p>
        </div>
        </div>`
    };

    await client.sendTransacEmail(emailData);

    res.json({ message: "Reset email sent" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error", error: err.message });
  }
};



//reset pass

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user)
      return res.status(400).json({ message: "Token invalid or expired" });

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Reset failed", error: err.message });
  }
};
