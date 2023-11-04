import React from "react";

const ApotroposRegisterPage = () => {
  return (
    <div className="py-4 px-8">
      <div className="flex mb-4">
        <div className="w-1/2 mr-1">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Patient's First Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="first_name"
            type="text"
            placeholder="Your first name"
            required
          />
        </div>
        <div className="w-1/2 ml-1">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Patient's Last Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="last_name"
            type="text"
            placeholder="Your last name"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2">
          Apotropos's Email Address
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="email"
          type="email"
          placeholder="Your email address"
          required
        />
      </div>
      <div className="flex">
        <div className="w-1/2 mr-1 mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="password"
            type="password"
            placeholder="Your secure password"
            required
          />
        </div>

        <div className="w-1/2 ml-1 mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="password"
            type="password"
            placeholder="Your secure password"
            required
          />
        </div>
      </div>
      <div className="flex">
        <div className="mb-4 w-1/2 mr-1">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Patient's City:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="text"
            type="text"
            placeholder="Your City"
            required
          />
        </div>
        <div className="mb-4 ml-1 w-1/2">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Patient's Address:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="text"
            type="text"
            placeholder="Your Address"
            required
          />
        </div>
        <div className="mb-4 w-1/2 ml-2 mr-1">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Apotropos's City:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="text"
            type="text"
            placeholder="Your City"
            required
          />
        </div>
        <div className="mb-4 ml-1 w-1/2">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Apotropos's Address:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="text"
            type="text"
            placeholder="Your Address"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2">
          Apotropos's Phone Number
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="phone"
          type="phone"
          placeholder="Your Phone Number"
          required
        />
      </div>
      <div className="flex items-center justify-between mt-8">
        <button
          className="bg-black text-white font-bold py-2 px-4 rounded-full"
          type="submit"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default ApotroposRegisterPage;
