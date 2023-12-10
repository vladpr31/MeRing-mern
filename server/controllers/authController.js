const authBLL = require("../BLLs/authBLL/authBLL");
const axios = require("axios");
const login = async (req, res) => {
  try {
    const response = await authBLL.userLogin(req.body);
    if (response && typeof response !== "string") {
      res.status(201).json(response);
    } else {
      res.status(401).json({ message: "Wrong Credentials or Invalid User" });
    }
  } catch (err) {
    console.log("in login error:", err.message);
    res.status(400).json(err.message);
  }
};

const registerUser = async (req, res) => {
  const { info } = req.body;
  const maxRetries = 3;

  const fetchRandomUser = async (gender) => {
    try {
      const randomUser = await axios.get(
        `https://randomuser.me/api/?gender=${gender}`
      );
      return randomUser.data.results[0].picture;
    } catch (err) {
      throw err;
    }
  };

  let retries = 0;

  while (retries < maxRetries) {
    try {
      const gender = info.newPatient.gender.toLowerCase();
      const userRandomPicture = await fetchRandomUser(gender);
      info.profileImage = userRandomPicture;

      const response = info.apotropos
        ? await authBLL.registerUserWithApotropos(info)
        : await authBLL.registerUserWithoutApotropos(info);

      return res.status(201).json(response);
    } catch (err) {
      if (
        err.code === "ECONNABORTED" ||
        err.code === "ETIMEDOUT" ||
        err.response?.status === 500
      ) {
        retries++;
        console.log(`Retry attempt ${retries}`);
        await wait(1000);
      } else {
        return res.status(400).json(err.message);
      }
    }
  }

  res.status(500).json("Failed to fetch the image after multiple attempts.");
};

const registerWorker = async (req, res) => {
  const maxRetries = 3;
  let retries = 0;

  const fetchRandomUserPicture = async (gender) => {
    try {
      const randomUser = await axios.get(
        `https://randomuser.me/api/?gender=${gender}`
      );
      return randomUser.data.results[0].picture;
    } catch (err) {
      throw err;
    }
  };

  while (retries < maxRetries) {
    try {
      const { doctor } = req.body;
      const gender = doctor.gender.toLowerCase();

      const userRandomPicture = await fetchRandomUserPicture(gender);
      doctor.profileImage = userRandomPicture;

      const response = await authBLL.registerNewDoctor(req.body);

      return res
        .status(200)
        .json(
          response !== "Email Already In Use"
            ? response
            : "Email Already In Use"
        );
    } catch (err) {
      if (
        err.code === "ECONNABORTED" ||
        err.code === "ETIMEDOUT" ||
        err.response?.status === 500
      ) {
        retries++;
        console.log(`Retry attempt ${retries}`);
        await wait(1000); // Adjust the delay as needed
      } else {
        console.error("Error in worker registration route:", err.message);
        return res.status(401).json(err.message);
      }
    }
  }

  return res
    .status(500)
    .json("Failed to register worker after multiple attempts.");
};

const createAdmin = async (req, res) => {
  const admin = await authBLL.createNewAdmin();
  if (admin === true) {
    res.status(200).json(true);
  } else {
    res.status(201).json("admin created");
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
