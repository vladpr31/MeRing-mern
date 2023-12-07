const diseaseWebService = require("../data/diseasesWS");
const specialtiesWebService = require("../data/specialtiesWS");
const allergiesWS = require("../data/allergiesWS");
const getAllDiseases = async (req, res) => {
  try {
    const response = await diseaseWebService.getDiseases();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
const getAllAllergies = async (req, res) => {
  try {
    const response = await allergiesWS.getAllergies();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
const getAllSpecialties = async (req, res) => {
  try {
    const response = await specialtiesWebService.getSpecialties();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
module.exports = { getAllDiseases, getAllSpecialties, getAllAllergies };
