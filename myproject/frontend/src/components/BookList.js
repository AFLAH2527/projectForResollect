import React, { useEffect, useState } from "react";
import { getBooks } from "../services/api";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author_name} - {book.available ? "Available" : "Borrowed"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
