import React from "react";
import { getUser } from "../utils/auth";
import NavBar from "../Components/NavBar";

const Profile = () => {
  const user = getUser();

  if (!user) {
    return (
      <div className="container mt-5">
        <h3>You are not logged in!</h3>
      </div>
    );
  }

  return (
    <>
      <NavBar />

      <div className="container mt-5">
        <h2 className="mb-4">👤 User Profile</h2>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="card-text">
              <strong>Role:</strong> {user.role}
            </p>
            <p className="card-text">
              <strong>Role:</strong> {user.id}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
