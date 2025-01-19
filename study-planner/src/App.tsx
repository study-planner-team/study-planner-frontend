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
import ScheduleCalendarPage from './pages/SchedulePages/ScheduleCalendarPage';
import { ActiveSessionProvider } from './context/ActiveSessionProvider';
import ActiveSessionPage from './pages/SessionPages/ActiveSessionPage';
import StatisticPage from './pages/StatisticPages/StatisticPage';
import QuizPage from './pages/QuizPages/QuizPage';
import ResultPage from './pages/QuizPages/ResultPage';
import ChangePasswordPage from './pages/UserPages/ChangePasswordPage';
import PublicUsersPage from './pages/UserPages/PublicUsersPage';

const App: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ToastContainer position="top-center" autoClose={5000} />
      <Router>
        <AuthProvider>
          <ActiveSessionProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={ <ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/public-users" element={<ProtectedRoute><PublicUsersPage /></ProtectedRoute>} />
              <Route path="/studyplans" element={<ProtectedRoute><StudyPlanPage /></ProtectedRoute>} />
              <Route path="/studyplans/new" element={<ProtectedRoute><AddStudyPlanPage /></ProtectedRoute>} />
              <Route path="/studyplans/:id" element={<ProtectedRoute><StudyPlanDetailsPage /></ProtectedRoute>} />
              <Route path="/studyplans/edit/:id" element={<ProtectedRoute><EditStudyPlanPage /></ProtectedRoute>} />
              <Route path="/schedules" element={<ProtectedRoute><SchedulePage /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><ScheduleCalendarPage /></ProtectedRoute>} />
              <Route path="/publicstudyplans" element={<ProtectedRoute><PublicPlanPage /></ProtectedRoute>} />
              <Route path="/sessions/active" element={<ProtectedRoute><ActiveSessionPage /></ProtectedRoute>} />
              <Route path="/statistics" element={<ProtectedRoute><StatisticPage /></ProtectedRoute>} />
              <Route path="/studyplans/:studyPlanId/quizzes/:quizId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
              <Route path="/studyplans/:studyPlanId/quizzes/:quizId/score" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
              <Route path="/change-password" element={<ProtectedRoute><ChangePasswordPage /></ProtectedRoute>} />
            </Routes>
          </ActiveSessionProvider>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;