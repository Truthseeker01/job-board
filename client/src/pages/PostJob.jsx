import { useState } from "react";
import api from "../services/api";

export default function PostJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/post-job", form);
    alert("Job posted!");
  };

  return (
    <div>
    <form onSubmit={submit}>
      <input placeholder="Title" onChange={e => setForm({...form, title: e.target.value})} />
      <textarea placeholder="Description" onChange={e => setForm({...form, description: e.target.value})} />
      <input placeholder="Location" onChange={e => setForm({...form, location: e.target.value})} />
      <input placeholder="Salary" onChange={e => setForm({...form, salary: e.target.value})} />
      <button>Post Job</button>
    </form>
    </div>
  );
}