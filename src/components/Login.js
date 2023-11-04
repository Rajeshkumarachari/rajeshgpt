import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignIn, setIsSign] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    //validate
    const message = checkValidData(
      email?.current?.value,
      password?.current?.value
      // name?.current?.value
    );
    setErrorMessage(message);
    if (message) return;
    if (!isSignIn) {
      // Signed up
      createUserWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAYFBMVEUNfoD///8AenwAd3kegYMAdXjm8PBJk5UAcnT5/Pza6enk7e3L4OCpycrP4uM9kJLx+Ph8sLF7qqtzpaYmh4lgnJ281daOu7yfv8CZwsNsp6mxzs8yjI1SmJmGsrNroKGYkK2iAAACB0lEQVRoge3Y626jMBAFYDyDDabcCyYJhLz/W67pNglps9SWWWWlPd+fKKo8p2MM2IkiAAAAAAAAAPh3kfWiUiSrtnnv5A75TP0898TOA2SfayFEbabgdB6UrSTU4FpJNkv0oq4C0yn/rCSMW++UiBsVB6VzcS9VOKVzKXyH/MG6DSE6hz6oW49QcUC4LIRnH9ysR4gkYN5pPYeidKjEh93Co2xdKXOZ9sfOQ9Y7e3cexbtdc/a+5hHnqxGHoNVe+a52O0TfBqiAaIuP9+yjWxt8qq/ZoU84Hq/Zo+sUcmI+nu2j00xtl2qULaXfGvfLRzK+tJdIhkYv6TJp24T9ls7r3ucAAACw4XWvVUrj5j3dJ16S186E0mm0eykVvilbihVKHWLXeOJk1H57yA2/98OqifjnToij3lx34uUO4dHnxjobuu14Ip6Oq+Oa4+8D225nCm1OlD5fxkQyrYaHs5oOPQQs7geBRT6cY075ukVdPjmVcTKPtXgwRvusdvNYts7M0F6SqrOS82UeTPYlWNTFtMdPWwvuS/GN1rWl9fe/CHWcHBanK6JT/izlGV063Rde8VwVX+f2mWzwPSq5xUvuC7XZcz5X6c5Nr/JZTrPJnl2AzN4F9iH8d98myx0WJ81hNGX2ZmWlGYvmPO140PzpP+CPHmPr9gUAAAAAAAAAAAAA/ju/AO/0Em9DNbOMAAAAAElFTkSuQmCC",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      // sign in
      signInWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSign(!isSignIn);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="w-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/0efe6360-4f6d-4b10-beb6-81e0762cfe81/IN-en-20231030-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="background_logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black w-4/12 my-36 mx-auto right-0 left-0 rounded-md text-white bg-opacity-80"
      >
        <h1 className=" font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-4 my-2 w-full bg-gray-700 rounded-lg"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email or phone number"
          className="p-4 my-2 w-full bg-gray-700 rounded-lg"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700 rounded-lg"
        />
        <p className=" text-red-700 font-bold text-lg py-2 ">{errorMessage} </p>
        <button
          className="p-4  my-6 bg-red-600 w-full rounded-lg "
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <div className="flex">
          <input type="checkbox" className=" my-3 bg-gray-700 " />
          <p className="my-3 mx-2 text-gray-400">Remember me</p>
          <p className="text-gray-400 my-3 ml-44 cursor-pointer hover:underline">
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
          <a href="/" className=" text-blue-800 hover:underline">
            Learn more.
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
