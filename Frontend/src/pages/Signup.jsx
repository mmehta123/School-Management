import React, { useState } from "react";
import FormField from "../components/FormField";
import axios from "axios";
import ErrorDialog from "../components/ErrorDialog";
import Loader from "../components/Loader";
import Notification from "../components/Notification";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [notification, setNotification] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const submitData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signup/", formData);
      setError(false);
      setErrorMsg("");
      if (response.data.success) {
        setNotification(true);
        setTimeout(() => {
          setNotification(false);
        }, 3000);
      }
    } catch (e) {
      setError(true);
      setNotification(false);
      setErrorMsg(e.response.data.message);
      //after 3 sec disappers
      setTimeout(() => {
        setError(false);
        setErrorMsg("");
      }, 3000);
    }
  };
  return (
    <div className=" w-[100vw]  min-h-screen flex justify-center items-center bg-[url(https://mis.oneschoolsuite.com/bg-main.f709bcd94b8899030cd7.jpg)]">
      <div className="w-full sm:w-[60%] h-[90%] sm:h-[70%] overflow-hidden sm:rounded-2xl sm:flex-row flex-col flex">
        {notification && (
          <Notification
            header="Account Created Succefully"
            msg="You can Now Sign In"
          />
        )}
        {/* right */}
        <div className="sm:w-1/2 w-full p-7 sm:p-14 bg-violet flex flex-wrap flex-col justify-center items-center">
          <div className=" ">
            <h6 className="text-slate-300 text-xl ">Welcome to OneSchool</h6>
            <h1 className="text-white font-bold text-2xl  ">
              Department of School Education, Haryana
            </h1>
          </div>
        </div>
        {/* right */}
        <div className="flex-1 h-full  relative bg-white ">
          {error && (
            <Notification header={errorMsg} msg="Try Again with Valid credentials" err />
          )}
          <div className="p-7 sm:p-14  ">
            <form onSubmit={submitData}>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-1">
                  Sign up for your account
                </h3>
                <p className="text-slate-400">
                  Please set your credentials below
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
                  htmlFor="email"
                  className="block text-gray-600 font-medium"
                >
                  Email
                </label>
                <div className="mt-2">
                  <FormField
                    value={formData.email}
                    handleChange={handleChange}
                    id="email"
                    placeholder="XXXX@XXX"
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
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
