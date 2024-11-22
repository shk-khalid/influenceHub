import { useState, useEffect } from 'react';
import {  
  Bell, 
  Sun,
  Moon,
  User,
  Settings as SettingsIcon,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  sidebarCollapsed: boolean;
}

export function Topbar({ sidebarCollapsed }: TopbarProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/profile');
  };

  return (
    <header 
      className={`
        fixed top-0 right-0 z-30 h-16 glass-effect
        transition-all duration-300 shadow-glow
        ${isDesktop ? (sidebarCollapsed ? 'left-20' : 'left-64') : 'left-0'}
      `}
    >
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex-1 max-w-2xl">
          
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 glass-effect rounded-xl shadow-glow-lg animate-slide-up">
                <div className="p-4 border-b border-white/10 dark:border-gray-800/50">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 hover:bg-white/10 dark:hover:bg-gray-800/50 transition-colors">
                    <p className="text-sm text-gray-600 dark:text-gray-300">New campaign request from Brand X</p>
                    <span className="text-xs text-gray-400">2 minutes ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-200 group"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
                  alt="Profile"
                  className="w-8 h-8 rounded-lg object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-lg ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
                John Doe
              </span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 glass-effect rounded-xl shadow-glow-lg animate-slide-up">
                <div className="p-3 border-b border-white/10 dark:border-gray-800/50">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 rounded-lg hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-200" onClick={handleClick}>
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </button>
                  <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 rounded-lg hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-200">
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    Settings
                  </button>
                  <button className="w-full flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 rounded-lg hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-200">
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
