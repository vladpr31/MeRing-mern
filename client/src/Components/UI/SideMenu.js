import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronDown,
  faCircleUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { logout } from "../../Redux/Actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserMenus } from "../../utils/utils";

const SideMenu = ({ props }) => {
  const [open, cycleOpen] = useCycle(false, true);
  const [currActiveTab, setCurrActiveTab] = useState(() =>
    localStorage.getItem("currTab")
      ? localStorage.getItem("currTab")
      : "Dashboard"
  );
  const { auth } = useSelector((state) => state.auth);
  const sideMenu = UserMenus(auth);
  const dispatch = useDispatch();
  const tabHandler = (itemTitle) => {
    props.currentViewHandler(itemTitle);
    setCurrActiveTab(itemTitle);
  };
  const location = useNavigate();
  const logoutHandler = () => {
    dispatch(logout(location));
  };

  useEffect(() => {
    if (localStorage.getItem("currTab") !== currActiveTab) {
      setCurrActiveTab(localStorage.getItem("currTab"));
    }
  }, [currActiveTab]);
  return (
    <AnimatePresence>
      <div className="flex">
        <div
          className={`bg-white bg-opacity-20 ${
            open ? "bg-white bg-opacity-20 w-60 p-2" : " w-14 "
          } duration-300`}
        >
          <motion.div className="inline-flex px-1 py-4">
            <motion.span>
              <FontAwesomeIcon
                icon={faCircleUser}
                size="2xl"
                style={{ color: "#ffffff" }}
                className={` bg-black border-[2px]  border-black rounded-full mr-4 ml-2 duration-500 ${
                  open && "rotate-[360deg] bg-teal-400 z-[999]"
                }`}
              />
            </motion.span>
            <motion.h1
              className={`origin-left text-xl font-medium text-[#52514f]`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0 }}
              exit={{ opacity: open ? 1 : 0, x: open ? 1 : 0 }}
              transition={{ duration: open ? 1 : 0 }}
            >
              Hi, {props.patientName}
            </motion.h1>
          </motion.div>
          <div className="">
            <ul className="w-full sticky flex flex-col gap-y-6">
              {sideMenu.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`text-[#52514f] flex gap-x-4 p-2  ${
                      open
                        ? "hover:scale-[1.2] duration-300 "
                        : "hover:bg-gray-100 hover:bg-opacity-20 hover:border border-white"
                    } ${
                      currActiveTab === item.title
                        ? "bg-white p-1.5 rounded-xl bg-opacity-30 font-bold"
                        : ""
                    }`}
                    onClick={() => tabHandler(item.title)}
                  >
                    <Link
                      className={`rounded-md  w-full ${
                        open ? "text-left " : "text-center  "
                      } `}
                      to={item.ref}
                    >
                      <span
                        className={`${
                          open
                            ? "ml-2 mr-2 bg-white p-1.5 rounded-full "
                            : "bg-white p-2 rounded-full hover:border-teal-500 hover:border-2"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className={`${open ? "" : "hidden"} duration-300`}>
                        {item.title}
                      </span>
                    </Link>
                  </li>
                );
              })}

              <button
                className={`rounded-md p-2 w-full  ${
                  open
                    ? "text-left hover:bg-gray-100 hover:bg-opacity-20 hover:border border-white hover:scale-[1.1]"
                    : "text-center hover:scale-[1.1]"
                } duration-300`}
                onClick={logoutHandler}
              >
                <span
                  className={`${
                    open
                      ? "ml-2 mr-2 bg-white p-1.5 rounded-full"
                      : "bg-white p-2 rounded-full hover:border-teal-500 hover:border-2 "
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="bg-white rounded-full"
                    size="lg"
                  />
                </span>
                <span className={`text-[#52514f] ${!open && "hidden"}`}>
                  Logout
                </span>
              </button>
            </ul>
          </div>
        </div>

        <div
          className="tooltip tooltip-right self-center tooltip-info z-[999]"
          data-tip={!open ? "Open Navigation" : "Close Navigation"}
        >
          <button className="w-fit left-0 ml-2 absolute " onClick={cycleOpen}>
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              size="2xl"
              className={`z-[999] text-blue-500 bg-blue-400 ${
                open
                  ? "rotate-[90deg] bg-white rounded-full border-[2px] border-white "
                  : "rotate-[270deg] bg-white rounded-full border-[2px] border-white"
              } duration-700`}
            />
          </button>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default SideMenu;

/*
 <div className="flex">
      <div
        className={`bg-white h-screen bg-opacity-20 ${
          isOpen
            ? "bg-white h-screen bg-opacity-20 w-60 p-2"
            : " w-14 rounded-r-md"
        } duration-300`}
      >
        <div className="inline-flex px-1 py-4">
          <FontAwesomeIcon
            icon={faCircleUser}
            size="2xl"
            style={{ color: "#ffffff" }}
            className={` bg-black border-[2px]  border-black rounded-full mr-4 ml-2 duration-500 ${
              isOpen && "rotate-[360deg] bg-teal-400 "
            }`}
          />
          <h1
            className={`origin-left text-xl font-medium text-[#52514f]  duration-300 ${
              !isOpen && "scale-0"
            }`}
          >
            Hi, {props.patientName}
          </h1>
        </div>
        <div className="">
          <ul className="w-full flex flex-col gap-y-6">
            {sideMenu.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`text-[#52514f] flex gap-x-4 p-2  ${
                    !isOpen
                      ? "hover:scale-125 duration-300 "
                      : "hover:bg-gray-100 hover:bg-opacity-20 hover:border border-white"
                  } ${
                    currActiveTab === item.title
                      ? "bg-white p-1.5 rounded-xl bg-opacity-30 font-bold"
                      : ""
                  }`}
                  onClick={() => tabHandler(item.title)}
                >
                  <Link
                    className={`rounded-md  w-full ${
                      isOpen ? "text-left " : "text-center  "
                    } `}
                    to={item.ref}
                  >
                    <span
                      className={`${
                        isOpen
                          ? "ml-2 mr-2 bg-white p-1.5 rounded-full "
                          : "bg-white p-2 rounded-full hover:border-teal-500 hover:border-2"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className={`${!isOpen && "hidden"}`}>
                      {item.title}
                    </span>
                  </Link>
                </li>
              );
            })}

            <button
              className={`rounded-md p-2 w-full  ${
                isOpen
                  ? "text-left hover:bg-gray-100 hover:bg-opacity-20 hover:border border-white"
                  : "text-center"
              }`}
              onClick={logoutHandler}
            >
              <span
                className={`${
                  isOpen
                    ? "ml-2 mr-2 bg-white p-1.5 rounded-full"
                    : "bg-white p-2 rounded-full hover:border-teal-500 hover:border-2 "
                }`}
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="bg-white rounded-full"
                  size="lg"
                />
              </span>
              <span className={`text-[#52514f] ${!isOpen && "hidden"}`}>
                Logout
              </span>
            </button>
          </ul>
        </div>
      </div>

      <div
        className="tooltip tooltip-right self-center tooltip-info z-[999]"
        data-tip={!isOpen ? "Open Navigation" : "Close Navigation"}
      >
        <button
          className="w-fit left-0 ml-2 absolute "
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon
            icon={faCircleChevronDown}
            size="2xl"
            className={`z-[999] text-blue-500 bg-blue-400 ${
              isOpen
                ? "rotate-[90deg] bg-white rounded-full border-[2px] border-white"
                : "rotate-[270deg] bg-white rounded-full border-[2px] border-white"
            } duration-700`}
          />
        </button>
      </div>
    </div>


*/
