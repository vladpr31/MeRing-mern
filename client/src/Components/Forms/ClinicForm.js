import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import {
  createNewClinic,
  removeClinic,
  updateClinic,
} from "../../Redux/Actions/clinicActions";
const ClinicForm = ({ props }) => {
  const [formInputs, setFormInputs] = useState({
    clinicName: "",
    location: "",
    clinicWorkers: [],
  });
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const [doctorOptions, setDoctorOptions] = useState([]);
  const formInputHandler = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "clinicName":
        setFormInputs((prevState) => ({
          ...prevState,
          clinicName: value,
        }));
        break;
      case "clinicLocation":
        setFormInputs((prevState) => ({
          ...prevState,
          location: value,
        }));
        break;
      case "clinicWorkers":
        setFormInputs((prevState) => ({
          ...prevState,
          clinicWorkers: value,
        }));
        break;
      default:
        setFormInputs(() => ({
          clinicName: "",
          location: "",
          clinicWorkers: [],
        }));
    }
  };
  const actionsHandler = (e) => {
    const { id } = e.target;
    switch (id) {
      case "createClinic":
        if (
          formInputs.clinicName.length > 3 &&
          formInputs.location.length > 3
        ) {
          dispatch(createNewClinic(formInputs));
          setRefresh(!refresh);
        }
        break;
      case "editClinic":
        dispatch(updateClinic(props.selectedClinic._id, formInputs));
        setRefresh(!refresh);
        break;
      case "removeClinic":
        dispatch(removeClinic(props.selectedClinic));
        setRefresh(!refresh);
        break;
      default:
        break;
    }
  };
  const selectHandler = (selectedOption) => {
    let workers = selectedOption.map((option) => {
      return option.value;
    });

    setFormInputs((prevState) => ({
      ...prevState,
      clinicWorkers: workers,
    }));
  };
  useEffect(() => {
    if (props.actionType !== "Remove") {
      const arrangeDataForSelect = () => {
        let doctorsSelect = [];
        props.doctors.map((doctor) => {
          doctorsSelect.push({
            label: doctor.firstName + " " + doctor.lastName,
            value: doctor._id,
          });
        });
        if (props.actionType === "Edit") {
          setFormInputs({
            clinicName: props.selectedClinic.clinicName,
            location: props.selectedClinic.location,
            clinicWorkers: props.selectedClinic.clinicWorkers,
          });
        }
        setDoctorOptions(doctorsSelect);
      };

      arrangeDataForSelect();
    }
  }, [props.selectedClinic]);
  return (
    <div className="rounded-xl">
      <h1 className="text-center p-4 underline font-bold">
        {props.actionType} Clinic
      </h1>
      {props.actionType === "Create" || props.actionType === "Edit" ? (
        <div className="flex flex-col justify-evenly bg-gray-800 bg-opacity-90 p-4 rounded-xl h-full">
          <div className="flex justify-between items-center p-2">
            <label className={`w-fit whitespace-nowrap text-white mr-4 `}>
              Clinic Name
            </label>
            <input
              type="text"
              placeholder="Clinic Name"
              onChange={formInputHandler}
              id="clinicName"
              value={formInputs.clinicName}
              className="text-center w-full rounded-lg p-2 bg-gray-300 focus:bg-blue-500 focus:text-white focus:placeholder:invisible focus:text-left"
            />
          </div>
          <div className="flex justify-between items-center p-2">
            <label className={`w-fit whitespace-nowrap text-white mr-4 `}>
              Clinic Location
            </label>
            <input
              type="address"
              placeholder="Clinic Location"
              onChange={formInputHandler}
              id="clinicLocation"
              value={formInputs.location}
              className="text-center w-full rounded-lg p-2 bg-gray-300 focus:bg-blue-500 focus:text-white focus:placeholder:invisible focus:text-left"
            />
          </div>
          <div className="flex justify-between items-center p-2">
            <label className={`w-fit whitespace-nowrap text-white mr-4 `}>
              Clinic Workers
            </label>
            <Select
              value={doctorOptions.filter((option) =>
                formInputs.clinicWorkers.includes(option.value)
              )}
              options={doctorOptions}
              isMulti
              className="w-full"
              onChange={selectHandler}
              placeholder="Select Workers"
            />
          </div>
          <button
            className="btn btn-primary mt-2"
            id={props.actionType === "Create" ? "createClinic" : "editClinic"}
            onClick={actionsHandler}
          >
            {props.actionType} Clinic
          </button>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl p-4 flex flex-col">
          <ul className="text-white p-4 ">
            <li className="text-red-200 underline underline-offset-4">
              The Following Data Will Be Removed/Changed:
            </li>
            <li className="list-disc">
              All Of The Clinics Workers Will Be Appointed To Another Clinic.
            </li>
            <li className="list-disc">
              Doctor's Working place (Clinic field in doctor's model) will be
              changed.
            </li>
          </ul>
          <button
            className="btn btn-primary mt-2"
            onClick={actionsHandler}
            id="removeClinic"
          >
            Remove Clinic
          </button>
        </div>
      )}
    </div>
  );
};

export default ClinicForm;
