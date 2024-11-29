import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideProps } from 'lucide-react';

interface NavLinkProps {
  name: string;
  icon: React.ComponentType<LucideProps>; // Update the type to match LucideProps
  href: string;
  badge?: string;
  collapsed?: boolean;
  isBottomNav?: boolean;
  className?: string;
}

export function NavLink({ name, icon: Icon, href, badge, collapsed, isBottomNav }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={`
        flex items-center p-2 rounded-lg transition-colors
        ${isBottomNav ? 'flex-col text-xs' : 'space-x-3 text-base'}
        ${isActive ? 'bg-indigo-100 dark:bg-gray-700' : 'hover:bg-indigo-50 dark:hover:bg-gray-700'}
      `}
    >
      <Icon
        className={`h-6 w-6 ${collapsed || isBottomNav ? 'mx-auto' : ''}`}
        strokeWidth={isActive ? 2.5 : 1.5} // Updated to use numeric strokeWidth
      />
      {!collapsed && !isBottomNav && <span>{name}</span>}
      {badge && (
        <span
          className={`ml-auto text-xs font-medium bg-red-500 text-white rounded-full px-2 py-0.5 ${isBottomNav ? 'mt-1' : ''}`}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}
