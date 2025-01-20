const express = require("express");
const auth = require("../middlewares/authMiddleware");
const { Upload, getVideos } = require("../controllers/videoController");

const router = express.Router();

// Upload video
router.post("/videos", auth, Upload);

// Get videos with pagination
router.get("/videos", auth, getVideos);

module.exports = router;
