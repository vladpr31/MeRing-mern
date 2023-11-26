import React from "react";
import { useSelector } from "react-redux";

const ReviewWindow = ({ doctor }) => {
  const { auth } = useSelector((state) => state.auth);
  return (
    <div className="mockup-window border bg-base-300 w-full h-full">
      <div className="flex justify-center px-4 py-16 bg-base-200">
        {doctor.rating.map((review, index) => {
          return (
            <div
              className="chat chat-start items-center flex flex-row"
              key={index}
            >
              <span className="bg-info rounded-full p-2">
                {auth.role === "user" ? "You" : null}
              </span>

              <span className="chat-bubble chat-bubble-info flex flex-col">
                {review.content}
              </span>
              <time className="text-xs opacity-50">
                {new Date(review.timestamp).toLocaleDateString("en-GB")}
              </time>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewWindow;
