import {
  axisBottom,
  axisLeft,
  scaleBand,
  scaleLinear,
  select,
  format,
} from "d3";
import { useEffect, useRef } from "react";

function AxisBottom({ scale, transform }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
}

function AxisLeft({ scale, margin, height }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const axisGroup = select(ref.current);
      axisGroup.call(
        axisLeft(scale)
          .ticks(5)
          .tickFormat(function (d) {
            return format(".0f")(d);
          })
      );

      // Add a label near the Y-axis
      axisGroup
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left) // Adjust the distance from the Y-axis
        .attr("x", -height / 2) // Adjust the horizontal position
        .attr("dy", "10px")
        .attr("font-size", "14px")
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text("Number Of Appointments");
    }
  }, [scale, margin, height]);

  return <g ref={ref} />;
}

function Bars({ data, height, scaleX, scaleY }) {
  return (
    <>
      {data.map(({ value, label }) =>
        value !== 0 ? (
          <g key={`bar-group-${label}`}>
            <rect
              x={scaleX(label)}
              y={scaleY(value)}
              width={scaleX.bandwidth()}
              height={height - scaleY(value)}
              fill="#454577"
            />
            <text
              x={scaleX(label) + scaleX.bandwidth() / 2}
              y={scaleY(value) - 5} // Adjust the vertical position as needed
              textAnchor="middle"
              fill="black" // Adjust the text color as needed
            >
              {value}
            </text>
          </g>
        ) : null
      )}
    </>
  );
}

const BarChart = ({ data }) => {
  const margin = { top: 20, right: 0, bottom: 20, left: 30 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const scaleX = scaleBand()
    .domain(data.map(({ label }) => label))
    .range([0, width])
    .padding(0.5);
  const scaleY = scaleLinear()
    .domain([0, Math.max(...data.map(({ value }) => value))])
    .range([height, 0]);
  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
        <AxisLeft scale={scaleY} margin={margin} height={height} />
        <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} />
      </g>
    </svg>
  );
};
export default BarChart;
