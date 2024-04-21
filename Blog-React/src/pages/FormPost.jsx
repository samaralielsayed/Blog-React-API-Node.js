import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { object, string } from "yup";
import { toast } from "react-toastify";
import axios from "axios";

export default function FormPost() {
  const navigate=useNavigate();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const handleAddSubmit =async(e)=>{
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    const response = await axios.post("http://localhost:3000/api/posts", formData,{headers: {
      "Content-Type": "multipart/form-data",
    }});
        
        if (response.data.status === "success") {
            navigate("/");
            toast.success("Successfully post Add!");
        }
  }catch (error) {
   
        toast.error("Add Post failed. Please try again later.");
   }
}


  return (
    < >
   
    <h1 className="font-bold text-black flex justify-center my-10 text-4xl italic   ">ADD NEW POST </h1>
    <div className="flex justify-center items-center ">
      <div className="bg-gray-200 p-10 mb-10 rounded-xl shadow-md ">
      
      <form className="flex flex-col w-96 font-bold  "  onSubmit={handleAddSubmit}>
        <label  className="text-slate-800 opacity-90 mb-2" >Title Post</label>
        <input id="title" type="text"  className="input input-bordered w-full  h-11 bg-neutral-100 " value={title}
             onChange={(e) => {
              setTitle(e.target.value); 
            }} />

        <label className="mt-6 text-slate-800 opacity-90 mb-2">Description Post</label>
        <input id="dscription" type="text"  className="input input-bordered w-full  h-11 bg-neutral-100"  value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}/>
        

        <label className="mt-6 text-slate-800 opacity-90 mb-2  ">Image Post</label>
        <input  id='image' type="file" className="file-input file-input-bordered w-full h-11 bg-neutral-100 " onChange={(e) => {
                  console.log(e.target.files[0]);
                  setImage(e.target.files[0]);
                }}/>
        {/* <input type="file"  className="input input-bordered w-full " /> */}

        <button className="btn mt-6">Sumbit</button>
      </form>
      </div>
    </div>
    </>
  );
}
