import React from "react";
import Navbar from "../../../UI/Navbar/Navbar";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div
        className={`hero min-h-screen bg-[url('./Assets/1.png')] bg-cover bg-center bg-[length:1550px_980px]`}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
