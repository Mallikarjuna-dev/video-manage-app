import React, { useEffect, useState } from "react";
import API from "../utils/api";
import VideoUpload from "../components/Videos/VideoUpload";
import VideoList from "../components/Videos/VideoList";
import Navbar from "../components/Navbar";

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
        <div className="pb-4">
            <Navbar />
            <div className="p-6">
                <h1 className="text-2xl font-semibold">Manage your videos efficiently and easily!</h1>
            </div>
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
