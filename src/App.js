import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import WaitingApproval from './components/Auth/WaitingApproval';
import AdminDashboard from './pages/AdminDashboard';
import CourseCatalog from './components/Course/CourseCatalog';
import QuizSection from './components/Quiz/QuizSection';
import ProgressTracking from './components/Progress/ProgressTracking';
import Watermark from './components/Watermark';
import './styles.css';

const App = () => {
  // Simulate admin login (replace with actual auth check)
  const isAdmin = true;
  const isLoggedIn = true; // Simulate user login

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/waiting-approval" element={<WaitingApproval />} />
        {isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
        {isLoggedIn && <Route path="/courses" element={<CourseCatalog />} />}
        <Route path="/quiz/:courseId" element={<QuizSection />} />
        <Route path="/progress" element={<ProgressTracking />} />
      </Routes>
      <Watermark />
    </BrowserRouter>
  );
};

export default App;