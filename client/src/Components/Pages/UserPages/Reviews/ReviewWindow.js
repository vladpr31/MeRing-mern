import React from "react";

import { StarRating } from "../../../../utils/utils";
const ReviewWindow = ({ doctor }) => {
  if (doctor.reviews.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl">
        <h1>This Doctor Does Not Have Any Reviews Yet.</h1>
        <p>Be First To Review!</p>
      </div>
    );
  }
  return doctor.reviews.map((review, index) => {
    return (
      <div key={index} className="p-2 rounded-2xl bg-white">
        <div className="flex justify-center">
          <img
            src={review.reviewerProfileImage.large}
            className="rounded-full w-16"
          />
          <div className="flex flex-col p-2">
            <h5 className="text-sm font-[600] p-1">{review.reviewerName}</h5>
            {StarRating(review.rating)}
          </div>
        </div>
        <div className="w-fit">
          <h1 className="text-lg text-center">{review.title}</h1>
          <p className="text-gray-500 text-center break-word p-2 rounded-xl">
            {review.reviewBody}
          </p>
        </div>
        <time className="text-xs opacity-50">
          <span>Posted: </span>
          {new Date(review.timestamp).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {" " + new Date(review.timestamp).toLocaleDateString("en-GB")}
        </time>
      </div>
    );
  });
};

export default ReviewWindow;
