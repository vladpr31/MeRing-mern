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
      <>
        <DashboardNavbar currViewHandler={currentViewHandler} />

        <div className="pb-20 lg:pb-0 xl:pb-0 flex bg-white bg-opacity-20 grow ">
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
      </>
    );
  }
};

export default UserPage;
