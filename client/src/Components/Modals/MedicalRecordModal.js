import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getDiseasesData, getAllergiesData } from "../../api/api";
import { useDispatch } from "react-redux";
import { createPatientMedicalRecord } from "../../Redux/Actions/userActions";
const MedicalRecordModal = ({ user, userAuth }) => {
  const [proceed, setProceed] = useState(false);
  const [selectOptions, setSelectOptions] = useState([]);
  const [medicalRecordForm, setMedicalRecordForm] = useState({
    illnesses: [],
    weight: null,
    height: null,
    workout: false,
    allergies: [],
    medications: [],
    socioeconomic: "",
    patientDescription: "",
  });
  const dispatch = useDispatch();
  const handleProceed = () => {
    setProceed(true);
  };
  useEffect(() => {
    if (!user.medicalRecord) {
      document.getElementById("medicalRecord_modal").showModal();
    }
  }, []);
  const formInputsHandler = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "weight":
        setMedicalRecordForm((prevState) => ({
          ...prevState,
          weight: value,
        }));
        break;
      case "height":
        setMedicalRecordForm((prevState) => ({
          ...prevState,
          height: value,
        }));
        break;
      case "workout":
        setMedicalRecordForm((prevState) => ({
          ...prevState,
          workout: !prevState.workout,
        }));
        break;
      case "patient_about":
        setMedicalRecordForm((prevState) => ({
          ...prevState,
          patientDescription: value,
        }));
        break;
      case "socioeconomic_Low":
      case "socioeconomic_Moderate":
      case "socioeconomic_High":
        setMedicalRecordForm((prevState) => ({
          ...prevState,
          socioeconomic: value,
        }));
        break;
      default:
        setMedicalRecordForm({
          illnesses: [],
          weight: null,
          height: null,
          workout: false,
          allergies: [],
          medications: [],
          socioeconomic: "",
          patientDescription: "",
        });
    }
  };
  const diseaseSelectHandler = (selected) => {
    setMedicalRecordForm((prevState) => ({
      ...prevState,
      illnesses: [...selected],
    }));
  };
  const allergySelectHandler = (selected) => {
    setMedicalRecordForm((prevState) => ({
      ...prevState,
      allergies: [...selected],
    }));
  };
  const medicationSelectHandler = (selected) => {
    setMedicalRecordForm((prevState) => ({
      ...prevState,
      medications: [...selected],
    }));
  };
  const handleRecordDone = (e) => {
    dispatch(createPatientMedicalRecord(userAuth, medicalRecordForm));
  };
  useEffect(() => {
    const getSelectData = async () => {
      const { data: diseasesSelectOptions } = await getDiseasesData();
      const { data: allergiesSelectOptions } = await getAllergiesData();
      const diseasesOptions = diseasesSelectOptions.map((option) => {
        return {
          value: option.id,
          label: option.name,
        };
      });
      const allergiesOptions = allergiesSelectOptions.allergies.map(
        (option, index) => {
          return {
            value: option,
            label: option.name,
          };
        }
      );
      setSelectOptions({
        diseases: diseasesOptions,
        allergies: allergiesOptions,
      });
    };
    getSelectData();
  }, []);
  return (
    <dialog
      id="medicalRecord_modal"
      className="modal modal-bottom sm:modal-middle "
    >
      {!proceed ? (
        <div className="modal-box flex flex-col justify-center">
          <h3 className="font-bold text-lg text-center text-black">
            Hello {user.firstName + " " + user.lastName} and Welcome!
          </h3>
          <p className="py-4 break-words text-black">
            Before you proceed to our delightful dashboard, we've noticed that
            your medical record is currently unavailable. Could you please take
            a moment to fill out the form? This will enable us to provide you
            with more personalized health tracking and ensure that you receive
            the most suitable treatments. Your health is our priority, and
            having your complete medical record will contribute to a more
            comprehensive and tailored healthcare experience for you.
          </p>
          <button className="btn mx-auto" onClick={handleProceed}>
            Next
          </button>
        </div>
      ) : (
        <div className="modal-box flex flex-col h-full">
          <h3 className="font-bold text-lg text-center text-black">
            {user.firstName + " " + user.lastName}'s Medical Record
          </h3>
          <form className="p-4 flex flex-col gap-y-4">
            <div className="flex justify-evenly">
              <div className="flex items-center">
                <label className="mr-2">Height:</label>
                <input
                  type="number"
                  placeholder="CM"
                  required
                  className="bg-gray-200 p-1 rounded-xl w-12"
                  id="height"
                  onChange={formInputsHandler}
                />
                -Centimeters
              </div>
              <div className="flex items-center">
                <label className="mr-2">Weight:</label>
                <input
                  type="number"
                  placeholder="KG"
                  required
                  className="bg-gray-200 p-1 rounded-xl w-12"
                  id="weight"
                  onChange={formInputsHandler}
                />
                -Kilograms
              </div>
            </div>
            <div className="flex justify-between items-center">
              <label>Working Out (Gym, Cycling, Swimming etc.)</label>
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                onChange={formInputsHandler}
                id="workout"
              />
            </div>
            <div>
              <label className="block text-grey-darker text-sm font-bold mb-2">
                Known Allergies:
              </label>
              <Select
                isMulti
                options={selectOptions.allergies}
                id="allergies"
                onChange={allergySelectHandler}
              />
            </div>
            <div className="">
              <label className="block text-grey-darker text-sm font-bold mb-2">
                Known Diseases:
              </label>
              <Select
                isMulti
                options={selectOptions.diseases}
                id="ilnesses"
                onChange={diseaseSelectHandler}
              />
            </div>
            <div>
              <label className="block text-grey-darker text-sm font-bold mb-2">
                Medications:
              </label>
              <Select
                isMulti
                options={[
                  { value: "Aspirin", label: "Aspirin" },
                  { value: "Insulin", label: "Insulin" },
                ]}
                id="medications"
                onChange={medicationSelectHandler}
              />
            </div>
            <div className="flex justify-between">
              <label>Socioeconomic Status:</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="socioeconomic_High"
                  onChange={formInputsHandler}
                  value="High"
                  checked={medicalRecordForm.socioeconomic === "High"}
                />
                <label>Hight</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="socioeconomic_Moderate"
                  onChange={formInputsHandler}
                  value="Moderate"
                  checked={medicalRecordForm.socioeconomic === "Moderate"}
                />
                <label>Moderate</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="socioeconomic_Low"
                  onChange={formInputsHandler}
                  value="Low"
                  checked={medicalRecordForm.socioeconomic === "Low"}
                />
                <label>Low</label>
              </div>
            </div>
            <div>
              <label className="block text-grey-darker text-sm font-bold mb-2">
                Let us get a bit familiar with you, tell us about yourself a
                bit:
              </label>
              <textarea
                className="bg-gray-200 w-full h-[75px] resize-none rounded-xl p-2"
                onChange={formInputsHandler}
                id="patient_about"
              ></textarea>
            </div>
            <button
              className="bg-blue-500 text-white p-2 rounded-full"
              onClick={handleRecordDone}
            >
              Save
            </button>
          </form>
        </div>
      )}
    </dialog>
  );
};

export default MedicalRecordModal;
