import React, { useState, useEffect } from "react";
import { fetchBorrows, returnBook } from "../../services/api";

const BorrowList = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBorrows();
  }, []);

  const loadBorrows = async () => {
    try {
      setLoading(true);
      const data = await fetchBorrows();
      setBorrows(data);
      setError(null);
    } catch (err) {
      setError("Failed to load borrowing records. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (borrowId) => {
    try {
      await returnBook(borrowId);
      // Update the local state
      setBorrows(
        borrows.map((borrow) =>
          borrow.id === borrowId ? { ...borrow, returned: true } : borrow
        )
      );
      alert("Book returned successfully!");
    } catch (err) {
      setError("Failed to return book. Please try again.");
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) return <div>Loading borrowing records...</div>;

  return (
    <div>
      <h2>Borrowing Records</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Book</th>
            <th>Student</th>
            <th>Borrow Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {borrows.length > 0 ? (
            borrows.map((borrow) => (
              <tr key={borrow.id}>
                <td>{borrow.id}</td>
                <td>{borrow.book ? borrow.book.title : "Unknown"}</td>
                <td>{borrow.student ? borrow.student.name : "Unknown"}</td>
                <td>{formatDate(borrow.borrowDate)}</td>
                <td>{formatDate(borrow.dueDate)}</td>
                <td>{borrow.returned ? "Returned" : "Borrowed"}</td>
                <td>
                  {!borrow.returned && (
                    <button
                      className="btn btn-success"
                      onClick={() => handleReturn(borrow.id)}
                    >
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No borrowing records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowList;
