import { replace } from "formik";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const withouSidebarRoutes = ["/login", "/register",'/404'];

export default function Navbar() {
  const { pathname } = useLocation();
  console.log(pathname)
  const auth = localStorage.getItem("token");
  const userId=localStorage.getItem("userId");
  const image=localStorage.getItem("image");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };
  if (withouSidebarRoutes.some((item) => pathname === item)) return null;
  return (
    <>
      <section className="bg-slate-800">
        <div className="navbar  container mx-auto  text-gray-300 ">
          <div className="flex-1 ">
            <Link to={"/"} className="btn btn-ghost text-xl ">
              Blog Samar
            </Link>
            <Link to={"/"} className="btn btn-ghost">
              Home
            </Link>
            <Link to={"/about"} className="btn btn-ghost">
              About
            </Link>
          </div>
          <div className="flex-none  gap-2">
            {/* <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto "
              />
            </div> */}

            {auth ? (
              <div className="dropdown dropdown-end ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={image}
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content text-gray-300 bg-slate-800  rounded-box w-52"
                >
                  <li>
                    <Link className="justify-between" to={"/profile"}>
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/my-posts/${userId}`}>My Posts</Link>
                  </li>
                  <li>
                    <p onClick={logout}>Logout</p>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex justify-between ">
                <Link className="" to={"/login"}>
                  SignIn
                </Link>
                {/* <span>OR</span>
                <Link className="" to={"/register"}>
                  SignUp
                </Link> */}
               
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
