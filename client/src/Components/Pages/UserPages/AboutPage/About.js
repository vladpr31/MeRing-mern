import React from "react";
import NavBar from "../../../UI/Navbar/Navbar";
const About = () => {
  return (
    <div>
      <NavBar />
      <div className="p-4 bg-gray-500 text-white rounded-2xl py-14">
        <h1 className="text-[36px] text-center underline py-2">Short Intro</h1>
        <p className="p-4">
          MERN stack project about an IoT idea I've had in one of my courses
          back when I was a student, In short it is an IoT Ring that tracks
          patient's vitals, patients apotroposes can track their loved ones,
          elderly parents and etc. the idea was to track vitals and to alert
          medical centers & apotroposes.
          <br /> This project was made for self practice and learning, and while
          I've worked on that I did learned alot. <br />
          <span className="font-bold text-[18px] underline">
            Technologies I've Used:
          </span>
          <ul className="list-disc mb-2 mt-2 p-4">
            <li>ReactJS</li>
            <li>DaisyUI & TailwindCSS</li>
            <li>Redux </li>
            <li>MongoDB,</li>
            <li>NodeJS</li>
            <li>SocketIO</li>
            <li>Express</li>
            <li>Axios</li>
          </ul>{" "}
          <span className="font-bold underline text-[18px]">
            What I've learned while making this project:
          </span>
          <br /> <span className="font-bold underline">-Redux:</span> <br />
          Apparently(didn't know that) redux refreshes it's state after refresh,
          I've had a problem when I was on the chat Page, and after refresh
          everything went nuts becuase the user data was nullified, so then I
          met Redux-Persist, and yep it solved that.
          <br /> <span className="font-bold underline">-Socket.IO:</span> heared
          about it, never touched it, now poked it, and liked it. Had problems
          with it previously, but after i've managed to fix, documentation was
          ok. went fine everything worked.
          <br /> <span className="font-bold underline">-Mongoose:</span> Had
          experience with crud operations, but when delved deeper had to think
          about things like: "What if doctor gets fired? well i can just delete
          him from the collection", but then the doctor stays referenced in the
          appointments collection, or the clinic collection, and patient has
          appointment with a doctor that doesnt exist. So there i've learned
          about <span className="font-bold">mongoose middlewares</span>.
        </p>
      </div>
      <div className="bg-blue-300 rounded-2xl">
        <h1 className="text-[36px] text-center underline py-2">What's Done</h1>
        <ul className="p-4">
          <li>[ V ] - Registartion</li>
          <li>
            [ V ] - User Page - each user has his own page with his own data.
          </li>
          <li>[ V ] - Create Appointments with Doctors </li>
          <li>[ V ] - Chat With Doctors </li>
        </ul>
      </div>
      <div className="bg-gray-600 text-white rounded-2xl">
        <h1 className="text-[36px] text-center underline py-2">
          Needs To Be Done
        </h1>
        <ul className="p-4">
          <li>[ ] - Forgot Password System</li>
          <li>
            [ ] - Removing Chats - if user deletes the chat, doctor can still
            see conversation vice versa.
          </li>
          <li>[ ] - Doctor\Worker Page</li>
          <li>[ ] - Locations for clinics (GPS?Google Maps?)</li>
          <li>[ ] - User review system/doctor rating system</li>
          <li>[ ] - Optimizations & Some bug fixes</li>
          <li>[ ] - Write Tests</li>
          <li>[ ] - Some more middlewares, as well as refresh token handler</li>
          <li>
            [ ] - Code refactoring(i've learned some stuff on the go, so i've
            added alot of new things on the go may look spaghetti){" "}
          </li>
        </ul>
      </div>
      <div className="bg-base-300 rounded-2xl">
        <h1 className="text-[36px] text-center underline py-2">In Depth:</h1>
        <div className="p-4">
          <h3 className="text-[18px] text-center underline py-2">
            Registartion
          </h3>
          <p className="p-4">
            Simple registartion system(CRUD), on server (NodeJs) there is a
            middleware that checks the inputs. When user registers his
            credentials are saved on "User" schema, but the user is created on
            another schema called "Patient". "User" Schema keeps only login
            information, inorder to keep "Patient" data more secured. each
            patient has "account" field in schema which references to "User".
          </p>
        </div>
        <div className="p-4 rounded-2xl">
          <h3 className="text-[18px] text-center underline py-2">User Page</h3>
          <p className="p-4">
            After Logging in, each user transfered to his own Page. This page
            has all sorts of info about the specific patient (like an admin
            dashboard), from this page user can: - Create appointments. - Send
            messages to doctors. - See his last doctor vists - See his upcoming
            appointmnets. - See his own Vitals, and Vitals history. etc.
          </p>
        </div>
        <div className="p-4 rounded-2xl">
          <h3 className="text-[18px] text-center underline py-2">
            Appointments
          </h3>
          <p className="p-4">
            Each appointments has the following fields: - Clinic
            (Name,Adress,etc.) - Doctor (the appointede doctor) - Patient - Date
            Basic CRUD, uppon Removing clinic (from admin page), the appointment
            will be removed from the doctor as well as the patient. using
            Mongoose middlewares.(pre,post,etc). same happens when doctor is
            fired(removed) from a clinic, that appointment will be removed from
            all collections(Appointments,Clinics,Patient); all of the are
            referenced to each other.
          </p>
        </div>
        <div className="p-4 rounded-2xl">
          <h3 className="text-[18px] text-center underline py-2">
            Chat With Doctors\Patients
          </h3>
          <p className="p-4">
            For chatting i've used Socket.io, took me sometime to understand how
            it works. I've tried to create a single socket instance across the
            whole app(until refresh ofcourse), each user can "private" chat with
            a doctor. If user or doctor are not connected to the room(offline?)
            then the "offline" member will receive a notification that he has a
            new message.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
