import React from "react";

const ReviewModal = ({ props }) => {
  console.log("props reviewmodal:", props);
  return props.doctor.rating.length > 0 ? (
    <div>
      {props?.doctor?.rating?.map((review) => {
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
    <div></div>
  );
};

export default ReviewModal;
