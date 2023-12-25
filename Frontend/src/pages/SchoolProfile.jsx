import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { changeNavOptions } from "../redux/dashboard/dashboardSlice";
const SchoolProfile = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(changeNavOptions(3));
  }, []);
  return <div>SchoolProfile</div>;
};

export default SchoolProfile;
