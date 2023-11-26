const patientBLL = require("../BLLs/patientBLL/patientBLL");
const doctorBLL = require("../BLLs/doctorBLL/doctorBLL");
const reviewBLL = require("../BLLs/reviewBLL/reviewBLL");
const userBLL = require("../BLLs/userBLL/userBLL");

const createNewReview = async (req, res) => {
  const review = req.body;
  const newReview = await reviewBLL.createNewReview(review);
  // const patient = await userBLL.getUserByID(review.userId);
  await patientBLL.updatePatient(review.userId, "reviews", newReview);
  await doctorBLL.updateDoctor(review.doctorId, "rating", newReview);
};
