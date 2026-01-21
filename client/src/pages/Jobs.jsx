import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");

  const fetchJobs = () => {
    api.get("/jobs", {
      params: { q: q || "", location: location || "" }
    }).then(res => setJobs(res.data));
    
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold">Job Listings</h2>

      <input
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search job title"
        value={q}
        onChange={e => setQ(e.target.value)}
      />

      <input
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
      <div className="flex justify-end">
        <button 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 max-w-sm"
        onClick={fetchJobs}>Search
        </button>
      </div>
      {jobs.length === 0 && <p>No jobs found.</p>}

      {jobs.map(job => (
        <div key={job.id}
         className="border border-gray-300 rounded p-4 shadow-sm">
          <h3 className="font-bold">{job.title}</h3>
          <p>Loacation: {job.location}</p>
          <p>Salary: {job.salary}</p>
          <br />
          <Link to={`/jobs/${job.id}`}
          className="text-xs hover:text-blue-300">View</Link>
        </div>
      ))}
    </div>
  );
}