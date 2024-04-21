import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import FormPost from "./pages/FormPost";
import EditPost from "./pages/EditPost";
import ProfileUser from "./pages/ProfileUser";
import ProtectedRoute from "./utils/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import RedirectUserToHome from "./utils/RedirectUserToHome";

function App() {
  // const auth=localStorage.getItem('token')
  // const ProtectedRoute = ({ children }) => {
  //   console.log(children )
  //   return auth ? children : <Navigate to="/login" />;
  // };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <div className="my-router-outlet">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-posts/:id" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<RedirectUserToHome><Register /></RedirectUserToHome>} />
            <Route path="/login" element={<RedirectUserToHome><Login /></RedirectUserToHome>} />
            <Route
              path="/addPost"
              element={
                <ProtectedRoute>
                  <FormPost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post/:id"
              element={
                <ProtectedRoute>
                  <EditPost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileUser />
                </ProtectedRoute>
              }
            />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/404" />}/>
              
            
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
