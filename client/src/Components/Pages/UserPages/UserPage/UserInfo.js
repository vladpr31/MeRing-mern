import React, { useState, useEffect } from "react";
import Card from "../../../UI/Card";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWindowSize from "../../../../hooks/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelAppointment,
  getPatientAppointments,
} from "../../../../Redux/Actions/userActions";
import TableList from "../../../UI/TableList";
import Loader from "../../../UI/Loader";
import { useParams } from "react-router";
import Heart from "../../../UI/Heart";
import VisitsChart from "../../../UI/Charts/VisitsChart";
const UserInfo = () => {
  const { id } = useParams();
  const { width } = useWindowSize();
  const isMobile = width <= 960;
  const [appointments, setAppointments] = useState([]);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cancelAppointmentHandler = (appointment) => {
    dispatch(cancelAppointment(appointment, id));
  };

  useEffect(() => {
    const fetchPatientAppointments = async () => {
      await dispatch(getPatientAppointments(id));
      if (user.appointments && typeof user.appointments === "object") {
        let appointments = user?.appointments?.sort(function (a, b) {
          return (
            new Date(a.appointmentDateTime) - new Date(b.appointmentDateTime)
          );
        });
        setAppointments(appointments);
      }
    };
    fetchPatientAppointments();
  }, [user.appointments.length]);
  if (appointments?.length < 0 || !appointments) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between pt-8 px-20">
      <div className="flex flex-col justify-center gap-y-5 items-center md:jutify-start md:items-start pb-20 md:pb-0">
        <h1 className="text-[28px] text-[#52514f] p-2 mb-4 w-fit underline underline-offset-[6px]">
          <FontAwesomeIcon
            icon={faCircle}
            style={{ color: "#1d7bf7" }}
            size="xs"
            className="mr-4 scale-50"
          />
          Latest Vitals
        </h1>
        <div className="w-full grid gap-x-5 gap-y-5 md:grid md:grid-cols-3">
          <Card
            props={{
              type: "Body Temperature",
              metrics: "°C",
              value: Math.floor(Math.random() * (45 - 35) + 35),
              maxValue: 38,
            }}
          />
          <Card
            props={{
              type: "Blood Sugar",
              metrics: "mg/dL",
              value: Math.floor(Math.random() * (500 - 50)) + 50,
              maxValue: 500,
            }}
          />

          <Card
            props={{
              type: "Blood Pressure",
              metrics: "mmhg",
              maxValue: 150,
              firstValue: Math.floor(Math.random() * (150 - 75)) + 75,
              secondValue: Math.floor(Math.random() * (91 - 50)) + 50,
            }}
          />
        </div>
        <div className="mt-4 w-full pb-20 md:pb-0">
          <h1 className="text-[28px] text-[#52514f] w-fit underline underline-offset-[6px] mb-4 ">
            <FontAwesomeIcon
              icon={faCircle}
              style={{ color: "#1d7bf7" }}
              size="xs"
              className="mr-4 scale-50"
            />
            Next Chekup
          </h1>
          <div className="w-full p-3 max-w-lg bg-white bg-opacity-10 border border-gray-200 border-double rounded-lg shadow ">
            <div className="flex">
              <h5 className="text-xl font-bold leading-none text-[#52514f] underline underline-offset-2">
                Closest Appointment
              </h5>
            </div>
            <TableList
              data={appointments}
              type={"userAppointments"}
              confirmButtonAction={cancelAppointmentHandler}
            />
          </div>
        </div>
        <VisitsChart chartData={appointments} />
      </div>
      <div className="relative top-0 px-12 py-12">
        <Heart />
      </div>
    </div>
  );
};

export default UserInfo;

/*
<div className="flex flex-col lg:pb-0 xl:pb-0 scale-[0.9] xl:scale-[1] lg:flex-row justify-between w-full lg:pl-12 xl:pl-12">
      <div className="flex flex-col p-4">
        {isMobile ? <Heart isMobile={isMobile} /> : null}
        <h1 className="text-[28px] text-[#52514f] p-2 mb-4 w-fit underline underline-offset-[6px]">
          <FontAwesomeIcon
            icon={faCircle}
            style={{ color: "#1d7bf7" }}
            size="xs"
            className="mr-4 scale-50"
          />
          Latest Vitals
        </h1>
        <div className="flex gap-x-4 gap-y-4 flex-col xl:flex-row lg:flex-col md:flex-col ">
          <Card
            props={{
              type: "Blood Sugar",
              metrics: "mg/dL",
              value: Math.floor(Math.random() * (500 - 50)) + 50,
              maxValue: 500,
            }}
          />

          <Card
            props={{
              type: "Blood Pressure",
              metrics: "mmhg",
              maxValue: 150,
              firstValue: Math.floor(Math.random() * (150 - 75)) + 75,
              secondValue: Math.floor(Math.random() * (91 - 50)) + 50,
            }}
          />
          <Card
            props={{
              type: "Body Temperature",
              metrics: "°C",
              value: Math.floor(Math.random() * (45 - 35) + 35),
              maxValue: 40,
            }}
          />
        </div>
        <div className="mt-4 w-full ">
          <h1 className="text-[28px] text-[#52514f] w-fit underline underline-offset-[6px] mb-4 ">
            <FontAwesomeIcon
              icon={faCircle}
              style={{ color: "#1d7bf7" }}
              size="xs"
              className="mr-4 scale-50"
            />
            Next Chekup
          </h1>
          <div className="w-full p-3 max-w-lg bg-white bg-opacity-10 border border-gray-200 border-double rounded-lg shadow ">
            <div className="flex items-center justify-between ">
              <h5 className="text-xl font-bold leading-none text-[#52514f] underline underline-offset-2">
                Closest Appointment
              </h5>
            </div>
            <TableList
              data={appointments}
              type={"userAppointments"}
              confirmButtonAction={cancelAppointmentHandler}
            />
          </div>
        </div>
      </div>
      {isMobile ? null : <Heart isMobile={isMobile} />}
    </div>


*/
