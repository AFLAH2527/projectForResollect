import axios from "axios";

// Django Backend URL
const API_URL = "http://127.0.0.1:8000/api/";

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}books/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const getMembers = async () => {
  try {
    const response = await axios.get(`${API_URL}members/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    return [];
  }
};

export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}transactions/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};
