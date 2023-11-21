import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../../Redux/Actions/authActions";
import { useNavigate } from "react-router";
import Navbar from "../../../UI/Navbar/Navbar";
const LoginPage = () => {
  //for development.
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formHandler = (e) => {
    const { id, value } = e.target;
    if (id === "login_email") {
      setUserInput((prevState) => ({
        ...prevState,
        email: value,
      }));
    }
    if (id === "login_password") {
      setUserInput((prevState) => ({
        ...prevState,
        password: value,
      }));
    }
    if (error !== "") {
      setError("");
    }
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    if (userInput.email.length === 0) {
      setError("No Email adress provided!");
    }
    if (!userInput.email.includes("@")) {
      setError("Please correct Your email adress(Must Contain '@' )");
    }
    if (userInput.password.length < 6 && userInput.password !== "admin") {
      setError("Password must be at least 6 characters.");
    }
    if (
      userInput.email.length > 0 &&
      userInput.email.includes("@") &&
      userInput.password.length >= 6
    ) {
      const response = await dispatch(login(userInput, navigate));
      if (response) {
        setError(response.error);
      }
    }
  };
  return (
    <div className="bg-[url('./Assets/bg4.jpg')] h-full">
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-white bg-opacity-10">
        <div className="bg-gray-800 bg-opacity-60 p-3 flex rounded-2xl shadow-lg max-w-3xl ">
          <div className="w-full px-5 ">
            <h2 className="text-2xl font-bold text-white text-center">Login</h2>
            <p className="text-sm mt-4 text-white text-center">
              If you have an account, please login
            </p>
            {error !== "" ? (
              <h3 className="text-white text-[18px] underline bg-red-400 mt-4 p-4 text-center rounded-full">
                {error}
              </h3>
            ) : null}

            <form className="mt-6 " action="#" method="POST">
              <div>
                <label className="block text-white">Email Address</label>
                <input
                  type="email"
                  id="login_email"
                  placeholder="Enter Email Address"
                  className={`${
                    error !== ""
                      ? "bg-red-200 focus:bg-red-100"
                      : "bg-gray-200 focus:bg-white"
                  } w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500  focus:outline-none `}
                  required
                  onChange={formHandler}
                  value={userInput.email}
                />
              </div>

              <div className="mt-4">
                <label className="block text-white">Password</label>
                <input
                  type="password"
                  id="login_password"
                  placeholder="Enter Password"
                  minLength="6"
                  className={`${
                    error !== ""
                      ? "bg-red-200 focus:bg-red-100"
                      : "bg-gray-200 focus:bg-white"
                  } w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500  focus:outline-none `}
                  required
                  onChange={formHandler}
                  value={userInput.password}
                />
              </div>

              <div className="text-right mt-2">
                <a
                  href="/forgot-password"
                  className="text-sm font-semibold text-white hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
                onClick={loginHandler}
              >
                Log In
              </button>
            </form>

            <div className="mt-7 grid grid-cols-3 items-center text-white">
              <hr className="border-white" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-white" />

              <a
                className="p-3 text-black bg-white border col-start-2 col-end-3 mt-2 rounded-xl hover:scale-110 duration-300 border-blue-400 "
                href="/register"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
