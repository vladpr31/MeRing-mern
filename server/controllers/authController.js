const authBLL = require("../BLLs/authBLL/authBLL");
const validation = require("../middlewares/validation-middleware");

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

const registerUser =
  (validation,
  async (req, res) => {
    const { info } = req.body;

    try {
      if (info.apotropos) {
        const response = await authBLL.registerUserWithApotropos(info);
        res.status(201).json(response);
      } else {
        const response = await authBLL.registerUserWithoutApotropos(info);
        res.status(201).json(response);
      }
    } catch (err) {
      res.status(400).json(err.message);
    }
  });

const registerWorker =
  (validation,
  async (req, res) => {
    try {
      const response = await authBLL.registerNewDoctor(req.body);
      console.log("in worker register:", response);
      if (response && response !== "Email Already In Use") {
        res.status(200).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (err) {
      console.log("error in worker registartion route:", err.message);
      res.status(401).json(err.message);
    }
  });

const createAdmin = async (req, res) => {
  const admin = await authBLL.createNewAdmin();
  if (admin === true) {
    res.status(200).json(true);
  } else {
    res.status(200).json("admin created");
  }
};
module.exports = { registerUser, registerWorker, login, createAdmin };
