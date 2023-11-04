import React, { useState } from "react";
import FormField from "../components/FormField";
import axios from "axios";

const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const submitData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signin/", formData);
      console.log(response);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };
  return (
    <div className=" w-[100vw]  min-h-screen flex justify-center items-center bg-[url(https://mis.oneschoolsuite.com/bg-main.f709bcd94b8899030cd7.jpg)]">
      <div className="w-full sm:w-[60%] h-[90%] sm:h-[70%] overflow-hidden sm:rounded-2xl sm:flex-row flex-col flex">
        {/* right */}
        <div className="flex-1 p-14 bg-violet flex flex-wrap flex-col justify-center items-center">
          <div className=" ">
            <h6 className="text-slate-300 text-xl ">Welcome to OneSchool</h6>
            <h1 className="text-white font-bold text-2xl  ">
              Department of School Education, Haryana
            </h1>
          </div>
        </div>
        {/* right */}
        <div className="flex-1 h-full p-14 sm:p-7 bg-white ">
          <form onSubmit={submitData}>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-1">
                Sign in to your account
              </h3>
              <p className="text-slate-400">
                Please enter your credentials below
              </p>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-gray-600 font-medium"
              >
                Username
              </label>
              <div className="mt-2">
                <FormField
                  value={formData.username}
                  handleChange={handleChange}
                  id="username"
                  placeholder="XXXX"
                />
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium"
              >
                Password
              </label>
              <div className="mt-2">
                <FormField
                  value={formData.password}
                  handleChange={handleChange}
                  type="password"
                  placeholder="*********"
                  id="password"
                />
              </div>
            </div>
            {/* <button className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Beautiful Button
            </button> */}
            <button className="text-center w-full bg-violet p-2 mt-6 hover:bg-blue-700 rounded-lg font-semibold text-white">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
