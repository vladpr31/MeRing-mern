import React from "react";
import useWindowSize from "../../../../hooks/useWindowSize";
import DoctorHero from "../../../../Assets/doctor-hero.png";
import RandLogo1 from "../../../../Assets/randLogo1.png";
import RandLogo2 from "../../../../Assets/randLogo2.png";
import RandLogo3 from "../../../../Assets/randLogo3.png";
import RandLogo4 from "../../../../Assets/randLogo4.png";
const HeroSection = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  return (
    <section className={`bg-[url('./Assets/1.png')] bg-cover bg-center h-fit`}>
      <div className="flex flex-col justify-between bg-black bg-opacity-50 px-4 h-full pt-20 pb-2">
        <div className="flex flex-col lg:flex-row justify-evenly h-full">
          <div className="lg:w-[40%] place-self-center">
            <h1 className="mb-5 text-3xl lg:text-5xl text-white font-bold">
              Empowering Health, Nurturing Wellness –<br />
              <span className="text-lime-200">We're Here for You!</span>
            </h1>
            <p className="mb-5 text-white">
              Ring Medical Center: Your Lifeline to Health. Accessible,
              Compassionate Care Tailored to You. Advanced Services,
              Personalized Plans — Transforming Lives, One at a Time.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
          <div className="scale-[0.8] md:scale-[1] lg:scale-[1]">
            <img
              src={DoctorHero}
              className="h-[550px] md:h-[550px] md:w-[50%] lg:w-full lg:h-[550px] pt-10 w-full "
            />
            {isMobile ? (
              <div className="flex bg-white lg:pt-4 lg:px-4 lg:mt-0 rounded-2xl justify-evenly bg-opacity-20 items-center backdrop-blur-sm">
                <img
                  src={RandLogo1}
                  className="h-[50px] w-[70px] lg:h-[80px] lg:w-[100px]"
                />
                <img
                  src={RandLogo2}
                  className="h-[50px] w-[70px] lg:h-[80px] lg:w-[110px]"
                />
                <img
                  src={RandLogo3}
                  className="h-[50px] w-[70px] lg:h-[80px] lg:w-[110px]"
                />
                <img
                  src={RandLogo4}
                  className="h-[70px] w-[70px] lg:h-[100px] lg:w-[110px]"
                />
              </div>
            ) : null}
          </div>
        </div>
        {!isMobile ? (
          <div className="flex bg-white p-2 lg:pt-4 lg:px-4 lg:mt-0 rounded-2xl justify-evenly bg-opacity-20 items-center backdrop-blur-sm">
            <img
              src={RandLogo1}
              className="h-[50px] w-[70px] lg:h-[80px] lg:w-[100px]"
            />
            <img
              src={RandLogo2}
              className="h-[50px] w-[70px] lg:h-[80px] lg:w-[110px]"
            />
            <img
              src={RandLogo3}
              className="h-[50px] w-[70px] lg:h-[80px] lg:w-[110px]"
            />
            <img
              src={RandLogo4}
              className="h-[70px] w-[70px] lg:h-[100px] lg:w-[110px]"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default HeroSection;
