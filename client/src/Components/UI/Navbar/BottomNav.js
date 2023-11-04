import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faKitMedical,
  faUser,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const BottomNav = ({ currViewHandler }) => {
  const [activeNav, setActiveNav] = useState(() =>
    localStorage.getItem("currTab")
      ? localStorage.getItem("currTab")
      : "Dashboard"
  );
  const { auth } = useSelector((state) => state.auth);
  const activeNavHandler = (tab) => {
    setActiveNav(tab);
    currViewHandler(tab);
  };

  return (
    <div className="z-50">
      <div className="btm-nav">
        <Link
          to={`/${auth.role}/${auth.id}`}
          replace={true}
          className={`${
            activeNav === "Dashboard" ? "bg-blue-600 text-white " : "bg-white"
          } text-info`}
          onClick={() => activeNavHandler("Dashboard")}
        >
          <FontAwesomeIcon
            icon={faHouse}
            style={{
              color: `${activeNav === "Dashboard" ? "#fff" : "#000000"}`,
            }}
          />
        </Link>

        <Link
          to={`/${auth.role}/${auth.id}/new-appointment`}
          className={`${
            activeNav === "New Appointment"
              ? "bg-blue-600 text-white "
              : "bg-white"
          } text-info `}
          onClick={() => activeNavHandler("New Appointment")}
        >
          <FontAwesomeIcon
            icon={faKitMedical}
            style={{
              color: `${activeNav === "New Appointment" ? "#fff" : "#000000"}`,
            }}
          />
        </Link>

        <Link
          to={`/${auth.role}/${auth.id}/my-appointments`}
          className={`${
            activeNav === "My Appointments"
              ? "bg-blue-600 text-white"
              : "bg-white"
          } text-info`}
          onClick={() => activeNavHandler("My Appointments")}
        >
          <FontAwesomeIcon
            icon={faCalendar}
            style={{
              color: `${activeNav === "My Appointments" ? "#fff" : "#000000"}`,
            }}
          />
        </Link>

        <Link
          to={`/${auth.role}/${auth.id}/profile`}
          className={`${
            activeNav === "Edit Profile" ? "bg-blue-600 text-white" : "bg-white"
          } text-info`}
          onClick={() => activeNavHandler("Edit Profile")}
        >
          <FontAwesomeIcon
            icon={faUser}
            style={{
              color: `${activeNav === "Edit Profile" ? "#fff" : "#000000"}`,
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
