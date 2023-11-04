const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  clinicName: String,
  clinicWorkers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctors" }],
  location: String,
});

//After Creating a clinic, update the doctors that we assigned to that clinic to be working for that clinic.
clinicSchema.post("save", async (doc) => {
  for (let i = 0; i < doc.clinicWorkers.length; i++) {
    //update doctor's clinic if i create new clinic and add that doctor to the new clinic.
    await Doctor.findByIdAndUpdate(
      { _id: doc.clinicWorkers[i].toString() },
      {
        clinic: doc._id,
      }
    )
      .then()
      .catch((error) => console.log("postSave Error:", error.message));

    //update appointments in case im creating a new clinic and adding a doctor as worker of that clinic and he already has
    // an appointment in the previous clinic.
    await Appointment.updateMany(
      { doctor: doc.clinicWorkers[i].toString() },
      { clinic: doc._id }
    );
  }
  //removing the doctors from the clincWorkers field when i move a doctor from one clinic to another clinic.
  const allClinics = await Clinic.find({ _id: { $ne: doc._id.toString() } });
  for (const clinic of allClinics) {
    await Clinic.updateMany(
      { _id: clinic._id.toString() },
      { $pull: { clinicWorkers: { $in: doc.clinicWorkers } } }
    )
      .then()
      .catch((error) => console.log("doctor postSave error:", error.message));
  }
});

//When deleting a clinic, update all the doctors that work in the clinic to be Null in clinic field.
//Doctors can still be assigned to another clinic, but they wont show up on the frontend in "Doctor's Card".
clinicSchema.post("findOneAndRemove", async (doc) => {
  await Doctor.updateMany({ clinic: doc._id.toString() }, { clinic: null });
});

clinicSchema.post("findOneAndUpdate", async (doc) => {
  console.log("doc but executed from createDoctor Save:", doc);
  const afterUpdateDoc = await Clinic.findById({ _id: doc._id });
  console.log("beforeDocUpdate:", doc);
  console.log("afterDocUpdate:", afterUpdateDoc);
  //if i added a new doctor to that clinic, then i get the added doctors.
  const addedDoc = afterUpdateDoc.clinicWorkers.filter(
    (worker) => !doc.clinicWorkers.includes(worker)
  );
  //if i removed a doctor from a clinic get the removed doctors.
  const removedDoc = doc.clinicWorkers.filter(
    (worker) => !afterUpdateDoc.clinicWorkers.includes(worker)
  );
  console.log("removedDoc:", removedDoc);
  console.log("addedDoc:", addedDoc);

  //update the removed doctor's clinic to be null in case i dont move it to any other clinic,
  // doctor with a null value in clinic will not be displayed for the user on creating a new appointment page on the front.
  for (const doctor of removedDoc) {
    await Doctor.findByIdAndUpdate(
      { _id: doctor.toString() },
      { clinic: null }
    );
  }
  // update the added doctors to the new clinic, remove the doctor from the old clinic, and update any appointments
  // with that doctor to the new clinic.
  for (const doctor of addedDoc) {
    const prevClinic = await Doctor.findById({ _id: doctor.toString() });
    await Clinic.findByIdAndUpdate(
      { _id: prevClinic.clinic._id.toString() },
      { $pull: { clinicWorkers: { $in: doctor.toString() } } }
    );
    await Doctor.findByIdAndUpdate(
      { _id: doctor.toString() },
      { clinic: doc._id }
    )
      .then((result) => console.log("doctorUpdate", result))
      .catch((err) => console.log(err.message));
    await Clinic.findByIdAndUpdate(
      { _id: doc._id },
      { $addToSet: { clinicWorkers: { doctor } } }
    )
      .then()
      .catch((error) => console.log(error));
    await Appointment.updateMany(
      { doctor: doctor.toString() },
      { clinic: afterUpdateDoc._id }
    );
  }
});
const Clinic = mongoose.model("Clinics", clinicSchema);
module.exports = Clinic;
const Doctor = require("./doctorModel");
const Appointment = require("./appointmentModel");
