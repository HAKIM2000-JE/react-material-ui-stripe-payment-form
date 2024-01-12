import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import {auth} from "../firebase"

import 'firebase/compat/auth';


import "./resgistrationPage.css"

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    // Add your registration logic here, such as sending data to a server
    const userCredential = await firebase.auth().signInWithEmailAndPassword(formData.email, formData.password).catch((e)=>console.log(e));
    const userInstance = userCredential.user;
    console.log('Form submitted:', formData);
    navigate("/home")
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button style={{backgroundColor:"#c20508"}} type="submit">Login</button>
        <span>First time? <a   style={{color:"blue", cursor:"pointer" }}  onClick={() => navigate('/register')} >create you account here</a></span>

      </form>
    </div>
  );
};

export default LoginPage;
