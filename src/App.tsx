  import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
  import { useEffect } from 'react';
  import { Toaster } from 'react-hot-toast';
  import { sessionService } from './services/sessionService';
  import { Provider } from 'react-redux';
  import { store } from './hooks/useReduxStore';
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
  import { Layout } from './components/layout/Layout';
  import { useAppSelector } from './hooks/useRedux';

  function ThemeInitializer() {
    const darkMode = useAppSelector((state) => state.theme.darkMode);

    useEffect(() => {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, [darkMode]);

    return null;
  }

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
      <Provider store={store}>
        <ThemeInitializer />
        <Router>
          <Toaster position="top-right" />
          <AuthProvider>
            <Routes>
              {/* Authentication Routes (Outside Layout) */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/forgot" element={<ForgotPasswordForm />} />

              {/* Protected Routes with Layout */}
              <Route
                path="/*"
                element={
                  <ProtectedRouteWrapper>
                    <Layout>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/campaigns" element={<Campaign />} />
                        <Route path="/match" element={<BrandMatchingDashboard />} />
                        <Route path="/analytics" element={<TrendingTopics />} />
                        <Route path="/insights" element={<Insights />} />
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                      </Routes>
                    </Layout>
                  </ProtectedRouteWrapper>
                }
              />
            </Routes>
          </AuthProvider>
        </Router>
      </Provider>
    );
  }

  export default App;
