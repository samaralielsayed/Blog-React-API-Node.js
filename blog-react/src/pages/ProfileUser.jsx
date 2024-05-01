import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { object, string } from "yup";
import { toast } from "react-toastify";
import axios from "axios";

export default function ProfileUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState(null);
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const getCurenteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in. Please login to continue.");
        return;
      }
      const { data } = await axios.get(
        `https://blog-api-node-js-5.onrender.com/api/users/Profile`,
        {
          headers: {
            jwt: token,
          },
        }
      );
      if (data.status === "success") {
        console.log(data);
        setName(data.user.name);
        // setPassword(data.user.passwordHash);
        setEmail(data.user.email);
        setImage(data.userimage);
        setPreviewImage(data.user.image);
        
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        toast.error("Login.");
        return;
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    getCurenteUser();
    
  },[]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call API
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("image", image);
      // formData.append("passwordHash", password);
      const { data } = await axios.patch(
        `https://blog-api-node-js-5.onrender.com/api/users/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   navigate("/");
      // Toast
      toast.success(" update Profile successfully!");
    } catch (error) {
      toast.error("Edit Profile failed. Please try again later.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // For preview
    }
  };
  return (
    <>
        
          

        <h1 className="font-bold text-black flex justify-center my-10 text-4xl italic">Update Profile</h1>
      <div className="flex justify-center items-center flex-col relative  mb-16">
        <div className="bg-gray-200 p-10 my-10 rounded-xl shadow-md   ">
          <form
            className="flex flex-col w-96 font-bold  "
            onSubmit={handleEditSubmit}
          >
            <label className="text-slate-800 opacity-90 mb-2">Name</label>
            <input
              type="text"
              className="input input-bordered w-full  h-11 bg-neutral-100 "
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <label className="mt-6 text-slate-800 opacity-90 mb-2">
              Email
            </label>
            <input
              type="text"
              className="input input-bordered w-full  h-11 bg-neutral-100"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
             {/* <input
              type="password"
              className="input input-bordered w-full  h-11 bg-neutral-100"
              // value='kk'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            /> */}

            <label className="mt-6 text-slate-800 opacity-90 mb-2  ">
              Image User
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full h-11 bg-neutral-100 "
              //   onChange={(e) => {
              //     console.log(e.target.files[0]);

              //   }}
              onChange={handleImageChange}
            />

            {/* <input type="file"  className="input input-bordered w-full " /> */}

            <button className="btn mt-6">Sumbit</button>
          </form>
        </div>
        <div className="d-flex mb-3 absolute -top-6">
        <div className="flex-shrink-0">
          <img
            className="rounded-full w-28 h-28 object-cover"
            src={previewImage} 
            alt=""
          />
        </div>
      </div>
        
      </div>
          
      {/* <div className="  rounded-box h-48 overflow-hidden w-48 ">
          <img src={previewImage} alt="image" className=" " />
        </div> */}
      
    </>
  );
}
