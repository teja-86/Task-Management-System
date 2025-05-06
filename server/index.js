const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const taskRoutes = require("./routes/tasks");
const notificationRoutes = require("./routes/notifications");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: `${process.env.CORS_ORIGIN}`, credentials: true }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => res.send("Task Manager API running"));

app.listen(PORT, () => console.log("Server running on port 5000"));