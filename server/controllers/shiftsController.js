const shiftBLL = require("../BLLs/shiftsBLL/shiftsBLL");
const doctorBLL = require("../BLLs/doctorBLL/doctorBLL");
const createNewShift = async (req, res, next) => {
  try {
    const { doctorID, role, shift } = req.body;

    if (role === "doctor") {
      const { _id: doctorUser } = await doctorBLL.getDoctorByAccountID(
        doctorID
      );
      const newShift = await shiftBLL.createNewShift({ doctorUser, shift });

      if (typeof newShift !== "string") {
        await doctorBLL.updateDoctorShifts(doctorUser, newShift);
        res.status(201).json("Shift Created");
      } else {
        // If newShift is a string (indicating an error), throw an error
        throw new Error({ status: 404, message: newShift });
      }
    } else {
      // If the role is not "doctor", throw an error
      throw new Error({
        status: 400,
        message: "Not Authorized To Create Shifts.",
      });
    }
  } catch (err) {
    // Pass the error to the next middleware (error handler)
    next(err);
  }
};

const deleteShift = async (req, res, next) => {
  try {
    const { doctorId, shiftId } = req.params;
    const { _id: doctorUser } = await doctorBLL.getDoctorByAccountID(doctorId);

    if (doctorUser) {
      await shiftBLL.deleteShift(shiftId);
      res.status(200).json("Shift Deleted");
    } else {
      // If doctorUser is not found, throw an error
      throw new Error({ status: 404, message: "Doctor not found" });
    }
  } catch (err) {
    // Pass the error to the next middleware (error handler)
    next(err);
  }
};
module.exports = { createNewShift, deleteShift };
