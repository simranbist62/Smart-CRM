import axios from "axios";

const api = axios.create({
  baseURL: "https://crm-backend-eh94.onrender.com",
});

export default api;
