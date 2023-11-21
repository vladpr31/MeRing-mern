import React from "react";
import SideMenu from "../../../UI/SideMenu";
import { useSelector } from "react-redux";
import DashboardNavbar from "../../../UI/Navbar/DashboardNavbar";
import useWindowSize from "../../../../hooks/useWindowSize";
import BottomNav from "../../../UI/Navbar/BottomNav";
import Loader from "../../../UI/Loader";
const UserPage = ({ children }) => {
  const { user, isLoading } = useSelector((state) => state.user);
  const { auth } = useSelector((state) => state.auth);
  const { width } = useWindowSize();
  const isMobile = width <= 1024;

  const currentViewHandler = (view) => {
    localStorage.setItem("currTab", view);
  };

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="lg:h-screen lg:overflow-y-hidden">
        <DashboardNavbar currViewHandler={currentViewHandler} />

        <div className="flex bg-white lg:h-screen bg-opacity-20">
          {!isMobile && auth.role !== "doctor" && auth.role !== "admin" ? (
            <SideMenu
              props={{
                patientName: user.firstName + " " + user.lastName,
                currentViewHandler,
              }}
            />
          ) : isMobile && auth.role !== "doctor" && auth.role !== "admin" ? (
            <BottomNav currViewHandler={currentViewHandler} />
          ) : null}
          {children}
        </div>
      </div>
    );
  }
};

export default UserPage;
