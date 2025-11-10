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

// ✅ CORS configuration (keep as is)
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
app.use("/send-reminder", notifyRoutes); // temp route

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

require("./cron/checkExpiry");

// ✅ --- Serve React build in production ---
const clientDistPath = path.join(__dirname, "client", "dist");

// Serve static files from React build folder
app.use(express.static(clientDistPath));

// Serve React app for all unknown routes (SPA routing support)
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});
// ✅ --- End of frontend serving setup ---

// ✅ Start server only after MongoDB connects
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
