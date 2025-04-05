import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`https://library-frontend-7y6j.onrender.com/api/books/${id}/`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="delete-confirmation">
        <h2>Are you sure you want to delete this book?</h2>
        <div className="button-group">
          <button className="danger" onClick={handleDelete}>Yes, Delete</button>
          <button className="secondary" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
