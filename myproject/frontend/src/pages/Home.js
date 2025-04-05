import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Home = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (user) {
      fetchBooks();
    }
  }, [user]); 

  const fetchBooks = async () => {
    const token = localStorage.getItem("token"); 

    try {
      const response = await axios.get("https://library-frontend-7y6j.onrender.com/api/books/", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Filter books based on search input
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  // Group books by category
  const bucketedBooks = filteredBooks.reduce((acc, book) => {
    const categoryName = book.category_name || "Unknown"; 
    acc[categoryName] = acc[categoryName] || [];
    acc[categoryName].push(book);
    return acc;
  }, {});

  return (
    <div className="page-wrapper">
      <h1>Library Management System</h1>
      <nav>
        <Link to="/members">Members</Link>
        <Link to="/transactions">Transactions</Link>
      </nav>

      {user ? (
        <>
          <div className="welcome-section">
            <p className="welcome-message">Welcome, {user.username || "Guest"}!</p>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Display Books by Category */}
          {Object.keys(bucketedBooks).length > 0 ? (
            Object.keys(bucketedBooks).map((category) => (
              <div className="category-section" key={category}>
                <h2>{category}</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Published Date</th>
                      <th>Availability</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bucketedBooks[category].map((book) => (
                      <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author_name}</td>
                        <td>{book.published_date}</td>
                        <td>
                          <span className={book.available ? "book-availability available" : "book-availability not-available"}>
                            {book.available ? "Available" : "Not Available"}
                          </span>
                        </td>
                        <td className="action-buttons">
                          <Link to={`/books/update/${book.id}`}>
                            <button className="edit-button">Edit</button>
                          </Link>
                          <Link to={`/books/delete/${book.id}`}>
                            <button className="delete-button">Delete</button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p className="text-center">No books available.</p>
          )}

          {/* Add Book Button */}
          <div className="text-center">
            <Link to="/books/add" className="add-book-button">
              Add New Book
            </Link>
          </div>
        </>
      ) : (
        <div className="auth-container">
          <p className="text-center mb-3">Please log in or register to access the library.</p>
          <div className="flex justify-between">
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
