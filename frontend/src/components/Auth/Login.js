import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true)
        try {
            // Send a POST request to the backend for login
            const response = await API.post("/api/login", formData);
            console.log(response.data)

            // Save the token in localStorage
            localStorage.setItem("token", response.data.token);
            console.log("Redirecting to dashboard...");

            // Navigate to the dashboard or home page
            navigate("/")

            setLoading(false);
            // setTimeout(() => navigate("/dashboard"), 2000);
        } catch (err) {
            const message =
                err.response?.data?.message || "Login failed. Please try again.";
            setError(message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                {/* Email Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Password Field */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-500 text-sm mb-4">
                        <p>{error}</p>
                    </div>
                )}

                {/* Submit Button */}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </div>

                {/* Redirect to Register */}
                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Create account?{" "}
                        <span
                            className="text-blue-500 hover:underline cursor-pointer"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
