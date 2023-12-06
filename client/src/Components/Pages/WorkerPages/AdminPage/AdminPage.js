import React, { useEffect, useState } from "react";
import ClinicModal from "../../../Modals/ClinicModal";
import DoctorModal from "../../../Modals/DoctorModal";
import { getAllDoctors } from "../../../../Redux/Actions/doctorActions";
import { getAllClinics } from "../../../../Redux/Actions/clinicActions";
import { useDispatch } from "react-redux";
import ArticleModal from "../../../Modals/ArticleModal";
const AdminPage = () => {
  const dispatch = useDispatch();
  const [option, setOption] = useState("");
  const [renderDoctorModal, setRenderDoctorModal] = useState(false);
  const [renderClinicModal, setRenderClinicModal] = useState(false);
  const [renderArticleModal, setRenderArticleModal] = useState(false);
  const showDoctorModal = () => {
    window.doctor_modal.showModal();
  };
  const showClinicModal = () => {
    window.clinic_modal.showModal();
  };
  const showArticleModal = () => {
    window.article_modal.showModal();
  };
  const buttonHandler = (e) => {
    const { id } = e.target;
    switch (id) {
      case "createClinic":
      case "editClinic":
      case "removeClinic":
        setOption(id);
        setRenderClinicModal(true);
        showClinicModal();
        break;
      case "doctorWithCreds":
      case "createDoctor":
      case "editDoctor":
      case "removeDoctor":
        setOption(id);
        setRenderDoctorModal(true);
        showDoctorModal();
        break;
      case "createArticleBtn":
        setOption(id);
        setRenderArticleModal(true);
        showArticleModal();
        break;
      default:
        setOption("");
        setRenderDoctorModal(false);
        setRenderClinicModal(false);
        break;
    }
  };
  useEffect(() => {
    const fetchAllData = async () => {
      dispatch(await getAllDoctors());
      dispatch(await getAllClinics());
    };
    fetchAllData();
  }, []);
  return (
    <div className="h-[calc(100dvh)]">
      <div className="flex flex-col justify-evenly text-[#595757] h-full">
        <h1 className="text-[48px] text-center">Hi, Admin.</h1>
        <p className="text-center font-bold">
          Here You Can Create - Delete - Edit - Doctors and Clinics. <br />
          (Creating Doctor with Credentials is like creating a worker who has
          his own page and such)
        </p>
        <button
          className="btn btn-primary w-fit mx-auto"
          onClick={buttonHandler}
          id="createArticleBtn"
        >
          Create New Article
        </button>
        <div className="flex items-center mx-auto">
          <div className="grid grid-cols-2 p-3">
            <div className="grid w-fit">
              <button
                className="btn btn-primary mb-2 "
                id="doctorWithCreds"
                onClick={buttonHandler}
              >
                Create Doctor With Credentials
              </button>
              <button
                className="btn btn-primary mb-2"
                id="createDoctor"
                onClick={buttonHandler}
              >
                New Doctor
              </button>
              <button
                className="btn btn-primary mb-2"
                id="editDoctor"
                onClick={buttonHandler}
              >
                Edit Doctor
              </button>
              <button
                className="btn btn-primary "
                id="removeDoctor"
                onClick={buttonHandler}
              >
                Remove Doctor
              </button>
            </div>
            <div className="grid w-fit mx-auto">
              <button
                className="btn btn-primary mb-2"
                id="createClinic"
                onClick={buttonHandler}
              >
                New Clinic
              </button>
              <button
                className="btn btn-primary mb-2"
                id="editClinic"
                onClick={buttonHandler}
              >
                Edit Clinic
              </button>
              <button
                className="btn btn-primary "
                id="removeClinic"
                onClick={buttonHandler}
              >
                Remove Clinic
              </button>
            </div>
          </div>
        </div>
        <dialog id="clinic_modal" className="modal">
          {renderClinicModal ? <ClinicModal props={option} /> : null}
        </dialog>
        <dialog id="doctor_modal" className="modal">
          {renderDoctorModal ? <DoctorModal props={option} /> : null}
        </dialog>
        <dialog id="article_modal" className="modal">
          {renderArticleModal ? <ArticleModal /> : null}
        </dialog>
      </div>
    </div>
  );
};

export default AdminPage;
