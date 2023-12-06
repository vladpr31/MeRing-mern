import React from "react";
import SideMenu from "../../../UI/SideMenu";
import { useSelector } from "react-redux";
import DashboardNavbar from "../../../UI/Navbar/DashboardNavbar";
import useWindowSize from "../../../../hooks/useWindowSize";
import BottomNav from "../../../UI/Navbar/BottomNav";
import Loader from "../../../UI/Loader";
import MedicalRecordModal from "../../../Modals/MedicalRecordModal";
const UserPage = ({ children }) => {
  const { user, isLoading } = useSelector((state) => state.user);
  const { auth } = useSelector((state) => state.auth);
  const { width } = useWindowSize();
  const isMobile = width <= 1024;

  const currentViewHandler = (view) => {
    localStorage.setItem("currTab", view);
  };
  if (!user.medicalRecord) {
    <MedicalRecordModal />;
  }
  if (isLoading && auth.role !== "admin") {
    return <Loader />;
  } else {
    return (
      <div className="bg-black bg-opacity-10">
        <div className="flex">
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
          <div className="flex flex-col w-full">
            <DashboardNavbar currViewHandler={currentViewHandler} />
            {children}
          </div>
        </div>
      </div>
    );
  }
};

export default UserPage;
