import api from "../services/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "seeker",
    });
    const navigate = useNavigate();

  const submitForm = async (e) => {
      e.preventDefault();
      try {
          await api.post("/auth/register", formData);
          toast.success("Registration successful! Go to login.");
          navigate("/login");
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
          toast.error("Registration failed: check your details and try again.");
      }
  };

  const inputStyles = "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2>Register</h2>
      <form onSubmit={submitForm}
      className="flex flex-col gap-4">
        <input
          className={inputStyles}
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          className={inputStyles}
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <select
          className={inputStyles}
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="seeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        <button type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Register</button>
      </form>
      <div>
        <p className="text-sm">Already have an account?
          <Link to="/login"
          className="text-blue-500 hover:underline ml-1"> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;