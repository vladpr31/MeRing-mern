import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import Loader from "../UI/Loader";
import { getSpecialtiesData } from "../../api/api";
import DoctorForm from "../Forms/DoctorForm";

/**
 *
 * @param {*} props actionType="add"\"edit"\"remove"
 * @returns
 */

const DoctorModal = ({ props }) => {
  const [clinicOptions, setClinicOptions] = useState(null);
  const [specialityOptions, setSpecialtyOptions] = useState(null);
  const [doctorOptions, setDoctorOptions] = useState();
  const [loading, setLoading] = useState(
    clinicOptions && specialityOptions ? false : true
  );
  const [chosenDoctor, setChosenDoctor] = useState();
  const { doctors } = useSelector((state) => state.doctors);
  const { clinics } = useSelector((state) => state.clinics);
  const selectDoctorHandler = (selected) => {
    setChosenDoctor(selected.value);
  };

  ///loads Select options for Clinics/Specialities/Doctors.
  useEffect(() => {
    const arrangeData = async () => {
      if (props === "editoctor" || props === "removeDoctor") {
        const options = doctors?.map((doctor) => {
          return {
            value: doctor,
            label: doctor.firstName + " " + doctor.lastName,
          };
        });
        setDoctorOptions(options);
        setLoading(false);
      }
      if (
        props === "createDoctor" ||
        props === "editDoctor" ||
        props === "doctorWithCreds"
      ) {
        //fetches all specialities.
        const { data: specialties } = await getSpecialtiesData();

        //creates clinics as an object of label & value keys.
        const clinicOptions = clinics?.map((clinic) => {
          return {
            value: clinic,
            label: clinic.clinicName,
          };
        });

        //creates specialities as an object of label & value keys.
        const specialityOptions = specialties?.map((specialty) => {
          return {
            value: specialty.name,
            label: specialty.name,
          };
        });
        setClinicOptions(clinicOptions);
        setSpecialtyOptions(specialityOptions);
        setLoading(false);
      }
    };
    arrangeData();
  }, [props, doctors.length, clinics.length]);

  return loading ? (
    <Loader />
  ) : (
    <div className="bg-white bg-opacity-40 p-6 rounded-lg w-full h-full">
      <form
        method="dialog"
        className="modal-box flex flex-col mx-auto w-full h-full"
      >
        <div className="flex justify-end p-2 mb-2">
          <button
            className=" bg-blue-500 w-fit px-2 py-1 text-white rounded-lg"
            onClick={() => {}}
          >
            X
          </button>
        </div>
        <label className="text-center underline font-bold">{props}</label>
        {props === "doctorWithCreds" ? (
          <DoctorForm
            props={{
              actionType: "CreateDocWithCreds",
              specialityOptions,
              clinicOptions,
            }}
          />
        ) : props === "createDoctor" && !loading ? (
          <div className="flex flex-col bg-gray-800 bg-opacity-90 rounded-lg mt-4 h-full w-full justify-evenly p-4">
            <DoctorForm
              props={{
                actionType: "Create",
                specialityOptions,
                clinicOptions,
              }}
            />
          </div>
        ) : props === "editDoctor" || props === "removeDoctor" ? (
          <div className="mt-2">
            <Select
              options={doctorOptions}
              onChange={selectDoctorHandler}
              value={
                chosenDoctor
                  ? {
                      label:
                        chosenDoctor?.firstName + " " + chosenDoctor?.lastName,
                      value: chosenDoctor,
                    }
                  : null
              }
              isMulti={false}
              placeholder="Select Doctor..."
            />
            <div className="flex flex-col bg-gray-800 bg-opacity-90 rounded-lg mt-4 h-full w-full justify-evenly p-4">
              {chosenDoctor && !loading ? (
                <DoctorForm
                  props={
                    props === "editDoctor"
                      ? {
                          actionType: "Edit",
                          specialityOptions,
                          clinicOptions,
                          chosenDoctor,
                          setChosenDoctor,
                        }
                      : { actionType: "Remove", chosenDoctor, setChosenDoctor }
                  }
                />
              ) : null}
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default DoctorModal;
