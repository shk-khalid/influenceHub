import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './components/auth/AuthLayout';
import { SignInForm } from './components/auth/SignInForm';
import { SignUpForm } from './components/auth/SignUpForm';
import { Layout } from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route for SignIn */}
        <Route
          path="/signin"
          element={
            <AuthLayout>
              <SignInForm onSwitchToSignUp={() => { }} />
            </AuthLayout>
          }
        />

        {/* Public Route for SignUp */}
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <SignUpForm onSwitchToSignIn={() => { }} />
            </AuthLayout>
          }
        />

        {/* Protected Route for Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
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
