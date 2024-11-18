import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

export default function BookFormAdd({ setBooks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const onHandleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (title.trim() === "" || description.trim() === "" || cover.trim() === "") {
        setError("Fill in all the blanks!");
        return;
      }
      const response = await axiosInstance.post("/books", {
        title,
        description,
        cover,
      });
      if (response.status === 201) {
        setBooks((prev) => [...prev, response.data.book]);
        setTitle("");
        setDescription("");
        setCover("");
        navigate('/my-books')
        return;
      }
    } catch (error) {
      console.log(error);
      setError("Authoriztand add it!");
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={onHandleSubmit} className="add-form">
        <input
          type="text"
          placeholder="Enter a title"
          maxLength={30}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="add-form__input"
        />
        <input
          type="text"
          placeholder="Enter a description"
          maxLength={120}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="add-form__input"
        />
        <input
          type="url"
          placeholder="Enter a link to the cover"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
          className="add-form__input"
        />
        <button type="submit">Add book</button>
      </form>
    </div>
  );
}


