import React, { useState } from "react";
import PatientRegister from "./PatientRegister";
import ApotroposRegisterPage from "./ApotroposRegisterPage";
import Navbar from "../../../UI/Navbar/Navbar";

const RegisterPage = () => {
  const [registerForm, setRegisterForm] = useState("");
  return (
    <div className="bg-[url('./Assets/bg4.jpg')] min-h-screen">
      <Navbar />
      <div className="font-sans bg-grey-lightest">
        <div className="w-full mx-auto bg-grey-lightest pt-24 ">
          <div className="container h-full">
            <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
              <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter text-center">
                Register
                <div className="flex justify-between p-2">
                  <div>
                    <label className="label cursor-pointer">
                      <input
                        type="radio"
                        name="radio"
                        className="radio radio-accent mr-2"
                        checked={registerForm === "Patient"}
                        onChange={() => setRegisterForm("Patient")}
                      />
                      <span className="label-text text-[18px]">Patient</span>
                    </label>
                  </div>
                  <div>
                    <label className="label cursor-pointer">
                      <input
                        type="radio"
                        name="radio"
                        disabled={true}
                        className="radio radio-accent mr-2"
                        checked={registerForm === "Apotropos"}
                        onChange={() => setRegisterForm("Apotropos")}
                      />
                      <span className="label-text text-[18px]">
                        Apotropos(Disabled for now, was removed)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              {registerForm === "Patient" ? <PatientRegister /> : null}
              {registerForm === "Apotropos" ? <ApotroposRegisterPage /> : null}
            </div>
            <p className="text-center p-4 place-self-center">
              <a
                href="/login"
                className="text-white text-[16px] badge badge-info p-4 hover:underline hover:text-blue-400"
              >
                I already have an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
