import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientAppointments } from "../../../../Redux/Actions/userActions";
import useWindowSize from "../../../../hooks/useWindowSize";
const MyAppointments = () => {
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState();
  const [loading, setLoading] = useState(true);
  const { width } = useWindowSize();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPatientAppointments = async () => {
      if (typeof user.appointments !== "object") {
        console.log("in fetch");
        dispatch(getPatientAppointments(auth.id));
        let appointments = data.sort(function (a, b) {
          return (
            new Date(a.appointmentDateTime) - new Date(b.appointmentDateTime)
          );
        });
        setAppointments(appointments);

        setLoading(false);
      }
      if (user.appointments.length === 0) {
        setLoading(false);
      }
    };
    fetchPatientAppointments();
  }, [user.appointments.length]);
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="flex w-full py-12 lg:w-[80%] mx-auto ">
      <table className="table table-xs lg:table-md bg-white bg-opacity-30 border-seperate">
        <thead>
          <tr className="text-white">
            <th>Doctor</th>
            <th>Clinic</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        {appointments?.length > 0 ? (
          <tbody className="font-medium">
            {appointments?.map((appointment) => {
              return (
                <tr key={Math.random()}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/6069/6069189.png"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-white">
                          {appointment.doctor.firstName +
                            " " +
                            appointment.doctor.lastName}
                        </div>
                        <div className="badge badge-md badge-ghost text-sm ">
                          {appointment.doctor.speciality}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-left text-white">
                    {appointment.clinic.clinicName}
                    <br />
                    <span className="badge badge-ghost text-[12px] whitespace-nowrap badge-sm lg:badge-md">
                      {appointment.clinic.location}
                    </span>
                  </td>
                  <td className="text-center text-white">
                    {new Date(
                      appointment.appointmentDateTime
                    ).toLocaleDateString("en-GB")}
                    <br />
                    <span className="badge badge-success badge-md">
                      {new Date(
                        appointment.appointmentDateTime
                      ).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </td>
                  {width > 768 ? (
                    <th>
                      <p className="badge badge-info text-base-100 badge-md">
                        Pending
                      </p>
                    </th>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <tr className="p-4">
              <td className="text-white ">No Appointments Yet.</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default MyAppointments;
