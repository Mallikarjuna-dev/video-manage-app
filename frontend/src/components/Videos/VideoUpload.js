import React, { useState } from "react";
import API from "../../utils/api";

const VideoUpload = ({ onUpload }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleUpload = async () => {
        try {
            await API.post("/videos", { title, description, videoUrl: "https://example.com/video.mp4" });
            onUpload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 mr-2"
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 mr-2"
            />
            <button
                onClick={handleUpload}
                className="bg-green-500 text-white py-2 px-4 rounded"
            >
                Upload
            </button>
        </div>
    );
};

export default VideoUpload;
