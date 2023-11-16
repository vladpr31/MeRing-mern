import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../UI/Loader";
import TableList from "../../../UI/TableList";
import ShiftForm from "../../../Forms/ShiftForm";
import { removeShift } from "../../../../Redux/Actions/doctorActions";
import { getGreetingText } from "../../../../utils/utils";
import useWindowSize from "../../../../hooks/useWindowSize";

const WorkerPage = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const isMobile = width <= 1024;
  const removeShiftHandler = (shiftId) => {
    dispatch(removeShift(auth.id, shiftId));
  };
  const greetingText = getGreetingText();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="p-4 w-full">
      <h1
        className={`text-white text-[24px] text-center bg-white bg-opacity-10 ${
          isMobile ? "" : "backdrop-brightness-150"
        } w-fit mx-auto p-2 rounded-full`}
      >
        {greetingText + " Dr. " + user.firstName + " " + user.lastName}
      </h1>
      <div className="flex p-4 gap-y-4 lg:gap-x-4 flex-col justify-between lg:justify-evenly lg:flex-row">
        <div
          className={`w-full p-3 max-w-md bg-white bg-opacity-10 ${
            isMobile ? "" : "backdrop-blur-md backdrop-filter"
          } border border-gray-200 border-double rounded-lg shadow`}
        >
          <div className="flex items-center justify-between ">
            <h5 className="text-xl font-bold leading-none text-white underline underline-offset-2">
              Closest Appointments
            </h5>
          </div>
          <TableList
            type={"doctorAppointments"}
            data={user.appointments}
            clinic={user.clinic}
          />
        </div>
        <div>
          <div
            className={`w-full p-3 max-w-md bg-white bg-opacity-10 ${
              isMobile ? "" : "backdrop-blur-md backdrop-filter"
            } border border-gray-200 border-double rounded-lg shadow`}
          >
            <div className="flex items-center justify-between ">
              <h5 className="text-xl font-bold leading-none text-white p-2 whitespace-nowrap underline underline-offset-2">
                Your Shifts
              </h5>
              <button
                className="btn text-[14px] badge bg-blue-500 badge-lg border-2 border-solid border-white "
                onClick={() =>
                  document.getElementById("create_shift_modal").showModal()
                }
              >
                <FontAwesomeIcon
                  icon={faCalendarPlus}
                  size="xl"
                  style={{ color: "white" }}
                />
              </button>

              <dialog id="create_shift_modal" className="modal">
                <div className="modal-box">
                  <ShiftForm />
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
            <TableList
              data={user.shifts}
              type={"doctorShifts"}
              clinic={user.clinic.clinicName}
              confirmButtonAction={removeShiftHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerPage;
