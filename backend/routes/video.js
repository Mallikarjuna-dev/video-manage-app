const express = require("express");
const auth = require("../middlewares/authMiddleware");
const { Upload, getVideos } = require("../controllers/videoController");

const router = express.Router();

// Upload video
router.post("/", auth, Upload);

// Get videos with pagination
router.get("/", auth, getVideos);

module.exports = router;
