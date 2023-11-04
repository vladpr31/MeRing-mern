const mongoose = require("mongoose");

const appointmentModel = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Petient" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctors" },
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinics" },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Shifts" },
});

appointmentModel.post("save", async function (doc) {
  await Patient.findByIdAndUpdate(
    { _id: this.patient.toString() },
    { $addToSet: { appointments: this._id } }
  )
    .then()
    .catch((err) =>
      console.log("Failed to add appointment to patient:", err.message)
    );
  await Doctor.findByIdAndUpdate(
    { _id: this.doctor.toString() },
    { $addToSet: { appointments: this._id } }
  )
    .then()
    .catch((err) =>
      console.log("Failed to add appointment to doctor:", err.message)
    );
});

appointmentModel.pre("deleteMany", async function (next) {
  const clinicID = this.getQuery().clinic;

  const appointmentsToDelete = await Appointment.find({ clinic: clinicID });
  for (const appointment of appointmentsToDelete) {
    await Patient.updateMany(
      {},
      { $pull: { appointments: { $in: appointment._id.toString() } } }
    )
      .then((result) =>
        console.log("result of deleteMany in appointmentModel:", result)
      )
      .catch((error) =>
        console.log("deleteMany in appointment Error:", error.message)
      );
    await Doctor.updateMany(
      {},
      { $pull: { appointments: { $in: appointment._id.toString() } } }
    )
      .then()
      .catch((err) => console.log(err));
  }
  next();
});

appointmentModel.pre("findOneAndDelete", async function (next) {
  const appointmentId = this.getQuery()._id.toString();
  console.log("appointmentId in pre of appointment model:", appointmentId);
  await Patient.findOneAndUpdate(
    {
      appointments: {
        _id: appointmentId,
      },
    },
    { $pull: { appointments: { $in: appointmentId } } },
    { new: true } // To get the updated user with populated appointments
  )
    .then((result) => console.log("result patient update:", result))
    .catch((err) => console.log("err patient update:", err.message));
  await Doctor.findOneAndUpdate(
    {
      appointments: {
        _id: appointmentId,
      },
    },
    { $pull: { appointments: { $in: appointmentId } } },
    { new: true } // To get the updated user with populated appointments
  )
    .then((result) => console.log("result doctor update:", result))
    .catch((err) => console.log("err doctor update:", err.message));
});

const Appointment = mongoose.model("Appointments", appointmentModel);

module.exports = Appointment;
const Doctor = require("./doctorModel");
const Patient = require("./patientModel");
