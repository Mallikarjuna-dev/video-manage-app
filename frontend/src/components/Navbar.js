import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const handleLogout = () => {
        setToken("");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold cursor-pointer">
                            Video Management
                        </h1>
                    </div>

                    {/* Links */}
                    <div className="hidden md:flex space-x-4">
                        <Link
                            to="/"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/dashboard"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Dashboard
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Logout Button */}
                    <div>
                        <button
                            onClick={handleLogout}
                            className="text-gray-300 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            {token ? "Logout" : "Login"}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
