import React, { useEffect } from "react";
import * as API from "../../../../api/api";
import { useNavigate } from "react-router";
const CreateAdminPage = () => {
  const location = useNavigate();
  useEffect(() => {
    const createNewAdmin = async () => {
      const done = await API.createAdmin();
      console.log(done.data);
      if (done.data === "admin created" || done.data === true) {
        location("/login", {
          state: "admin",
        });
      }
    };
    createNewAdmin();
  }, []);
  return <></>;
};

export default CreateAdminPage;
