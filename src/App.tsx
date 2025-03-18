import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { sessionService } from './services/sessionService';
// Components and Pages
import { Dashboard } from './pages/Dashboard';
import Profile from './pages/Profile';
import Campaign from './pages/Campaigns';
import { BrandMatchingDashboard } from './pages/Matching';
import { SignupForm } from './components/auth/SignupForm';
import { LoginForm } from './components/auth/LoginForm';
import { Insights } from './pages/Insights';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { ForgotPasswordForm } from './components/auth/ForgotPasswordForm';
import TrendingTopics from './pages/TrendingTopic';

function ProtectedRouteWrapper({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth(); 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  useEffect(() => {
    // Initialize session monitoring
    sessionService.init();

    // Cleanup on component unmount
    return () => {
      sessionService.cleanup();
    };
  }, []);

  return (
    <Router>
      <Toaster position="top-right" /> {/* Toast notifications for the app */}
        <AuthProvider>
          <Routes>
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRouteWrapper>
                  <Dashboard />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteWrapper>
                  <Profile />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path="/campaigns"
              element={
                <ProtectedRouteWrapper>
                  <Campaign />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path="/match"
              element={
                <ProtectedRouteWrapper>
                  <BrandMatchingDashboard />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRouteWrapper>
                  <TrendingTopics />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path="/insights"
              element={
                /* <ProtectedRouteWrapper>
                  <Insights />
                </ProtectedRouteWrapper> */
                <Insights />
              }
            />

            {/* Authentication Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/forgot" element={<ForgotPasswordForm />} />

            {/* Default Fallback Route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
