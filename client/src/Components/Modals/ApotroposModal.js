import React from "react";

const ApotroposModal = ({ props }) => {
  const closeButtonHandler = (e) => {
    props.setHasApotropos(!props.hasApotropos);
    props.formHandler(e);
  };

  const apotroposFormHandler = (e) => {
    console.log(e);
    const { id, value } = e.target;
    console.log("apotroposModal:", typeof id);
    switch (id) {
      case "apotropos_first_name":
        console.log("in apotropos_first_name");
        props.setApotropos((prevState) => ({
          ...prevState,
          firstName: value,
        }));
        break;
      case "apotropos_last_name":
        console.log("in apotropos_last_name");

        props.setApotropos((prevState) => ({
          ...prevState,
          lastName: value,
        }));
        break;
      case "apotropos_email":
        console.log("in apotropos_email");

        props.setApotropos((prevState) => ({
          ...prevState,
          email: value,
        }));
        break;
      case "apotropos_address":
        console.log("in apotropos_address");

        props.setApotropos((prevState) => ({
          ...prevState,
          address: value,
        }));
        break;
      case "apotropos_city":
        props.setApotropos((prevState) => ({
          ...prevState,
          city: value,
        }));
        break;
      case "apotropos_phone_number":
        console.log("in apotropos_phonenumber");

        props.setApotropos((prevState) => ({
          ...prevState,
          phoneNumber: value,
        }));
        break;
    }
  };
  return (
    <form method="dialog" className="modal-box">
      <div className="py-4 px-8">
        <div className="flex mb-4">
          <div className="w-1/2 mr-1">
            <label className="block text-grey-darker text-sm font-bold mb-2">
              Apotropos's First Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="apotropos_first_name"
              type="text"
              placeholder="Your first name"
              onChange={apotroposFormHandler}
            />
          </div>
          <div className="w-1/2 ml-1">
            <label className="block text-grey-darker text-sm font-bold mb-2">
              Apotropos's Last Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="apotropos_last_name"
              type="text"
              placeholder="Your last name"
              onChange={apotroposFormHandler}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Apotropos's Email Address
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="apotropos_email"
            type="email"
            placeholder="Your email address"
            onChange={apotroposFormHandler}
          />
        </div>
        <div className="flex">
          <div className="mb-4 w-1/2 ml-2 mr-1">
            <label className="block text-grey-darker text-sm font-bold mb-2">
              Apotropos's City:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="apotropos_city"
              type="text"
              placeholder="Your City"
              onChange={apotroposFormHandler}
            />
          </div>
          <div className="mb-4 ml-1 w-1/2">
            <label className="block text-grey-darker text-sm font-bold mb-2">
              Apotropos's Address:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="apotropos_address"
              type="text"
              placeholder="Your Address"
              onChange={apotroposFormHandler}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Apotropos's Phone Number
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="apotropos_phone_number"
            type="phone"
            placeholder="Your Phone Number"
            onChange={apotroposFormHandler}
          />
        </div>
      </div>
      <div className="modal-action">
        <button className="btn" id="close_pressed" onClick={closeButtonHandler}>
          Close
        </button>
        <button
          className="btn"
          onClick={() => props.setHasApotropos(!props.hasApotropos)}
        >
          Save Information
        </button>
      </div>
    </form>
  );
};

export default ApotroposModal;
