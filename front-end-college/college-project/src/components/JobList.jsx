import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Job Listings</h2>
      {jobs.map((job) => (
        <div key={job.id}>
          <h4>{job.title}</h4>
          <p>{job.description}</p>
          <small>{job.location}</small>
        </div>
      ))}
    </div>
  );
};

export default JobList;
