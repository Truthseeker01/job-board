import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    api.get(`/jobs/${id}`).then(res => setJob(res.data));
  }, [id]);

  const apply = async () => {
    await api.post(`/jobs/${id}/apply`, {
      cover_letter: coverLetter
    });
    alert("Applied successfully");
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.description}</p>

      <textarea
        placeholder="Cover letter"
        onChange={e => setCoverLetter(e.target.value)}
      />
      <button onClick={apply}>Apply</button>
    </div>
  );
}