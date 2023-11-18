import React, { useEffect, useState } from "react";
import FormField from "./FormField";

const Filter = ({ handleFilterInput }) => {
  const [obj, setObj] = useState({
    standard: "",
    name: "",
  });

  useEffect(() => {
    handleFilterInput(obj);
  }, [obj]);

  const handleInputChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    setObj({
      standard: "",
      name: "",
    });
  };
  return (
    <div className="pb-2 ">
      <h2 className="text-xs mb-2 font-extralight leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Apply Filters
      </h2>
      <div className="flex gap-x-2">
        <div className="w-1/3 ">
          <select
            required
            value={obj.standard}
            onChange={handleInputChange}
            name="standard"
            className="bg-grey-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-[#6469ff] focus:border-[#4649ff] outline-none block p-3 "
          >
            <option value="">Select Standard</option>
            <option value={1}>First</option>
            <option value={2}>Second</option>
            <option value={3}>Third</option>
            <option value={4}>Fourth</option>
            <option value={5}>Fifth</option>
          </select>
        </div>
        <div className="w-1/3">
          <FormField
            value={obj.name}
            handleChange={handleInputChange}
            placeholder="Student Name"
            minlength="3"
            maxlength="50"
            type="text"
            name="name"
          />
        </div>
        <div className="w-1/3">
          <button
            type="button"
            onClick={handleReset}
            className="w-1/2 px-2 py-2 m-[0.20rem] border border-transparent  font-medium rounded-md shadow-sm text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
