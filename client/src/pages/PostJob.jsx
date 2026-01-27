import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/post-job", form);
    toast.success("Job posted!");
    () => setForm({
      title: "",
      description: "", 
      location: "",
      salary: "",
    });
    navigate("/");
  };

  const inputStyles = "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div>
    <form 
      className="flex flex-col gap-4 p-4 max-w-2xl mx-auto"
      onSubmit={submit}>
      <input 
        className={inputStyles}
        placeholder="Title" onChange={e => setForm({...form, title: e.target.value})} />
      <textarea 
        className={inputStyles}
        placeholder="Description" onChange={e => setForm({...form, description: e.target.value})} />
      <input 
        className={inputStyles}
        placeholder="Location" onChange={e => setForm({...form, location: e.target.value})} />
      <input 
        className={inputStyles}
        placeholder="Salary" onChange={e => setForm({...form, salary: e.target.value})} />
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 max-w-sm"
          type="submit"
        >Post Job</button>
      </div>
    </form>
    </div>
  );
}