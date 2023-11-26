import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorsByCategory } from "../../../../Redux/Actions/doctorActions";
import DoctorCard from "./DoctorCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons";
import BottomNav from "../../../UI/Navbar/BottomNav";
import useWindowSize from "../../../../hooks/useWindowSize";
import DashboardNavbar from "../../../UI/Navbar/DashboardNavbar";
const clinicLocations = [
  "Ashdod M.R Center",
  "Tel Aviv M.R Center",
  "Beer Sheva M.R Center",
];
const NewAppointmentCreation = () => {
  const { doctors } = useSelector((state) => state.doctors);
  const { width } = useWindowSize();
  const [filter, setFilter] = useState("");
  const [ratingSort, setRatingSort] = useState(false);
  const [sortedDoctors, setSortedDoctors] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const loadDoctors = () => {
      dispatch(getDoctorsByCategory(params.doctorType.replace("-", " ")));
    };
    loadDoctors();
  }, []);

  const handleFilter = (e) => {
    const { value } = e.target;

    if (value === "All") {
      setFilter("");
    } else {
      setFilter(value);
    }
  };

  const sortHandler = () => {
    if (!ratingSort) {
      let sortedDoctors = doctors.sort((p1, p2) =>
        p1.rating < p2.rating ? 1 : p1.rating > p2.rating ? -1 : 0
      );
      setSortedDoctors(sortedDoctors);
      setRatingSort(true);
    } else {
      let sortedDoctors = doctors.sort((p1, p2) =>
        p1.rating < p2.rating ? -1 : p1.rating > p2.rating ? 0 : 1
      );
      setSortedDoctors(sortedDoctors);
      setRatingSort(false);
    }
  };
  if (doctors?.length <= 0) {
    return (
      <div className="items-center text-center h-screen py-3">
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={handleFilter}
          defaultValue={"DEFAULT"}
        >
          <option value="DEFAULT" disabled>
            Filter By Clinic...
          </option>
          <option>All</option>
          {clinicLocations.map((location, index) => {
            return <option key={index}>{location}</option>;
          })}
        </select>
        <button
          className="ml-3 p-1 rounded-lg bg-white items-center"
          onClick={sortHandler}
        >
          Sort By Rating
          <FontAwesomeIcon icon={faArrowDownShortWide} className="ml-2" />
        </button>
        <h1 className="text-white text-[24px] py-10">
          No Available Doctors For This Category.
        </h1>
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen">
        <div className="flex justify-center gap-x-4 py-4">
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={handleFilter}
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled>
              Filter By Clinic...
            </option>
            <option>All</option>
            {clinicLocations.map((location, index) => {
              return <option key={index}>{location}</option>;
            })}
          </select>
          <button
            className="p-2 rounded-lg bg-white items-center hover:bg-blue-500 hover:text-white"
            onClick={sortHandler}
          >
            Sort By Rating
            <FontAwesomeIcon icon={faArrowDownShortWide} className="ml-2" />
          </button>
        </div>
        <div className="text-left pb-20 lg:pb-0 flex flex-col justify-center items-center ">
          <ul className="h-full">
            {filter === "" && !ratingSort
              ? doctors.map((doctor, index) => {
                  return (
                    <li key={index}>
                      <DoctorCard props={{ doctor, index }} key={index} />
                    </li>
                  );
                })
              : filter === "" && ratingSort
              ? sortedDoctors.map((doctor, index) => {
                  return (
                    <li key={index}>
                      <DoctorCard props={{ doctor }} key={index} />
                    </li>
                  );
                })
              : filter !== "" && ratingSort
              ? sortedDoctors.map((doctor, index) => {
                  if (doctor.clinic.clinicName === filter) {
                    return (
                      <li key={index}>
                        <DoctorCard props={{ doctor }} key={index} />
                      </li>
                    );
                  }
                })
              : filter !== "" && !ratingSort
              ? doctors.map((doctor, index) => {
                  if (doctor.clinic.clinicName === filter) {
                    return (
                      <li key={index}>
                        <DoctorCard props={{ doctor }} key={index} />
                      </li>
                    );
                  }
                })
              : null}
          </ul>

          {width <= 768 ? <BottomNav /> : null}
        </div>
      </div>
    );
  }
};
export default NewAppointmentCreation;
