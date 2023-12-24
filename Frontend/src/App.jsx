import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Addmission from "./pages/Addmission";
import IssueSLC from "./pages/IssueSLC";
import SchoolProfile from "./pages/SchoolProfile";
import StudentProfile from "./pages/StudentProfile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoutes";
import Sidebar from "./components/Sidebar";
import ReAddmission from "./pages/ReAddmission";
import ClassListing from "./pages/ClassListing";
import Reports from "./pages/Reports";

//This will make sidebar fixed in every component and will be visible on every page except sign in and signout
const PrivateLayout = ({ children }) => {
  return (
    <div className="flex sm:flex-row flex-col ">
      <Sidebar />
      <div className="w-[100vw]">{children}</div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          element={
            <PrivateLayout>
              <PrivateRoute />
            </PrivateLayout>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<StudentProfile />} />
          <Route path="/school" element={<SchoolProfile />} />
          <Route path="/addmission" element={<Addmission />} />
          <Route path="/issue-slc" element={<IssueSLC />} />
          <Route path="/re-addmission" element={<ReAddmission />} />
          <Route path="/listings" element={<ClassListing />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
