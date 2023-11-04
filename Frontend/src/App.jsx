import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Addmission from "./pages/Addmission";
import IssueSLC from "./pages/IssueSLC";
import SchoolProfile from "./pages/SchoolProfile";
import StudentProfile from "./pages/StudentProfile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student" element={<StudentProfile />} />
        <Route path="/school" element={<SchoolProfile />} />
        <Route path="/addmission" element={<Addmission />} />
        <Route path="/issue-slc" element={<IssueSLC />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
