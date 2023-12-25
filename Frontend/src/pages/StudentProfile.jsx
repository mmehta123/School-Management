import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { changeNavOptions } from "../redux/dashboard/dashboardSlice";

const StudentProfile = () => {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(changeNavOptions(2));
  }, []);
  return <div>StudentProfile</div>;
};

export default StudentProfile;
