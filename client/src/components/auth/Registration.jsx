import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance, { setAccessToken } from "../../../services/axiosInstance";
import "./Auth.css";

export default function Registration({ setUser }) {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ check, setCheck ] = useState('')
  const [ error, setError ] = useState(null)
  const navigate = useNavigate()

  const regSubmitHandle = async (event) => {
    event.preventDefault()
    try {
      if (email.trim() === '' || password.trim() === ''|| check.trim() === '') {
        setError('Please, fill the fields')
        return
      }
      if (password === check) {
        const response = await axiosInstance.post('/auth/registration', {
          email,
          password,
        })
        console.log(response)
        if (response.status === 201) {
          setEmail('')
          setPassword('')
          setAccessToken(response.data.accessToken)
          setUser(response.data.user)
          setError(null)
          navigate('/')
          return
        }
      }
      setError("The passwords don't match")
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  }  

  return (
    <div>
      <h1>Registration</h1>
      {error && <p>{ error }</p>}
      <form onSubmit={regSubmitHandle} className="registration-form">
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
          className="registration-form__input mx-2"
        />
        <input
          type="password"
          value={check}
          minLength={3}
          onChange={(event) => setCheck(event.target.value)}
          placeholder="Repeat your password"
          className="registration-form__input mx-2"
        />
        <div>
          <button type="submit" className="btn btn-primary btn-lg mt-2 mx-2">
            Создать учетную запись
          </button>
        </div>
        </form>
    </div>)
}
