import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPatients } from "../../../../Redux/Actions/patientActions";
import Select from "react-select";
import Loader from "../../../UI/Loader";
import PatientRecordCard from "./PatientRecordCard";

const RecordsPage = () => {
  const { patients, isLoadingPatients } = useSelector(
    ({ patients }) => patients
  );
  const dispatch = useDispatch();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientOptions, setPatientOptions] = useState([]);

  const fetchAllPatients = async () => {
    if (!Object.keys(patients).length) {
      dispatch(await getAllPatients());
    } else {
      const options = patients.map((patient) => ({
        value: patient,
        label: `${patient.firstName} ${patient.lastName}`,
      }));
      setPatientOptions(options);
    }
  };

  useEffect(() => {
    fetchAllPatients();
  }, [isLoadingPatients, patients]);

  const handleSelectedPatient = (selected) => {
    setSelectedPatient(selected?.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mx-auto w-1/4 justify-center pb-2">
        <label className="text-center">Select Patient:</label>
        <Select options={patientOptions} onChange={handleSelectedPatient} />
      </div>
      <div className="overflow-hidden">
        {isLoadingPatients ? (
          <Loader />
        ) : (
          selectedPatient && <PatientRecordCard patient={selectedPatient} />
        )}
      </div>
    </div>
  );
};

export default RecordsPage;
