import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { StarRating } from "../../../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
const ReviewForm = ({ doctor, socket }) => {
  const { auth } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const [allowEditMode, setAllowEditMode] = useState(false);
  const [userReview, setUserReview] = useState(() =>
    doctor.reviews.find((review) => review.reviewer === auth.id)
  );
  const [reviewFormInputs, setReviewFormInputs] = useState({
    reviewerName: user.firstName + " " + user.lastName,
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
          reviewerName: user.firstName + " " + user.lastName,
          title: "",
          reviewBody: "",
          rating: 0,
        });
    }
  };
  const reviewRatingHandler = (rateValue) => {
    setReviewFormInputs((prevState) => ({
      ...prevState,
      rating: rateValue,
    }));
  };
  const submitReviewHandler = (e) => {
    socket.emit("send_review", {
      review: reviewFormInputs,
      doctorId: doctor.account,
      userId: auth.id,
    });
  };
  const handleReviewEdit = () => {
    socket.emit("review_update", {
      reviewEdit: reviewFormInputs,
      reviewId: userReview._id,
    });
    setAllowEditMode(false);
  };

  useEffect(() => {
    socket.on("review_updated", (data) => {
      setUserReview(data);
    });
  }, [socket, userReview]);

  if (userReview) {
    return (
      <div>
        <h1 className="font-[500] text-red-700">
          You've already reviewed this doctor.
          <br /> Your review is:
        </h1>
        <div className="p-2 rounded-2xl bg-white">
          {!allowEditMode ? (
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white rounded-2xl p-1 px-2 "
                onClick={() => setAllowEditMode(!allowEditMode)}
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button className="bg-red-600 text-white rounded-2xl p-1 px-2 ml-2">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white rounded-2xl p-1 px-2"
                onClick={handleReviewEdit}
              >
                Save
              </button>
              <button
                className="bg-red-600 text-white rounded-2xl p-1 px-2 ml-2"
                onClick={() => setAllowEditMode(!allowEditMode)}
              >
                Cancel
              </button>
            </div>
          )}
          <div className="flex justify-center">
            <img
              src={userReview.reviewerProfileImage.large}
              className="rounded-full w-16"
            />
            <div className="flex flex-col p-2">
              <h5 className="text-sm font-[600] p-1">
                {userReview.reviewerName}
              </h5>
              {StarRating(userReview.rating)}
            </div>
          </div>
          <div className="w-full h-full">
            {!allowEditMode ? (
              <>
                <h1 className="text-lg text-center">{userReview.title}</h1>
                <p className="text-gray-500 text-center break-word p-2 rounded-xl">
                  {userReview.reviewBody}
                </p>
              </>
            ) : (
              <>
                <input
                  placeholder={userReview.title}
                  defaultValue={userReview.title}
                  id="review-title"
                  onChange={reviewFormInputHandler}
                  className="mb-2 bg-gray-300 p-2 rounded-2xl"
                />
                <textarea
                  className="w-full h-[200px] resize-none bg-gray-300 rounded-2xl p-2"
                  onChange={reviewFormInputHandler}
                  id="review-body"
                  defaultValue={userReview.reviewBody}
                ></textarea>
              </>
            )}
          </div>
          <time className="text-xs opacity-50">
            <span>Posted: </span>
            {new Date(userReview.timestamp).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" " + new Date(userReview.timestamp).toLocaleDateString("en-GB")}
          </time>
        </div>
        <span className="mt-4">
          You can modify or remove this review and write a new one.
        </span>
      </div>
    );
  }
  return (
    <form className="flex flex-col p-4 h-full w-full pb-20 lg:pb-0">
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
  );
};

export default ReviewForm;
