import React, { useDeferredValue, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Login.css';  // Make sure to import your stylesheet
import { StyleSheetConsumer } from 'styled-components';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false); 

  useEffect(() => {
    useRef.current.focus();

  },[])

  useEffect(() => {
    seterror('');
  },[user, pwd])





//   const handleLogin = async () => {
//     try {
//       // Make a POST request to your backend login endpoint
//       const response = await axios.post('http://localhost:3000', {
//         email,
//         password,
//       });

//       // Assuming your backend returns a token upon successful login
//       const authToken = response.data.token;

//       // Store the token in local storage (you may want to use a more secure storage method)
//       localStorage.setItem('authToken', authToken);

//       // Redirect or perform any other action after successful login
//       console.log('Login successful');
//     } catch (error) {
//       // Handle login error
//       console.error('Login failed', error.response.data);
//     }
//   };

const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(user,password);
    setUser('');
    setPassword('');
    setSuccess(true);
    if (user === 'validUser' && pwd === 'validPassword') {
        setSuccess(true);
      } else {
        setError('Invalid username or password');
      }
    };


return (
    <>
      {success ? (
        <section>
          <h1>You're Logged In</h1>
          <br />
          <p>
            <a href="# ">Go Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={error ? 'error' : 'offscreen'} aria-live="assertive">
            {error}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={pwd}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </section>
      )}
    </>
  );
};

export default Login;
    // <div className="login-container">
    //   <h2>Login</h2>
    //   <div>
    //     <label>Email:</label>
    //     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    //   </div>
    //   <div>
    //     <label>Password:</label>
    //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //   </div>
    //   <button onClick={handleLogin}>Login</button>
    // </div>
//   );
// };

// export default Login;
