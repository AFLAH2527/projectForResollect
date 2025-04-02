import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/books/${id}/`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <h2>Are you sure you want to delete this book?</h2>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
};

export default DeleteBook;
