import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Card.css";
import {
  faHeartPulse,
  faDna,
  faStethoscope,
  faTemperatureQuarter,
  faFileWaveform,
  faQuestion,
  faCircleExclamation,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

ChartJS.register(ArcElement, Tooltip, Legend);

const Card = ({ props }) => {
  const [random, setRandom] = useState({
    percentage: 0,
    colour: "hsl(0, 0%, 0%)",
  });

  const generateRandomValues = () => {
    let percentage;
    if (props.type === "Blood Pressure") {
      console.log(props.firstValue, props.secondValue);
      percentage = (props.secondValue / props.firstValue) * 100;
    } else {
      percentage = (props.value / props.maxValue) * 100;
    }
    let color;
    if (0 < percentage && percentage <= 30) {
      color = `hsl(98, 82%, 56%)`;
    }
    if (30 < percentage && percentage <= 50) {
      color = `hsl(39, 87%, 42%)`;
    }
    if (50 < percentage && percentage <= 70) {
      color = `hsl(14, 77%, 43%)`;
    }
    if (percentage > 70) {
      color = `hsl(0, 92%, 50%)`;
    }

    setRandom({
      percentage,
      colour: color,
    });
  };
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
        <FontAwesomeIcon icon={faDna} size="2xl" style={{ color: "white" }} />
      );
    }
    if (type === "Blood Pressure") {
      return (
        <FontAwesomeIcon
          icon={faStethoscope}
          size="2xl"
          style={{ color: "white" }}
        />
      );
    }
    if (type === "Body Temperature") {
      return (
        <FontAwesomeIcon
          icon={faTemperatureQuarter}
          style={{ color: "white" }}
          size="2xl"
        />
      );
    }
    if (type === "Red Blood Cells") {
      return (
        <FontAwesomeIcon
          icon={faFileWaveform}
          style={{ color: "white" }}
          size="2xl"
        />
      );
    }
  };
  useEffect(() => {
    generateRandomValues();
  }, []);

  return (
    <div className="flex flex-col h-fit bg-white p-4 rounded-xl bg-opacity-30 backdrop-blur-sm backdrop-filter border-dashed border-2  border-white">
      <div className="text-white text-lg items-center text-center flex space-x-2 mb-2">
        <div className="bg-blue-500 rounded-md p-2 flex">
          {iconPicker(props.type)}
        </div>
        <p className="badge badge-lg ">{props.type}</p>
      </div>
      <div className="stat bg-white w-fit mx-auto bg-opacity-20 rounded-full border-2 border-white border-dotted">
        <div className="stat-figure text-secondary ">
          {props?.value < props?.maxValue ? (
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: "#ffffff" }}
              className="bg-green-500 rounded-full"
              size="2xl"
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              style={{ color: "#ffffff" }}
              className="bg-red-500 rounded-full"
              size="2xl"
            />
          )}
        </div>
        <div className="stat-value text-center ">
          {props?.value || props.firstValue + "/" + props.secondValue}
          <sup className="text-[10px] font-medium ml-2">{props.metrics}</sup>
        </div>
      </div>
    </div>
  );
};

export default Card;
