import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance, { setAccessToken } from "../../services/axiosInstance";
import "./Auth.css";

export default function Authorization({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const authSubmitHandle = async (event) => {
    event.preventDefault();
    try {
      if (email && password && email.trim() === '' || password.trim() === '') {
        setError('Please, fill the fields')
        return
      }

      const response = await axiosInstance.post('/auth/authorization', {
        email,
        password
      })
      //console.log(response);

      if (response.status === 200) {
        setEmail('')
        setPassword('')
        setAccessToken(response.data.accessToken);        
        setUser(response.data.user)
        setError(null)
        navigate('/')
        return
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  }

  return (
    <div>
      <h1>Authorization</h1>
      {error && <p>{error}</p>}
      <form onSubmit={ authSubmitHandle } className="registration-form">
        <input
          type="email"
          value={ email }
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="registration-form__input mx-2"
        />
        <input
          type="password"
          value={ password }
          minLength={3}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          className="registration-form__input"
        />
        <div>
        <button type="submit" className="btn btn-primary btn-lg mt-2 mx-2">
          Войти в учетную запись
        </button>
        </div>
    </form>
    </div>
  );
}
