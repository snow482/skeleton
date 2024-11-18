import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import BookItem from "./BookItem";
import "./Book.css";

export default function BooksPage({ user }) {
  const [books, setBooks] = useState([]);

  const getAllBooks = async () => {
    try {
      const response = await axiosInstance.get("/books");
      if (response.status === 200) {
        setBooks(response.data.books);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div>
      <h2>Books</h2>
      <div>
        <div className="books">
          {books &&
            books.map((book) => (
              <BookItem key={book.id} user={user} book={book} setBooks={setBooks} />
            ))}
        </div>
      </div>
    </div>
  );
}



