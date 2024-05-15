import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { object, string } from "yup";
import { toast } from "react-toastify";
import axios from "axios";

export default function FormPost() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const defaultErrors = { title: null, description: null, image: null };
  const [err, setError] = useState(defaultErrors);
  const RegisterSchema = object({
    title: string().required("title is required"),
    description: string().required("description is required"),
    image: string().required("image is required"),
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setError(defaultErrors);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      console.log("validationResult ", formData);
      const formValues = {
        title,
        description,
        image,
      };
      const validationResult = await RegisterSchema.validate(formValues, {
        abortEarly: false,
      });
      console.log("validationResult ", validationResult);
      //http://localhost:8000/api
      const response = await axios.post(
        "https://blog-api-node-js.onrender.com/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        navigate("/");
        toast.success("Successfully post Add!");
      }
    } catch (error) {
      console.log("error.inner", error.inner);
      if (error.inner) {
        const newErrors = { ...defaultErrors };
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setError(newErrors);
      } else {
        toast.error("Add Post . Please try again later.");
      }
    }
  };
  // useEffect(() => {
  //   if (err.title) {
  //     toast.error(err.title);
  //   }
  //    if(err.description) {
  //     toast.error(err.description);
  //   }
  //  if (err.image) {
  //     toast.error(err.image);
  //   }
  // }, [err]);

  return (
    <>
      <h1 className="font-bold text-slate-600 flex justify-center my-10 text-4xl italic   ">
        ADD NEW POST{" "}
      </h1>
      <div className="flex justify-center items-center ">
        <div className="bg-gray-200 p-10 mb-10 rounded-xl shadow-md ">
          <form
            className="flex flex-col md:w-96 w-60 font-bold  "
            onSubmit={handleAddSubmit}
          >
            <label className="text-slate-800 opacity-90 mb-2">Title Post</label>
            <input
              id="title"
              type="text"
              className="input input-bordered w-full  h-11 bg-neutral-100  text-slate-600"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            {err.title && <span className="text-red-700 ps-3 font-semibold"> * {err.title} </span>}

            <label className="mt-6 text-slate-800 opacity-90 mb-2">
              Description Post
            </label>
            <input
              id="dscription"
              type="text"
              className="input input-bordered w-full  h-11 bg-neutral-100 text-slate-600"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            {err.description && (
              <span className="text-red-700 ps-3 font-semibold">* {err.description} </span>
            )}

            <label className="mt-6 text-slate-800 opacity-90 mb-2  ">
              Image Post
            </label>
            <input
              id="image"
              type="file"
              className="file-input file-input-bordered w-full h-11 bg-neutral-100  text-slate-600"
              onChange={(e) => {
                console.log(e.target.files[0]);
                setImage(e.target.files[0]);
              }}
            />
            {err.image && <span className="text-red-700 ps-3 font-semibold">* {err.image} </span>}
            {/* <input type="file"  className="input input-bordered w-full " /> */}

            <button className="btn mt-6  text-gray-300 bg-slate-800 hover:bg-slate-700">Sumbit</button>
          </form>
        </div>
      </div>
    </>
  );
}
