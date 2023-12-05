const authBLL = require("../BLLs/authBLL/authBLL");
const validation = require("../middlewares/validation-middleware");
const axios = require("axios");
const login = async (req, res) => {
  try {
    console.log("login body:", req.body);
    const response = await authBLL.userLogin(req.body);
    if (response && typeof response !== "string") {
      res.status(201).json(response);
    } else {
      console.log(response);
      res.status(401).json({ message: "Wrong Credentials or Invalid User" });
    }
  } catch (err) {
    console.log("in login error:", err.message);
    res.status(400).json(err.message);
  }
};

const registerUser =
  (validation,
  async (req, res) => {
    const { info } = req.body;
    const maxRetries = 3; // Set the maximum number of retries
    let retries = 0;
    console.log("info:", info);
    while (retries < maxRetries) {
      try {
        const gender = info.newPatient.gender.toLowerCase();

        const randomUser = await axios.get(
          `https://randomuser.me/api/?gender=${gender}`
        );

        const userRandomPicture = randomUser.data.results[0].picture;
        info.profileImage = userRandomPicture;

        if (info.apotropos) {
          const response = await authBLL.registerUserWithApotropos(info);
          return res.status(201).json(response);
        } else {
          const response = await authBLL.registerUserWithoutApotropos(info);
          return res.status(201).json(response);
        }
      } catch (err) {
        // Handle errors, including timeouts
        if (
          err.code === "ECONNABORTED" ||
          err.code === "ETIMEDOUT" ||
          err.response?.status === 500
        ) {
          // Increment the retry count
          retries++;

          // Log the retry attempt
          console.log(`Retry attempt ${retries}`);

          // Wait for a short period before retrying (optional)
          await wait(1000); // Adjust the delay as needed
        } else {
          // Handle other errors
          return res.status(400).json(err.message);
        }
      }
    }

    // If all retries fail, respond with an error to the client
    res.status(500).json("Failed to fetch the image after multiple attempts.");
  });

// Function to wait for a specified duration (in milliseconds)

const registerWorker =
  (validation,
  async (req, res) => {
    const maxRetries = 3; // Set the maximum number of retries
    let retries = 0;

    while (retries < maxRetries) {
      try {
        console.log(req.body);
        const gender = req.body.doctor.gender.toLowerCase();

        const randomUser = await axios.get(
          `https://randomuser.me/api/?gender=${gender}`
        );
        const userRandomPicture = randomUser.data.results[0].picture;
        req.body.doctor.profileImage = userRandomPicture;
        const response = await authBLL.registerNewDoctor(req.body);
        if (response && response !== "Email Already In Use") {
          return res.status(200).json(response);
        } else {
          return res.status(200).json(response);
        }
      } catch (err) {
        // Handle errors, including timeouts
        if (
          err.code === "ECONNABORTED" ||
          err.code === "ETIMEDOUT" ||
          err.response?.status === 500
        ) {
          // Increment the retry count
          retries++;

          // Log the retry attempt
          console.log(`Retry attempt ${retries}`);

          // Wait for a short period before retrying (optional)
          await wait(1000); // Adjust the delay as needed
        } else {
          // Handle other errors
          console.log("Error in worker registration route:", err.message);
          return res.status(401).json(err.message);
        }
      }
    }

    // If all retries fail, respond with an error to the client
    return res
      .status(500)
      .json("Failed to register worker after multiple attempts.");
  });

const createAdmin = async (req, res) => {
  const admin = await authBLL.createNewAdmin();
  if (admin === true) {
    res.status(200).json(true);
  } else {
    res.status(200).json("admin created");
  }
};

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

module.exports = {
  registerUser,
  registerWorker,
  login,
  createAdmin,
};
