import React, { useState } from 'react';
import "./resgistrationPage.css"
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your registration logic here, such as sending data to a server
    console.log('Form submitted:', formData);
     // Add your registration logic here, such as sending data to a server
     const userCredential = await firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).catch((e)=>console.log(e));
     const userInstance = userCredential.user;
     console.log('Form submitted:', formData);
     navigate("/home")
  };

  return (
    <div className="container">
      <h2>Registration</h2>
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

        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button  style={{backgroundColor:"#c20508"}} type="submit">Register</button>
        <span>Already have account? <a style={{color:"blue", cursor:"pointer" }}  onClick={() => navigate('/')} >Connect here</a></span>
      </form>
    </div>
  );
};

export default RegistrationPage;
