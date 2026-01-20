import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Jobs from './pages/Jobs';
import JobDetail from './pages/jobDetail';
import PostJob from './pages/PostJob';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployerDashboard from './pages/EmployerDashboard';
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import './index.css';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/dashboard" element={<EmployerDashboard />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route 
          path="/post-job" 
          element={
          <ProtectedRoute role="employer">
            <PostJob />
          </ProtectedRoute>
          } 
          />
          <Route 
            path="/dashboard" 
            element={
            <ProtectedRoute role="employer">
              <EmployerDashboard />
            </ProtectedRoute>
            } 
          />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </>
  );
}

export default App;

// import { useEffect, useState } from 'react';
// import Login from './pages/Login.jsx';
// import Register from './pages/Register.jsx';
// import api from './services/api';

// function App() {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       () => setCheckingAuth(false);
//       return;
//     }
//     api.get('/auth/me')
//       .then((res) => setCurrentUser(res.data))
//       .catch(() => {
//         localStorage.removeItem("token");
//         setCurrentUser(null)
//       })
//       .finally(() => setCheckingAuth(false));
//   }, []);

//   if (checkingAuth) return <div>Loading...</div>;

//   return currentUser ? (
//     <div>Welcome, {currentUser.email}!</div>
//   ) : (
//     <>
//       <Login />
//       <Register />
//     </>
//   );
// }

// export default App;
