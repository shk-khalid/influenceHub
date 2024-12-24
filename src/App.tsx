import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components and Pages
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import Profile from './pages/Profile';
import Campaign from './pages/Campaigns';
import { BrandMatchingDashboard } from './pages/Matching';
import Analytics from './pages/Analytics';
import { SignupForm } from './components/auth/SignupForm';
import { LoginForm } from './components/auth/LoginForm';
import { Insights } from './pages/Insights';
import { AuthProvider } from './context/AuthContext';
import { CompetitorProvider } from './context/CompetitorContext';
import { ForgotPasswordForm } from './components/auth/ForgotPasswordForm';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <Toaster position="top-right" /> {/* Toast notifications for the app */}
      <CompetitorProvider>
        <AuthProvider>
          <Routes>
            {/* Protected Routes */}
            {/* Landing Route */}
            <Route path="/landing" element={<Landing />} />

            {/* Dashboard Route */}
            <Route
              path="/dashboard"
              element={
                <Layout> {/* Layout wraps the Dashboard page */}
                  <Dashboard />
                </Layout>
              }
            />

            {/* Profile Route */}
            <Route path="/profile" element={<Profile />} />

            {/* Campaigns Route */}
            <Route path="/campaigns" element={<Campaign />} />

            {/* Brand Matching Route */}
            <Route path="/match" element={<BrandMatchingDashboard />} />

            {/* Analytics Route */}
            <Route path="/analytics" element={<Analytics />} />

            {/* Insights Route */}
            <Route path="/insights" element={<Insights />} />

            {/* Authentication Routes */}
            {/* Login Page */}
            <Route path="/login" element={<LoginForm />} />

            {/* Signup Page */}
            <Route path="/signup" element={<SignupForm />} />
              
            {/* Forgot Password Page */}
            <Route path="/forgot" element={<ForgotPasswordForm />} />

            {/* Default Fallback Route */}
            {/* Redirects unmatched routes to the dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </CompetitorProvider>
    </Router>
  );
}

export default App;
