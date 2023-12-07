import React from "react";
import { calcAge } from "../../../../utils/utils";

const PatientRecordCard = ({ patient }) => {
  const renderStatusBadge = (status) => (
    <span
      className={`px-2 py-1 rounded-2xl text-white ${
        status === "Low"
          ? "bg-red-400"
          : status === "Moderate"
          ? "bg-yellow-600"
          : status === "High"
          ? "bg-green-500"
          : ""
      }`}
    >
      {status}
    </span>
  );

  return (
    <section className="h-[550px] overflow-y-auto">
      <div className="flex flex-col break-words bg-white w-full shadow-xl rounded-lg p-2">
        <div className="flex px-6">
          <div className="flex w-full flex-wrap justify-center py-4">
            <img
              alt="Patient Profile"
              src={patient.profileImage.large}
              className="shadow-xl rounded-full align-middle border-none"
            />

            <div className="text-center w-full ">
              <h3 className="text-4xl font-semibold leading-normal mb-2">
                {`${patient.firstName} ${patient.lastName}`}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 font-bold uppercase">
                {`${patient.address}, ${patient.city}`}
              </div>
              <div>
                <time>
                  Date Of Birth:{" "}
                  {new Date(patient.dateOfBirth).toLocaleDateString("en-GB")}
                </time>
                <h4>Age: {calcAge(patient.dateOfBirth)}</h4>
                <h5>
                  Socioeconomic Status:{" "}
                  {renderStatusBadge(patient.medicalRecord.socioeconomic)}
                </h5>
              </div>
            </div>
          </div>
          <div className="py-10 border-t">
            <h3 className="text-lg font-bold">Patient Description:</h3>
            <div className="flex flex-wrap justify-center">
              <div className="px-4">
                <p className="text-lg leading-relaxed">
                  {patient.medicalRecord.patientDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-center">Patient's Medical Record</h2>
          <div className="flex justify-evenly px-6 py-8">
            <div className="flex flex-col">
              <label>Height:</label>
              <span className="bg-gray-300 rounded-xl text-center px-4 py-2">
                {`${patient.medicalRecord.height} cm`}
              </span>
            </div>
            <div className="flex flex-col">
              <label>Weight:</label>
              <span className="bg-gray-300 rounded-xl text-center px-4 py-2">
                {`${patient.medicalRecord.weight} kg`}
              </span>
            </div>
            <div className="flex flex-col">
              <label>Sport Activity:</label>
              <span className="bg-gray-300 rounded-xl text-center px-4 py-2">
                {patient.medicalRecord.workout ? " Yes" : " No"}
              </span>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div className="flex flex-col">
              <label>Known Allergies:</label>
              <span className="bg-gray-300 rounded-xl text-center px-4 py-2">
                {patient.medicalRecord.allergies.length > 0
                  ? patient.medicalRecord.allergies.map(
                      (allergy) => allergy.label
                    )
                  : "None"}
              </span>
            </div>
            <div className="flex flex-col">
              <label>Medications:</label>
              <span className="bg-gray-300 rounded-xl text-center px-4 py-2">
                {patient.medicalRecord.medications.length > 0
                  ? patient.medicalRecord.medications.map(
                      (medication) => medication.label
                    )
                  : "Not Consuming"}
              </span>
            </div>
            <div className="flex flex-col">
              <label>Known Diseases:</label>
              <span className="bg-gray-300 rounded-xl text-center px-4 py-2">
                {patient.medicalRecord.illnesses.length > 0
                  ? patient.medicalRecord.illnesses.map(
                      (illness) => illness.label
                    )
                  : "None"}
              </span>
            </div>
          </div>
          <div className="flex justify-evenly py-4">
            <div className="flex flex-col">
              <label>Last Doctor Visit:</label>
              <span className="bg-gray-300 rounded-xl text-center px-4 py-2">
                {patient.medicalRecord.visits.slice(-1)[0] ||
                  "Patient did not visit a doctor yet"}
              </span>
            </div>
            <div className="flex flex-col">
              <label>Previous Records:</label>
              <span className="bg-gray-300 rounded-xl text-center px-4 py-2">
                {patient.medicalRecord.previousRecords.length > 0
                  ? patient.medicalRecord.previousRecords.length
                  : "No Records"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientRecordCard;
