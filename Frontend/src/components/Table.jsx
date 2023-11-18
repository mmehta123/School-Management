import React, { useEffect, useLayoutEffect, useState } from "react";

const Table = ({ tableData, title, sub, btn, handleClick, disableBtn }) => {
  const [headerArr, setHeaderArr] = useState([]);
  const [valuesArr, setValuesArr] = useState([]);

  useLayoutEffect(() => {
    if (tableData.length) {
      setHeaderArr(Object.keys(tableData[0]));
      let dummyArr = [];
      tableData.forEach((person) => {
        dummyArr.push(Object.values(person));
      });
      setValuesArr(dummyArr);
    }
  }, [tableData]);

//This will handle each td of the table and format it according to the data type
  const formatTableData = (dataItem, index) => {
    let finalValue = dataItem;
    if (dataItem === true) {
      finalValue = "Yes";
    }
    if (dataItem === false) {
      finalValue = "No";
    }
    return (
      <td
        className={
          index === 0
            ? "whitespace-nowrap py-4 pl-4 text-center pr-3 text-sm font-medium text-gray-900 sm:pl-6"
            : "whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500"
        }
      >
        {finalValue}
      </td>
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-white shadow-lg  py-4 rounded-none sm:rounded-lg">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto sm:flex sm:justify-between">
          {title && (
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          )}
          {sub && <p className="mt-1 text-sm text-gray-700">{sub}</p>}
        </div>
      </div>
      <div className="mt-8 flex flex-col  ">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {headerArr &&
                      headerArr.map((header) => (
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          {header.toUpperCase()}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white ">
                  {valuesArr.map((singleRow, i) => (
                    <tr key={i}>
                      {singleRow.map((finalItem, index) => {
                        return formatTableData(finalItem, index);
                      })}
                      {btn && (
                        <div className="flex items-center justify-center">
                          <button
                            disabled={disableBtn}
                            onClick={() => handleClick(tableData[i].srn)}
                            className="w-full m-2 p-2 border border-transparent  font-medium rounded-md shadow-sm text-white bg-red-600 disabled:bg-gray-500 disabled:hover:bg-slate-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            {btn}
                          </button>
                        </div>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
