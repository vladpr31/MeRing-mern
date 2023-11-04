import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMessage } from "@fortawesome/free-solid-svg-icons";
import Appointment from "../../../../Assets/doctor.png";
import AppointmentModal from "./AppointmentModal";
import useWindowSize from "../../../../hooks/useWindowSize";
import ReviewModal from "./ReviewModal";
const DoctorCard = ({ props }) => {
  const handleAppointmentModal = () => {
    document.getElementById(`appointment_modal_${props.index}`).showModal();
  };
  const handleReviewModal = () => {
    document.getElementById(`review_modal_${props.index}`).showModal();
  };
  const { width } = useWindowSize();
  //in case doctor doesnt have a clinic, dont show his card.
  //(Happens if clinic is deleted from the "Admin Panel").
  if (!props.doctor.clinic) {
    return;
  } else {
    return (
      <>
        <div className="relative flex flex-col mx-auto md:flex-row rounded-xl shadow-lg p-3 mt-2 border border-white bg-white">
          <div className="avatar mx-auto">
            <div className=" mask mask-hexagon bg-purple-400">
              <img src="https://cdn-icons-png.flaticon.com/256/6069/6069189.png" />
            </div>
          </div>

          <div className="w-full items-center lg:items-start bg-white flex flex-col space-y-2 ">
            <div className="flex justify-between flex-col items-center">
              <p className="text-gray-500 font-medium  md:block">
                {props.doctor.speciality}
              </p>
              <div className="flex">
                <p className="text-gray-600 font-bold text-sm">
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: "#dfc258" }}
                    className="ml-1"
                  />
                  {props.doctor.rating.rating}
                  <button
                    className="text-gray-500 ml-2 font-normal hover:underline"
                    onClick={handleReviewModal}
                  >
                    ({props.doctor.rating.length} Review)
                  </button>
                </p>
              </div>
            </div>
            <h3 className="font-black text-gray-800 md:text-3xl text-xl">
              {props.doctor.firstName + " " + props.doctor.lastName}
            </h3>
            <p className="md:text-lg text-gray-500 text-base">
              {props.doctor.clinic.clinicName}
            </p>
            <p className="md:text-sm text-gray-500 text-base">
              {props.doctor.clinic.location}
            </p>
          </div>
          <div>
            <button
              className="text-left w-full lg:h-fit mg:h-fit lg:w-fit md:w-fit  outline-none text-center mx-auto bg-teal-200 border-2 border-black rounded-xl justify-end h-[50px] w-[50px] hover:bg-green-400"
              onClick={handleAppointmentModal}
            >
              {width > 768 ? <img src={Appointment} /> : "Schedule Now"}
            </button>
            <button className="text-left w-full outline-none text-center mx-auto bg-teal-200 border-2 border-black rounded-xl justify-end h-[50px] w-[50px] hover:bg-green-400">
              <FontAwesomeIcon icon={faMessage} size="xl" />
            </button>
          </div>
        </div>
        <dialog
          id={`appointment_modal_${props.index}`}
          className="modal sm:modal-middle "
        >
          <AppointmentModal props={{ doctor: props.doctor }} />
        </dialog>
        <dialog
          id={`review_modal_${props.index}`}
          className="modal sm:modal-middle"
        >
          <ReviewModal props={{ doctor: props.doctor }} />
        </dialog>
      </>
    );
  }
};

export default DoctorCard;
