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
} from "@fortawesome/free-solid-svg-icons";

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
      title: "My Analysis",
      icon: (
        <FontAwesomeIcon
          icon={faChartSimple}
          size="lg"
          style={{ color: "#33b9e6" }}
        />
      ),
      ref: `/${auth.role}/${auth.id}/analysis`,
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
