import React from "react";

const VideoCard = ({ video }) => {
    return (
        <div className="bg-white shadow-md rounded p-4">
            <video
                className="w-full mb-2"
                controls
                src={video.videoUrl}
            />
            <h3 className="text-lg font-bold">{video.title}</h3>
            <p className="text-gray-600">{video.description}</p>
            <p className="text-sm text-gray-400">
                Uploaded on {new Date(video.createdAt).toLocaleDateString()}
            </p>
        </div>
    );
};

export default VideoCard;
