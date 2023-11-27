import React, { useState, useEffect } from "react";
import ReviewWindow from "./ReviewWindow";
import ReviewForm from "./ReviewForm";
import { getSocket } from "../../../../api/socket";
import { useDispatch } from "react-redux";
const ReviewModal = ({ doctor, handleReviewModal }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(dispatch(getSocket()));
  const [reviews, setReviews] = useState(doctor.reviews);
  const closeReviewModal = () => {};
  useEffect(() => {
    socket.on("received_review", (data) => {
      setReviews((prevState) => [...prevState, data]);
    });

    return () => {
      socket.off("received_review");
    };
  }, [doctor, socket, reviews]);

  return (
    <div className="flex flex-col lg:flex-row justify-between bg-base-300 lg:w-[1250px] w-screen items-center lg:items-start h-[600px] rounded-2xl overflow-y-auto ">
      <div className="grid w-[400px] lg:h-[600px] justify-center flex-grow bg-base-300 lg:overflow-y-auto">
        <div className="p-4 w-full h-full ">
          <h2 className="text-center">
            <span className="text-blue-600">
              {doctor.firstName + " " + doctor.lastName}
            </span>{" "}
            Latest Reviews:
          </h2>
          <div className="grid gap-y-5 w-full py-4">
            <ReviewWindow doctor={doctor} reviews={reviews} socket={socket} />
          </div>
        </div>
      </div>
      <div className="divider items-center text-center divider-horizontal">
        OR
      </div>
      <div className="p-4 text-center grid w-[400px] flex-grow card bg-base-300 place-items-center">
        <h1>
          Write Review About{" "}
          <span className="text-blue-600">
            {doctor.firstName + " " + doctor.lastName}
          </span>
        </h1>

        <ReviewForm socket={socket} doctor={doctor} />
      </div>
    </div>
  );
};

export default ReviewModal;
