import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import  "./Nav.css";

export default function Nav({ user, setUser }) {
  const navigate = useNavigate();

  const onHandleLogout = async () => {
    try {
      const response = await axiosInstance.delete("/auth/logout");
      if (response.status === 200) {
        setUser(null);
        navigate("/");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav>
        {user?.email && <h1>{`Welcome, ${user.email}`}</h1>}
        <ul className="navbar">
          <li className="navbar">
            <Link to="/">Home</Link>
          </li>
          {!user?.email && (
            <li className="navbar">
              <Link to={"/registration"}>Registration</Link>
            </li>
          )}
          {!user?.email && (
            <li className="navbar">
              <Link to={"/authorization"}>Authorization</Link>
            </li>
          )}
          {user?.email && (
            <li className="navbar">
            <Link to={"/my-books"}>My books</Link>
            </li>
          )}
          {user?.email && (
            <li className="navbar">
              <Link to={"/add-books"}>Add books</Link>
            </li>
          )}
          {user?.email && <button onClick={onHandleLogout}>Log out</button>}
        </ul>
      </nav>
    </div>
  )
}