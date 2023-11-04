import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../../../Redux/Actions/doctorActions";
import Loader from "../../../UI/Loader";
import TableList from "../../../UI/TableList";
const doctorsOptions = [
  "Neurologist",
  "Family Doctor",
  "Gastroenterology",
  "Oncology",
  "Cardiology",
  "Psychiatrist",
  "Dermatologist",
  "Endocrinologist",
  "Hematologist",
  "Nephrologists",
  "Physiatrists",
  "Pulmonologists",
];

const DoctorRequests = () => {
  const { doctors, isLoading } = useSelector((state) => state.doctors);
  const dispatch = useDispatch();
  const [optionSelected, setOptionSelected] = useState("Filter");

  const optionsHandler = (e) => {
    console.log(e);
    setOptionSelected(e.target.value);
  };

  useEffect(() => {
    const fetchDoctorsData = async () => {
      dispatch(await getAllDoctors());
    };
    fetchDoctorsData();
  }, []);

  if (isLoading) return <Loader />;
  return (
    <div className="py-6 flex flex-col w-full justify-center items-center">
      <div className="join">
        <div>
          <div>
            <input
              className="input input-bordered join-item"
              placeholder="Search"
            />
          </div>
        </div>
        <select
          className="select select-bordered join-item"
          value={optionSelected}
          onChange={optionsHandler}
        >
          <option disabled>Filter</option>
          {doctorsOptions.map((doctor, index) => {
            return (
              <option key={index} value={doctor}>
                {doctor}
              </option>
            );
          })}
        </select>
        <div className="indicator">
          <button className="btn join-item">Search</button>
        </div>
      </div>
      <div className="w-full mt-4 p-3 max-w-md bg-white bg-opacity-10 backdrop-blur-md backdrop-filter border border-gray-200 border-double rounded-lg shadow ">
        <TableList props={doctors} />
      </div>
    </div>
  );
};

export default DoctorRequests;
