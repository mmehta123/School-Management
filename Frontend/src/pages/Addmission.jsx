import React, { useState } from "react";
import Popup from "../components/Popup";

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
  return (
    <div className="mx-auto max-w-7xl bg-slate-200 px-4 py-2 sm:py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        School DashBoard
      </h2>
      <form className="p-2 mt-12">
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
          <div className="w-2/3 p-4 flex flex-col items-start justify-start">
            <div className="w-full">
              <label class="block mb-2 text-md font-medium text-gray-900 ">
                Standard
              </label>
              <select className="bg-gray-50 w-2/3 text-gray-900 text-md outline-none border-none rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ">
                <option selected value="First">
                  First
                </option>
                <option value="Second">Second</option>
                <option value="Third">Third</option>
                <option value="Fourth">Fourth</option>
                <option value="Fifth">Fifth</option>
              </select>
            </div>
            <div className="w-full mt-2">
              <label class="block mb-2 text-md font-medium text-gray-900 ">
                Date Of Admission
              </label>
              <input
                type="date"
                defaultValue={new Date().toLocaleDateString()}
                className="bg-gray-50 w-2/3  text-gray-900 text-md outline-none border-none rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addmission;
