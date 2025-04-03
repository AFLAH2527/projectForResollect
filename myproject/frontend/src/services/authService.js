import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://library-frontend-7y6j.onrender.com/api/auth/";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login/`, { username, password });
    
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refresh", response.data.refresh);

    return response.data.user;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}register/`, { username, password });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded JWT:", decoded); // ✅ Debugging: Check what's inside the token
    return decoded.username ? { username: decoded.username } : null;
  } catch (error) {
    console.error("JWT Decode Error:", error);
    return null;
  }
};

