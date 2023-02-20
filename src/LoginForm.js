import React, { useState } from 'react';
import "./formStyle.css"
import { Link,useNavigate } from "react-router-dom";
//https://localhost:7079/api/User/login?username=${formData.username}&password=${formData.password} <------------login request


const LoginForm = ({username}) => {
  const  navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
     //user_id:"",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setFormData({
      ...formData,  
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!formData.username || !formData.password) {
      setErrorMessage("Please enter both username and password");
      return;
    }

    fetch(`https://localhost:7079/api/User/login?username=${formData.username}&password=${formData.password}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({formData})
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Incorrect username or password");
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        if (data.message === "Login successful") {

          if(formData.username==='admin'){
            navigate('BackOffice');
          }
          else{
           //  navigate('CarGrid);
            navigate(`CarGrid/${formData.username}` , );

          }
        }
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };
  return (
    <div className="container">
     <form onSubmit={handleSubmit}>
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
      {errorMessage && <p>{errorMessage}</p>}

      <button type="submit">Login</button>
      <Link to='RegisterForm'>Don't have an account?</Link>
    </form>
    </div>
  );
};

export default LoginForm;