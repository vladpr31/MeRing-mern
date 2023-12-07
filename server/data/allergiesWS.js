const file = "./data/allergies.json";
const jf = require("jsonfile");
const getAllergies = () => {
  const data = jf.readFile(file);
  return data;
};
module.exports = { getAllergies };
