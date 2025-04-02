import React, { useEffect, useState } from "react";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBooks();
  }, [search]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/books/?search=${search}`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div>
      <h2>Books</h2>

      {/* 🔹 Search Bar */}
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🔹 Bucketing by Category */}
      {Object.keys(books).map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published Date</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {books[category].map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.published_date}</td>
                  <td>{book.available ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default BookList;

