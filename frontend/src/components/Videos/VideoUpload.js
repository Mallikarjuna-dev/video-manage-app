import React, { useState } from "react";
import API from "../../utils/api";

const VideoUpload = ({ onUpload }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Generate a preview URL for the video
        }
    };

    const handleUpload = async () => {
        if (!videoFile) {
            alert("Please upload a video file!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tags", tags);
        formData.append("video", videoFile);

        try {
            await API.post("/api/videos", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            onUpload(); // Notify the parent component to refresh the video list
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Upload a Video</h2>

            {/* Title Input */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Title</label>
                <input
                    type="text"
                    placeholder="Enter video title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </div>

            {/* Description Input */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Description</label>
                <input
                    type="text"
                    placeholder="Enter video description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </div>

            {/* Description Input */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Tags (,)</label>
                <input
                    type="text"
                    placeholder="Enter video tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </div>

            {/* File Upload Input */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Upload Video</label>
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="border p-2 w-full rounded"
                />
            </div>

            {/* Submit Button */}
            <button
                onClick={handleUpload}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Submit
            </button>

            {/* Video Preview */}
            {previewUrl && (
                <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">Preview</h3>
                    <video
                        src={previewUrl}
                        controls
                        className="w-full rounded shadow-md"
                    ></video>
                </div>
            )}
        </div>
    );
};

export default VideoUpload;
