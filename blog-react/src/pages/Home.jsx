import React, { useEffect, useState } from "react";
import EditSVG from "../components/svg/EditSVG";
import DeleteSVG from "../components/svg/DeleteSVG";
import axios from "axios";
import {
  useNavigate,
  useLocation,
  useSearchParams,
  unstable_HistoryRouter,
  useParams,
} from "react-router-dom";
import Pagination from "../components/Pagination";
import { toast } from "react-toastify";
import ConfirmDelete from "../components/ConfirmDelete";
import { Link } from "react-router-dom";

export default function Home() {
  const [showModal, setShowModal] = React.useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cat = useLocation().search;
  const [noOfPages, setNoOfPages] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);

  const [currentUser, setCurrentUser] = useState([]);
  // const name = searchParams.get("samar");
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [numperOfItemsPostInPage, setnumperOfItemsPostInPage] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("name ", searchParams.get("page"));

  // const handleSelectPage = (page) => {
  //   setCurrentPage(page);
  // };
  function determineClass(num) {
    if (num >= 3) {
      return "grid sm:grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-8 my-8";
    } else if (num === 2) {
      return "grid md:grid-cols-2 sm:grid-cols-1 gap-8 my-8";
    } else if (num === 1) {
      return "my-8";
    }
    return "grid grid-cols-1 gap-8 my-8";
  }
  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      let data ;
      if (id) {
        data = await axios.get(
          `http://localhost:8000/api/users/${id}/posts?limit=6&page=${currentPage}`
        );
      } else {
        data = await axios.get(
          `http://localhost:8000/api/posts?limit=6&page=${currentPage}`
        );
      }
      if (data.data.status === "success") {
        setIsLoading(false);
        console.log('data.data',data.data);
        setnumperOfItemsPostInPage(data.data.results);
        // setCurrentPage(data.paginationResult.currentPage);
        setNoOfPages(
          Array.from(
            { length: data.data.paginationResult.numberPages },
            (_, i) => i
          )
        );
        setPosts(data.data.posts);
        // console.log('data.paginationResult.currentPage',data.paginationResult.currentPage,data.paginationResult.numberPages)
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/posts/${id}`);
      toast.success("Deleted Successfully", {
        position: "top-right",
      });
      console.log(res);
      getAllPosts();
    } catch (err) {
      console.log(err);
    }
  };
  const getCurenteUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not logged in. Please login .");
        return;
      }

      const { data } = await axios.get(
        `http://localhost:8000/api/users/Profile`,
        {
          headers: {
            jwt: token,
          },
        }
      );
      if (data.status === "success") {
        setCurrentUser(data.user);
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
        return;
        // toast.error("Session expired. Please login again.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    getAllPosts();
    getCurenteUser();

    // setSearchParams("page", currentPage)
    // setSearchParams("page", currentPage.toString());
    console.log(posts);
    console.log("data.paginationResult.currentPage,", noOfPages, currentPage);
  }, [currentPage]);
  if (isLoading)
    return (
      <div className="h-32 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  console.log(
    'parseInt(searchParams.get("page") ) >noOfPages',
    parseInt(searchParams.get("page")) > noOfPages.length
  );
  if (parseInt(searchParams.get("page")) > noOfPages.length)
    return navigate("/");
  return (
    <>
      <div className="  flex justify-center items-center  flex-col">
        {currentUser.length != 0 && (
          <button
            onClick={() => {
              navigate("/addPost");
            }}
            className="flex items-center space-x-2   bg-white font-semibold text-black border-base-100 border-2 hover:bg-base-100 hover:text-gray-100 px-4 py-2 mt-12 rounded transition duration-150"
            title="Add Post"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>

            <span>Add Post</span>
          </button>
        )}
        <div className={determineClass(numperOfItemsPostInPage)}>
          {/* <div className= { numperOfItemsPostInPage >3 ? 'grid sm:grid-cols-1  xl:grid-cols-3 md:grid-cols-2 gap-8 my-8':` grid  grid-cols-1  gap-8  my-8`}> */}
          {posts.map((post) => (
            <div
              className=" card  w-96 bg-base-100 shadow-xl relative "
              key={post._id}
            >
              <figure className="hover:opacity-60 h-60">
                <img src={post.image} alt="image" />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-slate-100">{post.title}</h2>
                <p>{post.description}</p>
                {/* <h1> {currentUser._id}  {post.user._id }</h1> */}
                {currentUser._id === post.user._id && (
                  <div className="card-actions justify-end absolute top-3 right-3">
                    <Link to={`/post/${post._id}`}>
                      <EditSVG />
                    </Link>
                    <button
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      <DeleteSVG />
                    </button>
                    {showModal ? (
                      <ConfirmDelete
                        onClose={() => setShowModal(false)}
                        onConfirm={() => {
                          handleDelete(post._id);
                          setShowModal(false);
                        }}
                      />
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {noOfPages.length > 1 && (
        <Pagination
          noOfPages={noOfPages}
          currentPage={currentPage}
          handleSelectPage={(page) => setSearchParams({ page })}
          setSearchParams={setSearchParams}
        />
      )}
    </>
  );
}
