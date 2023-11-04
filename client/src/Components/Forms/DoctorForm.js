import React, { useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import {
  createNewDoctor,
  updateDoctor,
  removeDoctor,
} from "../../Redux/Actions/doctorActions";
import { registerWorker } from "../../Redux/Actions/authActions";
const DoctorForm = ({ props }) => {
  const [doctor, setDoctor] = useState(
    props.chosenDoctor || {
      firstName: "",
      lastName: "",
      clinic: {},
      speciality: "",
    }
  );
  const [proceedAction, setProceedAction] = useState(false);
  const [docCredentials, setDocCredentials] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState("");
  const dispatch = useDispatch();
  //inputs
  const doctorInputChangesHandler = (e) => {
    if (alert != "") {
      setAlert("");
    }
    if (e.target) {
      const { id, value } = e.target;
      if (id === "firstName") {
        setDoctor((prevState) => ({
          ...prevState,
          firstName: value,
        }));
      }
      if (id === "lastName") {
        setDoctor((prevState) => ({
          ...prevState,
          lastName: value,
        }));
      }
    }
  };
  const specialityChangeHandler = (selected) => {
    setDoctor((prevState) => ({
      ...prevState,
      speciality: selected.value,
    }));
  };
  const clinicChangeHandler = (selected) => {
    setDoctor((prevState) => ({
      ...prevState,
      clinic: selected.value,
    }));
  };
  const docCredentialsHandler = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "doctorEmail":
        setDocCredentials((prevState) => ({
          ...prevState,
          email: value,
        }));
        break;
      case "doctorPassword":
        setDocCredentials((prevState) => ({
          ...prevState,
          password: value,
        }));
        break;
    }
  };
  //checks
  const proceedHandler = () => {
    if (docCredentials.email.length > 3 && docCredentials.password.length > 3) {
      setProceedAction(true);
    }
  };
  //dispatchers
  const createDoctorHandler = () => {
    if (
      doctor.firstName.length > 1 &&
      doctor.lastName.length > 1 &&
      doctor.clinic != null &&
      doctor.speciality != null
    ) {
      dispatch(createNewDoctor(doctor));
    } else {
      setAlert(`Please Fill In The Following Fields: ${
        doctor.firstName.length > 0 ? null : "First Name"
      }, ${doctor.lastName.length > 0 ? null : "Last Name"}, 
      ${Object.keys(doctor.clinic).length > 0 ? null : "Clinic"}, ${
        doctor.speciality != "" ? null : "Speciality"
      }`);
    }
  };
  const editDoctorHandler = () => {
    dispatch(updateDoctor(doctor._id, doctor));
    props.setChosenDoctor(null);
  };
  const removeDoctorHandler = () => {
    dispatch(removeDoctor(props.chosenDoctor._id));
    props.setChosenDoctor(null);
  };

  const registerDoctorHandler = async () => {
    if (
      doctor.firstName.length > 1 &&
      doctor.lastName.length > 1 &&
      doctor.clinic != null &&
      doctor.speciality != null
    ) {
      const worker = await dispatch(registerWorker({ docCredentials, doctor }));
      if (worker === "Email Already In Use") {
        setAlert(worker);
        setDocCredentials({
          email: "",
          password: docCredentials.password,
        });
        setProceedAction(false);
      } else {
        setDoctor({
          firstName: "",
          lastName: "",
          clinic: {},
          speciality: "",
        });
        setProceedAction(false);
      }
    } else {
      setAlert(`Please Fill In The Following Fields: ${
        doctor.firstName.length > 0 ? null : "First Name"
      }, ${doctor.lastName.length > 0 ? null : "Last Name"}, 
      ${Object.keys(doctor.clinic).length > 0 ? null : "Clinic"}, ${
        doctor.speciality != "" ? null : "Speciality"
      }`);
    }
  };

  if (
    props.actionType === "Create" ||
    props.actionType === "Edit" ||
    proceedAction
  ) {
    return (
      <div className="flex flex-col rounded-lg bg-gray-700 p-4 h-full justify-evenly">
        <div className="flex justify-between items-center p-2">
          <label
            className={`w-fit whitespace-nowrap text-white mr-4 ${
              alert
                ? "underline decoration-red-400 underline-offset-4 decoration-dashed"
                : null
            }`}
          >
            First Name
          </label>
          <input
            placeholder="First Name"
            id="firstName"
            className="text-center w-full rounded-lg p-2 bg-gray-300 focus:bg-blue-500 focus:text-white text-black"
            value={doctor?.firstName || ""}
            onChange={doctorInputChangesHandler}
          ></input>
        </div>
        <div className="flex justify-between items-center p-2">
          <label
            className={`w-fit whitespace-nowrap text-white mr-4 ${
              alert
                ? "underline decoration-red-400 underline-offset-4 decoration-dashed"
                : null
            }`}
          >
            Last Name
          </label>
          <input
            placeholder="Last Name"
            id="lastName"
            className="text-center w-full rounded-lg p-2 bg-gray-300 focus:bg-blue-500 focus:text-white text-black"
            value={doctor?.lastName || ""}
            onChange={doctorInputChangesHandler}
          ></input>
        </div>
        <div className="flex justify-between items-center p-2">
          <label
            className={`w-fit whitespace-nowrap text-white mr-4 ${
              alert
                ? "underline decoration-red-400 underline-offset-4 decoration-dashed"
                : null
            }`}
          >
            Speciality
          </label>
          <Select
            key={Math.random()}
            isMulti={false}
            options={props?.specialityOptions}
            className="w-full text-center text-black"
            isSearchable
            onChange={specialityChangeHandler}
            value={
              doctor
                ? { label: doctor?.speciality, value: doctor?.speciality }
                : ""
            }
            placeholder="- Select Speciality - "
            defaultValue={
              doctor
                ? {
                    label: props?.chosenDoctor?.speciality,
                    value: props?.chosenDoctor?.speciality,
                  }
                : null
            }
          />
        </div>
        <div className="flex justify-between items-center p-2">
          <label
            className={`w-fit whitespace-nowrap text-white mr-4 ${
              alert
                ? "underline decoration-red-400 underline-offset-4 decoration-dashed"
                : null
            }`}
          >
            Clinic
          </label>
          <Select
            key={Math.random()}
            isMulti={false}
            options={props?.clinicOptions}
            className="w-full text-center bg-gray-300 focus:bg-blue-500 focus:text-white placeholder:text-black text-black"
            isSearchable
            onChange={clinicChangeHandler}
            value={
              doctor
                ? {
                    label: doctor?.clinic?.clinicName,
                    value: doctor?.clinic,
                  }
                : ""
            }
            placeholder="- Select Clinic -"
            defaultValue={{
              label: props?.chosenDoctor?.clinic?.clinicName,
              value: props?.chosenDoctor?.clinic,
            }}
          />
        </div>
        {props.actionType === "Create" ? (
          <button
            type="submit"
            className="btn btn-primary mt-6 w-full"
            onClick={createDoctorHandler}
          >
            Create Doctor
          </button>
        ) : props.actionType === "Edit" ? (
          <button
            type="submit"
            className="btn btn-primary mt-6 w-full"
            onClick={editDoctorHandler}
          >
            Edit Doctor
          </button>
        ) : props.actionType === "CreateDocWithCreds" ? (
          <button
            className="btn btn-primary mt-6 w-full"
            type="submit"
            onClick={registerDoctorHandler}
          >
            Create Doctor
          </button>
        ) : null}
      </div>
    );
  }
  //if removing doctor.
  else if (props.actionType === "Remove") {
    return (
      <div>
        <ul className="text-white p-2 ">
          <li className="text-red-200 underline underline-offset-4">
            The Following Data Will Be Removed:
          </li>
          <li className="list-disc">
            All Of The Doctor's Appointments Connected To Patients. (In Patients
            Model)
          </li>
          <li className="list-disc">
            All Of The Doctor's Working Places (In Clinics Model)
          </li>
        </ul>
        <button
          type="submit"
          onClick={removeDoctorHandler}
          className="btn btn-primary mt-6 w-full"
        >
          Remove Doctor
        </button>
      </div>
    );
  }
  //if creating doctor with credentials (username\password).
  else if (props.actionType === "CreateDocWithCreds") {
    if (props?.clinicOptions?.length <= 0) {
      return (
        <div className="bg-gray-700 text-white p-2 h-full flex items-center justify-center">
          <h1 className="border-2 p-2 border-dotted border-red-300 text-[20px]">
            First create a new Clinic since there are none.
          </h1>
        </div>
      );
    }
    return (
      <div className="bg-gray-700 text-white flex flex-col h-full justify-evenly rounded-2xl ">
        <div className="h-fit w-fit text-center bg-gray-900 rounded-xl self-center ">
          <h2 className="p-2">New Doctor Registartion</h2>
        </div>

        <div className="flex justify-evenly items-center">
          <label>Doctor Email:</label>
          <input
            type="email"
            placeholder="example@example.com"
            className="p-2 rounded-xl text-black focus:bg-blue-500 focus:placeholder:text-gray-300 focus:text-white"
            id="doctorEmail"
            value={docCredentials.email}
            onChange={docCredentialsHandler}
          />
          <span>(Required)</span>
        </div>
        <div className="flex justify-evenly items-center">
          <label>Doctor Password:</label>
          <input
            type="password"
            placeholder="*******"
            className="p-2 rounded-xl focus:bg-blue-500 focus:placeholder:text-gray-300 focus:text-white text-black"
            id="doctorPassword"
            value={docCredentials.password}
            onChange={docCredentialsHandler}
          />
          <span>(Required)</span>
        </div>
        <button
          className="btn btn-primary rounded-xl h-fit w-fit flex self-center"
          onClick={proceedHandler}
        >
          Proceed Creation
        </button>
      </div>
    );
  }
};

export default DoctorForm;
