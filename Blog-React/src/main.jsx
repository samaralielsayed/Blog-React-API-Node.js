import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
axios.interceptors.request.use(
  (config) => {
    // const jwt = localStorage.getItem("token");
    // const token = sessionStorage.getItem('token') || ""
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (token) {
      config.headers.jwt = token;
    }
    
    return config;  
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    // console.log(response.data.config.headers.jwt 
    // )
    // console.log("Bearer",response.data)
    return response;
  },
  (error) => {
    console.log("Request failed:", error);
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
