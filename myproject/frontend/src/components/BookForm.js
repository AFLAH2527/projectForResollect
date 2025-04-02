import React, { useState } from "react";
import axios from "axios";

const BookForm = ({ fetchBooks }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    published_date: "",
    available: true,
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:8000/api/books/", book);
    fetchBooks();
    setBook({ title: "", author: "", category: "", published_date: "", available: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" value={book.title} onChange={handleChange} required />
      <input type="text" name="author" placeholder="Author" value={book.author} onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" value={book.category} onChange={handleChange} required />
      <input type="date" name="published_date" value={book.published_date} onChange={handleChange} required />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
