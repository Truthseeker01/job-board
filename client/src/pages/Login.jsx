import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      login(res.data.access_token, res.data.user);

      toast.success("Login successful!");

      navigate("/");

    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Incorrect email or password");
    }
  };

  const inputStyles = "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"
        className={inputStyles} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password"
         className={inputStyles} />
        <button 
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
      <div>
        <p className="text-sm">Don't have an account?
          <Link to="/register"
          className="text-blue-500 hover:underline ml-1"
          > Register</Link>
        </p>
      </div>
    </div>
  );
}
