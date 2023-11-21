import React, { useState, useEffect } from "react";
import Table from "../../../UI/Table";
import { useDispatch, useSelector } from "react-redux";
import { getPatientAppointments } from "../../../../Redux/Actions/userActions";
const MedicalRecords = () => {
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPatientAppointments = async () => {
      const data = await dispatch(getPatientAppointments(auth.id));
      setAppointments(data);
      setLoading(false);
    };
    fetchPatientAppointments();
  }, []);

  return loading ? (
    <h1>Loading Data..</h1>
  ) : (
    <div className="pl-12 w-full text-center">
      <Table
        props={{
          tableName: "Last Doctor Visits",
          tableHeadings: ["Doctor's Name", "Clinic", "Appointment's Date"],
          tableRows: appointments,
        }}
        key={Math.floor(Math.random())}
      />
    </div>
  );
};

export default MedicalRecords;
