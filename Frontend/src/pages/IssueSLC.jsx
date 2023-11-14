import React, { useEffect, useState } from "react";
import FormField from "../components/FormField";
import axios from "axios";
import Table from "../components/Table";
import Popup from "../components/Popup";

const IssueSLC = () => {
  const [input, setInput] = useState({ srn: "", aadhar: "" });
  const [studentDetail, setStudentDetail] = useState(null);
  const [classwiseStudent, setClasswiseStudent] = useState([]);

  const [openConfirmPopup, setOpenConfirmPopup] = useState(false);
  const [confirmIssueSlc, setConfirmIssueSlc] = useState(false);
  const [selectedSrn, setSelectedSrn] = useState(null);
  const [slcSuccess, setSlcSuccess] = useState(false);

  const slcFunction = async () => {
    const response = await axios.post("/api/student/issueSLC", {
      srn: selectedSrn,
    });
    if (response.data.success) {
      setStudentDetail(null);
      setInput({ srn: "", aadhar: "" });
      setOpenConfirmPopup(false);
      setConfirmIssueSlc(false);
      setSlcSuccess(true);
    }
  };
  useEffect(() => {
    const getall = async () => {
      const response = await axios.get("/api/student/allstudents");
      setClasswiseStudent(response.data.students);
    };
    getall();
  }, [slcSuccess]);

  useEffect(() => {
    if (confirmIssueSlc) {
      slcFunction();
    }
  }, [confirmIssueSlc]);

  const handleChange = (e) => {
    var numbers = /^[0-9]+$/;
    if (e.target.value.match(numbers) || e.target.value === "") {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };
  const handleSearch = async () => {
    setStudentDetail(null);
    const response = await axios.post("/api/student/search", {
      srn: input.srn,
      aadhar: input.aadhar,
      issueSLc: true,
    });
    setStudentDetail(response.data.student);
  };
  function handleIssueClick(srn) {
    setSelectedSrn(srn);
    setOpenConfirmPopup(true);
  }
  return (
    <div className="mx-auto max-w-7xl  px-4 py-2 sm:py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Issue School Leaving Certificate
      </h2>
      <div className="p-4 flex gap-x-2 items-center justify-center">
        <div className="w-1/4">
          <FormField
            placeholder="Student SRN"
            name="srn"
            handleChange={handleChange}
            value={input.srn}
            type="text"
          />
        </div>
        <h2 className="text-xl font-thin text-gray-900  sm:text-2xl sm:tracking-tight">
          or
        </h2>
        <div className="w-2/4">
          <FormField
            placeholder="Student Aadhar"
            name="aadhar"
            handleChange={handleChange}
            value={input.aadhar}
            type="text"
          />
        </div>
        <button
          type="button"
          onClick={handleSearch}
          className="w-1/4 m-2 px-6 py-3 border border-transparent self-center font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </div>
      {studentDetail && (
        <Table
          tableData={[studentDetail]}
          btn="Issue"
          handleClick={handleIssueClick}
        />
      )}
      {classwiseStudent.length > 0 && !studentDetail ? (
        <Table
        title="Students In School"
          tableData={classwiseStudent}
          btn="Issue"
          handleClick={handleIssueClick}
        />
      ):""}
      {openConfirmPopup && (
        <Popup
          setOpen={setOpenConfirmPopup}
          handleConfirm={() => {
            setConfirmIssueSlc(true);
            setOpenConfirmPopup(false);
          }}
          btn="Confirm"
          title="Issue SLC"
          text={`Are You sure You want to Issue SLC for ${selectedSrn}? Please Confirm `}
        />
      )}
      {slcSuccess && (
        <Popup
          title="SLC Granted !!!"
          text={`Student is Availble For Readmission`}
          setOpen={setSlcSuccess}
        />
      )}
    </div>
  );
};

export default IssueSLC;
