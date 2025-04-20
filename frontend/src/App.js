import React, { useState } from "react";
import Navbar from "./components/Layout/Navbar";
import BookList from "./components/Books/BookList";
import BookForm from "./components/Books/BookForm";
import BorrowList from "./components/Borrows/BorrowList";

function App() {
  const [view, setView] = useState("books");

  const renderContent = () => {
    switch (view) {
      case "books":
        return <BookList />;
      case "addBook":
        return <BookForm />;
      case "borrows":
        return <BorrowList />;
      default:
        return <BookList />;
    }
  };

  return (
    <div>
      <Navbar setView={setView} />
      <div className="container" style={{ marginTop: "20px" }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
