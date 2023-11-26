import React, { useEffect } from "react";
import Logo from "../../../Assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import MessageIndicator from "../MessageIndicator";
import { logout } from "../../../Redux/Actions/authActions";
import { getSocket } from "../../../api/socket";
import useWindowSize from "../../../hooks/useWindowSize";
import SideDrawer from "./SideDrawer";
import { useLocation } from "react-router-dom";
const defaultAvatarUrl =
  "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";
const DashboardNavbar = ({ currViewHandler }) => {
  const { auth } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { width } = useWindowSize();
  const currPath = useLocation();
  const location = useNavigate();
  const isMobile = width <= 1024;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(location));
  };
  const tabHandler = (tab) => {
    document.activeElement.blur();
    currViewHandler(tab);
  };
  //useEffect to "Disconnect user from chat" when leaving the chat page.
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("activeChat"))) {
      const socket = dispatch(getSocket());
      const activeChat = JSON.parse(localStorage.getItem("activeChat"));
      if (!currPath.pathname.includes("inbox")) {
        // Emit the "leave_room" event
        socket.emit("leave_room", {
          chatId: activeChat.split("_")[1],
          firstName: user.firstName,
          lastName: user.lastName,
        });
        localStorage.removeItem("activeChat");
      }
    }
  }, [user.firstName, user.lastName, dispatch, currPath.pathname]);
  return (
    <div
      className={`navbar bg-white h-fit relative bg-opacity-20 ${
        isMobile ? "flex justify-between" : ""
      }`}
    >
      <div className={`${isMobile ? "" : "flex-1"}`}>
        {isMobile ? (
          <SideDrawer currViewHandler={currViewHandler} />
        ) : (
          <a className="btn btn-ghost normal-case text-xl" href="/">
            <img
              src={Logo}
              className="h-[40px] w-[125px] lg:w-[100px]"
              alt="logo"
            />
          </a>
        )}
      </div>

      <div className="flex justify-between">
        {auth.role !== "admin" ? (
          <div className="indicator">
            <Link to={`/${auth.role}/${auth.id}/inbox`} className="w-fit h-fit">
              <FontAwesomeIcon
                icon={faEnvelope}
                size="xl"
                style={{ color: "#52514f" }}
              />
              <MessageIndicator globalNotifications={true} />
            </Link>
          </div>
        ) : null}

        <div className="avatar online ml-6 dropdown dropdown-end hover:cursor-pointer">
          <div className="mask mask-decagon w-12" tabIndex={0}>
            <img
              src={
                user?.profileImage?.thumbnail
                  ? user?.profileImage?.thumbnail
                  : defaultAvatarUrl
              }
              alt="avatar"
            />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-gray-700 bg-opacity-80 text-white rounded-box w-52"
          >
            <li
              className="hover:bg-white hover:bg-opacity-50 rounded-xl"
              onClick={() => tabHandler("Dashboard")}
            >
              {auth.role !== "admin" ? (
                <Link
                  to={`/${auth.role}/${auth.id}`}
                  replace={true}
                  className="h-fit"
                >
                  My Dashboard
                </Link>
              ) : (
                <Link to={"/admin"} replace={true}>
                  Admin Panel
                </Link>
              )}
            </li>
            {auth.role !== "admin" ? (
              <li
                className="hover:bg-white hover:bg-opacity-50 rounded-xl"
                onClick={() => tabHandler("Edit Profile")}
              >
                <Link
                  to={`/${auth.role}/${auth.id}/profile`}
                  replace={true}
                  className="h-fit"
                >
                  My Profile
                </Link>
              </li>
            ) : null}
            {auth.role === "doctor" ? (
              <>
                <li className="hover:bg-white hover:bg-opacity-50 rounded-xl">
                  <Link to={`/${auth.role}/${auth.id}/my-shifts`}>
                    My Shifts
                  </Link>
                </li>
                <li className="hover:bg-white hover:bg-opacity-50 rounded-xl">
                  <Link to={`/${auth.role}/${auth.id}/my-appointments`}>
                    My Appointments
                  </Link>
                </li>
              </>
            ) : auth.role === "user" ? (
              <>
                <li
                  className="hover:bg-white hover:bg-opacity-50 rounded-xl"
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
                <li
                  className="hover:bg-white hover:bg-opacity-50 rounded-xl"
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
                  className="hover:bg-white hover:bg-opacity-30 rounded-xl"
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
              </>
            ) : null}
            <li className="hover:bg-white hover:bg-opacity-50 rounded-xl">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
