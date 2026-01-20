import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const lStyles = "text-gray-600 hover:text-blue-500";

  return (
    <nav className="flex gap-4 p-4 bg-gray-100">
      <NavLink to="/"
      className={({ isActive }) => isActive ? "font-bold text-blue-700" : lStyles}
      >Jobs</NavLink>
      {user?.role === "employer" && (
        <>
          <NavLink to="/post-job" className={({ isActive }) => isActive ? "font-bold text-blue-700" : lStyles}>Post Job</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "font-bold text-blue-700" : lStyles}>Dashboard</NavLink>
        </>
      )}

      {!user ? (
        <>
          <NavLink to="/login" className={({ isActive }) => isActive ? "font-bold text-blue-700" : lStyles}>Login</NavLink>
          <NavLink to="/register" className={({ isActive }) => isActive ? "font-bold text-blue-700" : lStyles}>Register</NavLink>
        </>
      ) : (
        <button onClick={logout} className="text-blue-500 hover:underline">Logout</button>
      )}
    </nav>
  );
}