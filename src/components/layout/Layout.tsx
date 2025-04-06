import React, { useState, useEffect } from 'react';
import { Sidebar } from './SideNav';
import { Topbar } from './Topbar';
import { BottomNav } from './BottomNav';
import { LoadingPulse } from '../common/LoadingPulse';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const IsNowDesktop = window.innerWidth > 768
      setIsDesktop(IsNowDesktop);
      setIsMobile(!IsNowDesktop)
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle route changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {isDesktop && (
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
      )}
      <Topbar sidebarCollapsed={isDesktop ? sidebarCollapsed : false} />
      <main 
        className={`
          pt-16 min-h-screen
          transition-all duration-300
          ${isDesktop ? (sidebarCollapsed ? 'ml-20' : 'ml-64') : 'ml-0'}
          ${isMobile ? 'pb-16' : ''}
        `}
      >
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingPulse count={3} sizeClass="w-4 h-4" gapClass="space-x-3" duration={1500} />
            </div>
          ) : (
            children
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
