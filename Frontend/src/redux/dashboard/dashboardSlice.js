import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  options: [
    { name: "School Dashboard", icon: "HomeIcon", current: true, link: "/" },
    {
      name: "Addmission",
      icon: "PlusCircleIcon",
      current: false,
      link: "/addmission",
    },
    {
      name: "Student Profile",
      icon: "UsersIcon",
      current: false,
      link: "/student",
    },
    {
      name: "School Profile",
      icon: "UsersIcon",
      current: false,
      link: "/school",
    },
    {
      name: "Issue SLC",
      icon: "DocumentArrowUpIcon",
      current: false,
      link: "/issue-slc",
    },
    {
      name: "ReAdmission",
      icon: "ArrowLeftCircleIcon",
      current: false,
      link: "/re-addmission",
    },
    {
      name: "Reports",
      icon: "PresentationChartBarIcon",
      current: false,
      link: "/reports",
    },
    {
      name: "Listings",
      icon: "ListBulletIcon",
      current: false,
      link: "/listings",
    },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    changeNavOptions: (state, action) => {
      const selectedIndex = action.payload;
      state.options = state.options.map((option, index) => ({
        ...option,
        current: index === selectedIndex,
      }));
    },
  },
});

export const { changeNavOptions } = dashboardSlice.actions;

export default dashboardSlice.reducer;
