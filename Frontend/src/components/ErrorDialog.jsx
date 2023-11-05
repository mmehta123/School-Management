import React from "react";

const ErrorDialog = ({ msg }) => {
  return (
    <div className="rounded-md absolute top-0 w-full px-8 py-4 bg-red-100 ">
      <div className="flex justify-center">
        <div>
          <div className="flex">
            <h3 className="text-lg font-medium text-red-800">{msg}</h3>
            <span
              className="h-5 w-5 ml-2 font-bold text-lg mr-2 text-red-600"
              aria-hidden="true"
            >
              X
            </span>
          </div>
          <div className=" text-sm text-red-700">
            <ul role="list" className="list-disc space-y-1 pl-5">
              <li>Please Check Your Credentials And Try Again</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDialog;
