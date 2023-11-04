import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div className="absolute  w-screen z-10 px-8 py-2  bg-gradient-to-b from-black  flex justify-between">
      <img
        className=" w-60  "
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />

      {user && (
        <div className="flex p-2">
          <img
            className=" w-12 h-12 rounded-xl pt-1 mt-3 mr-4"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAYFBMVEUNfoD///8AenwAd3kegYMAdXjm8PBJk5UAcnT5/Pza6enk7e3L4OCpycrP4uM9kJLx+Ph8sLF7qqtzpaYmh4lgnJ281daOu7yfv8CZwsNsp6mxzs8yjI1SmJmGsrNroKGYkK2iAAACB0lEQVRoge3Y626jMBAFYDyDDabcCyYJhLz/W67pNglps9SWWWWlPd+fKKo8p2MM2IkiAAAAAAAAAPh3kfWiUiSrtnnv5A75TP0898TOA2SfayFEbabgdB6UrSTU4FpJNkv0oq4C0yn/rCSMW++UiBsVB6VzcS9VOKVzKXyH/MG6DSE6hz6oW49QcUC4LIRnH9ysR4gkYN5pPYeidKjEh93Co2xdKXOZ9sfOQ9Y7e3cexbtdc/a+5hHnqxGHoNVe+a52O0TfBqiAaIuP9+yjWxt8qq/ZoU84Hq/Zo+sUcmI+nu2j00xtl2qULaXfGvfLRzK+tJdIhkYv6TJp24T9ls7r3ucAAACw4XWvVUrj5j3dJ16S186E0mm0eykVvilbihVKHWLXeOJk1H57yA2/98OqifjnToij3lx34uUO4dHnxjobuu14Ip6Oq+Oa4+8D225nCm1OlD5fxkQyrYaHs5oOPQQs7geBRT6cY075ukVdPjmVcTKPtXgwRvusdvNYts7M0F6SqrOS82UeTPYlWNTFtMdPWwvuS/GN1rWl9fe/CHWcHBanK6JT/izlGV063Rde8VwVX+f2mWzwPSq5xUvuC7XZcz5X6c5Nr/JZTrPJnl2AzN4F9iH8d98myx0WJ81hNGX2ZmWlGYvmPO140PzpP+CPHmPr9gUAAAAAAAAAAAAA/ju/AO/0Em9DNbOMAAAAAElFTkSuQmCC"
            alt="user_icon"
          />
          <button
            onClick={handleSignOut}
            className=" font-bold text-white hover:text-blue-700"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
