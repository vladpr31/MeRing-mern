const doctorBLL = require("../BLLs/doctorBLL/doctorBLL");

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorBLL.getAllDoctors();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const createNewDoctor = async (req, res) => {
  try {
    const doctorDetails = req.body;
    await doctorBLL.createNewDoctor(doctorDetails);
    const allDoctors = await doctorBLL.getAllDoctors();
    if (allDoctors) {
      res.status(200).json(allDoctors);
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctorDetails = req.body;

    const updatedDoctor = await doctorBLL.updateDoctor(id, doctorDetails);
    if (updatedDoctor) {
      res.status(200).json(updatedDoctor);
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const deleteDoctorByID = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("remove doctor with ID:", id);
    await doctorBLL.removeDoctor(id);
    const doctors = await doctorBLL.getAllDoctors();
    if (doctors) {
      res.status(200).json(doctors);
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

const getDoctorDataByID = async (req, res) => {
  try {
    const { id } = req.params;
    const doctorID = await doctorBLL.getDoctorByAccountID(id);
    if (doctorID) {
      const doctor = await doctorBLL.getDoctorByID(doctorID);
      if (doctor) {
        res.status(200).json(doctor);
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(401).json(err.message);
  }
};

const getDoctorsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const doctors = await doctorBLL.getDoctorsByCategory(category);
    res.status(200).json(doctors);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

const createDoctorReview = async (req, res) => {
  try {
    const doctorID = req.params;
    const { review } = req.body;
    const doctor = await doctorBLL.getDoctorByID(doctorID);
    const alreadyReviewed = doctor.rating.filter(
      (review) => review == reviewerID
    );
    if (!alreadyReviewed) {
      await doctorBLL.addDoctorReview(doctorID, review);
      res.status(200).json("Review Created.");
    } else {
      res.status(200).json("You've already reviewed that doctor.");
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

const getReviewByDoctorID = async (req, res) => {
  try {
    const { doctorID } = req.params();
    const doctor = await doctorBLL.getDoctorByID(doctorID);
    const totalRating = Object.keys(doctor).reduce((prev, curr) => {
      prev.rating += curr.rating;
    });
    console.log(totalRating);
    res.status(200).json({ reviews: doctor.rating, totalRating });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};
module.exports = {
  getAllDoctors,
  createNewDoctor,
  updateDoctor,
  deleteDoctorByID,
  getDoctorDataByID,
  getDoctorsByCategory,
  createDoctorReview,
  getReviewByDoctorID,
};
