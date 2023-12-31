import React, { useEffect, useLayoutEffect, useState } from "react";
import FormField from "../components/FormField";
import axios from "axios";
import Table from "../components/Table";
import Popup from "../components/Popup";
import Filter from "../components/Filter";
import Notification from "../components/Notification";
import { useDispatch } from "react-redux";
import { changeNavOptions } from "../redux/dashboard/dashboardSlice";
const IssueSLC = () => {
  const [input, setInput] = useState({ srn: "", aadhar: "" });
  const [studentDetail, setStudentDetail] = useState(null);
  const [classwiseStudent, setClasswiseStudent] = useState([]);

  const [openConfirmPopup, setOpenConfirmPopup] = useState(false);
  const [confirmIssueSlc, setConfirmIssueSlc] = useState(false);
  const [selectedSrn, setSelectedSrn] = useState(null);
  const [slcSuccess, setSlcSuccess] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState(null);

  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(changeNavOptions(4));
  }, []);
  
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
      //after 3 seconds msg gone
      setTimeout(() => {
        setSlcSuccess(false);
      }, 3000);
    }
  };
  useEffect(() => {
    const getall = async () => {
      const response = await axios.get("/api/student/allstudents");
      setClasswiseStudent(response.data.students);
      setFilteredStudents(response.data.students);
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
    if (e.target.value === "") {
      setFilteredStudents(classwiseStudent);
      setStudentDetail(null);
      setShowFilters(false);
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

  //function for filter
  const handleFilterInput = ({ name, standard }) => {
    let dummyArr = classwiseStudent;
    if (name.length > 0 && standard.length > 0) {
      dummyArr = classwiseStudent.filter(
        (student) =>
          student?.standard === Number(standard) &&
          student?.name.toLowerCase().includes(name.toLowerCase())
      );
    } else if (name.length > 0) {
      dummyArr = classwiseStudent.filter((student) =>
        student?.name.toLowerCase().includes(name.toLowerCase())
      );
    } else if (standard.length > 0) {
      dummyArr = classwiseStudent.filter(
        (student) => student?.standard === Number(standard)
      );
    }
    setFilteredStudents(dummyArr);
  };

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
      {!studentDetail && (
        <div className="w-full relative p-2">
          <button
            onClick={() => {
              setShowFilters((prev) => !prev);
              setFilteredStudents(classwiseStudent);
            }}
            className=" text-blue-900 font-semibold right-0 absolute"
          >
            {!showFilters ? "Apply" : "Close"} Filter
          </button>
          <div
            className={`overflow-hidden transition-all duration-1000 ${
              showFilters ? "max-h-screen" : "max-h-0"
            }`}
          >
            {showFilters && (
              <Filter
                setFilteredStudents={setFilteredStudents}
                classwiseStudent={classwiseStudent}
              />
            )}
          </div>
        </div>
      )}
      {studentDetail && (
        <Table
          tableData={[studentDetail]}
          btn="Issue"
          handleClick={handleIssueClick}
        />
      )}
      {filteredStudents?.length > 0 && !studentDetail && (
        <Table
          title="List Of Students"
          tableData={filteredStudents}
          btn="Issue"
          handleClick={handleIssueClick}
        />
      )}
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
        <Notification
          header="SLC Granted !!!"
          msg={`Student is Availble For Readmission`}
        />
      )}
    </div>
  );
};

export default IssueSLC;
