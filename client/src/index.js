import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';  // You might have an index.css file for styling
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to measure performance of your app, you can uncomment the following line:
// reportWebVitals();

/// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import Upload from './Upload.js'
// import LoginSignup from './Components/Login/LoginSignUp';
// import reportWebVitals from './reportWebVitals';



// const root = ReactDOM.createRoot(document.getElementById('root'));
// const isLoggedIn = true;
// root.render(
//   <React.StrictMode>
//     {isLoggedIn ? <Upload/> : <LoginSignup />}
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
