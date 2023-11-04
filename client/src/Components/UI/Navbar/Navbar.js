import React, { useState, useEffect } from "react";
import Logo from "../../../Assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../../Redux/Actions/authActions";
import { NavItems } from "../../../utils/utils";

const Navbar = () => {
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useNavigate();
  const [navBarState, setNavBarState] = useState(() =>
    window.location.href.includes(auth?.id) ? false : true
  );
  useEffect(() => {
    if (window.location.href.includes(auth?.id)) {
      setNavBarState(false);
    } else {
      setNavBarState(true);
    }
  }, [window.location.href]);
  return navBarState ? (
    <div className="drawer-end">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-full flex flex-col fixed top-0 z-[50] text-white">
        <div className="bg-white w-full backdrop-blur-lg backdrop-filter bg-opacity-20">
          <div className="w-full navbar">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <FontAwesomeIcon icon={faBars} size="lg" />
              </label>
            </div>
            <div className="flex-1 px-2 mx-2 justify-end lg:justify-start">
              <a className="normal-case text-xl btn btn-ghost" href="/">
                <img
                  src={Logo}
                  alt="nav-logo"
                  className="h-[50px] w-[100px] lg:w-[120px]"
                />
              </a>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {auth
                  ? NavItems.map((item, index) => {
                      if (
                        item.title !== "Register" &&
                        item.title !== "Log-In" &&
                        item.title !== "My Profile" &&
                        item.title !== "Logout"
                      ) {
                        return (
                          <li
                            key={index}
                            className={`hover:after:content-['${item.title}']`}
                          >
                            <a key={index} href={item.refTo}>
                              {item.title}
                            </a>
                          </li>
                        );
                      } else if (item.title === "My Profile") {
                        if (auth.role === "admin") {
                          return (
                            <li key={index}>
                              <a
                                key={index}
                                href="/admin"
                                className="bg-blue-600"
                              >
                                Admin Page
                              </a>
                            </li>
                          );
                        }
                        return (
                          <li key={index}>
                            <a
                              key={index}
                              href={`${auth.role}/${auth.id}`}
                              className="bg-blue-600"
                            >
                              {item.title}
                            </a>
                          </li>
                        );
                      } else if (item.title === "Logout") {
                        return (
                          <li key={index}>
                            <a href={item.refTo}>
                              <button
                                key={index}
                                onClick={() => dispatch(logout(location))}
                              >
                                {item.title}
                              </button>
                            </a>
                          </li>
                        );
                      }
                    })
                  : NavItems.map((item, index) => {
                      if (
                        item.title !== "My Profile" &&
                        item.title !== "Logout"
                      ) {
                        return (
                          <li key={index}>
                            <a key={index} href={item.refTo}>
                              {item.title}
                            </a>
                          </li>
                        );
                      }
                    })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="drawer-side z-[9999]">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-center z-[9999]">
          {auth
            ? NavItems.map((item, index) => {
                if (
                  item.title !== "Register" &&
                  item.title !== "Log-In" &&
                  item.title !== "My Profile"
                ) {
                  if (item.title === "Logout") {
                    return (
                      <li
                        key={index}
                        className="mt-2 mb-2 w-full text-center"
                        onClick={() => dispatch(logout(location))}
                      >
                        <a
                          href={item.refTo}
                          className="p-4 w-full h-full pointer-event-none"
                        >
                          <span className="mr-2">{item.src}</span>
                          {item.title}
                        </a>
                      </li>
                    );
                  } else {
                    return (
                      <li key={index} className="mt-2 mb-2 w-full text-center">
                        <a key={index} href={item.refTo} className="p-4">
                          {item.src}
                          {item.title}
                        </a>
                      </li>
                    );
                  }
                } else if (item.title === "My Profile") {
                  if (auth.role === "admin") {
                    return (
                      <li key={index}>
                        <a key={index} href="/admin">
                          Admin Page
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={index} className="mt-2 mb-2">
                      <a
                        key={index}
                        href={`${auth.role}/${auth.id}`}
                        className="p-4"
                      >
                        {item.src}
                        {item.title}
                      </a>
                    </li>
                  );
                }
              })
            : NavItems.map((item, index) => {
                if (item.title !== "My Profile" && item.title !== "Logout") {
                  return (
                    <li key={index} className="text-center mt-2 mb-2">
                      <a key={index} href={item.refTo} className="">
                        {item.src}
                        {item.title}
                      </a>
                    </li>
                  );
                }
              })}
        </ul>
      </div>
    </div>
  ) : null;
};

export default Navbar;
