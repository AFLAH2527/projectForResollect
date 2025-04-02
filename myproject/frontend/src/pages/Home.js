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
      const response = await axios.get("http://127.0.0.1:8000/api/books/", {
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
    <div>
      <h1>Library Management System</h1>
      <nav>
        <Link to="/books">Books</Link> | 
        <Link to="/members">Members</Link> | 
        <Link to="/transactions">Transactions</Link>
      </nav>

      {user ? (
        <>
          <p>Welcome, {user.username || "Guest"}!</p>
          <button onClick={handleLogout}>Logout</button>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Display Books by Category */}
          {Object.keys(bucketedBooks).length > 0 ? (
            Object.keys(bucketedBooks).map((category) => (
              <div key={category}>
                <h2>{category}</h2>
                <table border="1">
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
                          {book.available ? (
                            <span style={{ color: "green" }}>Available</span>
                          ) : (
                            <span style={{ color: "red" }}>Not Available</span>
                          )}
                        </td>
                        <td>
                          <Link to={`/books/update/${book.id}`}>
                            <button>Edit</button>
                          </Link>
                          <Link to={`/books/delete/${book.id}`}>
                            <button>Delete</button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p>No books available.</p>
          )}

          {/* Add Book Button */}
          <Link to="/books/add">
            <button>Add New Book</button>
          </Link>
        </>
      ) : (
        <>
          <p>Please log in or register to access the library.</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
