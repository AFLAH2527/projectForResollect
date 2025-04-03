import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import DeleteBook from "./pages/DeleteBook";
import Members from "./pages/Members";
import TransactionList from "./components/TransactionList";
import BookLandingPage from "./pages/Home"; // ✅ Landing page with filtering & bucketing

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 🔹 Landing Page (Displays books with filtering & bucketing) */}
          <Route path="/" element={<BookLandingPage />} />

          {/* 🔹 Authentication Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔹 Books CRUD */}
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/books/update/:id" element={<UpdateBook />} />
          <Route path="/books/delete/:id" element={<DeleteBook />} />

          {/* 🔹 Other Pages */}
          <Route path="/members" element={<Members />} />
          <Route path="/transactions" element={<TransactionList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
