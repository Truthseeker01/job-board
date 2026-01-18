import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Jobs</Link>

      {user?.role === "employer" && (
        <>
          <Link to="/post-job">Post Job</Link>
          <Link to="/dashboard">Dashboard</Link>
        </>
      )}

      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </nav>
  );
}