const API_BASE_URL = "http://localhost:8080/api";

// Book service
export const fetchBooks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const fetchBookById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch book");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    throw error;
  }
};

export const createBook = async (bookData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) {
      throw new Error("Failed to create book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) {
      throw new Error("Failed to update book");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete book");
    }
    return true;
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error);
    throw error;
  }
};

// Borrow service
export const fetchBorrows = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/borrows`);
    if (!response.ok) {
      throw new Error("Failed to fetch borrows");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching borrows:", error);
    throw error;
  }
};

export const fetchStudentBorrows = async (studentId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/borrows/student/${studentId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch student borrows");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching borrows for student ${studentId}:`, error);
    throw error;
  }
};

export const borrowBook = async (bookId, studentId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/borrows/borrow?bookId=${bookId}&studentId=${studentId}`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to borrow book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error borrowing book:", error);
    throw error;
  }
};

export const returnBook = async (borrowId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/borrows/return/${borrowId}`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Failed to return book");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error returning book for borrow ${borrowId}:`, error);
    throw error;
  }
};
