import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import AppointmentBlack from "../../../../Assets/doctor-black.png";
import AppointmentModal from "./AppointmentModal";
import useWindowSize from "../../../../hooks/useWindowSize";
import ReviewModal from "../Reviews/ReviewModal";
import { StarRating } from "../../../../utils/utils";
const DoctorCard = ({ props }) => {
  const doctorRating = () => {
    let rating = 0;
    props.doctor.reviews.map((review) => {
      rating += review.rating;
    });
    rating = rating / props.doctor.reviews.length;
    return Number(rating.toFixed(1)) || 0;
  };
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleAppointmentModal = () => {
    setShowAppointmentModal(!showAppointmentModal);
  };
  const handleReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };
  useEffect(() => {
    if (showReviewModal) {
      document.getElementById(`review_modal_${props.index}`).showModal();
    }

    if (showAppointmentModal) {
      document.getElementById(`appointment_modal_${props.index}`).showModal();
    }
  }, [showAppointmentModal, showReviewModal]);

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
              <h1 className="text-gray-500 font-medium md:block">
                {props.doctor.speciality}
              </h1>
              <div className="flex text-sm">
                <span className="">{doctorRating()}</span>
                <span className="ml-2">{StarRating(doctorRating())}</span>
                <button
                  className="text-gray-500 ml-2 font-normal hover:underline"
                  onClick={handleReviewModal}
                >
                  ({props.doctor.reviews.length} Reviews)
                </button>
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
              className="text-left w-full bg-blue-200 outline-none text-center mx-auto rounded-xl justify-end hover:bg-blue-300"
              onClick={handleAppointmentModal}
            >
              {width > 768 ? (
                <img src={AppointmentBlack} className="w-16" />
              ) : (
                "Schedule Now"
              )}
            </button>
            <button className="text-left w-full outline-none hover:text-white text-center mx-auto rounded-xl justify-end h-[50px] w-[50px] hover:bg-green-600">
              <FontAwesomeIcon icon={faMessage} size="lg" />
            </button>
          </div>
        </div>
        {showAppointmentModal ? (
          <dialog
            id={`appointment_modal_${props.index}`}
            className="modal sm:modal-middle "
          >
            <AppointmentModal props={{ doctor: props.doctor }} />
          </dialog>
        ) : null}
        {showReviewModal ? (
          <dialog
            id={`review_modal_${props.index}`}
            className="modal sm:modal-middle"
          >
            <ReviewModal
              doctor={props.doctor}
              handleReviewModal={handleReviewModal}
            />
          </dialog>
        ) : null}
      </>
    );
  }
};

export default DoctorCard;
