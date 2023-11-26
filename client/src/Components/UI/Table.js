import React from "react";

const Table = ({ props }) => {
  return (
    <div className="w-full">
      <h3 className="underline text-[26px] text-[#52514f]">
        {props.tableName}
      </h3>
      <table className="table mb-3" key={Math.floor(Math.random() * 91239)}>
        {/* head */}
        <thead>
          <tr>
            <th></th>
            {props.tableHeadings.map((thName, index) => {
              return (
                <th key={index} className="text-[#52514f]">
                  {thName}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {props?.tableRows?.map((appointment, index) => {
            if (
              new Date(appointment.appointmentDateTime).getTime() <
              new Date().getTime()
            ) {
              return (
                <tr key={index}>
                  <th className="text-[#52514f]">{index + 1}</th>

                  <td className="text-[#52514f]">
                    {appointment.doctor.firstName +
                      " " +
                      appointment.doctor.lastName}
                  </td>

                  <td className="text-[#52514f]">
                    {appointment.clinic.clinicName}
                    <br />
                    <span className="badge badge-ghost">
                      {appointment.clinic.location}
                    </span>
                  </td>

                  <td className="text-[#52514f]">
                    {new Date(
                      appointment.appointmentDateTime
                    ).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
