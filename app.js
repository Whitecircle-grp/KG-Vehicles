const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const sendExpiryReminders = require("./utils/sendExpiryReminders");

const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const emailRoutes = require("./routes/emailRoutes");
const adminRoutes = require("./routes/adminRoutes");
const phoneRoutes = require("./routes/phoneRoutes");
const notifyRoutes = require("./routes/notifyRoutes");

//  CORS config
app.use(
  cors({
    origin: [
      "https://auto-track-client.onrender.com",
      "https://cron-job.org",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ API routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/emails", emailRoutes);
app.use("/api/phones", phoneRoutes);
app.use("/send-reminder", notifyRoutes);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

require("./cron/checkExpiry");

const clientDistPath = path.join(__dirname, "client", "dist");

app.use(express.static(clientDistPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
