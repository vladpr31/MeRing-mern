import React, { useState, useEffect } from "react";
import Navbar from "../../../UI/Navbar/Navbar";
import DoctorHero from "../../../../Assets/doctor-hero.png";
import RandLogo1 from "../../../../Assets/randLogo1.png";
import RandLogo2 from "../../../../Assets/randLogo2.png";
import RandLogo3 from "../../../../Assets/randLogo3.png";
import RandLogo4 from "../../../../Assets/randLogo4.png";
import RandImage1 from "../../../../Assets/randImage1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingMedical,
  faMicroscope,
  faHourglassHalf,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { getAllArticles } from "../../../../api/api";
import useWindowSize from "../../../../hooks/useWindowSize";
import ArticleImage from "./ArticleImage";
const Homepage = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchLatestNews = async () => {
      const news = await getAllArticles();
      console.log(news.data);
      if (news?.data?.length > 0) {
        setArticles(news.data);
      }
    };
    fetchLatestNews();
  }, []);
  return (
    <>
      <Navbar />
      <section
        className={`bg-[url('./Assets/1.png')] bg-cover bg-center h-fit`}
      >
        <div className="flex flex-col justify-between bg-black bg-opacity-50 px-4 h-full pt-20">
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
            thrive effortlessly. Our primary focus revolves around keeping you
            at your optimal best, while we handle the heavy lifting. From
            meticulous attention to detail to seamless execution, we take care
            of it all, so you can enjoy the journey worry-free. Your well-being
            is our priority, and we are dedicated to making every step of the
            way a breeze for you.
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
                    prioritize you. Your well-being is our focus, ensuring
                    expert care, compassion, and a supportive environment from
                    the first step through our doors.
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
                    caregivers, we prioritize your comfort every step of the
                    way. Experience healthcare in a warm and inviting setting,
                    where your well-being is our utmost concern.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-12 py-10 px-8">
        <h2 className="mb-16 text-center text-2xl font-bold">
          Latest articles
        </h2>
        {articles.length > 0
          ? articles.map((article, index) => {
              console.log(article);
              if (index % 2 == 0) {
                return (
                  <div className="mb-16 flex flex-wrap" key={index}>
                    <div className="mb-6 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-6/12 lg:pr-6">
                      <div
                        className="ripple relative overflow-hidden rounded-lg bg-cover bg-[50%] bg-no-repeat shadow-lg dark:shadow-black/20"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        <ArticleImage image={article.articleImage} />
                      </div>
                    </div>

                    <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12 lg:pl-6">
                      <h3 className="mb-4 text-2xl font-bold">
                        {article.title}
                      </h3>

                      <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
                        Published{" "}
                        <u>
                          {new Date(article.date).toLocaleDateString("en-GB")}
                        </u>{" "}
                        by {article.publisher}
                      </p>
                      <p className="mb-6 text-neutral-500 dark:text-neutral-300">
                        {article.articleBody}
                      </p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="mb-16 flex flex-wrap lg:flex-row-reverse"
                    key={index}
                  >
                    <div className="mb-6 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-6/12 lg:pl-6">
                      <div
                        className="ripple relative overflow-hidden rounded-lg bg-cover bg-[50%] bg-no-repeat shadow-lg dark:shadow-black/20"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        {article.articleImage}
                      </div>
                    </div>

                    <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12 lg:pr-6">
                      <h3 className="mb-4 text-2xl font-bold">
                        {article.title}
                      </h3>
                      <div className="mb-4 flex items-center text-sm font-medium text-primary dark:text-primary-400">
                        Art
                      </div>
                      <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
                        Published <u>{new Date(article.date)}</u> by
                        <a href="#!">Anna Doe</a>
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-300">
                        {article.articleBody}
                      </p>
                    </div>
                  </div>
                );
              }
            })
          : null}
      </section>
    </>
  );
};

export default Homepage;
//  <div className="bg-[url('./Assets/1.png')] bg-cover bg-center h-full w-full ">
//           <div className="flex flex-col gap-y-5 lg:flex-row bg-black bg-opacity-50 py-10 px-4">
//             <div className="p-2 bg-white rounded-2xl mx-2 text-black lg:w-[33%]">
//               <h2 className="text-black text-[24px] p-2">
//                 <FontAwesomeIcon
//                   icon={faHandHoldingMedical}
//                   style={{ color: "#4dcadb" }}
//                 />
//                 <span className="ml-2">Professional Staff and Carers</span>
//               </h2>
//               <p>
//                 At our clinics, our dedicated professionals and caring staff
//                 prioritize you. Your well-being is our focus, ensuring expert
//                 care, compassion, and a supportive environment from the first
//                 step through our doors.
//               </p>
//             </div>
//             <div className="p-2 bg-white rounded-2xl mx-2 text-black lg:w-[33%]">
//               {" "}
//               <h2 className="text-black text-[24px] p-2 w-fit ">
//                 <FontAwesomeIcon
//                   icon={faMicroscope}
//                   style={{ color: "#bd8305" }}
//                 />
//                 <span className="ml-2 place-self-center w-fit">
//                   Our Commitment
//                 </span>
//               </h2>
//               <p>
//                 We're dedicated to continuous research and growth, ensuring our
//                 patients benefit from the latest technologies and treatments.
//                 Our commitment to innovation guarantees personalized,
//                 state-of-the-art care for every individual, promoting a
//                 healthier tomorrow.
//               </p>
//             </div>
//             <div className="p-2 bg-white rounded-2xl mx-2 text-black lg:w-[33%]">
//               {" "}
//               <h2 className="text-black text-[24px] p-2">
//                 <FontAwesomeIcon
//                   icon={faHandHoldingMedical}
//                   style={{ color: "#1ba4b6" }}
//                 />
//                 <span className="ml-2">Efficient Healthcare Excellence</span>
//               </h2>
//               <p>
//                 At our clinic, we pride ourselves on providing efficient
//                 services that prioritize your time and well-being. From easy
//                 online scheduling to swift results, we ensure a streamlined
//                 healthcare experience tailored to your needs. Your health is our
//                 priority, delivered with speed and precision.
//               </p>
//             </div>
//           </div>
//         </div>
