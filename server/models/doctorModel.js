const mongoose = require("mongoose");

const doctorModel = new mongoose.Schema({
  firstName: String,
  lastName: String,
  speciality: String,
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Users" } || null,
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinics" },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointments" }],
  shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shifts" }],
  profileImage: Object,
});

//adds the docots to the clinic workers collection.
doctorModel.pre("save", async function (next) {
  console.log("from doctore presave:", this);
  await Clinic.findByIdAndUpdate(this.clinic.toString(), {
    $addToSet: { clinicWorkers: this },
  })
    .then()
    .catch((err) => console.log(err.message));
  next();
});
//removes doctor from all referenced documents.
doctorModel.pre("findOneAndDelete", async function (next) {
  const doctorId = this.getQuery()._id;

  //getting all the appointments with the removed doctor.
  const populatedAppointments = await Appointment.find({
    doctor: doctorId,
  });

  // remove from patient appointments array using the ids of the appointments that will be removed.
  for (const appointment of populatedAppointments) {
    try {
      const result = await Patient.updateMany(
        {},
        { $pull: { appointments: { $in: appointment._id.toString() } } }
      );

      console.log(
        `Removed appointment from patients: ${result.nModified} patients updated.`
      );
      // Optionally, you can handle the case where no patients were updated
      if (result.nModified <= 0) {
        console.log("No patients found with this appointment.");
      }
    } catch (err) {
      console.error("Error in updating patients' appointments:", err.message);
    }
  }
  //remove from appointments.
  try {
    const appointmentDeleteResult = await Appointment.deleteMany({
      doctor: doctorId,
    });
    console.log("Removed from appointments:", appointmentDeleteResult);
  } catch (appointmentDeleteError) {
    console.error(
      "Error in removing doctor from appointments:",
      appointmentDeleteError.message
    );
  }
  try {
    await Shifts.deleteMany({ doctor: doctorId });
  } catch (err) {
    console.error("Error in removing shifts", err.message);
  }

  //remove from clinics
  try {
    const clinicUpdateResult = await Clinic.updateMany(
      { clinicWorkers: doctorId },
      { $pull: { clinicWorkers: { $in: doctorId } } }
    );

    console.log("Removed from clinic:", clinicUpdateResult);
  } catch (clinicUpdateError) {
    console.error(
      "Error in removing doctor from clinic:",
      clinicUpdateError.message
    );
  }
  //remove from users collection
  const removedDoctor = await Doctor.findById({ _id: doctorId });
  console.log("removing doctor:", removedDoctor);
  await Users.findByIdAndDelete({ _id: removedDoctor.account });
  // continue with next middleware
  next();
});

const Doctor = mongoose.model("Doctors", doctorModel);
module.exports = Doctor;
const Patient = require("./patientModel");
const Clinic = require("./clinicModel");
const Appointment = require("./appointmentModel");
const Users = require("./userModel");
const Shifts = require("./shiftModel");
