import React, { useEffect, useLayoutEffect, useState } from "react";

const Table = ({ tableData, title, sub }) => {
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
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          {header}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white ">
                  {valuesArr.map((dataArr, i) => (
                    <tr key={i}>
                      {dataArr.map((finalItem, index) => (
                        <td
                          className={
                            index === 0
                              ? "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                              : "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          }
                        >
                          {finalItem}
                        </td>
                      ))}
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
