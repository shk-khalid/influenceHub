import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import Profile from './pages/Profile';
import Campaign from './pages/Campaigns';
import { BrandMatchingDashboard } from './pages/Matching';
import Analytics from './pages/Analytics';
import { Authorization } from './pages/Authorization';
import { Insights } from './pages/Insights';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route for SignIn */}
        <Route
          path="/auth"
          element={
            <Authorization />
          }
        />

        {/* Protected Route for Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
              <Toaster position="top-right" />
            </Layout>
          }
        />

        {/* Protected Route for Profile */}
        <Route
          path="/profile"
          element={
            <Profile />
          }
        />

        {/* Protected Route for Campaigns */}
        <Route
          path="/campaigns"
          element={
            <Campaign />
          }
        />

        <Route
          path="/match"
          element={
            <BrandMatchingDashboard />
          }
        />

        <Route
          path="/analytics"
          element={
            <Analytics />
          }
        />

        <Route
          path="/insights"
          element={
            <Insights />
          }
        />

        {/* Default Route to Redirect to SignIn */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
