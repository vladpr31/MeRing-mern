import React from "react";
const faqList = [
  {
    title: "What is the IoT ring used for in the clinic?",
    description:
      "The IoT ring is a wearable device that helps monitor vital signs and health metrics of patients. It collects real-time data, allowing doctors to track and analyze patients' health remotely.",
  },
  {
    title: "How does the smartphone app benefit patients?",
    description:
      "The smartphone app serves as a comprehensive health management tool. Patients can schedule appointments, receive medication reminders, track health metrics from the IoT ring, and communicate with their doctors through secure messaging.",
  },
  {
    title: "Can I use the web app to manage my health records?",
    description:
      "Yes, the web app provides a user-friendly interface for accessing and managing health records. Patients can review their medical history, appointments, and prescribed medications.",
  },
  {
    title: "How does the appointment scheduling system work?",
    description:
      "Patients can easily schedule appointments through the smartphone or web app. The system allows them to choose specific doctors, preferred time slots, and receive reminders for upcoming appointments.",
  },
  {
    title: "Are all types of doctors available in the clinic?",
    description:
      "Yes, the clinic offers a diverse range of doctors specializing in various fields, including general medicine, cardiology, pediatrics, orthopedics, and more. Patients can choose a doctor based on their specific healthcare needs.",
  },
  {
    title: "Can I use the chat feature to communicate with my doctor?",
    description:
      "Absolutely. The secure messaging feature allows patients to communicate with their doctors, ask questions, and receive timely responses. It enhances patient-doctor communication outside of regular appointments.",
  },
  {
    title: "How does the IoT ring ensure data security and privacy?",
    description:
      "The IoT ring uses robust encryption protocols to secure health data. The clinic follows strict privacy policies and complies with healthcare data protection regulations to ensure patient confidentiality.",
  },
  {
    title: "Can I review my medication history on the apps?",
    description:
      "Yes, both the smartphone and web apps provide a detailed medication history feature. Patients can view prescribed medications, dosage instructions, and track adherence over time",
  },
  {
    title: "Is the IoT ring mandatory for all patients?",
    description:
      "No, the use of the IoT ring is optional. Patients who opt for the IoT ring benefit from continuous health monitoring, but it is not a mandatory requirement for accessing other features of the clinic's digital health ecosystem.",
  },
  {
    title:
      "How does the clinic handle emergencies through these digital platforms?",
    description:
      "In case of emergencies, patients are advised to call emergency services. While the apps enhance day-to-day healthcare management, they are not a substitute for emergency medical assistance. The clinic provides clear guidelines for emergency situations.",
  },
];
const FAQSection = () => {
  return (
    <div className="bg-gray-800 py-8">
      <h1 className="text-center text-[48px] text-white mb-8">
        Frequenlty Asked Questions
      </h1>
      <div className="flex flex-col gap-y-5 p-10">
        {faqList.map((faq, index) => {
          return (
            <>
              <hr />
              <details className="collapse" key={index}>
                <summary className="collapse-title text-xl text-white font-medium">
                  {faq.title}
                </summary>
                <div className="collapse-content w-fit text-white">
                  <p>{faq.description}</p>
                </div>
              </details>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default FAQSection;
