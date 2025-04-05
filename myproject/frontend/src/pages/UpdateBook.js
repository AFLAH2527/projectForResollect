import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";


const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [available, setAvailable] = useState(true);

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchBook();
    fetchAuthors();
    fetchCategories();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`https://library-frontend-7y6j.onrender.com/api/books/${id}/`);
      setTitle(response.data.title);
      setAuthor(response.data.author); // Get author ID
      setCategory(response.data.category); // Get category ID
      setPublishedDate(response.data.published_date);
      setAvailable(response.data.available);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("https://library-frontend-7y6j.onrender.com/api/authors/");
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://library-frontend-7y6j.onrender.com/api/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://library-frontend-7y6j.onrender.com/api/books/${id}/`, {
        title,
        author,
        category,
        published_date: publishedDate,
        available,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <h2 className="text-center">Update Book</h2>
      <form onSubmit={handleUpdate}>
        {/* Similar structure to AddBook.js */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <select id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required>
            <option value="">Select Author</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
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

        <div className="checkbox-container mb-3">
          <input
            id="available"
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
          <label htmlFor="available" className="mb-0">Available</label>
        </div>

        <div className="text-center">
          <button type="submit" className="success">Update Book</button>
          <Link to="/">
            <button type="button" className="secondary">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
