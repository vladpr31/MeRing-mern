import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUser,
  faPenToSquare,
  faRightToBracket,
  faCircleQuestion,
  faHouse,
  faFileMedical,
  faChartSimple,
  faClipboard,
  faCalendarDays,
  faCalendarPlus,
  faUserPen,
  faUserDoctor,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";

import Mocukp1 from "../Assets/MockUps/1.png";
import Mocukp2 from "../Assets/MockUps/2.png";
import Mocukp3 from "../Assets/MockUps/3.png";
import Mocukp4 from "../Assets/MockUps/4.png";
import Mocukp5 from "../Assets/MockUps/5.png";
import Mocukp6 from "../Assets/MockUps/6.png";
import Mocukp7 from "../Assets/MockUps/7.png";
import Mocukp8 from "../Assets/MockUps/8.png";
import Mocukp10 from "../Assets/MockUps/10.png";
import Mocukp11 from "../Assets/MockUps/11.png";
import Mocukp12 from "../Assets/MockUps/12.png";
export const checkInputs = (newUser, newPatient) => {
  const error = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    city: "",
    address: "",
    phoneNumber: "",
  };
  let count = 0;
  if (newUser.email.length < 0 || !newUser.email.includes("@")) {
    error.email = "Email Must Be Valid Email Adress(example@example.com)";
    count++;
  }
  if (newUser.password.length < 6) {
    error.password = "Password must be atleast 6 digits";
    count++;
  }
  if (newPatient.address.length === 0) {
    error.address = "Adress cannot be empty";
    count++;
  }
  if (newPatient.city.length === 0) {
    error.city = "City cannot be empty";
    count++;
  }
  if (newPatient.phoneNumber.length === 0) {
    error.phoneNumber = "Phone number cannot be empty.";
    count++;
  }
  if (newPatient.firstName.length <= 1) {
    error.firstName = "Pleace insert correct first name.";
    count++;
  }
  if (newPatient.lastName.length <= 1) {
    error.lastName = "Pleace insert correct last name.";
    count++;
  }

  return count === 0 ? true : error;
};

export const getGreetingText = () => {
  const date = new Date();
  const currHr = date.getHours();

  if (currHr < 12) {
    return "Good Morning,";
  } else if (currHr < 18) {
    return "Good Afternoon,";
  } else {
    return "Good Evening,";
  }
};

export const NavItems = [
  {
    title: "My Profile",
    src: <FontAwesomeIcon icon={faUser} style={{ color: "#1891dc" }} />,
  },
  {
    title: "Home",
    refTo: "/",
    src: <FontAwesomeIcon icon={faHouse} style={{ color: "#1891dc" }} />,
  },
  {
    title: "About",
    refTo: "/about",
    src: (
      <FontAwesomeIcon icon={faCircleQuestion} style={{ color: "#639da1" }} />
    ),
  },
  // {
  //   title: "Showcase",
  //   refTo: "/showcase",
  //   src: <FontAwesomeIcon icon={faSuitcase} style={{ color: "#b4976e" }} />,
  // },
  {
    title: "Logout",
    refTo: "/",
    src: (
      <FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#001019" }} />
    ),
  },
  {
    title: "Register",
    refTo: "/register",
    src: <FontAwesomeIcon icon={faPenToSquare} />,
  },
  {
    title: "Log-In",
    refTo: "/login",
    src: (
      <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#0a853f" }} />
    ),
  },
];
export const UserMenus = (auth) => {
  return [
    {
      title: "Dashboard",
      icon: (
        <FontAwesomeIcon
          icon={faClipboard}
          size="lg"
          style={{ color: "#8f734d" }}
        />
      ),
      ref: `/${auth.role}/${auth.id}`,
    },
    {
      title: "My Diagnosis",
      icon: (
        <FontAwesomeIcon
          icon={faChartSimple}
          size="lg"
          style={{ color: "#33b9e6" }}
        />
      ),
      ref: `/${auth.role}/${auth.id}/diagnosis`,
    },
    {
      title: "Medical Records",
      icon: (
        <FontAwesomeIcon
          icon={faFileMedical}
          size="lg"
          style={{ color: "#f06666" }}
        />
      ),
      ref: `/${auth.role}/${auth.id}/records`,
    },
    {
      title: "My Appointments",
      icon: (
        <FontAwesomeIcon
          icon={faCalendarDays}
          size="lg"
          style={{ color: "#33c9cc" }}
        />
      ),
      ref: `/${auth.role}/${auth.id}/my-appointments`,
    },
    {
      title: "New Appointment",
      icon: (
        <FontAwesomeIcon
          icon={faCalendarPlus}
          style={{ color: "#de877d" }}
          size="lg"
        />
      ),
      ref: `/${auth.role}/${auth.id}/new-appointment`,
    },
    {
      title: "Edit Profile",
      icon: (
        <FontAwesomeIcon
          icon={faUserPen}
          style={{ color: "#000000" }}
          size="lg"
        />
      ),
      ref: `/${auth.role}/${auth.id}/profile`,
    },
    {
      title: "Doctor's Requests",
      icon: (
        <FontAwesomeIcon
          icon={faUserDoctor}
          style={{ color: "#c8ad74" }}
          size="lg"
        />
      ),
      ref: `/${auth.role}/${auth.id}/requests`,
    },
  ];
};

export const StarRating = (rating) => {
  const starIcons = [];

  // Add full stars
  for (let i = 0; i < Math.floor(rating); i++) {
    starIcons.push(
      <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
    );
  }

  // Add half star if applicable
  if (rating % 1 !== 0) {
    starIcons.push(
      <FontAwesomeIcon
        key="half"
        icon={faStarHalfStroke}
        className="text-yellow-500"
      />
    );
  }

  return starIcons.length > 0 ? (
    <div>{starIcons}</div>
  ) : (
    <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
  );
};

export const mockUpImages = [
  {
    image: Mocukp1,
    desc: "Experience seamless onboarding with our app! Simply create your account and personalize your health journey on the first run. Your well-being, your way.",
  },
  {
    image: Mocukp2,
    desc: "Effortlessly sync with your personal ring on the initial setup. Connect seamlessly across all devices for a unified and tailored experience with ease.",
  },
  {
    image: Mocukp3,
    desc: "Enjoy instant access to your comprehensive health summary on the first login. Your latest information neatly summarized on a single, user-friendly home screen for a quick and easy overview.",
  },
  {
    image: Mocukp4,
    desc: "Explore a diverse range of doctors spanning various specialties right from the start. Enjoy the flexibility of choosing from a variety of healthcare professionals tailored to your specific needs",
  },
  {
    image: Mocukp5,
    desc: "Discover nearby doctors effortlessly. Evaluate their ratings, availability, and more, empowering you with all the information needed to make informed healthcare decisions.",
  },
  {
    image: Mocukp6,
    desc: "Access detailed information about doctors, their services, clinic locations, and engage in convenient chats with them—all at your fingertips.",
  },
  {
    image: Mocukp7,
    desc: "Schedule appointments with your preferred doctor effortlessly, and allow us to send timely reminders so you never miss an important healthcare commitment.",
  },
  {
    image: Mocukp8,
    desc: "Edit or cancel your appointments at your convenience, anytime and anywhere, putting you in control of your healthcare scheduling.",
  },
  {
    image: Mocukp10,
    desc: "Effortlessly navigate through your personal health data, appointment history, and prescriptions with user-friendly features, ensuring convenient access to all your important information.",
  },
  {
    image: Mocukp11,
    desc: "Update your information seamlessly at any time, and keep us informed of your latest changes for a personalized and up-to-date health profile.",
  },
  {
    image: Mocukp12,
    desc: "Dive deeper into detailed explanations of our latest analyses, providing you with comprehensive insights and a clearer understanding of your health data.",
  },
];

export const calcAge = (dateString) => {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / 31557600000);
};
