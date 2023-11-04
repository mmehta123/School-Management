import React from "react";

const FormField = ({
  value,
  id,
  type,
  name,
  placeholder,
  handleChange,
  notRequired,
  minlength,
  maxlength,
}) => {
  return (
    <div>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={notRequired ? false : true}
        minLength={minlength}
        maxLength={maxlength}
        value={value}
        onChange={handleChange}
        className="bg-grey-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-[#6469ff] focus:border-[#4649ff] outline-none block w-full p-3 "
      />
    </div>
  );
};

export default FormField;
