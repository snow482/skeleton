import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance, { setAccessToken } from "../../services/axiosInstance";
import Layout from "../Layout";
import Registration from '../auth/Registration'
import Authorization from '../auth/Authorization'
import BookFormAdd from '../book/BookFormAdd'
import BooksPage from '../book/BooksPage'
import MyBooks from '../book/MyBooks'
import "./App.css";

export function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  const checkUserStatus = async () => {
    try {
      const response = await axiosInstance.get("/auth/refresh");
      if (response.status === 200) {
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
      }
    } catch ({ response }) {
      return response.data.message;
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout user={user} setUser={setUser} />,
      children: [
        {
          path:"/",
          element: <BooksPage user={user} />,
        },
        {
          path:"/registration",
          element: <Registration setUser={setUser} />,
        },
        {
          path:"/authorization",
          element: <Authorization setUser={ setUser } />,
        },
        {
          path:"/my-books",
          element: <MyBooks user={user} books={books} setBooks={setBooks}/>,
        },
        {
          path:"/add-books",
          element: <BookFormAdd user={user} setBooks={setBooks} />,
        },
      ]
    }
  ])
  return <RouterProvider router={router} />;
}
  

