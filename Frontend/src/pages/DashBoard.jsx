import React from "react";
import Table from "../components/Table.jsx"

const people = [
  { name: 'Lindsay Walton', aadhar: '123456789-10-11', rollno: '1', standard: '1' },
  { name: 'Lindsay Walton', aadhar: '123456789-10-11', rollno: '1', standard: '1' },
  { name: 'Lindsay Walton', aadhar: '123456789-10-11', rollno: '1', standard: '1' },
  { name: 'Lindsay Walton', aadhar: '123456789-10-11', rollno: '1', standard: '1' },
  { name: 'Lindsay Walton', aadhar: '123456789-10-11', rollno: '1', standard: '1' },
]

const DashBoard = () => {
  return (
    <div className="mx-auto max-w-7xl bg-slate-200 px-4 py-2 sm:py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        School DashBoard
      </h2>
      {/* this is blue card  */}
      <div className="my-4 w-full sm:rounded-lg p-4 sm:w-2/5 bg-[#312E81] rounded-md  ">
        <div className="w-full text-right">
          <span className="   text-slate-200">Acedemic Year(2023-24)</span>
          <div>
            <h1 className="text-slate-200 text-4xl font-bold text-left mt-4">
              85
            </h1>
            <p className="text-slate-200 text-left mt-2">
              Total Students Count In School
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap mt-2 p-2 w-full gap-3">
            <div className="w-full sm:w-1/2   bg-slate-50 rounded-md h-20 gap-3  flex justify-start p-2 items-center">
              <svg
                width="21"
                height="53"
                viewBox="0 0 21 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-4"
              >
                <path
                  d="M6.6649 52.2963C5.84319 52.0242 5.19247 51.4121 5.00662 50.7365C4.93256 50.4673 4.89724 44.96 4.89687 33.6104L4.8963 16.8811H4.06369V23.1961C4.06369 29.3868 4.05943 29.5186 3.8485 29.8931C3.57529 30.3781 3.26837 30.6054 2.66788 30.7675C1.77999 31.0072 0.808957 30.5495 0.460277 29.727C0.235943 29.1977 0.250539 15.0818 0.476378 14.2067C0.985349 12.2343 2.63359 10.6184 4.55598 10.2072C5.56863 9.99063 14.9312 9.98796 15.9409 10.204C16.9693 10.424 17.8527 10.9217 18.6343 11.7215C19.4382 12.5442 19.8135 13.2116 20.0935 14.3164C20.2886 15.0864 20.2993 15.4988 20.2993 22.2064C20.2993 28.3378 20.2779 29.3355 20.1392 29.6705C19.9236 30.1915 19.7017 30.4258 19.2065 30.6553C18.3848 31.0361 17.3404 30.7911 16.8546 30.1035L16.6047 29.7498L16.5763 23.3155L16.548 16.8811H15.72V33.6926C15.72 52.121 15.7613 50.8974 15.1161 51.5836C14.6064 52.1257 14.0866 52.3308 13.2222 52.3308C12.3579 52.3308 11.8381 52.1257 11.3284 51.5837C10.6957 50.9108 10.7245 51.4323 10.7245 40.6259V30.7478H9.89189V40.626C9.89189 48.676 9.86592 50.5666 9.75154 50.8421C9.54186 51.3472 9.08571 51.8451 8.60692 52.0917C8.14542 52.3293 7.09777 52.4397 6.6649 52.2963ZM9.00588 9.02947C7.74776 8.57597 6.97015 7.87673 6.41973 6.70423C6.1151 6.05523 6.09313 5.93055 6.09313 4.85064C6.09313 3.75799 6.11203 3.65413 6.42971 3.00287C8.01614 -0.249925 12.5963 -0.257894 14.1801 2.98939C14.508 3.66173 14.5232 3.74645 14.5232 4.90317C14.5232 6.01559 14.4997 6.16181 14.2323 6.71142C13.7831 7.63467 13.1197 8.30795 12.2134 8.75999C11.5099 9.11099 11.3312 9.15472 10.4784 9.18445C9.76271 9.2094 9.39866 9.17108 9.00588 9.02947Z"
                  fill="#1D4ED8"
                ></path>
              </svg>
              <div className="flex flex-col items-center justify-center text-black font-bold text-lg">
                52
                <span>Males</span>
              </div>
            </div>
            <div className="w-full sm:w-1/2   bg-slate-50 rounded-md h-20 gap-3  flex justify-start p-2 items-center">
              <svg
                width="21"
                height="48"
                viewBox="0 0 21 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-4"
              >
                <path
                  d="M3.66075 12.6475L0.598487 23.5113C-0.0577133 25.8861 2.75457 26.8131 3.44202 24.5841L6.18139 14.564H6.95217L2.24419 32.1668H6.63969V45.395C6.63969 47.7907 9.97277 47.7907 9.97277 45.395V32.1668H11.0144V45.395C11.0144 47.7907 14.2433 47.7907 14.2433 45.395V32.1668H18.7638L13.9516 14.564H14.8266L17.5659 24.5841C18.243 26.8652 21.0344 25.8861 20.4095 23.5217L17.3472 12.6475C16.9306 11.4184 15.4515 9.25193 12.9725 9.14778H8.04583C5.48353 9.25193 4.01489 11.3976 3.66075 12.6475ZM14.3058 4.37731C14.3058 2.23164 12.5976 0.492188 10.4936 0.492188C8.38956 0.492188 6.68135 2.23164 6.68135 4.37731C6.68135 6.52298 8.38956 8.26243 10.4936 8.26243C12.5976 8.26243 14.3058 6.52298 14.3058 4.37731Z"
                  fill="#FF007F"
                ></path>
              </svg>
              <div className="flex flex-col items-center justify-center text-black font-bold text-lg">
                33
                <span>Females</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Table people={people}/>
    </div>
  );
};

export default DashBoard;
