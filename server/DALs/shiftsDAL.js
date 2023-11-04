const ShiftDB = require("../models/shiftModel");

const createNewShift = async (shiftInfo) => {
  const existingShift = await ShiftDB.findOne({
    shiftDate: shiftInfo.shiftDate,
    doctor: shiftInfo.doctor,
  }).then((result) => {
    return result;
  });
  if (existingShift) {
    return "Shift Exists..";
  } else {
    // Shift doesn't exist, so you can add the new shift for this doctor
    // You can create a new Mongoose Shift document from newShift and save it
    const newShift = new ShiftDB(shiftInfo);
    newShift.save();
    return newShift;
  }
};

const updateShiftAvailability = (shiftID, availability) => {
  return ShiftDB.findByIdAndUpdate(
    { _id: shiftID },
    { available: availability }
  );
};

const deleteShift = async (shift) => {
  return ShiftDB.findOneAndDelete({ _id: shift });
};

const deleteShiftByID = (shiftId) => {
  return ShiftDB.findByIdAndDelete({ _id: shiftId });
};
module.exports = {
  createNewShift,
  updateShiftAvailability,
  deleteShift,
  deleteShiftByID,
};
