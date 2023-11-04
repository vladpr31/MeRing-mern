import React from "react";
import Card from "../../../UI/Card";
const PatientAnalysis = () => {
  return (
    <div className="flex pl-12 py-8">
      <Card
        props={{
          type: "Red Blood Cells",
          metrics: "mcL",
          value: Math.floor(Math.random() * (6.1 - 4.6)) + 4.6,
          maxValue: 6.1,
          moreData: [
            {
              dataName: "Haemoglobin",
              dataDescription:
                "A protein found in the red blood cells that carries oxygen in your body and gives blood its red colour.",
            },
            {
              dataName: "MCV",
              dataDescription:
                "An MCV blood test measures the average size of your red blood cells.",
            },
            {
              dataName: "MCH",
              dataDescription:
                "Mean Corpuscular Hemoglobin, and is a calculation of the average amount of hemoglobin contained in each of a person's red blood cells",
            },
            {
              dataName: "MCHC",
              dataDescription:
                "A measurement of the average amount of hemoglobin in a single red blood cell (RBC) as it relates to the volume of the cell",
            },
            {
              dataName: "HCT",
              dataDescription:
                "A hematocrit test (Hct) is a simple blood test that measures the percentage of red blood cells in your blood.",
            },
          ],
        }}
      />
      <Card
        props={{
          type: "White Blood Cells",
          metrics: "mcL",
          value: Math.floor(Math.random() * (11000 - 4000)) + 4000,
          maxValue: 15000,
          moreData: [
            {
              dataName: "White Cell Count",
              dataDescription:
                "A white blood count measures the number of white cells in your blood. White blood cells are part of the immune system. They help your body fight off infections and other diseases.",
            },
            {
              dataName: "Lymphocytes",
              dataDescription:
                "Lymphocytes are a type of white blood cell. They help your body's immune system fight cancer and foreign viruses and bacteria.",
            },
            {
              dataName: "Basophils",
              dataDescription:
                "Basophils are a type of white blood cell that works closely with your immune system to defend your body from allergens, pathogens and parasites.",
            },
            {
              dataName: "Neutrophils",
              dataDescription:
                "Neutrophils are a type of white blood cell (leukocytes) that act as your immune system's first line of defense.",
            },
            {
              dataName: "Monocytes",
              dataDescription:
                "Monocytes are a type of white blood cell (leukocytes) that reside in your blood and tissues to find and destroy germs.",
            },
            {
              dataName: "Eosinophils",
              dataDescription:
                "Eosinophils are a type of disease-fighting white blood cell. This condition most often indicates a parasitic infection, an allergic reaction or cancer.",
            },
          ],
        }}
      />
    </div>
  );
};

export default PatientAnalysis;
