import { useEffect, useState } from 'react';
import { /* Bell, */ Sun, Moon, User as UserIcon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useThemeToggler } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import type { User } from '../types/auth';
import MobileLightLogo from '../../assets/logo/LightLogoOnly.png';
import MobileDarkLogo from '../../assets/logo/DarkLogoOnly.png';

interface TopbarProps {
  sidebarCollapsed: boolean;
}

export function Topbar({ sidebarCollapsed }: TopbarProps) {
  const { darkMode, toggleDarkMode } = useThemeToggler();
  //const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const currentUser: User | null = authService.getCurrentUser();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Collapse dropdown on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showProfile]);

  const handleClick = () => {
    navigate('/profile');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const userName = currentUser?.username || "Default User";
  const userEmail = currentUser?.email || "";
  const profileImage = currentUser?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}`;

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 glass-effect transition-all duration-300 shadow-glow ${isDesktop ? (sidebarCollapsed ? 'left-20' : 'left-64') : 'left-0'
        }`}
    >
      <div className="h-full px-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          {!isDesktop && (
            <img
              src={darkMode ? MobileDarkLogo : MobileLightLogo}
              alt="influenceHub Logo"
              className="h-12"
            />
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-200 group"
            >
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-lg object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-lg ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
                {userName}
              </span>
            </button>

            {showProfile && (
              <div 
                className="absolute right-0 mt-2 w-56 glass-effect rounded-xl shadow-glow-lg animate-slide-up"
                onMouseLeave={() => setShowProfile(false)}
              >
                <div className="p-3 border-b border-white/10 dark:border-gray-800/50">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {userName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {userEmail}
                  </p>
                </div>
                <div className="p-2">
                  <button
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 rounded-lg hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-200"
                    onClick={handleClick}
                  >
                    <UserIcon className="w-4 h-4 mr-2" />
                    View Profile
                  </button>

                  <button
                    className="w-full flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 rounded-lg hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-200"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
