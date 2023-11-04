import { faKey, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./EditProfile.css";
import { useSelector } from "react-redux";
const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div
      className={`flex h-fit justify-stretch
       w-full mx-auto`}
    >
      <div
        className={`w-full max-w-sm w-full p-4 bg-white border border-gray-200 bg-opacity-50 rounded-lg mx-auto shadow`}
      >
        <div className="flex flex-col items-center pb-10 card-content">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-black dark:text-white">
            {user.firstName + " " + user.lastName}
          </h5>
        </div>

        <form className="flex flex-col">
          <label className="block mb-2 text-sm font-medium text-black dark:text-white">
            Username
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-black bg-black border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <FontAwesomeIcon icon={faUser} style={{ color: "white" }} />
            </span>
            <input
              type="text"
              className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-black focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={user.firstName + " " + user.lastName}
            />
          </div>

          <label className="block mb-2 text-sm font-medium text-black dark:text-white">
            Password
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-black bg-black border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <FontAwesomeIcon icon={faKey} style={{ color: "white" }} />
            </span>
            <input
              type="password"
              className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-black focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="**********"
              value={user.password}
            />
          </div>
          <label className="block mb-2 text-sm font-medium text-black dark:text-white">
            Phone Number
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-black bg-black border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <FontAwesomeIcon icon={faPhone} style={{ color: "white" }} />
            </span>
            <input
              type="phone"
              className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-black focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={user.phoneNumber}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 w-fit p-3 mx-auto rounded-lg mt-4 text-white"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
