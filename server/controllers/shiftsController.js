const shiftBLL = require("../BLLs/shiftsBLL/shiftsBLL");
const doctorBLL = require("../BLLs/doctorBLL/doctorBLL");
const appointmentBLL = require("../BLLs/appointmentsBLL/appointmentBLL");
const createNewShift = async (req, res) => {
  try {
    const { doctorID, role, shift } = req.body;
    if (role === "doctor") {
      const { _id: doctorUser } = await doctorBLL.getDoctorByAccountID(
        doctorID
      );

      const newShift = await shiftBLL.createNewShift({ doctorUser, shift });

      if (typeof newShift !== "string") {
        await doctorBLL.updateDoctorShifts(doctorUser, newShift);
        res.status(200).json("Shift Created");
      }
    } else {
      res.status(401).json("Not Authorized To Create Shifts.");
    }
  } catch (err) {
    console.log("newShift error:", err.message);
    res.status(400).json(err.message);
  }
};

const deleteShift = async (req, res) => {
  const { doctorId, shiftId } = req.params;
  const { _id: doctorUser } = await doctorBLL.getDoctorByAccountID(doctorId);
  if (doctorUser) {
    await shiftBLL.deleteShift(shiftId);
  }
};
module.exports = { createNewShift, deleteShift };
