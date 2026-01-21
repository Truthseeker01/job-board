# 📋 Job Board Platform – A Full-Stack React + Flask Application

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

A modern job board platform built with React, Flask, and Tailwind CSS in just 7 days.

[Live Demo](https://your-demo-link.com) · [Report Bug](https://github.com/yourusername/job-board/issues) · [Request Feature](https://github.com/yourusername/job-board/issues)

![Job Board Screenshot](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Job+Board+Screenshot)

</div>

## ✨ Features

### 👥 User Roles
- **👔 Employers**: Post jobs, manage listings, review applications
- **👤 Job Seekers**: Browse jobs, apply with cover letters, track applications

### 🔐 Authentication & Security
- 🔑 JWT-based authentication with secure token storage
- 🔒 Password hashing using Werkzeug security
- 🛡️ Protected API endpoints and routes
- 👮 Role-based access control (employer vs seeker)

### 💼 Job Management
- 📝 Create, edit, and delete job listings
- 🔍 Advanced search with filters (location, keywords)
- 📊 Job dashboard for employers
- 📱 Responsive design that works on all devices

### 🎨 Modern UI/UX
- 🎯 Clean, professional interface with Tailwind CSS
- 🚀 Fast loading with optimized components
- 📱 Fully responsive design
- 🎨 Consistent color scheme and typography
- ✨ Smooth animations and transitions

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ and **npm**
- **Python** 3.8+
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/job-board.git
cd job-board
```

2. **Backend Setup**
```bash
cd server
python -m venv venv

# On Windows
venv\Scripts\activate

# On Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python run.py
```

3. **Frontend Setup**
```bash
cd client
npm install
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
job-board/
├── server/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models.py          # Database models
│   │   ├── config.py          # Configuration
│   │   └── routes/            # API routes
│   │       ├── auth.py        # Auth endpoints
│   │       ├── jobs.py        # Job endpoints
│   │       └── applications.py # Application endpoints
│   ├── run.py                 # Flask app entry
│   └── requirements.txt       # Python dependencies
│
└── client/
    ├── src/
    │   ├── components/        # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── JobCard.jsx
    │   ├── context/           # React Context
    │   │   └── AuthContext.jsx
    │   ├── pages/             # Page components
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Jobs.jsx
    │   │   ├── JobDetail.jsx
    │   │   ├── PostJob.jsx
    │   │   └── EmployerDashboard.jsx
    │   ├── services/          # API services
    │   │   └── api.js
    │   ├── App.jsx            # Main app component
    │   └── main.jsx           # Entry point
    └── package.json
```

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/me` | Get current user | Yes |

### Jobs
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/jobs` | Get all jobs (with filters) | No |
| GET | `/jobs/:id` | Get job details | No |
| GET | `/jobs/:id/application_status` | See if the user has already applied | No |
| POST | `/jobs` | Create new job | Yes (Employer) |

### Applications
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/jobs/:id/apply` | Apply to job | Yes (Seeker) |
| GET | `/employer/applications` | Get applications | Yes (Employer) |

## 🎨 UI Components

### Built with Tailwind CSS
The entire UI is styled using **Tailwind CSS** for rapid development and consistent design:

```jsx
// Example page (Job Detail Page) 
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast, Bounce } from "react-toastify";


export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    api.get(`/jobs/${id}`).then(res => setJob(res.data))
    .catch(err => {
      toast.error("Failed to fetch job details: " + (err.response?.data?.message || err.message));
    });
  }, [id, user]);

  useEffect(() => {
    api.get(`/jobs/${id}/application-status`).then((res) => {
      setHasApplied(res.data.applied);
      console.log(res.data.application)
    })
  }, [id]);

  console.log(hasApplied);

  const apply = async () => {
    setIsApplying(true);
    
    try {
      if (!user) {
        // toast.error("Please log in or register to apply");
        toast.error('Please log in or register to apply', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        console.log("No user logged in, cannot apply");
        setIsApplying(false);
        return;
      }
      
      if (user.role === "employer") {
        toast.error('Only applicants can apply for jobs');
        console.log("User role is employer, cannot apply");
        setIsApplying(false);
        return;
      }
      
      if (hasApplied) {
        toast.error('You have already applied for this job');
        console.log("User has already applied, cannot apply again");
        setIsApplying(false);
        return;
      }
      
      await api.post(`/jobs/${id}/apply`, {
        cover_letter: coverLetter
      });
      
      toast.success("Application submitted successfully! 🎉");
      setHasApplied(true);
      setCoverLetter(""); 
      
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please log in to apply");
      } else if (error.response?.status === 400) {
        toast.error("You have already applied for this job");
        console.log(error.response.data);
        setHasApplied(true);
      } else if (error.response?.status === 403) {
        toast.error("Only applicants can apply for jobs");
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    } finally {
      setIsApplying(false);
    }
  };

  const handleCoverLetterChange = (e) => {
    if (!user) {
      toast.error("Please log in or register to apply");
      return;
    }
    
    if (user.role === "employer") {
      toast.error("Only applicants can apply for jobs");
      return;
    }
    
    if (hasApplied) {
      toast.error("You have already applied for this job");
      return;
    }
    
    setCoverLetter(e.target.value);
  };

  if (!job) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 p-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {job.job_type}
          </span>
          <span>📍 {job.location}</span>
          <span>💼 {job.company_name}</span>
        </div>
        
        <div className="prose max-w-none">
          <h3 className="text-xl font-semibold mb-3">Job Description</h3>
          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
            {job.description}
          </div>
          
          {job.requirements && (
            <>
              <h3 className="text-xl font-semibold mt-6 mb-3">Requirements</h3>
              <div className="whitespace-pre-line text-gray-700">
                {job.requirements}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Application Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Apply for this Position</h3>
        
        {hasApplied ? (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">You've already applied for this position!</span>
            </div>
            <p className="text-sm mt-1">We'll review your application and get back to you soon.</p>
          </div>
        ) : !user ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg mb-4">
            <p className="font-medium">Please log in or register to apply for this job.</p>
          </div>
        ) : user.role === "employer" ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p className="font-medium">Employer accounts cannot apply for jobs.</p>
            <p className="text-sm mt-1">Switch to an applicant account to submit an application.</p>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-4">
            <p className="font-medium">You can apply for this job by submitting a cover letter below.</p>
          </div>
        )}

        {user?.role === "seeker" && !hasApplied && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Cover Letter <span className="text-gray-500 text-xs">(Explain why you're a good fit)</span>
              </label>
              <textarea
                className="w-full h-48 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                placeholder="Dear Hiring Manager, I am writing to express my interest in the [Position] role at [Company]. I believe my skills in..."
                value={coverLetter}
                onChange={handleCoverLetterChange}
                disabled={isApplying}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Be specific about why you're interested in this role</span>
                <span>{coverLetter.length}/2000 characters</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={apply}
                disabled={isApplying || !coverLetter.trim()}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${isApplying || !coverLetter.trim()
                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                  }
                  flex items-center gap-2
                `}
              >
                {isApplying ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
```

## 🚢 Deployment

### Deploy Backend (Render)
1. Push code to GitHub
2. Create new Web Service on [Render](https://render.com)
3. Set root directory to `server`
4. Add environment variables
5. Deploy!

### Deploy Frontend (Vercel)
1. Update `VITE_API_URL` in client `.env`
2. Push to GitHub
3. Import project in [Vercel](https://vercel.com)
4. Deploy!

## 🧪 Testing the Application

### Test Accounts
1. **Register** as an employer at `/register`
2. **Login** and post jobs at `/post-job`
3. **Register** as a job seeker with different email
4. **Browse jobs**, search, and apply
5. **Switch back** to employer account to view applications

## 📈 Project Journey

This project was built in **7 days** following a structured approach:

| Day | Focus | Key Accomplishments |
|-----|-------|---------------------|
| **Day 1** | Setup & Planning | Project structure, dependencies, basic config |
| **Day 2** | Authentication | JWT auth, login/register, protected routes |
| **Day 3** | Job Posting | Job model, CRUD operations, employer flow |
| **Day 4** | Applications | Apply functionality, employer dashboard |
| **Day 5** | UI & Access Control | Tailwind styling, role-based UI, polish |
| **Day 6** | Search & Filters | Advanced search, UX improvements |
| **Day 7** | Deployment | Live deployment, documentation, final touches |

## 🛠️ Built With

### Frontend
- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React Router](https://reactrouter.com/) - Navigation
- [Axios](https://axios-http.com/) - HTTP client

### Backend
- [Flask](https://flask.palletsprojects.com/) - Web framework
- [SQLAlchemy](https://www.sqlalchemy.org/) - ORM
- [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/) - Authentication
- [Flask-CORS](https://flask-cors.readthedocs.io/) - Cross-origin support


## 📞 Contact

Ahmed - ![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)

Project Link: [https://github.com/truthseeker01/job-board](https://github.com/truthseeker01/job-board)

## 🙏 Acknowledgments

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Render](https://render.com) for backend hosting
- [Vercel](https://vercel.com) for frontend hosting

---

<div align="center">
  
Made with ❤️ and ☕ by Ahmed B

**If you found this project helpful, please give it a ⭐!**

</div>