// const Apotropos = require("../models/apotroposModel");
const PatientDB = require("../models/patientModel");
const mongoose = require("mongoose");

const createNewPatient = (patientInfo) => {
  try {
    const patient = new PatientDB(patientInfo);
    patient.save();
    return patient;
  } catch (err) {
    return err.message;
  }
};

const getAllPatients = () => {
  return PatientDB.find({}, { _id: 0 }).populate({
    path: "medicalRecord",
    model: "Records",
    select: { _id: 0, patient: 0 },
  });
};
const updateApotroposOfPatient = (id, apotropos) => {
  try {
    return PatientDB.findByIdAndUpdate(id, { apotropos: apotropos })
      .then((result) => {
        return result;
      })
      .catch((err) =>
        console.log("error in upateApotoroposOfPatient:", err.message)
      );
  } catch (err) {
    return err.message;
  }
};

const getPatientByID = async (id) => {
  return PatientDB.findById(id, { account: 0, _id: 0, appointments: 0 })
    .populate({
      path: "apotropos",
      model: "Apotropos",
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addNewAppointment = (patientID, appointment) => {
  return PatientDB.findByIdAndUpdate(patientID, {
    $addToSet: { appointments: appointment },
  });
};
const getPatientByAccountID = (accountID) => {
  return PatientDB.findOne({ account: accountID }, { _id: 1 });
};

const getPatientAppointmentsByDoctor = (doctorId) => {
  return PatientDB.aggregate([
    { $unwind: "$appointments" },
    {
      $lookup: {
        from: "appointments", // Replace with the actual name of the appointments collection
        localField: "appointments",
        foreignField: "_id",
        as: "appointmentDetails",
      },
    },
    { $unwind: "$appointmentDetails" },
    {
      $match: {
        "appointmentDetails.doctor": new mongoose.Types.ObjectId(doctorId),
      },
    },
    {
      $project: {
        _id: 1,
        firstName: 1,
        lastName: 1,
        appointmentDoctorId: "$appointmentDetails.doctor",
        // Add other fields as needed
      },
    },
  ]);
};

const updatePatient = async (userID, updateField, updatedData) => {
  if (updateField === "reviews") {
    const updateObject = { $addToSet: { [updateField]: updatedData } };
    const patient = await PatientDB.findOneAndUpdate(userID, updateObject, {
      new: true,
    });

    return patient;
  } else if (updateField === "deleteReview") {
    const updateObject = {
      $pull: { reviews: { _id: updatedData } },
    };

    const patient = await PatientDB.findOneAndUpdate(
      { _id: userID },
      updateObject,
      {
        new: true,
      }
    );

    return patient;
  } else {
    const updateObject = { [updateField]: updatedData };

    const patient = await PatientDB.findOneAndUpdate(userID, updateObject, {
      new: true,
    });

    return patient;
  }
};
module.exports = {
  createNewPatient,
  updateApotroposOfPatient,
  getPatientByID,
  addNewAppointment,
  getPatientByAccountID,
  getPatientAppointmentsByDoctor,
  updatePatient,
  getAllPatients,
};
