const Video = require("../models/Video");

// Upload video
const Upload = async (req, res) => {
    const { title, description, tags } = req.body;

    try {
        const video = new Video({
            userId: req.userId,
            title,
            description,
            tags,
        });
        await video.save();
        res.status(201).json({ message: "Video uploaded successfully", video });
    } catch (err) {
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
