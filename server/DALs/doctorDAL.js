const DoctorDB = require("../models/doctorModel");
require("../models/clinicModel");

const createNewDoctor = (doctorDetails) => {
  const newDoctor = new DoctorDB(doctorDetails);
  newDoctor.save();
  return newDoctor;
};
const createNewDoctorWithCredential = (doctorDetails) => {
  const newDoctor = new DoctorDB(doctorDetails);
  newDoctor.save();
  return newDoctor;
};
const updateDoctor = async (doctorID, updateField, updatedDetails) => {
  if (updateField !== "addReview" && updateField !== "deleteReview") {
    const updateObject = { [updateField]: updatedDetails };
    return DoctorDB.findByIdAndUpdate(doctorID, updateObject, {
      upsert: true,
      new: true,
    }).then((result) => {
      return result;
    });
  } else if (updateField === "addReview") {
    const updateObject = { $addToSet: { [updateField]: updatedDetails } };

    return DoctorDB.findByIdAndUpdate(doctorID, updateObject, {
      upsert: true,
      new: true, // Return the modified document, not the original
    }).then((result) => {
      return result;
    });
  } else if (updateField === "deleteReview") {
    const updateObject = {
      $pull: { reviews: { _id: updatedDetails } },
    };

    const doctor = await DoctorDB.findOneAndUpdate(
      { _id: doctorID },
      updateObject,
      {
        new: true,
      }
    );

    return doctor;
  }
};
const updateDoctorShifts = async (doctorID, shift) => {
  return DoctorDB.findByIdAndUpdate(doctorID, {
    $addToSet: { shifts: shift._id },
  })
    .then()
    .catch((err) => console.log("shift update err:", err.message));
};
const getAllDoctors = () => {
  return DoctorDB.find({}).populate({ path: "clinic", model: "Clinics" });
};

const getDoctorsByCategory = (category) => {
  return DoctorDB.find({
    speciality: new RegExp(`^${category}$`, "i"),
  })
    .select("-_id")
    .populate({
      path: "clinic",
      model: "Clinics",
    })
    .populate({ path: "shifts", model: "Shifts" })
    .populate({
      path: "reviews",
      model: "Review",
    });
};

const addNewAppointment = (doctorID, appointment) => {
  return DoctorDB.findByIdAndUpdate(doctorID, {
    $addToSet: { appointments: appointment },
  });
};
const addDoctorReview = (doctorID, review) => {
  return DoctorDB.findByIdAndUpdate(doctorID, {
    $addToSet: { rating: review },
  });
};

const getDoctorByID = (doctorID) => {
  return DoctorDB.findById(doctorID, { account: 0, _id: 0 })
    .populate({
      path: "shifts",
      model: "Shifts",
      select: { doctor: 0 },
    })
    .populate({
      path: "clinic",
      model: "Clinics",
      select: { clinicName: 1, _id: 0, location: 1 },
    })
    .populate({
      path: "appointments",
      model: "Appointments",
      populate: [
        {
          path: "patient",
          model: "Patients",
          select: { firstName: 1, lastName: 1, _id: 0 },
        },
        {
          path: "appointment",
          model: "Shifts",
          select: { shiftDate: 1, _id: 0 },
        },
      ],
      select: { _id: 0, doctor: 0, clinic: 0 },
    })
    .populate({ path: "reviews", model: "Review" });
};

const removeDoctor = (doctorID) => {
  return DoctorDB.findOneAndDelete({ _id: doctorID }, { strict: "throw" })
    .then((result) => console.log("remove doctor result:", result))
    .catch((err) => console.log("error:", err.message));
};

const getDoctorByAccountID = (authID) => {
  return DoctorDB.findOne({ account: authID }, { _id: 1 });
};

module.exports = {
  createNewDoctor,
  getAllDoctors,
  getDoctorsByCategory,
  addNewAppointment,
  addDoctorReview,
  getDoctorByID,
  updateDoctor,
  removeDoctor,
  createNewDoctorWithCredential,
  getDoctorByAccountID,
  updateDoctorShifts,
};
