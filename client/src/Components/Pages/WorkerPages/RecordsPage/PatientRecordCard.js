import React from "react";

const PatientRecordCard = ({ patient }) => {
  console.log(patient);
  return (
    <div className="bg-white rounded-2xl p-8">
      <h1 className="text-center text-black text-[24px]">
        Currently Viewing: {patient.firstName + " " + patient.lastName}
      </h1>
      <div className="flex mx-auto bg-white w-fit p-4 rounded-2xl border-2 border-blue-600">
        <img
          src={patient.profileImage.large}
          className="rounded-full border-4 border-blue-600"
          alt="profile"
        />
        <div className="place-self-center ml-7">
          <label>Patient's Name:</label>
          <h3 className="border-2 border-white px-4 py-2 bg-gray-700 text-white">
            {patient.firstName + " " + patient.lastName}
          </h3>
          <label>Phone Number:</label>
          <h3 className="border-2 border-white px-4 py-2 bg-gray-700 text-white">
            {patient.phoneNumber}
          </h3>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div className="flex">
          <label>Lives In:</label>
          <p>{patient.location}</p>
        </div>
        <div className="flex">
          <label>Apotropos:</label>
          <p>
            {patient.apotropos
              ? patient.apotoropos
              : "Patient Doesn't Have Apotropos"}
          </p>
        </div>
        <div className="flex">
          <label>Lives In:</label>
          <p>{patient.location}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientRecordCard;
/*
 <h2>Know Diseases:</h2>
        <ul className="py-2 px-4 list-disc">
          {patient.illnesses.map((illness, index) => {
            return <li key={index}>{illness}</li>;
          })}
        </ul>

*/
