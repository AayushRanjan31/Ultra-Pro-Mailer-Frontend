import axios from "axios";

const BACKEND = (import.meta.env.VITE_BACKEND_URL || "https://ultra-pro-mailer-backend-1sle.onrender.com").replace(/\/+$/, "");

export async function sendBatchToServer(payload) {
    try {
        const resp = await axios.post(`${BACKEND}/send`, payload, {
            timeout: 5 * 60 * 1000,
        });
        return resp.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || "Server error");
        } else if (error.request) {
            throw new Error("Network error: Unable to reach server");
        } else {
            throw new Error(error.message || "Unknown error");
        }
    } 
}
