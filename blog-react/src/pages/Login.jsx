import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { toast } from "react-toastify";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const defaultErrors = { email: null, password: null };
  const RegisterSchema = object({
    email: string().required("Email is required"),
    password: string().required("Password is required"),
  });

  const [err, setError] = useState(defaultErrors);

  const navigate = useNavigate();

  useEffect(() => {
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
      const validationResult = await RegisterSchema.validate(inputs, {
        abortEarly: false,
      });
      const response = await axios.post(
        "https://blog-api-node-js-5.onrender.com/api/users/login",
        inputs
      );

      if (response.data.status === "success") {
        localStorage.setItem("token", response.data["token"]);
        localStorage.setItem("userId", response.data.user["_id"]);
        localStorage.setItem("image", response.data.user["image"]);
        // let expirationDate = new Date(new Date().getTime() + (60000 * 60))
        // let tokenExpir = {
        //   value: response['token'],
        //   expirationDate: expirationDate.toISOString()
        // }

        // sessionStorage.setItem('token', response.data['token']);

        navigate("/");
        toast.success("Successfully Login!");
      }
    } catch (error) {
      if (error.response && error.response.status) {
        setError((prev) => ({ ...prev, email: error.response.data.message }));
      } else if (error.inner) {
        const newErrors = { ...defaultErrors };
        error.inner.forEach((err) => {
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
      <h1 className="font-bold text-black flex justify-center my-10 text-4xl italic  ">
        Login{" "}
      </h1>
      <div className="flex justify-center items-center ">
        <div className="bg-gray-200 p-10 mb-10 rounded-xl shadow-md ">
          <form
            className="flex flex-col w-96 font-bold  "
            onSubmit={handleSubmit}
          >
            <label className=" text-slate-800 opacity-90 mb-2 ">Email</label>
            <input
              id="dscription"
              type="text"
              className="input input-bordered w-full  h-11 bg-neutral-100"
              name="email"
              onChange={handleChange}
            />

            <label className="mt-6 text-slate-800 opacity-90 mb-2">
              Password
            </label>
            <input
              id="dscription"
              type="password"
              className="input input-bordered w-full  h-11 bg-neutral-100"
              name="password"
              onChange={handleChange}
            />
            {/* <input type="file"  className="input input-bordered w-full " /> */}

            <button className="btn mt-6">Login</button>
            <p className="ps-3 pt-1 font-semibold">
              {" "}
              Don't you have an account?
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
