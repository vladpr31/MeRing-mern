import React, { useState } from "react";
import ReviewWindow from "./ReviewWindow";
import { createNewReview } from "../../../../Redux/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const ReviewModal = ({ doctor }) => {
  console.log(doctor);
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewFormInputs, setReviewFormInputs] = useState({
    title: "",
    reviewBody: "",
    rating: 0,
  });
  const reviewFormInputHandler = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "review-title":
        setReviewFormInputs((prevState) => ({
          ...prevState,
          title: value,
        }));
        break;
      case "review-body":
        setReviewFormInputs((prevState) => ({
          ...prevState,
          reviewBody: value,
        }));
        break;
      default:
        setReviewFormInputs({
          title: "",
          reviewBody: "",
          rating: "",
        });
    }
  };
  const reviewRatingHandler = (rateValue) => {
    setReviewFormInputs((prevState) => ({
      ...prevState,
      rating: rateValue,
    }));
  };
  const submitReviewHandler = () => {
    dispatch(createNewReview(auth.id, doctor.account, reviewFormInputs));
  };
  return doctor.rating.length > 0 ? (
    <div>
      {doctor?.rating?.map((review) => {
        return (
          <div className="chat chat-start">
            <div className="chat-header">
              {new Date(review.datePosted).toLocaleDateString("en-GB")}
              <time className="text-xs opacity-50">
                {new Date(review.datePosted).toLocaleTimeString()}
              </time>
            </div>
            <div className="chat-bubble">{review.reviewText}</div>
            <div className="chat-footer opacity-50">{review.rating}</div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="flex justify-between bg-base-300 h-[600px] w-[1000px] rounded-2xl">
      <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
        <div className="p-4 w-full h-full">
          <h2 className="text-center">
            <span className="text-blue-600">
              {doctor.firstName + " " + doctor.lastName}
            </span>{" "}
            Latest Reviews:
          </h2>
          <div className="w-full">
            <ReviewWindow doctor={doctor} />
          </div>
        </div>
      </div>
      <div className="divider divider-horizontal">OR</div>
      <div className="py-4 text-center h-full grid h-20 flex-grow card bg-base-300 place-items-center">
        <h1>
          Write Review About{" "}
          <span className="text-blue-600">
            {doctor.firstName + " " + doctor.lastName}
          </span>
        </h1>
        <div className="divider"></div>
        <form className="flex flex-col p-4 h-full w-full">
          <div className="flex flex-col h-full w-full">
            <label htmlFor="review-title">Title:</label>
            <input
              type="text"
              required
              className="rounded p-1 placeholder:text-center text-center"
              placeholder="Review Title"
              id="review-title"
              onChange={reviewFormInputHandler}
            />
            <label htmlFor="review-body" className="self-start">
              Text:
            </label>
            <textarea
              type="text"
              className="rounded-xl p-2 w-full resize-none"
              placeholder="Write Your Review..."
              required
              onChange={reviewFormInputHandler}
              id="review-body"
            />
          </div>
          <div className="rating rating-md rating-half self-center flex my-5 border-2 border-black p-2 rounded-full ">
            <input
              type="radio"
              name="rating-10"
              className="rating-hidden"
              id="review-rating-0"
              onChange={() => reviewFormInputHandler(0)}
              checked={reviewFormInputs.rating > 0 ? false : true}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-yellow-500 mask mask-star-2 mask-half-1"
              onChange={() => reviewRatingHandler(0.5)}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-yellow-500 mask mask-star-2 mask-half-2"
              onChange={() => reviewRatingHandler(1)}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-yellow-500 mask mask-star-2 mask-half-1"
              onChange={() => reviewRatingHandler(1.5)}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-yellow-500 mask mask-star-2 mask-half-2"
              onChange={() => reviewRatingHandler(2)}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-yellow-500 mask mask-star-2 mask-half-1"
              onChange={() => reviewRatingHandler(2.5)}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-yellow-500 mask mask-star-2 mask-half-2"
              onChange={() => reviewRatingHandler(3)}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-yellow-500 mask mask-star-2 mask-half-1"
              onChange={() => reviewRatingHandler(3.5)}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-yellow-500 mask mask-star-2 mask-half-2"
              onChange={() => reviewRatingHandler(4)}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-yellow-500 mask mask-star-2 mask-half-1"
              onChange={() => reviewRatingHandler(4.5)}
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-yellow-500 mask mask-star-2 mask-half-2"
              onChange={() => reviewRatingHandler(5)}
            />
          </div>
          <button
            type="submit"
            className="p-2 bg-blue-600 w-fit h-fit mx-auto items-center text-white rounded-2xl"
            onClick={submitReviewHandler}
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
