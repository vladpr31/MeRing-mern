import React from "react";
import BarChart from "./BarChart";
const VisitsChart = ({ chartData, chartTitle }) => {
  console.log(chartData);
  const BAR_CHART_DATA = [
    { label: "Jan", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  return (
    <div className="bg-base-200 bg-opacity-50 p-2 text-center border-[1px] border-white rounded-2xl scale-[0.9] md:scale-[1]">
      <h1 className="badge bg-blue-600 text-white ">{chartTitle}</h1>
      <BarChart data={BAR_CHART_DATA} />
    </div>
  );
};

export default VisitsChart;
