import React, { useEffect, useLayoutEffect, useState } from "react";
import Table from "../components/Table";
import axios from "axios";
import Filter from "../components/Filter";
import { useDispatch } from "react-redux";
import { changeNavOptions } from "../redux/dashboard/dashboardSlice";

const ClassListing = () => {
  const [filteredStudents, setFilteredStudents] = useState(null);
  const [classwiseStudent, setClasswiseStudent] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getall = async () => {
      const response = await axios.get("/api/student/allstudents");
      setClasswiseStudent(response.data.students);
      setFilteredStudents(response.data.students);
    };
    getall();
  }, []);

  useLayoutEffect(() => {
    dispatch(changeNavOptions(7));
  }, []);
  return (
    <div className="mx-auto max-w-7xl  px-4 py-2 sm:py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Admitted Students
      </h2>
      {filteredStudents ? (
        <div className="p-4">
          <div className="pb-2">
            <Filter
              setFilteredStudents={setFilteredStudents}
              classwiseStudent={classwiseStudent}
            />
          </div>
          <Table
            title="List Of Students"
            tableData={filteredStudents}
            btn="Profile"
            handleClick={() => {}}
          />
        </div>
      ) : (
        "No students found"
      )}
    </div>
  );
};

export default ClassListing;
