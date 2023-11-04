const shiftDAL = require("../../DALs/shiftsDAL");

const createNewShift = async (shiftInfo) => {
  const { doctorUser, shift } = shiftInfo;
  const shiftObject = {
    shiftDate: shift,
    available: true,
    doctor: doctorUser,
  };
  return shiftDAL.createNewShift(shiftObject);
};

const updateShiftAvailability = (shiftID, availability) => {
  return shiftDAL.updateShiftAvailability(shiftID, availability);
};

const deleteShift = (shift) => {
  return shiftDAL.deleteShift(shift);
};
const deleteShiftByID = (shiftId) => {
  return shiftDAL.deleteShiftByID(shiftId);
};
module.exports = {
  createNewShift,
  updateShiftAvailability,
  deleteShift,
  deleteShiftByID,
};
