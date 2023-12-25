import React, { useLayoutEffect } from 'react'
import { useDispatch } from "react-redux";
import { changeNavOptions } from "../redux/dashboard/dashboardSlice";
const Reports = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(changeNavOptions(6));
  }, []);
  return (
    <div>Reports</div>
  )
}

export default Reports