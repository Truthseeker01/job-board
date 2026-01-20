import { useEffect, useState } from "react";
import api from "../services/api";

export default function EmployerDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get("/employer/applications")
      .then(res => setApplications(res.data));
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold">Applications</h2>
      {applications.map(app => (
        <div key={app.id}
         className="flex flex-col border border-gray-300 rounded p-4 shadow-sm">
          <h3>{app.job_title}</h3>
          <p className="break-words overflow-wrap-break-word whitespace-pre-wrap">{app.cover_letter}</p>
          <small>{new Date(app.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}