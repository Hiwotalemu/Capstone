import React, { useState, useRef, useEffect } from 'react';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import './Loginsignup.css';
import axios from 'axios';


const LoginSignup = () => {
    const [action, setAction] = useState("LogIn");
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
    });


const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const handleSubmit = async () => {
 // e.preventDefault();
 //axios.post('', {name,email,password})
try {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    // Authentication successful, handle the response (e.g., store token)
    const data = await response.json();
    console.log('Authentication successful:', data);
  } else {
    // Authentication failed, handle the error
    console.error('Authentication failed');
    if (response.status === 401) {
      console.error('Unauthorized - invalid credentials');
    } else if (response.status === 403) {
      console.error('Forbidden - access denied');
    }
    // Add more specific error handling based on your server response

    // Throw an error to propagate it further if needed
    throw new Error('Authentication failed');


  }
} catch (error) {
  console.error('Error during authentication:', error);
}
};


  return (
    <div className="container">
      <div className="header">
        <div className="text"> {action} </div>
        <div className="underline"> </div>
      </div>
      <div className="inputs">
        {action === 'LogIn' ? null : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              onChange={handleInputChange}
            />
          </div>
        )}
       <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" 
             name="password"
             value={formData.password}
           placeholder="Password" 
           onChange={handleInputChange}
           />
        </div>
      </div>
{action=== "SignUp"?<div> </div>:<div className="forgot-password">
        Forgot Password?
      </div>}


      <div className="submit-container">
        <div
          className={action === 'LogIn' ? 'submit gray' : 'submit'}
          onClick={() => {
            setAction('SignUp');
            handleSubmit();
          }}
        >
          Sign Up
        </div>
        <div
          className={action === 'SignUp' ? 'submit gray' : 'submit'}
          onClick={() => {
            setAction('LogIn');
            handleSubmit();
          }}

          >
          LogIn
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
