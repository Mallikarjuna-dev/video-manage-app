import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        try {
            // Send a POST request to the /auth/register endpoint
            await API.post("/api/register", formData);
            setSuccess(true);
            // Redirect the user to the login page after successful registration
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            const message =
                err.response?.data?.message || "Something went wrong. Please try again.";
            setError(message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

                {/* Name Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Enter your name"
                        required
                    />
                </div>

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
                        placeholder="Enter a secure password"
                        required
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-500 text-sm mb-4">
                        <p>{error}</p>
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="text-green-500 text-sm mb-4">
                        <p>Registration successful! Redirecting to login...</p>
                    </div>
                )}

                {/* Submit Button */}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Register
                    </button>
                </div>

                {/* Redirect to Login */}
                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Already have an account?{" "}
                        <span
                            className="text-blue-500 hover:underline cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
