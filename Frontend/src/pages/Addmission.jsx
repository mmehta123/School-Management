import React, { useLayoutEffect, useState } from "react";
import Popup from "../components/Popup";
import FormField from "../components/FormField";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeNavOptions } from "../redux/dashboard/dashboardSlice";

const tableData = [
  {
    Standard: "First",
    MinAge: "12-10-11",
    MaxAge: "1",
  },
  {
    Standard: "Second",
    MinAge: "11-10-11",
    MaxAge: "2",
  },
  {
    Standard: "Third",
    MinAge: "2-10-11",
    MaxAge: "3",
  },
  {
    Standard: "Fourth",
    MinAge: "1-10-11",
    MaxAge: "4",
  },
  {
    Standard: "Lindsay Walton",
    MinAge: "110-11",
    MaxAge: "5",
  },
];

const Addmission = () => {
  const [viewPopup, setViewPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    standard: 1,
    dob: new Date().toLocaleDateString("en-CA"),
    addDate: new Date().toLocaleDateString("en-CA"),
    fathername: "",
    aadhar: "",
    rollno: "",
    mothername: "",
    hryResident: true,
    state: "Haryana",
  });
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(changeNavOptions(1));
  }, []);

  const handleInputChange = (e) => {
    if (e.target.name === "hryResident") {
      const input = e.target.value === "true" ? true : false;
      setFormData({ ...formData, hryResident: input });
    } else if (
      e.target.name === "standard" ||
      e.target.name === "rollno" ||
      e.target.name === "aadhar"
    ) {
      var numbers = /^[0-9]+$/;
      if (e.target.value.match(numbers) || e.target.value === "") {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
    } else if (e.target.name !== "dob" && e.target.name !== "addDate") {
      const stringOnlyRegex = /^[a-zA-Z\s]+$/;
      if (e.target.value.match(stringOnlyRegex) || e.target.value === "") {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name.length && //name
      formData.fathername.length && //fatherName
      formData.mothername.length && //motherName
      formData.standard !== 0 &&
      formData.rollno !== 0 &&
      formData.aadhar !== 0
    ) {
      const response = await axios.post("/api/student/add", formData);
    } else {
      console.log("wrong input received");
    }
  };
  return (
    <div className="mx-auto max-w-7xl  px-4 py-2 sm:py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        New Admission
      </h2>
      <form onSubmit={handleSubmit} className="p-2 mt-12">
        <div className="flex">
          <div className=" w-1/3 ">
            <h2 className="text-lg font-semibold">Enrollment Details</h2>
            <p
              className="text-blue-700 font-semibold cursor-pointer underline text-md"
              onClick={() => setViewPopup(true)}
            >
              view
            </p>
            {viewPopup && (
              <Popup setOpen={setViewPopup} table tableData={tableData} />
            )}
          </div>
          <div className="w-2/3 p-4 gap-y-2 flex flex-col items-start justify-start">
            <div className="w-2/3">
              <label className="block mb-2 text-md font-medium text-gray-900 ">
                Student Name
              </label>
              <FormField
                value={formData.name}
                handleChange={handleInputChange}
                placeholder="Name"
                minlength="3"
                maxlength="50"
                type="text"
                name="name"
              />
            </div>
            <div className="w-full ">
              <label className="block mb-2 text-md font-medium text-gray-900 ">
                Date Of Birth
              </label>
              <input
                onChange={handleInputChange}
                required
                type="date"
                // defaultValue={new Date().toLocaleDateString('en-CA')}
                value={formData.dob}
                name="dob"
                className="bg-grey-50 border w-2/3 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-[#6469ff] focus:border-[#4649ff] outline-none block p-3 "
              />
            </div>

            <div className="w-2/3 ">
              <label className="block mb-2 text-md font-medium text-gray-900 ">
                Standard
              </label>
              <select
                required
                onChange={handleInputChange}
                name="standard"
                value={formData.standard}
                className="bg-grey-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-[#6469ff] focus:border-[#4649ff] outline-none block p-3 "
              >
                <option value={1}>First</option>
                <option value={2}>Second</option>
                <option value={3}>Third</option>
                <option value={4}>Fourth</option>
                <option value={5}>Fifth</option>
              </select>
            </div>
            <div className="w-2/3">
              <label className="block mb-2 text-md font-medium text-gray-900 ">
                Roll No.
              </label>
              <FormField
                value={formData.rollno}
                handleChange={handleInputChange}
                placeholder="Roll No."
                type="text"
                name="rollno"
              />
            </div>
            <div className="w-full ">
              <label className="block mb-2 text-md font-medium text-gray-900 ">
                Date Of Admission
              </label>
              <input
                onChange={handleInputChange}
                required
                type="date"
                // defaultValue={new Date().toLocaleDateString('en-CA')}
                value={formData.addDate}
                name="addDate"
                className="bg-grey-50 border w-2/3 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-[#6469ff] focus:border-[#4649ff] outline-none block p-3 "
              />
            </div>
            <div className="w-2/3">
              <label className="block mb-2 text-md font-medium text-gray-900 ">
                Father Name
              </label>
              <FormField
                value={formData.fathername}
                handleChange={handleInputChange}
                placeholder="Father Name"
                minlength="3"
                maxlength="50"
                type="text"
                name="fathername"
              />
            </div>
            <div className="w-2/3">
              <label className="block mb-2 text-md font-medium text-gray-900 ">
                Mother Name
              </label>
              <FormField
                value={formData.mothername}
                handleChange={handleInputChange}
                placeholder="Mother Name"
                minlength="3"
                maxlength="50"
                type="text"
                name="mothername"
              />
            </div>
          </div>
        </div>
        {/* Selection Details */}
        <div className="flex">
          <div className=" w-1/3 ">
            <h2 className="text-lg font-semibold">Selection Details</h2>
          </div>
          <div className=" w-2/3 p-4 ">
            <p className="text-md mb-2 font-semibold">
              Is Child Resident of Haryana ?
            </p>
            <label
              htmlFor="yes"
              className="  text-md font-medium text-gray-700"
            >
              <input
                className="h-4 w-4 mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                type="radio"
                name="hryResident"
                id="yes"
                checked={formData.hryResident}
                value={true}
                onChange={handleInputChange}
              />
              Yes
            </label>
            <label
              htmlFor="no"
              className="ml-4 text-md font-medium text-gray-700"
            >
              <input
                className="h-4 w-4 mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                type="radio"
                name="hryResident"
                id="no"
                value={false}
                checked={!formData.hryResident}
                onChange={handleInputChange}
              />
              No
            </label>
            {!formData.hryResident && (
              <div className="w-2/3 mt-2">
                <label className="block mb-2 text-md font-medium text-gray-900 ">
                  State
                </label>
                <FormField
                  value={formData.state}
                  handleChange={handleInputChange}
                  placeholder="state"
                  minlength="3"
                  maxlength="50"
                  type="text"
                  name="state"
                  notRequired
                />
              </div>
            )}
            <div className="w-2/3 mt-2">
              <label className="block mb-2 text-md font-medium text-gray-900 ">
                Aadhar No.
              </label>
              <FormField
                value={formData.aadhar}
                handleChange={handleInputChange}
                placeholder="Aadhar Number"
                type="text"
                name="aadhar"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className=" px-6 py-3 border border-transparent self-center font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Admit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addmission;
