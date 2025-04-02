import axios from "axios";

const DeleteBook = ({ id, fetchBooks }) => {
  const handleDelete = async () => {
    await axios.delete(`http://127.0.0.1:8000/api/books/${id}/`);
    fetchBooks();
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteBook;
