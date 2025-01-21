const Video = require("../models/Video");
const fs = require("fs");
const path = require("path");

// Upload video
const Upload = async (req, res) => {
    const { title, description, tags } = req.body;
    const videoFile = req.file;

    // Check if a file is uploaded
    if (!videoFile) {
        return res.status(400).json({ message: "No video file uploaded" });
    }

    try {
        const video = new Video({
            userId: req.userId,
            title,
            description,
            tags: tags ? tags.split(",") : [],
            videoUrl: `/uploads/videos/${req.file.filename}`, // Save the file path
        });
        await video.save();

        res.status(201).json({
            message: "Video uploaded successfully", video: {
                ...video._doc,
                videoUrl: `http://localhost:5000/uploads/${videoFile.filename}`, // Include the full URL
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error uploading video" });
    }
};

// Get videos with pagination
const getVideos = async (req, res) => {
    const { page = 1, limit = 10, title, tags } = req.query;

    try {
        const query = { userId: req.userId };
        if (title) query.title = { $regex: title, $options: "i" };
        if (tags) query.tags = { $in: tags.split(",") };

        const videos = await Video.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ message: "Error fetching videos" });
    }
};

module.exports = { Upload, getVideos };
