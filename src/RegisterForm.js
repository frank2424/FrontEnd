import React, { useState } from "react";
import './formStyle.css'
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    name:"",
    surname:"",
    password: "",
  });
const navigate=useNavigate();
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  

 const handleSubmit = async (event) => {
  event.preventDefault();

  if (!formData.username || !formData.password || !formData.name || !formData.surname) {
    return console.error("All fields are required");
  }

  try {


    const response = await fetch(`https://localhost:7079/api/User?username=${formData.username}&password=${formData.password}&name=${formData.name}&surname=${formData.surname} `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    console.log(result);
    navigate('/');
    alert("SUCCESS!");

  } catch (error) {
    console.error(error);
  }
};
  
  return (
    <div class="container">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="surname"
        placeholder="Surname"
        value={formData.surname}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <button type="submit">Register</button>
    </form>
    </div>
  );
};

export default RegisterForm;