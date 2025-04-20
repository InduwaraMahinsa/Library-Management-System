import React, { useState, useEffect } from "react";
import { fetchBooks, deleteBook, borrowBook } from "../../services/api";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [borrowForm, setBorrowForm] = useState({ bookId: "", studentId: "" });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await fetchBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError("Failed to load books. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        setBooks(books.filter((book) => book.id !== id));
      } catch (err) {
        setError("Failed to delete book. Please try again.");
        console.error(err);
      }
    }
  };

  const handleBorrowChange = (e) => {
    setBorrowForm({
      ...borrowForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleBorrow = async (e) => {
    e.preventDefault();
    try {
      await borrowBook(borrowForm.bookId, borrowForm.studentId);
      alert("Book borrowed successfully!");
      setBorrowForm({ bookId: "", studentId: "" });
      loadBooks(); // Refresh book list to update availability
    } catch (err) {
      setError("Failed to borrow book. Please try again.");
      console.error(err);
    }
  };

  if (loading) return <div>Loading books...</div>;

  return (
    <div>
      <h2>Book List</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      <div className="card">
        <h3>Borrow a Book</h3>
        <form onSubmit={handleBorrow}>
          <div className="form-group">
            <label>Book ID:</label>
            <select
              name="bookId"
              value={borrowForm.bookId}
              onChange={handleBorrowChange}
              required
            >
              <option value="">Select a book</option>
              {books
                .filter((book) => book.availableCopies > 0)
                .map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} by {book.author}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label>Student ID:</label>
            <input
              type="text"
              name="studentId"
              value={borrowForm.studentId}
              onChange={handleBorrowChange}
              required
              placeholder="Enter student ID"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Borrow Book
          </button>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Available Copies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.availableCopies}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(book.id)}
                    style={{ marginRight: "5px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
