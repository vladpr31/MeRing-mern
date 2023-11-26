import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./ConfirmationModal";
const TableList = ({ data, type, clinic, confirmButtonAction }) => {
  const removeShiftHandler = (e) => {
    const { id } = e.target;
    confirmButtonAction(id);
  };
  const cancelAppointmentHandler = (e) => {
    const { id } = e.target;
    confirmButtonAction(id);
  };

  if (data?.length <= 0 || !data) {
    return (
      <ul className="divide-y divide-gray-200 w-full">
        <li className="py-4 lg:py-3 text-[#52514f]">
          Nothing Scheduled For Now.
        </li>
      </ul>
    );
  } else {
    if (type === "userAppointments") {
      return (
        <ul className="divide-y divide-gray-200 w-full">
          {data?.map((item, index) => {
            return (
              <li className="py-4 lg:py-3" key={index}>
                <div className="flex items-center space-x-4 ">
                  <div className="mask mask-hexagon">
                    <img
                      className="w-[50px] h-[50px]"
                      src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                      alt="avatar-holder"
                    />
                  </div>
                  <div className="flex-1 min-w-0 grow-1">
                    <p className="badge text-sm font-medium text-black truncate ">
                      {item?.doctor
                        ? item?.doctor?.firstName + " " + item?.doctor?.lastName
                        : item.firstName + " " + item.lastName}
                    </p>
                    <p className="text-sm text-[#52514f] truncate ">
                      <span className="underline underline-offset-2">
                        Clinic:{" "}
                      </span>{" "}
                      {item?.clinic?.clinicName}
                    </p>
                    <p className="text-sm text-[#52514f] truncate ">
                      <span className="underline underline-offset-2">
                        Address:{" "}
                      </span>{" "}
                      {item?.clinic?.location}
                    </p>
                  </div>
                  {item?.appointmentDateTime ? (
                    <div className="flex flex-col items-center text-base font-semibold text-gray-100 ">
                      {new Date(item.appointmentDateTime).toLocaleDateString(
                        "en-GB"
                      )}
                      <p className="badge badge-ghost">
                        {new Date(item.appointmentDateTime).toLocaleTimeString(
                          "en-GB",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  ) : (
                    <ConfirmationModal
                      confirmText={"Appointment Will be cancled."}
                      confirmQuestion={
                        "Are You Sure You Want To Cancel This Appointment?"
                      }
                      confirmIcon={
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          style={{ color: "white" }}
                        />
                      }
                      confirmIconBGColor={"bg-red-500"}
                      confirmationAction={cancelAppointmentHandler}
                      confirmationId={item?._id}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
  }
  if (type === "doctorShifts") {
    return (
      <ul className="divide-y divide-gray-200 w-full">
        {data?.map((shift, index) => {
          return (
            <li
              className="flex items-center space-x-4 py-4 lg:py-3"
              key={index}
            >
              <div className="flex items-center space-x-4 ">
                <div className="flex flex-1 items-center min-w-0 grow-1 p-2 bg-gray-800 rounded-2xl">
                  <div className="px-2 rounded-full bg-white h-full">
                    {index + 1}
                  </div>
                  <div className="flex flex-col p-2.5 ">
                    <p className="text-[#52514f] ">
                      On:{" "}
                      {new Date(shift.shiftDate).toLocaleDateString("en-GB")}{" "}
                      At:{" "}
                      {new Date(shift.shiftDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </p>
                    <p className="text-sm text-[#52514f] truncate ">
                      Clinic: {clinic}
                    </p>
                  </div>
                </div>
              </div>
              <ConfirmationModal
                confirmText={
                  "Shift Will be deleted and all appointments will be canceled"
                }
                confirmQuestion={"Are You Sure You Want To Remove This Shift?"}
                confirmIcon={
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    style={{ color: "white" }}
                  />
                }
                confirmIconBGColor={"bg-red-500"}
                confirmationAction={removeShiftHandler}
                confirmationId={shift._id}
              />
            </li>
          );
        })}
      </ul>
    );
  }
  if (type === "doctorAppointments") {
    return (
      <ul className="divide-y divide-gray-200 w-full ">
        {data?.map((item, index) => {
          return (
            <li className="py-4 lg:py-3" key={index}>
              <div className="flex items-center space-x-4 ">
                <div className="mask mask-hexagon">
                  <img
                    className="w-[50px] h-[50px]"
                    src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                    alt="avatar-holder"
                  />
                </div>
                <div className="flex-1 min-w-0 grow-1">
                  <p className="badge text-sm font-medium text-black truncate ">
                    {"Patient: " +
                      item.patient.firstName +
                      " " +
                      item.patient.lastName}
                  </p>
                  <p className="text-sm text-[#52514f] truncate ">
                    <span className="underline underline-offset-2">
                      Clinic:{" "}
                    </span>
                    {clinic.clinicName}
                  </p>
                  <p className="text-sm text-[#52514f] truncate ">
                    <span className="underline underline-offset-2">
                      Address:{" "}
                    </span>
                    {clinic.location}
                  </p>
                </div>
                {item?.appointment.shiftDate ? (
                  <div className="flex flex-col items-center text-base font-semibold text-gray-100 ">
                    {new Date(item.appointment.shiftDate).toLocaleDateString(
                      "en-GB"
                    )}
                    <p className="badge badge-ghost">
                      {new Date(item.appointment.shiftDate).toLocaleTimeString(
                        "en-GB",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
};

export default TableList;
