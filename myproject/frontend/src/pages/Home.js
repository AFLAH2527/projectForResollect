import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Library Management System</h1>
      <nav>
        <Link to="/books">Books</Link> | 
        <Link to="/members">Members</Link> | 
        <Link to="/transactions">Transactions</Link>
      </nav>
    </div>
  );
};

export default Home;
