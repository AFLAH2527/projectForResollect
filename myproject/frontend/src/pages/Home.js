import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user, handleLogout } = useContext(AuthContext);
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
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
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
