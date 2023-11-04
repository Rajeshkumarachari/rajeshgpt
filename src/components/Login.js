import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setIsSign] = useState(true);
  const toggleSignInForm = () => {
    setIsSign(!isSignIn);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/0efe6360-4f6d-4b10-beb6-81e0762cfe81/IN-en-20231030-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="background_logo"
        />
      </div>
      <form className="absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 rounded-md text-white bg-opacity-80">
        <h1 className=" font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Name"
            className="p-4 my-2 w-full bg-gray-700 rounded-lg"
          />
        )}
        <input
          type="text"
          placeholder="Email or phone number"
          className="p-4 my-2 w-full bg-gray-700 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700 rounded-lg"
        />
        <button className="p-4  my-6 bg-red-600 w-full rounded-lg ">
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <div className="flex">
          <input type="checkbox" className=" my-3 bg-gray-700 " />
          <p className="my-3 mx-2 text-gray-400">Remember me</p>
          <p className="text-gray-400 my-3 ml-16 cursor-pointer hover:underline">
            Need help?
          </p>
        </div>
        <p className="py-4  text-gray-600  text-xl">
          {isSignIn ? "New to Netflix?" : "Already registered ?"}

          <span
            className=" cursor-pointer text-white  hover:underline"
            onClick={toggleSignInForm}
          >
            {isSignIn ? "Sign Up now." : "Sign In"}
          </span>
        </p>
        <p className=" text-gray-600 text-sm">
          This page is protected by Google reCAPTCHA to ensure you're not a bot
          <br></br>
          <a href="/" className=" text-blue-800 hover:underline">
            Learn more.
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
