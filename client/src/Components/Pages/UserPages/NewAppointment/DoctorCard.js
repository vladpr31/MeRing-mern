import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMessage } from "@fortawesome/free-solid-svg-icons";
import AppointmentBlack from "../../../../Assets/doctor-black.png";
import AppointmentWhite from "../../../../Assets/doctor-white.png";
import AppointmentModal from "./AppointmentModal";
import useWindowSize from "../../../../hooks/useWindowSize";
import ReviewModal from "../Reviews/ReviewModal";
const DoctorCard = ({ props }) => {
  //Didn't have an appropriate Icon so made 1 black and 1 white and change between them with mouseover event.
  const [mouseHover, setMouseHover] = useState(false);
  const mouseHoverHandler = () => {
    setMouseHover(!mouseHover);
  };

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
          <div className="avatar mx-auto items-center p-2">
            <div className="bg-purple-400 rounded-full w-24 h-24 mx-auto">
              <img
                src={props.doctor.profileImage.large}
                className="object-scale-down"
              />
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
                    ({props.doctor.rating.length} Reviews)
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
              className="text-left w-full lg:h-fit mg:h-fit lg:w-fit md:w-fit  outline-none text-center mx-auto rounded-xl justify-end h-[35px] w-[35px] hover:bg-green-600"
              onClick={handleAppointmentModal}
            >
              {width > 768 ? (
                <img
                  src={mouseHover ? AppointmentWhite : AppointmentBlack}
                  onMouseOver={mouseHoverHandler}
                  onMouseOut={mouseHoverHandler}
                />
              ) : (
                "Schedule Now"
              )}
            </button>
            <button className="text-left w-full outline-none hover:text-white text-center mx-auto rounded-xl justify-end h-[50px] w-[50px] hover:bg-green-600">
              <FontAwesomeIcon icon={faMessage} size="lg" />
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
          <ReviewModal doctor={props.doctor} />
        </dialog>
      </>
    );
  }
};

export default DoctorCard;
