import React, { useState } from "react";
import { createBook } from "../../services/api";

const BookForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    availableCopies: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await createBook(book);

      setSuccess(true);
      setBook({
        title: "",
        author: "",
        isbn: "",
        availableCopies: 1,
      });
    } catch (err) {
      setError("Failed to add book. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Add New Book</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      {success && (
        <div style={{ color: "green", marginBottom: "10px" }}>
          Book added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>ISBN:</label>
          <input
            type="text"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Available Copies:</label>
          <input
            type="number"
            name="availableCopies"
            value={book.availableCopies}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
