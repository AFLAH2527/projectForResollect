import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://127.0.0.1:8000/api/auth/";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login/`, { username, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
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
  return jwtDecode(token);
};
