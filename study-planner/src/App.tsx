import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './context/useAuthContext';
import ProtectedRoute from './utils/protectedRoute';
import StudyPlanPage from './pages/StudyPlanPage';
import AddStudyPlanPage from './pages/AddStudyPlanPage';
import StudyPlanDetailsPage from './pages/StudyPlanDetailsPage';

const App: React.FC = () => {
  return (
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
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;