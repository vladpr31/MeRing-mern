const ApotroposDB = require("../models/apotroposModel");

const createNewApotropos = (apotroposInfo) => {
  try {
    const newApotropos = new ApotroposDB(apotroposInfo);
    newApotropos.save();
    return newApotropos;
  } catch (err) {
    return err.message;
  }
};

const updateApotroposOf = async (id, patient) => {
  try {
    return ApotroposDB.findByIdAndUpdate(id, { apotroposOf: patient })
      .then((result) => {
        return result;
      })
      .catch((err) => console.log("updateApotroposOf Error:", err.message));
  } catch (err) {
    return err.message;
  }
};

module.exports = { createNewApotropos, updateApotroposOf };
