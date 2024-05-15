import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { object, string } from "yup";
import { toast } from "react-toastify";

const RegisterSchema = object({
  name: string().required("Name is required").min(3, "Name must be at least 3 characters long"),
  email: string().required("Email is required").email("Must be a valid email"),
  password: string().required("Password is required").min(6, "Password must be at least 6 characters long"),
});

const defaultErrors = { name: null, email: null, password: null };

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(defaultErrors);
  const navigate = useNavigate();

  useEffect(() => {
 
    if (err.name) {
      toast.error(err.name);
    }
    if (err.email) {
      toast.error(err.email);
    }
    if (err.password) {
      toast.error(err.password);
    }
  }, [err]); 

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(defaultErrors); // Reset errors before validation
    try {
      //http://localhost:8000/api
        const validationResult = await RegisterSchema.validate(inputs, { abortEarly: false });
        const response = await axios.post("http://localhost:8000/api/users/register", inputs);
        
        if (response.data.status === "success") {
            navigate("/login");
            toast.success("Successfully registered!");
        }
    } catch (error) {
        if (error.response && error.response.status === 409) {
            setError(prev => ({ ...prev, email: error.response.data.message }));
        } else if (error.inner) {
            const newErrors = { ...defaultErrors };
            error.inner.forEach(err => {
                newErrors[err.path] = err.message;
            });
            setError(newErrors);
        } else {
            toast.error("Registration failed. Please try again later.");
        }
    }
};

  return (
    <>

<h1 className="font-bold text-slate-600 flex justify-center my-10 text-4xl italic  ">Register </h1>
    <div className="flex justify-center items-center ">
      <div className="bg-gray-200 p-10 mb-10 rounded-xl shadow-md ">
      
      <form className="flex flex-col md:w-96 sm:w-60 font-bold "  onSubmit={handleSubmit}>
        <label  className="text-slate-800 opacity-90 mb-2 text-salte-800" >Name</label>
        <input id="title" type="text"  className="input input-bordered w-full  h-11 bg-neutral-100 text-slate-600" 
             name="name"
             onChange={handleChange} />

        <label className="mt-6 text-slate-800 opacity-90 mb-2">Email</label>
        <input id="dscription" type="text"  className="input input-bordered w-full  h-11 bg-neutral-100 text-slate-600"  
            name="email"
            onChange={handleChange}/>
        

        <label className="mt-6 text-slate-800 opacity-90 mb-2">Password</label>
        <input id="dscription" type="password"  className="input input-bordered w-full  h-11 bg-neutral-100 text-slate-600" 
            name="password"
            onChange={handleChange}/>
        {/* <input type="file"  className="input input-bordered w-full " /> */}

        <button className="btn mt-6  text-gray-300 bg-slate-800 hover:bg-slate-700 ">Register</button>
        <p className="ps-3 pt-1 font-semibold text-gray-500">  Do you have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
      </form>
      </div>
    </div>
    </>
  );
};

export default Register;
