import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import NavBar from "../Components/NavBar";
import ApplicationLayout from "../Components/ApplicationLayout";

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <div className="text-center">
          {/* <h1 className="display-4">Welcome Home, Darling 👋</h1> */}
          <p className="lead">Find your dream job or hire top talent!</p>
        </div>
        <hr />
        <ApplicationLayout />
      </div>
    </>
  );
};

export default Home;
