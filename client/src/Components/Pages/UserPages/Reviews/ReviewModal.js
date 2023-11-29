import React, { useState, useEffect } from "react";
import ReviewWindow from "./ReviewWindow";
import ReviewForm from "./ReviewForm";
import { getSocket } from "../../../../api/socket";
import { useDispatch } from "react-redux";
const ReviewModal = ({ doctor, handleReviewModal }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(dispatch(getSocket()));
  const [reviews, setReviews] = useState(doctor.reviews);
  useEffect(() => {
    socket.on("received_review", (data) => {
      setReviews((prevState) => [...prevState, data]);
    });
    socket.on("review_updated", (data) => {
      const updatedReview = reviews.map((review) => {
        if (review._id === data._id) {
          return data;
        }
        return review;
      });
      setReviews(updatedReview);
    });
    socket.on("review_deleted", (data) => {
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== data)
      );
    });
    return () => {
      socket.off("received_review");
      socket.off("review_updated");
    };
  }, [doctor, socket, reviews]);

  return (
    <div className="flex flex-col-reverse xl:flex-row justify-between bg-base-300 xl:w-[1250px] w-fit items-center xl:items-start h-[600px] rounded-2xl overflow-y-auto ">
      <div className="grid w-[400px] xl:h-[600px] justify-center flex-grow bg-base-300 xl:overflow-y-auto">
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
      <div className="divider items-center text-center divider-horizontal"></div>
      <div className="p-4 text-center grid w-[400px] flex-grow card bg-base-300 place-items-center">
        <h1>
          Write Review About{" "}
          <span className="text-blue-600">
            {doctor.firstName + " " + doctor.lastName}
          </span>
        </h1>

        <ReviewForm socket={socket} doctor={doctor} />
      </div>
      <button
        className="px-2 py-1 rounded-full bg-white mr-2 mt-2"
        onClick={handleReviewModal}
      >
        X
      </button>
    </div>
  );
};

export default ReviewModal;
