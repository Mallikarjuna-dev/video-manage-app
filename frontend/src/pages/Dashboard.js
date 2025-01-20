import React, { useEffect, useState } from "react";
import API from "../utils/api";
import VideoUpload from "../components/Videos/VideoUpload";
import VideoList from "../components/Videos/VideoList";

const Dashboard = () => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchVideos = async () => {
        setIsLoading(true);
        try {
            const { data } = await API.get("/api/videos");
            setVideos(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Your Videos</h1>
            <VideoUpload onUpload={fetchVideos} />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <VideoList videos={videos} />
            )}
        </div>
    );
};

export default Dashboard;
