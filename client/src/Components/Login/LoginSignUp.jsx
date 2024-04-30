import React, { useState } from 'react';
import user_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';
import './Loginsignup.css';
import { useAuth } from "../../contexts/AuthContexts"
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const [action, setAction] = useState("LogIn");
    const [statusMessage, setStatusMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [showStatusMessage, setShowStatusMessage] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const closeStatusMessage = () => {
      setShowStatusMessage(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                login(data.username);
                navigate('/'); 
                setStatusMessage(data.message);
                setShowStatusMessage(true);
                setIsError(false);
                console.log('Login successful:', data);
                // Optionally redirect user or manage login state
            } else {
                const errorData = await response.json();
                setStatusMessage(errorData.message);
                setShowStatusMessage(true);
                setIsError(true);
                console.error('Login failed:', response.status);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleSignup = async () => {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setStatusMessage(data.message);
                setShowStatusMessage(true);
                setIsError(false);
                console.log('Signup successful:', data);
                // Optionally redirect user or clear form
            } else {
                const errorData = await response.json();
                setStatusMessage(errorData.message);
                setShowStatusMessage(true);
                setIsError(true);
                console.error('Signup failed:', response.status);
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    const handleSubmit = (e) => {
      e.preventDefault();  // Prevent form from causing a page reload
      if (action === "LogIn") {
          handleLogin();
      } else {
          handleSignup();
      }
    };

    return (
      <div className="container">
          {showStatusMessage && (
              <div className="status-message-overlay">
                  <div className={`message-box ${isError ? 'error' : 'success'}`}>
                      {statusMessage}
                      <button onClick={closeStatusMessage} className="close-btn">✕</button>
                  </div>
              </div>
          )}
          <form onSubmit={handleSubmit}>
              <div className="header">
                  <div className="text">{action}</div>
                  <div className="underline"></div>
              </div>
              <div className="inputs">
                  <div className="input">
                      <img src={user_icon} alt="User icon" />
                      <input
                          type="text"
                          name="username"
                          value={formData.username}
                          placeholder="Username"
                          onChange={handleInputChange}
                      />
                  </div>
                  <div className="input">
                      <img src={password_icon} alt="Password icon" />
                      <input
                          type="password"
                          name="password"
                          value={formData.password}
                          placeholder="Password"
                          onChange={handleInputChange}
                      />
                  </div>
              </div>
              <div className="submit-container">
                  <button type="submit" className="submit">
                      {action === "SignUp" ? "Sign Up" : "Log In"}
                  </button>
                  <button 
                    type="button"
                    className="toggle-button" 
                    onClick={() => setAction(action === "LogIn" ? "SignUp" : "LogIn")}
                  >
                    {action === "LogIn" ? "Need an account? Sign Up" : "Have an account? Log In"}
                  </button>
              </div>
          </form>
      </div>
  );
};

export default LoginSignup;