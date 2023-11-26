import React, { useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Redux/Actions/authActions";
import { useNavigate } from "react-router-dom";
const SideDrawer = ({ currViewHandler }) => {
  const { auth } = useSelector((state) => state.auth);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [currActive, setCurrActive] = useState(() =>
    localStorage.getItem("currTab")
      ? localStorage.getItem("currTab")
      : "Dashboard"
  );
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const dispatch = useDispatch();
  const location = useNavigate();
  const tabHandler = (tab) => {
    document.activeElement.blur();
    setCurrActive(tab);
    currViewHandler(tab);
    toggleDrawer();
  };
  const handleLogout = () => {
    dispatch(logout(location));
  };
  return (
    <div className="drawer drawer-end lg:drawer-open z-[999]">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        checked={!isDrawerOpen}
        onClick={toggleDrawer}
        onChange={toggleDrawer}
      />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
          <FontAwesomeIcon
            icon={faBars}
            size="lg"
            style={{ color: "#52514f" }}
          />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {auth.role === "doctor" ? (
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li>
              <Link to={`/${auth.role}/${auth.id}`}>My Dashboard</Link>
            </li>
            <li>
              <Link to={`/${auth.role}/${auth.id}/my-shifts`}>My Shifts</Link>
            </li>
            <li>
              <Link to={`/${auth.role}/${auth.id}/my-appointments`}>
                My Appointments
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        ) : auth.role === "user" && currViewHandler ? (
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li
              className={`hover:bg-white hover:bg-opacity-50 rounded-xl ${
                currActive === "Dashboard" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => tabHandler("Dashboard")}
            >
              <Link
                to={`/${auth.role}/${auth.id}`}
                replace={true}
                className="h-fit"
              >
                My Dashboard
              </Link>
            </li>

            <li
              className={`hover:bg-white hover:bg-opacity-50 rounded-xl ${
                currActive === "My Analysis" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => tabHandler("My Analysis")}
            >
              <Link
                to={`/${auth.role}/${auth.id}/analysis`}
                replace={true}
                className="h-fit"
              >
                My Analysis
              </Link>
            </li>
            <li
              className={`hover:bg-white hover:bg-opacity-50 rounded-xl ${
                currActive === "My Appointments" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => tabHandler("My Appointments")}
            >
              <Link
                to={`/${auth.role}/${auth.id}/my-appointments`}
                replace={true}
                className="h-fit"
              >
                My Appointments
              </Link>
            </li>
            <li
              className={`hover:bg-white hover:bg-opacity-50 rounded-xl ${
                currActive === "New Appointment" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => tabHandler("New Appointment")}
            >
              <Link
                to={`/${auth.role}/${auth.id}/new-appointment`}
                replace={true}
                className="h-fit"
              >
                Create Appointment
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        ) : auth.role === "user" && !currViewHandler ? (
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li>
              <Link to={`/${auth.role}/${auth.id}`}>My Dashboard</Link>
            </li>
            <li>
              <Link to={`/${auth.role}/${auth.id}/new-appointment`}>
                New Appointment
              </Link>
            </li>
            <li>
              <Link to={`/${auth.role}/${auth.id}/my-appointments`}>
                My Appointments
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default SideDrawer;
