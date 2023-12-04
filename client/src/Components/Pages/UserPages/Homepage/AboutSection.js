import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingMedical,
  faMicroscope,
  faHourglassHalf,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
const AboutSection = () => {
  return (
    <section className="bg-gray-800 py-10">
      <div className="w-fit mx-auto text-center mb-5">
        <h1 className="mb-5 uppercase bg-lime-400 text-center mx-auto w-fit text-black font-[500] p-2 rounded-3xl">
          our clinic helps you to stay healthy
        </h1>
        <h2 className="text-[32px] text-white ">
          Revitalize Your Life: Our Product, Your Path to Wellness!
        </h2>
        <p className="text-white px-4 lg:w-1/2 mx-auto py-4 break-normal">
          At the core of our mission is a steadfast commitment to ensuring you
          thrive effortlessly. Our primary focus revolves around keeping you at
          your optimal best, while we handle the heavy lifting. From meticulous
          attention to detail to seamless execution, we take care of it all, so
          you can enjoy the journey worry-free. Your well-being is our priority,
          and we are dedicated to making every step of the way a breeze for you.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          <div className="relative bg-white py-6 px-6 rounded-3xl w-82 my-4 shadow-xl">
            <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-pink-500 left-4 -top-6">
              <FontAwesomeIcon icon={faHandHoldingMedical} size="2xl" />
            </div>
            <div className="mt-8">
              <p className="text-xl font-semibold my-2 text-black">
                Professional Staff and Carers
              </p>
              <div className="flex space-x-2  text-sm text-black">
                <p>
                  {" "}
                  At our clinics, our dedicated professionals and caring staff
                  prioritize you. Your well-being is our focus, ensuring expert
                  care, compassion, and a supportive environment from the first
                  step through our doors.
                </p>
              </div>
            </div>
          </div>
          <div className="relative bg-white py-6 px-6 rounded-3xl w-82 my-4 shadow-xl">
            <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-yellow-500 left-4 -top-6">
              <FontAwesomeIcon icon={faMicroscope} size="2xl" />
            </div>
            <div className="mt-8">
              <p className="text-xl font-semibold my-2 text-black">
                Out Commitment
              </p>
              <div className="flex space-x-2  text-sm text-black">
                <p>
                  {" "}
                  We're dedicated to continuous research and growth, ensuring
                  our patients benefit from the latest technologies and
                  treatments. Our commitment to innovation guarantees
                  personalized, state-of-the-art care for every individual,
                  promoting a healthier tomorrow.
                </p>
              </div>
            </div>
          </div>

          <div className="relative bg-white py-6 px-6 rounded-3xl w-82 my-4 shadow-xl">
            <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-blue-500 left-4 -top-6">
              <FontAwesomeIcon icon={faHourglassHalf} size="2xl" />
            </div>
            <div className="mt-8">
              <p className="text-xl font-semibold my-2 text-black">
                Efficient Healthcare Excellence
              </p>
              <div className="flex space-x-2 text-black text-sm">
                <p>
                  At our clinic, we pride ourselves on providing efficient
                  services that prioritize your time and well-being. From easy
                  online scheduling to swift results, we ensure a streamlined
                  healthcare experience tailored to your needs. Your health is
                  our priority, delivered with speed and precision.
                </p>
              </div>
            </div>
          </div>

          <div className="relative bg-white py-6 px-6 rounded-3xl w-82 my-4 shadow-xl">
            <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-green-500 left-4 -top-6">
              <FontAwesomeIcon icon={faLeaf} size="2xl" />
            </div>
            <div className="mt-8">
              <p className="text-xl font-semibold my-2 text-black">
                Embracing Comfort
              </p>
              <div className="flex space-x-2 text-black text-sm">
                <p>
                  In our clinic, we strive to create a comfortable environment
                  where your health journey feels not just necessary but
                  comforting. Our welcoming atmosphere, attentive staff, and
                  patient-centric approach ensure that every visit is met with
                  ease and assurance. From cozy waiting areas to empathetic
                  caregivers, we prioritize your comfort every step of the way.
                  Experience healthcare in a warm and inviting setting, where
                  your well-being is our utmost concern.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
