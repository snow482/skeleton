import React, { useState } from "react";
import axiosInstance from "../../services/axiosInstance";

export default function BookFormUpdate({ user, book, setBooks }) {
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [cover, setCover] = useState(book.cover);
  const [error, setError] = useState(null);

  const onHandleUpdate = async (event) => {
    event.preventDefault();
    try {
      if (
        title.trim() === "" ||
        description.trim() === "" ||
        cover.trim() === ""
      ) {
        setError("Fill in all the blanks!");
        return;
      }
      const response = await axiosInstance.put(`/books/${book.id}`, {
        title,
        description,
        cover,
      });

      if (response.status === 200) {
        setBooks((prev) =>
          prev.map((el) =>
            el.id === response.data.book.id ? response.data.book : el
          )
        );
        setError(null);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={onHandleUpdate} className="update-form">
        <input type="text" placeholder="Enter a title"
          maxLength={30}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="update-form__input"
        />
        <input type="text" placeholder="Enter a description"
          maxLength={120}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="update-form__input"
        />
        <input type="url" placeholder="Enter a link to the cover"
          value={cover}
          onChange={(event) => setCover(event.target.value)}
          className="update-form__input"
        />

        <button type="submit">Edit book</button>
      </form>
    </div>
  );
}


