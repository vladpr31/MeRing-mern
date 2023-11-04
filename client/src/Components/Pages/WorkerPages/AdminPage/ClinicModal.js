import React, { useState, useEffect } from "react";
import ClinicForm from "../../../Forms/ClinicForm";
import { useSelector } from "react-redux";
import Select from "react-select";
const ClinicModal = ({ props }) => {
  const { clinics } = useSelector((state) => state.clinics);

  const { doctors } = useSelector((state) => state.doctors);
  const [clinicSelectOptions, setClinicSelectOptions] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  useEffect(() => {
    if (props === "editClinic" || props === "removeClinic") {
      const arrangeClinicsDataForSelect = () => {
        setSelectedClinic(null);
        let selectOptions = [];
        clinics.map((clinic) => {
          selectOptions.push({ label: clinic.clinicName, value: clinic });
        });
        setClinicSelectOptions(selectOptions);
      };
      arrangeClinicsDataForSelect();
    }
  }, [props, clinics.length, doctors.length]);

  return (
    <div className="bg-white bg-opacity-40 p-6 rounded-lg w-full h-full">
      <form
        method="dialog"
        className="modal-box flex flex-col mx-auto w-full h-full"
      >
        <div className="flex justify-end p-2 mb-2">
          <button
            className=" bg-blue-500 w-fit px-2 py-1 text-white rounded-lg"
            onClick={() => setSelectedClinic(null)}
          >
            X
          </button>
        </div>
        {props === "createClinic" ? (
          <ClinicForm
            props={{
              actionType: "Create",
              doctors,
            }}
          />
        ) : props === "editClinic" ? (
          <>
            <Select
              options={clinicSelectOptions}
              onChange={(value) => setSelectedClinic(value)}
              value={selectedClinic ? selectedClinic : null}
              placeholder="- Select Clinic -"
            />
            {selectedClinic ? (
              <ClinicForm
                props={{
                  actionType: "Edit",
                  doctors,
                  selectedClinic: selectedClinic.value,
                }}
              />
            ) : null}
          </>
        ) : (
          <>
            <Select
              options={clinicSelectOptions}
              onChange={(value) => setSelectedClinic(value)}
              placeholder="- Select Clinic - "
              value={selectedClinic ? selectedClinic : null}
            />
            {selectedClinic ? (
              <ClinicForm
                props={{
                  actionType: "Remove",
                  selectedClinic: selectedClinic.value._id,
                }}
              />
            ) : null}
          </>
        )}
      </form>
    </div>
  );
};

export default ClinicModal;
