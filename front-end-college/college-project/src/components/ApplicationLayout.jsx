import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { getUser, isLoggedIn } from "../utils/auth";

const ApplicationLayout = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Step 1: Fetch all jobs immediately
  useEffect(() => {
    axios
      .get("/jobs")
      .then((res) => {
        // console.log("Jobs : ", res.data);
        return setJobs(res.data);
      })
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  // Step 2: Load user if logged in
  useEffect(() => {
    if (isLoggedIn()) {
      setUser(getUser());
    }
  }, []);

  // Step 3: Fetch applications *only if user is present*
  useEffect(() => {
    if (!user) return;

    axios
      .get(`/applications/user/${user.id}`)
      .then((res) => {
        // console.log("Applications:", res.data);

        // ✅ Get job IDs from each application
        const appliedIds = res.data
          .map((app) => {
            // console.log("Application:", app);
            return app.job?.id; // <<--- FIXED!
          })
          .filter(Boolean); // removes undefined/null

        setAppliedJobIds(appliedIds);
        // console.log("✅ Applied Job IDs:", appliedIds);
      })
      .catch((err) => console.error("Error fetching applications:", err));
  }, [user]);

  // Handle Apply button
  const handleApply = async (jobId) => {
    // console.log(jobId);
    if (!user) {
      alert("Please log in to apply for a job.");
      return;
    }

    if (appliedJobIds.includes(jobId)) {
      alert("⚠️ You have already applied for this job.");
      return;
    }

    try {
      const res = await axios.post("/applications/", {
        job: { id: jobId },
        jobSeeker: { id: user.id },
      });

      alert(`✅ Successfully applied!\nApplication ID: ${res.data.id}`);

      // Add this job to applied list
      setAppliedJobIds((prev) => [...prev, jobId]);
    } catch (err) {
      console.error("Error applying to job:", err);
      alert("❌ Failed to apply. Please try again later.");
    }
  };

  return (
    <div className="row">
      {jobs.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="text-muted">📭 No jobs available right now.</h5>
        </div>
      ) : (
        jobs.map((job) => (
          <div className="col-md-4 mb-4" key={job.id}>
            <div
              className="card h-100 shadow-sm"
              onClick={() => navigate("/job-info", { state: { job } })} // ✅ Redirects on card click
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <p className="card-text">{job.description}</p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
              </div>
              <div className="card-footer text-center">
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ Prevent card click redirect
                    handleApply(job.id); // ✅ Actual apply logic
                  }}
                  disabled={isLoggedIn() && appliedJobIds.includes(job.id)}
                >
                  {isLoggedIn()
                    ? appliedJobIds.includes(job.id)
                      ? "Applied"
                      : "Apply Now"
                    : "Login to Apply"}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ApplicationLayout;
