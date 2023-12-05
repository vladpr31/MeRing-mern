import React, { useState } from "react";
import Loader from "../../../UI/Loader";
import { useSelector } from "react-redux";
import DoctorNav from "../../../UI/Navbar/DoctorNav";
import WorkerDashboard from "../WorkerDashboard/WorkerDashboard";
import RecordsPage from "../RecordsPage/RecordsPage";
const WorkerPage = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const [currentTab, setCurrentTab] = useState("dashboard");
  const tabHandler = (tab) => {
    switch (tab) {
      case "dashboard":
      case "records":
      case "my-profile":
      case "my-appointments":
      case "my-shifts":
        setCurrentTab(tab);
        break;
      default:
        setCurrentTab("dashboard");
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="px-4 h-screen">
      <DoctorNav user={user} tabHandler={tabHandler} currTab={currentTab} />
      {currentTab === "dashboard" ? <WorkerDashboard user={user} /> : null}
      {currentTab === "records" ? <RecordsPage /> : null}
    </div>
  );
};

export default WorkerPage;
