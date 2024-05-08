import React from "react";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillInstagram,
  AiFillHeart,
} from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";
import { useLocation } from "react-router-dom";
const withouSidebarRoutes = ["/login", "/register",'/404'];
export default function Footer() {
  const { pathname } = useLocation();
  if (withouSidebarRoutes.some((item) => pathname === item)) return null;
  return (
    <>
      <section className="bg-slate-800">
        <footer className=" container mx-auto  grid grid-cols-10 py-7 pt-14 gap-y-10 gap-x-5 ps-20  md:grid-cols-12 lg:grid-cols-10  lg:gap-x-10">
          <div className="col-span-5 md:col-span-4 lg:col-span-2">
            <h3 className="text-gray-300 font-bold md:text-lg ">Product</h3>
            <ul className="text-gray-300 text-sm mt-5 space-y-4">
              <li>
                <a className="link link-hover">Landingpage</a>
              </li>
              <li>
                <a className="link link-hover">Features</a>
              </li>
              <li>
                <a className="link link-hover">Documentation</a>
              </li>
              <li>
                <a className="link link-hover">Referral Program</a>
              </li>
              <li>
                <a className="link link-hover">Pricing</a>
              </li>
            </ul>
          </div>
          <div className="col-span-5 md:col-span-4 lg:col-span-2">
            <h3 className="text-gray-300 font-bold md:text-lg">Services</h3>
            <ul className="text-gray-300 text-sm mt-5 space-y-4 ">
              <li>
                <a className="link link-hover">Documentation</a>
              </li>
              <li>
                <a className="link link-hover">Design</a>
              </li>
              <li>
                <a className="link link-hover">Themes</a>
              </li>
              <li>
                <a className="link link-hover">Illustrations</a>
              </li>
              <li>
                <a className="link link-hover">UI Kit</a>
              </li>
            </ul>
          </div>
          <div className="col-span-5 md:col-span-4 md:col-start-5 lg:col-start-auto lg:col-span-2">
            <h3 className="text-gray-300 font-bold md:text-lg">Company</h3>
            <ul className="text-gray-300 text-sm mt-5 space-y-4 ">
              <li>
                <a className="link link-hover">About</a>
              </li>
              <li>
                <a className="link link-hover">Terms</a>
              </li>
              <li>
                <a className="link link-hover">Privacy Policy</a>
              </li>
              <li>
                <a className="link link-hover">Careers</a>
              </li>
            </ul>
          </div>
          <div className="col-span-5 md:col-span-4 lg:col-span-2">
            <h3 className="text-gray-300 font-bold md:text-lg">More</h3>
            <ul className="text-gray-300 text-sm mt-5 space-y-4 ">
              <li>
                <a className="link link-hover">Documentation</a>
              </li>
              <li>
                <a className="link link-hover">License</a>
              </li>
              <li>
                <a className="link link-hover">Changelog</a>
              </li>
            </ul>
          </div>
          <div className="col-span-10 md:order-first md:col-span-4 lg:col-span-2">
            {/* <img
            alt="logo"
            className="brightness-0 invert mx-auto md:mx-0"
          /> */}
            <p className="text-sm text-gray-300 text-center mt-4 md:text-left lg:text-sm">
              Build a modern and creative website with crealand
            </p>
            <ul className="flex justify-center items-center mt-5 space-x-4 text-gray-300 md:justify-start">
              <li>
                <a className="link link-hover">
                  <AiOutlineTwitter className="w-6 h-auto" />
                </a>
              </li>
              <li>
                <a className="link link-hover">
                  <AiFillYoutube className="w-6 h-auto" />
                </a>
              </li>
              <li>
                <a className="link link-hover">
                  <AiFillInstagram className="w-6 h-auto" />
                </a>
              </li>
              <li>
                <a className="link link-hover">
                  <FaFacebook className="w-6 h-auto" />
                </a>
              </li>
              <li>
                <a className="link link-hover">
                  <BsTelegram className="w-6 h-auto" />
                </a>
              </li>
            </ul>
          </div>
          <div className="hidden md:flex flex-col items-center space-y-4 md:col-span-12 lg:col-span-10">
            <div className="bg-primary text-gray-300 p-3 rounded-full">
              <AiFillHeart className="w-7 h-auto" />
            </div>
            <p className="font-bold italic text-dark-light">
              Copyright © 2023. Crafted with love.
            </p>
          </div>
        </footer>
      </section>
    </>
  );
}
