const puppeteer = require("puppeteer");
const jf = require("jsonfile");
const file = "./data/diseases.json";
require("dotenv").config();
//first initialization, scraping data from NHS and saving it into json file.
//then only returning the json file.

const getDiseases = async () => {
  let dataAvailable = false;
  let data = await jf
    .readFile(file)
    .then((result) => {
      dataAvailable = true;
      return result;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  if (dataAvailable) {
    return JSON.parse(data);
  }
  if (!dataAvailable) {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(process.env.DISEASES_URI, {
      waitUntil: "domcontentloaded",
    });

    const diseases = await page.evaluate(() => {
      const diseasesList = document.querySelectorAll(".nhs-uk__az-link");
      return Array.from(diseasesList).map((disease, index) => {
        return { name: disease.innerText, id: index };
      });
    });
    await browser.close();
    const dataObject = JSON.stringify(diseases);
    jf.writeFile(file, dataObject, (err, res) => {
      if (err) {
        console.log("new error:", err);
      } else {
        console.log("createde json");
      }
    });
    data = await jf.readFile(file);
    return JSON.parse(data);
  }
};
module.exports = { getDiseases };
