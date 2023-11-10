import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import Table from "./Table";

const Popup = ({ title, setOpen, text, table, tableData }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex min-h-full justify-center p-4 items-center sm:p-0 ">
      <div
        className=" relative rounded-lg bg-white px-4 pt-5 pb-4 text-left
        shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
      >
        <div className="absolute top-0 right-0 pt-4 pr-4 block">
          <button
            type="button"
            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {!table && (
          <div className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </div>
        )}
        {table ? (
          <Table tableData={tableData} title="Age Or Class Criteria" />
        ) : (
          <div className="mt-2">
            <p className="text-sm  text-gray-500">{text ? text : "hello"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
