import React, { useEffect, useState } from "react";
import FormField from "../components/FormField";
import axios from "axios";
import Table from "../components/Table";
import Popup from "../components/Popup";

const ReAddmission = () => {
  const [input, setInput] = useState({ srn: "", aadhar: "" });
  const [studentDetail, setStudentDetail] = useState(null);

  const [openConfirmPopup, setOpenConfirmPopup] = useState(false);
  const [confirmAdmit, setConfirmAdmit] = useState(false);
  const [selectedSrn, setSelectedSrn] = useState(null);
  const [admitSuccess, setAdmitSuccess] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    if (confirmAdmit) {
      admitFunction();
    }
  }, [confirmAdmit]);

  const handleChange = (e) => {
    var numbers = /^[0-9]+$/;
    if (e.target.value.match(numbers) || e.target.value === "") {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };
  const handleSearch = async () => {
    setStudentDetail(null);
    setDisableBtn(false);
    const response = await axios.post("/api/student/search", {
      srn: input.srn,
      aadhar: input.aadhar,
      reAdmission: true,
    });
    setStudentDetail(response.data.student);
  };

  function handleReadmitClick(srn) {
    setSelectedSrn(srn);
    setOpenConfirmPopup(true);
  }

  const admitFunction = async () => {
    const response = await axios.post("/api/student/readmission", {
      srn: selectedSrn,
    });
    if (response.data.success) {
      setInput({ srn: "", aadhar: "" });
      setStudentDetail(response.data.student);
      setOpenConfirmPopup(false);
      setConfirmAdmit(false);
      setAdmitSuccess(true);
      setDisableBtn(true);
    }
  };
  return (
    <div className="mx-auto max-w-7xl  px-4 py-2 sm:py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Student Readmission
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
          disableBtn={disableBtn}
          tableData={[studentDetail]}
          btn="Admit"
          handleClick={handleReadmitClick}
        />
      )}
      {openConfirmPopup && (
        <Popup
          setOpen={setOpenConfirmPopup}
          handleConfirm={() => {
            setConfirmAdmit(true);
            setOpenConfirmPopup(false);
          }}
          btn="Confirm"
          title="ReAdmission"
          text={`Are You sure You want to Admit To Your School ${selectedSrn}? Please Confirm `}
        />
      )}
      {admitSuccess && (
        <Popup
          title="Student Admitted !!!"
          text={`Student Admitted Successfully in class ${studentDetail.standard} to Your School !!!`}
          setOpen={setAdmitSuccess}
        />
      )}
    </div>
  );
};

export default ReAddmission;
