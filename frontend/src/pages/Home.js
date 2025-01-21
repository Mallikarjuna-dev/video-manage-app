import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="p-6">
                <h1 className="text-3xl font-bold">Welcome to the Video Management App</h1>
            </div>
        </div>
    );
};

export default Home;
