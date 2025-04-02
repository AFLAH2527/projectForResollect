import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`);
      setTitle(response.data.title);
      setAuthor(response.data.author);
      setCategory(response.data.category);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/books/${id}/`, {
        title,
        author,
        category,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div>
      <h2>Update Book</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
