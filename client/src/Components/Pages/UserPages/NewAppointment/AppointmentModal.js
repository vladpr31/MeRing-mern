import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ReactCalendar.css";
import { useDispatch, useSelector } from "react-redux";
import { createNewAppointment } from "../../../../Redux/Actions/userActions";

const AppointmentModal = ({ props }) => {
  const { auth } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [date, setDate] = useState();
  const [appointments, setAppointments] = useState(props.doctor.shifts);
  const [showModal, setShowModal] = useState(false);
  const [appointment, setAppointment] = useState();
  const [activeButton, setActiveButton] = useState();
  const dateHandler = (selectedDate) => {
    setDate(selectedDate);
  };
  const choosenAppointmentHandler = (e) => {
    e.preventDefault();
    setAppointment(e.target.value);
    setActiveButton(e.target.id);
  };
  const createAppointmentHandler = () => {
    dispatch(createNewAppointment(appointment, auth.id, props.doctor));
    setDate(null);
    setAppointment(null);
  };
  const isDateDisabled = (date) => {
    return !appointments.some(
      (appointment) =>
        date.getFullYear() === new Date(appointment.shiftDate).getFullYear() &&
        date.getMonth() === new Date(appointment.shiftDate).getMonth() &&
        date.getDate() === new Date(appointment.shiftDate).getDate() &&
        appointment.available === true
    );
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center rounded-xl p-12 flex-col text-center">
      <h1 className="text-[28px] mb-2 underline">
        Dr.
        {" " + props.doctor.firstName + " " + props.doctor.lastName}
      </h1>
      {showModal ? (
        <form
          className="modal-box p-16 justify-center items-center"
          method="dialog"
        >
          <Calendar
            minDate={new Date()}
            value={date}
            onChange={dateHandler}
            className="mb-2 p-2"
            showNeighboringMonth={false}
            minDetail="year"
            nextLabel=">"
            nextAriaLabel="Go to next month"
            next2Label=">>"
            next2AriaLabel="Go to next year"
            tileDisabled={({ date }) => isDateDisabled(date)}
            calendarType="hebrew"
          />

          {date ? (
            <div className="flex flex-col">
              <label key={Math.floor(Math.random())}>Availability:</label>
              <div className="grid gap-2 grid-cols-3 p-6">
                {appointments.map((appointment, index) => {
                  if (
                    new Date(appointment.shiftDate).toLocaleDateString() ===
                      new Date(date).toLocaleDateString() &&
                    appointment.available === true
                  ) {
                    return (
                      <button
                        className={
                          activeButton === `timeBtn-${index}`
                            ? "bg-emerald-500 w-fit text-gray-100 px-1.5 mb-2 rounded-xl border-4 border-slate-700 border-solid scale-125"
                            : "bg-green-200 w-fit px-1.5 rounded-xl mb-2 border-solid"
                        }
                        value={appointment._id}
                        onClick={choosenAppointmentHandler}
                        id={`timeBtn-${index}`}
                      >
                        {new Date(appointment.shiftDate).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          }
                        )}
                      </button>
                    );
                  }
                })}
              </div>
            </div>
          ) : null}
          <div className="flex justify-between">
            <button className="modal-action mr-3 bg-red-300 p-2 rounded-xl hover:bg-red-400">
              Close
            </button>
            <button
              className="modal-action ml-2 bg-blue-500 p-2 rounded-xl text-white hover:bg-blue-600"
              onClick={createAppointmentHandler}
            >
              Create
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col bg-white items-center p-6 rounded-2xl ">
          {user.gender !== props.doctor.gender ? (
            <h1 className="bg-gray-600 text-white rounded-2xl p-2">
              Note:
              <br />
              This is a{" "}
              <span className="underline text-red-500">
                {user.gender === "Male" ? "female" : "male "}
              </span>{" "}
              doctor.
              <br /> If you still want to proceed with creating this appointment
              note that you are allowed to bring an escort or apotropos.
            </h1>
          ) : null}
          <h2 className="text-[32px]">My Services:</h2>
          <ol className="p-6 w-fit text-left bg-cyan-500 bg-opacity-40 list-decimal rounded-2xl mb-4">
            <li className="m-2">
              {" "}
              <span className="badge badge-lg">
                Patient Care Should Be Number One Priority.
              </span>
            </li>
            <li className="m-2">
              <span className="badge badge-lg">Proper disease diagnosis</span>
            </li>
            <li className="m-2">
              <span className="badge badge-lg">
                Ongoing care for common illnesses
              </span>
            </li>
            <li className="m-2">
              <span className="badge badge-lg">Annual checkups</span>
            </li>
            <li className="m-2">
              <span className="badge badge-lg">
                Screening for common age-related conditions
              </span>
            </li>
          </ol>
          <button
            className="bg-green-300 p-2 rounded-xl w-fit"
            onClick={() => setShowModal(!showModal)}
          >
            Book
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentModal;
