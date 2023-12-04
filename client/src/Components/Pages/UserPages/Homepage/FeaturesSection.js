import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { mockUpImages } from "../../../../utils/utils";
import useWindowSize from "../../../../hooks/useWindowSize";
const slideVariants = {
  hiddenRight: {
    x: "100%",
    opacity: 0,
  },
  hiddenLeft: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: "0",
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.5,
    },
  },
};
const slidersVariants = {
  hover: {
    scale: 1.2,
  },
};
const dotsVariants = {
  initial: {
    y: 0,
  },
  animate: {
    y: -10,
    scale: 1.3,
    transition: { type: "spring", stiffness: 1000, damping: "10" },
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 },
  },
};
const FeaturesSection = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("left");
  const handleNext = () => {
    setDirection("right");

    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === mockUpImages.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setDirection("left");

    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? mockUpImages.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };
  return (
    <div className="flex flex-col h-full pb-8 bg-gray-800">
      <h1 className="text-white text-[32px] w-1/2 mx-auto text-center pt-14 pb-8 words-break underline underline-offset-8">
        MeRingHub
      </h1>
      <h2 className="text-white text-[16px] lg:text-[24px] lg:w-1/2 mx-auto text-center mb-12 words-break">
        Your All-in-One Wellness Companion for Easy Health Tracking, Appointment
        Scheduling, and Instant Doctor Chat Anytime, Anywhere!
      </h2>
      {isMobile ? (
        <div className="mockup-window  border text-white">
          <div className="flex justify-center px-4 py-16 text-white">
            {mockUpImages[currentIndex].desc}
          </div>
        </div>
      ) : null}
      <div className="flex justify-between items-center px-4 h-full">
        <motion.div
          variants={slidersVariants}
          whileHover="hover"
          className="p-2 h-full"
          onClick={handlePrevious}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="2xl"
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full"
          />
        </motion.div>
        <AnimatePresence>
          <motion.div
            variants={slideVariants}
            initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit"
            className="h-[500px] mx-auto flex justify-evenly items-center overflow-hidden "
          >
            <img
              key={currentIndex}
              src={mockUpImages[currentIndex].image}
              className="h-[500px]"
            />

            {isMobile ? null : (
              <div className="mockup-window w-1/3 border text-white">
                <div className="flex justify-center px-4 py-16 text-white">
                  {mockUpImages[currentIndex].desc}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <motion.div
          variants={slidersVariants}
          whileHover="hover"
          className="h-full p-2"
          onClick={handleNext}
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full"
            size="2xl"
          />
        </motion.div>
      </div>
      <div className="flex justify-center mt-8 gap-x-5 p-4 bg-white bg-opacity-20 rounded-full w-fit mx-auto">
        {mockUpImages.map((_, index) => (
          <motion.div
            key={index}
            onClick={() => handleDotClick(index)}
            initial="initial"
            animate={currentIndex === index ? "animate" : ""}
            whileHover="hover"
            variants={dotsVariants}
          >
            <FontAwesomeIcon
              icon={faCircle}
              size="2xs"
              className={`${
                currentIndex === index ? "text-blue-500" : "text-white"
              }`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
