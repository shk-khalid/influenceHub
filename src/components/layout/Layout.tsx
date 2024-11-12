import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        `}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
      {/* BottomNav is only shown on mobile screens */}
      <BottomNav />
    </div>
  );
}
