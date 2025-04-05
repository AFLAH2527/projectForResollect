import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [publishedDate, setPublishedDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [authorsResponse, categoriesResponse] = await Promise.all([
          axios.get("https://library-frontend-7y6j.onrender.com/api/authors/"),
          axios.get("https://library-frontend-7y6j.onrender.com/api/categories/")
        ]);
        
        setAuthors(authorsResponse.data);
        setCategories(categoriesResponse.data);
        setError("");
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load authors and categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://library-frontend-7y6j.onrender.com/api/books/", {
        title,
        author,
        category,
        published_date: publishedDate,
        available,
      });
      navigate("/"); // Redirect to home after adding
    } catch (error) {
      console.error("Error adding book:", error);
      setError("Failed to add book. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="text-center">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <h2 className="text-center">Add New Book</h2>
      
      {error && <div className="message error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Book Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <select 
            id="author" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)}
            required
          >
            <option value="">-- Select Author --</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select 
            id="category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="publishedDate">Published Date</label>
          <input
            id="publishedDate"
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            required
          />
        </div>

        <div className="checkbox-container">
          <input
            id="available"
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
          <label htmlFor="available">Available</label>
        </div>

        <div className="button-group">
          <button type="submit" className="success">Add Book</button>
          <Link to="/">
            <button type="button" className="secondary">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddBook;