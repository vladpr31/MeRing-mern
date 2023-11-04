import React, { useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { createNewShift } from "../../Redux/Actions/doctorActions";

const ShiftForm = () => {
  const [date, setDate] = useState(new Date());
  const { auth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const dateHandler = (selectedDate) => {
    if (+date !== +selectedDate) {
      setDate(selectedDate);
    }
  };
  const timeHandler = (e) => {
    let dateString = date.toLocaleDateString().split("/");
    let day = dateString[1];
    let month = dateString[0];
    let year = dateString[2];
    let time = e.target.value.split(":");
    let hour = time[0];
    let minutes = time[1];
    const newDate = new Date(year, month - 1, day, hour, minutes, 0, 0);
    setDate(newDate);
  };
  const createShiftHandler = (e) => {
    if (date) {
      dispatch(createNewShift(auth.id, auth.role, date));
    }
  };

  return (
    <div className="flex flex-col">
      <div className="text-center p-2">
        <h1 className="p-2">New Appointment</h1>
      </div>
      <div className="flex justify-center p-4">
        <form className="flex flex-col justify-between" action="submit">
          <label className="font-bold mb-2 badge badge-success">
            Appointment Date:
          </label>
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
            tileDisabled={({ date }) => [5, 6].includes(date.getDay())}
            calendarType="hebrew"
          />

          <div className="flex justify-between items-center p-2">
            <label className="badge badge-success font-bold">
              Appointment Time:
            </label>
            <input
              type="time"
              value={date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
              className="p-2 border-2 border-solid border-black"
              onChange={timeHandler}
            />
          </div>
          <button
            className="btn bg-green-400"
            type="submit"
            onClick={createShiftHandler}
          >
            Create Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShiftForm;
