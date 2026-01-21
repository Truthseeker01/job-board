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
// Example of a Job Card component
function JobCard({ job }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{job.location}</span>
          </div>
        </div>
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
          {job.salary}
        </span>
      </div>
      <p className="mt-4 text-gray-600 line-clamp-2">{job.description}</p>
      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Posted {formatDate(job.created_at)}
        </span>
        <Link 
          to={`/jobs/${job.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          View Details
        </Link>
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

Ahmed - [https://discord.gg/8QMjCBgn](https://discord.gg/8QMjCBgn)

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