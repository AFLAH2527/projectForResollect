import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [publishedDate, setPublishedDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
  const [available, setAvailable] = useState(true);

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAuthors();
    fetchCategories();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/authors/");
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/books/", {
        title,
        author,
        category,
        published_date: publishedDate,
        available,
      });
      navigate("/"); // Redirect to home after adding
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Author Dropdown */}
        <select value={author} onChange={(e) => setAuthor(e.target.value)} required>
          <option value="">Select Author</option>
          {authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        {/* Category Dropdown */}
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Published Date */}
        <input
          type="date"
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
          required
        />

        {/* Availability Checkbox (Auto-checked) */}
        <label>
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
          Available
        </label>

        {/* Submit Button */}
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
