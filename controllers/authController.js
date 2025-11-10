const User = require("../models/User")
const EmailList = require("../models/EmailList");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const nodemailer = require("nodemailer");

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
        _id:user._id,
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
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"AutoTrack Support" <${process.env.EMAIL}>`,
      to: email,
      subject: "AutoTrack - Password Reset Request",
      html: `
        <div style="font-family:Arial, sans-serif; background:#f7f7f7; padding:20px;">
        <div style="max-width:500px; margin:auto; background:white; border-radius:10px; padding:25px; border:1px solid #eee;">
            
            <h2 style="color:#4b18ef; text-align:center;">🔒 Password Reset Request</h2>
            
            <p>Hello,</p>
            <p>We received a request to reset your password for your <strong>AutoTrack</strong> account.</p>
            
            <p style="margin:20px 0;">
            Click the button below to reset your password:
            </p>

            <div style="text-align:center; margin:25px 0;">
            <a href="${resetLink}"
                style="background:#4b18ef; color:white; padding:12px 25px; text-decoration:none; border-radius:6px; display:inline-block;">
                Reset Password
            </a>
            </div>

            <p>This link will remain valid for <strong>15 minutes</strong>. If it expires, you will need to request a new reset link.</p>

            <p>If you did not make this request, you can safely ignore this email.</p>

            <hr style="margin:25px 0; border:none; border-top:1px solid #eee;">
            <p style="font-size:13px; color:#777; text-align:center;">
            This is an automated message, please do not reply.
            </p>
        </div>
        </div>
    `
    });
    res.json({ message: "Reset email sent" });
  } catch (err) {
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
