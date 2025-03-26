// //import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// import Navbar from './components/common/Navbar';
// import StudentLogin from './components/onboarding/StudentLogin';
// import StudentProfile from './components/profile/StudentProfile';
// import ParentLogin from './components/onboarding/ParentLogin';
// import ParentProfile from './components/profile/ParentProfile';
// import TeacherLogin from './components/onboarding/TeacherLogin';
// import TeacherProfile from './components/profile/TeacherProfile';
// import AdminLogin from './components/onboarding/AdminLogin';
// import AdminProfile from './components/profile/AdminProfile';
// import TeacherDashboard from './components/dashboard/TeacherDashboard';
// import StudentDashboard from './components/dashboard/StudentDashboard';
// import ParentDashboard from './components/dashboard/ParentDashboard';
// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<LandingPage />} /> {/* Landing page as the root */}
//         <Route path="/student-login" element={<StudentLogin />} />
//         <Route path="/profile/student" element={<StudentProfile />} />
//         <Route path="/dashboard/student" element={<StudentDashboard  />} />
//         <Route path="/dashboard/parent" element={<ParentDashboard />} />
//         <Route path="/parent-dashboard" element={<ParentDashboard  />} />

//         <Route path="/parent-login" element={<ParentLogin />} />
//         <Route path="/profile/parent" element={<ParentProfile />} />
//         {/* <Route path="/home" element={<Home />} /> */}
//         <Route path="/teacher-login" element={<TeacherLogin />} />
//         <Route path="/profile/teacher" element={<TeacherProfile />} />
//         <Route path="/dashboard/teacher" element={<TeacherDashboard  />} />

//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/profile/admin" element={<AdminProfile  />} />
        
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/common/Navbar";

// 📌 Onboarding Pages
import StudentLogin from "./components/onboarding/StudentLogin";
import ParentLogin from "./components/onboarding/ParentLogin";
import TeacherLogin from "./components/onboarding/TeacherLogin";
import AdminLogin from "./components/onboarding/AdminLogin";
import AdminForm from "./components/onboarding/AdminForm";

// 📌 Profiles
import StudentProfile from "./components/profile/StudentProfile";
import ParentProfile from "./components/profile/ParentProfile";
import TeacherProfile from "./components/profile/TeacherProfile";
import AdminProfile from "./components/profile/AdminProfile";

// 📌 Dashboards
import StudentDashboard from "./components/dashboard/StudentDashboard";
import ParentDashboard from "./components/dashboard/ParentDashboard";
import TeacherDashboard from "./components/dashboard/TeacherDashboard";

// 📌 NEW COMPONENTS (Import Them Here)
import Feedback from "./pages/Feedback"; // Example: Feedback Page
import GenerateExam from "./pages/GenerateExam"; // Example: Exam Page
import Upload from "./pages/Upload";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Authentication Routes */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/parent-login" element={<ParentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-form" element={<AdminForm />} />
        

        {/* Profile Routes */}
        <Route path="/profile/student" element={<StudentProfile />} />
        <Route path="/profile/parent" element={<ParentProfile />} />
        <Route path="/profile/teacher" element={<TeacherProfile />} />
        <Route path="/profile/admin" element={<AdminProfile />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard-student" element={<StudentDashboard />} />
        <Route path="/dashboard/parent" element={<ParentDashboard />} />
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />

        {/* NEW ROUTES */}
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/exam" element={<GenerateExam />} />
        <Route path="admin/upload" element={<Upload />} />

      </Routes>
    </Router>
  );
}

export default App;
