const validator = require("validator");

const validation = async (req, res, next) => {
  const { info } = req.body;
  console.log("in validation:", info);
  try {
    if (req.url !== "/register-worker") {
      let userValidation = true;
      let apotroposValidation = true;
      const { newUser, newPatient, apotropos } = info;

      userValidation = validator.isEmail(newUser?.email);
      userValidation = validator.isAlpha(newPatient?.firstName);
      userValidation = validator.isAlpha(newPatient?.lastName);
      userValidation = validator.isStrongPassword(newUser?.password, {
        minLength: 6,
      });
      userValidation = validator.isAlphanumeric(newPatient?.address);
      userValidation = validator.isNumeric(newPatient?.phoneNumber);
      userValidation = validator.isAlpha(newPatient?.city);
      userValidation = validator.isAlpha(newPatient?.lastName);
      if (apotropos) {
        apotroposValidation = validator.isEmail(apotropos?.email);
        apotroposValidation = validator.isAlpha(apotropos?.firstName);
        apotroposValidation = validator.isAlpha(apotropos?.lastName);
        apotroposValidation = validator.isAlphanumeric(apotropos?.address);
        apotroposValidation = validator.isAlpha(apotropos?.city);
        apotroposValidation = validator.isNumeric(apotropos?.phoneNumber);
      }
      if (apotroposValidation && userValidation) {
        next();
      } else {
        res.status(400).json("Incorrect Values");
      }
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json("Something Went Wrong.");
  }
};

module.exports = validation;
