import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import NavBar from "../Components/NavBar";
import { getUser, isLoggedIn } from "../utils/auth";

const Application = () => {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user on mount (only once)
  useEffect(() => {
    if (isLoggedIn()) {
      const storedUser = getUser();
      setUser(storedUser);
    }
  }, []);

  // Fetch applications when user is available
  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`/applications/user/${user.id}`);
        setApplications(response.data);
        console.log("Applications:", response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <div className="text-center mb-4">
          <h1 className="display-6">📄 My Applications</h1>
          <p className="text-muted">Track your job application progress</p>
        </div>

        {!user ? (
          <div className="alert alert-warning text-center">
            🚫 Please log in to view your job applications.
          </div>
        ) : loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-2">Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-5">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-9438480-7700836.png"
              alt="No Applications"
              style={{ maxWidth: "250px" }}
            />
            <h4 className="mt-3 text-muted">No applications found</h4>
            <p className="text-muted">
              Start applying to jobs and track them here.
            </p>
          </div>
        ) : (
          <div className="row">
            {applications.map((app) => (
              <div className="col-md-4 mb-3" key={app.id}>
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h5 className="card-title">Application #{app.id}</h5>
                    <p className="card-text">
                      <strong>Status:</strong> {app.status} <br />
                      <strong>Applied At:</strong> {formatDate(app.appliedAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Application;
