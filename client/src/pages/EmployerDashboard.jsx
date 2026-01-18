import { useEffect, useState } from "react";
import api from "../services/api";

export default function EmployerDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get("/employer/applications")
      .then(res => setApplications(res.data));
  }, []);

  return (
    <div>
      <h2>Applications</h2>
      {applications.map(app => (
        <div key={app.id}>
          <h3>{app.job_title}</h3>
          <p>{app.cover_letter}</p>
          <small>{new Date(app.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}