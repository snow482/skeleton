import React, { useContext, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import BookFormUpdate from "./BookFormUpdate";
import "./Book.css";

export default function BookItem({ user, book, setBooks }) {
  const [edit, setEdit] = useState(false);

  const onHandleEdit = () => {
    setEdit((prev) => !prev);
  };

  const onHandleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/books/${book.id}`);
      if (response.status === 200) {
        setBooks((prev) => prev.filter((el) => el.id !== book.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="book-item">
      <p>Title: {book.title}</p>
      <p className="book-item__description">Description: {book.description}</p>
      <img
        src={`${book.cover}`}
        alt="Book cover"
        className="book-item__image"
      />
      {user?.id === book.user_id ? (
        <button onClick={onHandleDelete}>Delete book</button>
      ) : null}
      {user?.id === book.user_id ? (
        <button
          style={{ background: `${edit ? "grey" : "green"}`, color: "white" }}
          onClick={onHandleEdit}
        >
          {edit ? "close" : "edit"}
        </button>
      ) : null}
      {edit && <BookFormUpdate user={user} book={book} setBooks={setBooks} />}
    </div>
  );
}


