const jwt = require("jsonwebtoken");
const patientBLL = require("../patientBLL/patientBLL");
const apotroposDAL = require("../../DALs/apotroposDAL");
const userDAL = require("../../DALs/userDAL");
const doctorBLL = require("../doctorBLL/doctorBLL");
require("dotenv").config();
const generateJWTAccessToken = (userInfo) => {
  return jwt.sign(userInfo, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
const generateJWTRefreshToken = (userInfo) => {
  return jwt.sign(userInfo, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "365d",
  });
};

const registerUserWithApotropos = async (userInfo) => {
  try {
    const user = await userDAL.checkAvailability(userInfo.newUser);
    if (!user) {
      const apotroposResponse = await apotroposDAL.createNewApotropos(
        userInfo.apotropos
      );
      const userResponse = await userDAL.createNewUser(userInfo.newUser);
      const patientResponse = await patientBLL.createNewPatient({
        patientInfo: userInfo.newPatient,
        account: userResponse._id,
      });
      await hasApotropos(apotroposResponse, patientResponse);

      const accessToken = generateJWTAccessToken({ user: userResponse });
      const refreshToken = generateJWTRefreshToken({ user: userResponse });
      return {
        accessToken,
        refreshToken,
        id: userResponse._id,
        role: userResponse.role,
      };
    } else {
      return "Email Already In Use";
    }
  } catch (err) {
    return err.message;
  }
};
const registerUserWithoutApotropos = async (userInfo) => {
  try {
    const user = await userDAL.checkAvailability(userInfo.newUser);
    console.log(userInfo);
    if (!user) {
      const userResponse = await userDAL.createNewUser(userInfo.newUser);
      userInfo.newPatient.profileImage = userInfo.profileImage;
      const patientResponse = await patientBLL.createNewPatient({
        patientInfo: userInfo.newPatient,
        account: userResponse._id,
      });
      const accessToken = generateJWTAccessToken({ user: userResponse });
      const refreshToken = generateJWTRefreshToken({ user: userResponse });
      return {
        accessToken,
        refreshToken,
        id: userResponse._id,
        role: userResponse.role,
      };
    } else {
      return "Email Already In Use";
    }
  } catch (err) {
    return err.message;
  }
};
const userLogin = async (userCredentials) => {
  try {
    const user = await userDAL.validateUser(userCredentials);
    if (user && typeof user !== "string") {
      const accessToken = generateJWTAccessToken(userCredentials);
      const refreshToken = generateJWTRefreshToken(userCredentials);
      return { accessToken, refreshToken, id: user._id, role: user.role };
    } else {
      return user;
    }
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

const registerNewDoctor = async (doctorCreds) => {
  const taken = await userDAL.checkAvailability(doctorCreds.docCredentials);

  if (!taken) {
    //creates account
    const workerResponse = await userDAL.createNewDoctor(
      doctorCreds.docCredentials
    );
    console.log("in registerNeDoctor:", doctorCreds.doctor);
    //creates doctor after account is created.
    doctorCreds.doctor.account = workerResponse._id;
    await doctorBLL.createNewDoctorWithCredential({
      doctorInfo: doctorCreds.doctor,
      account: workerResponse._id,
    });
    const accessToken = generateJWTAccessToken({ user: workerResponse });
    const refreshToken = generateJWTRefreshToken({ user: workerResponse });
    return {
      accessToken,
      refreshToken,
      id: workerResponse._id,
      role: workerResponse.role,
    };
  } else {
    return "Email Already In Use";
  }
};

const createNewAdmin = () => {
  return userDAL.createNewAdmin();
};
module.exports = {
  registerUserWithApotropos,
  registerUserWithoutApotropos,
  userLogin,
  registerNewDoctor,
  createNewAdmin,
};

// const hasApotropos = async (apotropos, patient) => {
//   await apotroposDAL.updateApotroposOf(apotropos._id, patient._id);
//   await patientBLL.updateApotroposOfPatient(patient._id, apotropos._id);
// };
