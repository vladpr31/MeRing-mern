import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPatients } from "../../../../Redux/Actions/patientActions";
import Select from "react-select";
import Loader from "../../../UI/Loader";
import PatientRecordCard from "./PatientRecordCard";
const RecordsPage = () => {
  const { patients, isLoadingPatients } = useSelector(
    (state) => state.patients
  );
  const dispatch = useDispatch();
  const [patientOptions, setPatientOptions] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const handleSelectedPatient = (selected) => {
    setSelectedPatient(selected.value);
  };
  useEffect(() => {
    const fetchAllPatients = async () => {
      if (Object.keys(patients).length <= 0) {
        dispatch(await getAllPatients());
      } else {
        const options = patients.map((patient) => ({
          value: patient,
          label: `${patient.firstName} ${patient.lastName}`,
        }));
        setPatientOptions(options);
      }
    };
    fetchAllPatients();
  }, []);
  if (isLoadingPatients) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-col mx-auto w-1/4 justify-center pb-2">
        <label className="text-center">Select Patient:</label>
        <Select options={patientOptions} onChange={handleSelectedPatient} />
      </div>
      <div>
        {selectedPatient ? (
          <PatientRecordCard patient={selectedPatient} />
        ) : null}
      </div>
    </div>
  );
};

export default RecordsPage;
