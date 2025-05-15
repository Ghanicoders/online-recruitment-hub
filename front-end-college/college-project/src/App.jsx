import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home.jsx";
import Application from "./Pages/Application.jsx";
import About from "./Pages/About.jsx";
import AllRoute from "./Pages/AllRoute.jsx";
import Profile from "./Pages/profile.jsx";
import User from "./Pages/Users.jsx";
import JobPosting from "./Pages/JobPosting";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/application" element={<Application />} />

      <Route path="/about" element={<About />} />
      {/* catch all unmatched routes */}
      {/* <Route path="*" element={<NotFound />} /> */}

      {/* // to user user relatedd works */}
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />

      {/* // inside <Routes> */}
      <Route path="/job-posting" element={<JobPosting />} />
      {/* // to user user relatedd works */}

      <Route path="*" element={<AllRoute />} />
    </Routes>
  );
}

export default App;
