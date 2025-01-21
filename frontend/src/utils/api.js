import axios from "axios";

// http://localhost:5000
const API = axios.create({ baseURL: "https://video-manage-app.onrender.com" });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API;
