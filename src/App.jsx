//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Navbar from './components/common/Navbar';
import StudentLogin from './components/onboarding/StudentLogin';
import StudentProfile from './components/profile/StudentProfile';
import ParentLogin from './components/onboarding/ParentLogin';
import ParentProfile from './components/profile/ParentProfile';
import TeacherLogin from './components/onboarding/TeacherLogin';
import TeacherProfile from './components/profile/TeacherProfile';
import AdminLogin from './components/onboarding/AdminLogin';
import AdminProfile from './components/profile/AdminProfile';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import StudentDashboard from './components/dashboard/StudentDashboard';
import ParentDashboard from './components/dashboard/ParentDashboard';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Landing page as the root */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/profile/student" element={<StudentProfile />} />
        <Route path="/dashboard/student" element={<StudentDashboard  />} />
        <Route path="/dashboard/parent" element={<ParentDashboard />} />
        <Route path="/parent-dashboard" element={<ParentDashboard  />} />

        <Route path="/parent-login" element={<ParentLogin />} />
        <Route path="/profile/parent" element={<ParentProfile />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/profile/teacher" element={<TeacherProfile />} />
        <Route path="/dashboard/teacher" element={<TeacherDashboard  />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/profile/admin" element={<AdminProfile  />} />
        
      </Routes>
    </Router>
  );
}

export default App;