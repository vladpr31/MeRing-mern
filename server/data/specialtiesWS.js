const puppeteer = require("puppeteer");
const jf = require("jsonfile");
const file = "./data/specialties.json";
const fs = require("fs");

//first initialization, scraping data from NHS and saving it into json file.
//then only returning the json file.

const upsertFile = async (name) => {
  try {
    // try to read file
    const hasData = await fs.promises.readFile(name);
    if (Object.keys(hasData).length > 0) {
      return { status: true };
    } else {
      return { status: false };
    }
  } catch (error) {
    // create empty file, because it wasn't found
    await fs.promises.writeFile(name, "");
    return { msg: "file created.", status: false };
  }
};

const getSpecialties = async () => {
  const english = /[a-zA-Z]/g;
  let { status: dataAvailable } = await upsertFile(file);
  if (dataAvailable) {
    let availableData = await jf.readFile(file);

    return JSON.parse(availableData);
  }
  if (!dataAvailable) {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(
      "https://www.science.co.il/medical/Medical-specialties.php",
      {
        waitUntil: "domcontentloaded",
      }
    );

    let specialties = await page.evaluate(() => {
      const specialtyList = document.querySelectorAll("td");
      return Array.from(specialtyList).map((specialty) => {
        return { name: specialty.innerText };
      });
    });
    await browser.close();
    specialties = specialties.filter(
      (specialty) => english.test(specialty.name) === true
    );
    specialties = specialties.map((specialty) => {
      let word = specialty.name.split(" ");

      for (let i = 0; i < word.length; i++) {
        word[i] = word[i].charAt(0).toUpperCase() + word[i].slice(1);
      }

      return { name: word.toString().replaceAll(",", " ") };
    });
    const dataObject = JSON.stringify(specialties);
    jf.writeFile(file, dataObject, (err, res) => {
      if (err) {
        console.log("new error:", err);
      } else {
        console.log("created json");
      }
    });
    data = await jf.readFile(file);
    return JSON.parse(data);
  }
};
module.exports = { getSpecialties };
