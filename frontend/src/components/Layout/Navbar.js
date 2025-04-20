import React from "react";

const Navbar = ({ setView }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">Library Management System</div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={() => setView("books")}>
              Books
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={() => setView("addBook")}>
              Add Book
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={() => setView("borrows")}>
              Borrowings
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
