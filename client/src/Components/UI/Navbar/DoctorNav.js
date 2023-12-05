import React from "react";
const DoctorNav = ({ user, tabHandler, currTab }) => {
  return (
    <div className="px-2 mb-8 bg-gray-800 bg-opacity-40 rounded-b-full">
      <ul className="flex justify-evenly text-white items-center">
        <li
          className={`cursor-pointer ${
            currTab === "dashboard"
              ? "bg-blue-500 text-white p-4 rounded-2xl"
              : ""
          }`}
          onClick={() => tabHandler("dashbaord")}
        >
          My Dashboard
        </li>
        <li
          className={`cursor-pointer ${
            currTab === "records"
              ? "bg-blue-500 text-white p-4 rounded-2xl"
              : ""
          }`}
          onClick={() => tabHandler("records")}
        >
          Patients Records
        </li>
        <li
          className={`cursor-pointer ${
            currTab === "my-shifts"
              ? "bg-blue-500 text-white p-4 rounded-2xl"
              : ""
          }`}
          onClick={() => tabHandler("my-shifts")}
        >
          My Shifts
        </li>
        <li
          className={`cursor-pointer ${
            currTab === "my-appointments"
              ? "bg-blue-500 text-white p-4 rounded-2xl"
              : ""
          }`}
          onClick={() => tabHandler("my-appointments")}
        >
          My Appointments
        </li>
        <li
          className={`cursor-pointer ${
            currTab === "my-profile"
              ? "bg-blue-500 text-white p-4 rounded-2xl"
              : ""
          }`}
          onClick={() => tabHandler("my-profile")}
        >
          My Profile
        </li>
      </ul>
    </div>
  );
};

export default DoctorNav;
