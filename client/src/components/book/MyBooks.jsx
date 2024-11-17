import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import BookItem from "./BookItem";

export default function MyBooks({user, books, setBooks}) {
  const getAllBooksByUser = async () => {
    try {
      const response = await axiosInstance.get("/books");
      if (response.status === 200) {
        const userBooks = response.data.books.filter(
          (el) => el.user_id === user.id
        );
        setBooks(userBooks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getAllBooksByUser();
    }
  }, [user]);

  return (
    <div>
      <h1>My books</h1>
      <ul className="books">
        {books &&
          books.map((book) => (
            <BookItem key={book.id} book={book} setBooks={setBooks} user={user}/>
          ))}
      </ul>
    </div>
  );
}


