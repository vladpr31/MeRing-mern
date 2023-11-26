import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHeartPulse,
  faDna,
  faStethoscope,
  faTemperatureQuarter,
  faFileWaveform,
  faCircleExclamation,
  faCircleCheck,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";

const Card = ({ props }) => {
  const iconPicker = (type) => {
    if (type === "Heart Rate") {
      return (
        <FontAwesomeIcon
          icon={faHeartPulse}
          style={{ color: "white" }}
          size="2xl"
        />
      );
    }
    if (type === "Blood Sugar") {
      return (
        <FontAwesomeIcon
          icon={faDroplet}
          size="2xl"
          className="bg-red-300 text-red-600 p-4 rounded-2xl w-8"
        />
      );
    }
    if (type === "Blood Pressure") {
      return (
        <FontAwesomeIcon
          icon={faStethoscope}
          size="2xl"
          className="bg-teal-400 text-teal-700 p-4 rounded-2xl w-8"
        />
      );
    }
    if (type === "Body Temperature") {
      return (
        <FontAwesomeIcon
          icon={faTemperatureQuarter}
          className="bg-blue-300 text-blue-600 p-4 rounded-2xl w-8"
          size="2xl"
        />
      );
    }
    if (type === "Red Blood Cells") {
      return (
        <FontAwesomeIcon
          icon={faFileWaveform}
          className="bg-blue-300 text-blue-600 p-4 rounded-2xl w-8"
          size="2xl"
        />
      );
    }
  };

  return (
    <div className="stat bg-base-200 rounded-2xl">
      <div className="stat-figure text-secondary">
        {iconPicker(props.type)}
        <div className="relative left-[20px] bottom-[10px]">
          {props?.value < props?.maxValue ? (
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: "#ffffff" }}
              className="bg-green-500 rounded-full"
              size="xl"
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              style={{ color: "#ffffff" }}
              className="bg-red-500 rounded-full"
              size="xl"
            />
          )}
        </div>
      </div>
      <div className="stat-title">{props.type}</div>
      <div className="stat-value">
        {" "}
        <span
          className={`text-[22px] font-bold ${
            props?.value < props?.maxValue ? "text-black" : "text-red-400"
          }`}
        >
          {props?.value || props.firstValue + "/" + props.secondValue}
        </span>
        <sup
          className={`text-[14px] font-medium ml-2 ${
            props?.value < props?.maxValue ? "text-black" : "text-red-400"
          }`}
        >
          {props.metrics}
        </sup>
      </div>
      <div className="stat-desc">
        <h5 className="badge badge-neutral text-[12px]">
          Status:
          <span
            className={`${
              props?.value < props?.maxValue ? "text-green-300" : "text-red-400"
            }`}
          >
            {props?.value < props?.maxValue ? " Healthy" : " Not Good"}
          </span>
        </h5>
      </div>
    </div>
  );
};

export default Card;

/*
<div className="flex px-2 py-4  mx-auto items-center border-[1px] border-black justify-between md:justify-center  md:w-fit rounded-xl shadow-2xl backdrop-blur-sm backdrop-filter bg-white">
      <div className="flex flex-col ">
        <div className="badge badge-lg bg-blue-600">
          <h1 className="text-white whitespace-nowrap">{props.type}</h1>
        </div>
        <div className="flex text-left p-2">
          <div className="text-center p-4 rounded-2xl">
            <span
              className={`text-[22px] font-bold ${
                props?.value < props?.maxValue ? "text-black" : "text-red-400"
              }`}
            >
              {props?.value || props.firstValue + "/" + props.secondValue}
            </span>

            <sup
              className={`text-[14px] font-medium ml-2 ${
                props?.value < props?.maxValue ? "text-black" : "text-red-400"
              }`}
            >
              {props.metrics}
            </sup>
          </div>
        </div>
        <h5 className="badge badge-neutral text-[12px]">
          Status:
          <span
            className={`${
              props?.value < props?.maxValue ? "text-green-300" : "text-red-400"
            }`}
          >
            {props?.value < props?.maxValue ? " Healthy" : " Not Good"}
          </span>
        </h5>
      </div>
      <div className="bg-gradient-to-r from-blue-800 via-blue-500 to-blue-800 rounded-md p-2 w-fit w-[70px] text-center h-fit">
        {iconPicker(props.type)}
        <div className="absolute right-[30px]">
          {props?.value < props?.maxValue ? (
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: "#ffffff" }}
              className="bg-green-500 rounded-full"
              size="xl"
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              style={{ color: "#ffffff" }}
              className="bg-red-500 rounded-full"
              size="xl"
            />
          )}
        </div>
      </div>
    </div>
*/
