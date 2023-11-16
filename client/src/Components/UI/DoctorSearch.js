import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const DoctorSearch = ({ categories, searchHandler, userId }) => {
  const searchInputHandler = (e) => {
    const { value } = e.target;
    searchHandler(value);
  };
  return (
    <div className="join items-center mx-auto">
      <input
        className="input input-bordered join-item rounded-xl"
        placeholder="Search"
        onChange={searchInputHandler}
      />

      <div className="dropdown dropdown-bottom w-fit join-item">
        <label
          tabIndex={0}
          className="p-3 bg-blue-500 text-white rounded-t-xl rounded-b-xl rounded-r-xl rounded-l-none hover items-center hover:bg-blue-700 cursor-pointer"
        >
          Choose Speciality
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{ color: "white" }}
            className="ml-2"
          />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu shadow bg-base-100  block overflow-y-scroll h-[200px]"
        >
          {categories.map((category, index) => {
            return (
              <Link
                to={`/user/${userId}/new-appointment/${category
                  .toLowerCase()
                  .replace(" ", "-")}
                    `}
                className="p-3 text-center"
                key={index}
              >
                <li key={index} className="p-3 hover:bg-gray-300">
                  {category}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DoctorSearch;
