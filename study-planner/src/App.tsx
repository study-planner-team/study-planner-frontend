import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/GeneralPages/LandingPage';
import RegisterPage from './pages/UserPages/RegisterPage';
import LoginPage from './pages/UserPages/LoginPage';
import ProfilePage from './pages/UserPages/ProfilePage';
import { AuthProvider } from './context/useAuthContext';
import ProtectedRoute from './utils/protectedRoute';
import StudyPlanPage from './pages/StudyPlanPages/StudyPlanPage';
import AddStudyPlanPage from './pages/StudyPlanPages/AddStudyPlanPage';
import StudyPlanDetailsPage from './pages/StudyPlanPages/StudyPlanDetailsPage';
import EditStudyPlanPage from './pages/StudyPlanPages/EditStudyPlanPage';
import SchedulePage from './pages/SchedulePages/SchedulePage';
import PublicPlanPage from './pages/StudyPlanPages/PublicPlanPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ToastContainer position="top-center" autoClose={5000} />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={ <ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/studyplans" element={<ProtectedRoute><StudyPlanPage /></ProtectedRoute>} />
            <Route path="/studyplans/new" element={<ProtectedRoute><AddStudyPlanPage /></ProtectedRoute>} />
            <Route path="/studyplans/:id" element={<ProtectedRoute><StudyPlanDetailsPage /></ProtectedRoute>} />
            <Route path="/studyplans/edit/:id" element={<ProtectedRoute><EditStudyPlanPage /></ProtectedRoute>} />
            <Route path="/schedules" element={<ProtectedRoute><SchedulePage /></ProtectedRoute>} />
            <Route path="/publicstudyplans" element={<ProtectedRoute><PublicPlanPage /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;