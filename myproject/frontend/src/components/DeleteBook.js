import axios from "axios";

const DeleteBook = ({ id, fetchBooks }) => {
  const handleDelete = async () => {
    await axios.delete(`https://library-frontend-7y6j.onrender.com/api/books/${id}/`);
    fetchBooks();
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteBook;
