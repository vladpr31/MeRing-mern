const mongoose = require("mongoose");

const shiftModel = new mongoose.Schema({
  shiftDate: Date,
  available: Boolean,
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
});

shiftModel.pre("findOneAndDelete", async function (next) {
  const shiftId = this.getQuery()._id;
  const appointmentToBeRemoved = await Appointment.find({
    appointment: shiftId,
  });
  if (appointmentToBeRemoved.length > 0) {
    await Appointment.findOneAndDelete({ _id: appointmentToBeRemoved[0]._id });
    await Doctor.findByIdAndUpdate(
      { _id: appointmentToBeRemoved[0].doctor },
      {
        $pull: { shifts: { $in: shiftId } },
      }
    );
  } else {
    await Doctor.findOneAndUpdate(
      { shifts: { _id: shiftId } },
      { $pull: { shifts: { $in: shiftId } } }
    );
  }
  next();
});

const Shift = mongoose.model("Shifts", shiftModel);

module.exports = Shift;
const Appointment = require("./appointmentModel");
const Patient = require("./patientModel");
const Doctor = require("./doctorModel");
