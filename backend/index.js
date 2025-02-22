const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const connectDB = require('./config/db');
const authRoutes = require("./routes/auth");
const videoRoutes = require("./routes/video");

connectDB();
dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", authRoutes);
app.use("/api", videoRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));