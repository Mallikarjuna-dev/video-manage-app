const express = require("express");
const auth = require("../middlewares/authMiddleware");
const { Upload, getVideos } = require("../controllers/videoController");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/videos"); // Directory to store video files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== ".mp4" && ext !== ".mov" && ext !== ".avi" && ext !== ".mkv") {
            return cb(new Error("Only video files are allowed"));
        }
        cb(null, true);
    },
});

// Upload video
router.post("/videos", auth, upload.single("video"), Upload);

// Get videos with pagination
router.get("/videos", auth, getVideos);

module.exports = router;
