import React from "react";

const AllRoute = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #f0f2f5, #e0e0e0)",
      }}
    >
      <div className="text-center p-5 rounded shadow bg-white">
        <h2 className="text-danger mb-3">404 - Page Not Found</h2>
        <p className="text-muted mb-4">
          The page you are looking for doesn't exist.
        </p>
        <div className="alert alert-warning" role="alert">
          🚧 This section is a work in progress.
        </div>
      </div>
    </div>
  );
};

export default AllRoute;
