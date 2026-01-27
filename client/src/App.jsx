import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import PostJob from './pages/PostJob';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployerDashboard from './pages/EmployerDashboard';
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import './index.css';
import { Bounce, ToastContainer } from 'react-toastify';

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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        transition={Bounce}
        pauseOnHover
       />
      </>
  );
}

export default App;