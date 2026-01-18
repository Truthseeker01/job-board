import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs").then(res => setJobs(res.data));
  }, []);

  return (
    <div>
      <h2>Job Listings</h2>
      {jobs.map(job => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.location}</p>
          <p>{job.salary}</p>
          <Link to={`/jobs/${job.id}`}>View</Link>
        </div>
      ))}
      <Link to={'/post-job'}>Post a job</Link>
    </div>
  );
}