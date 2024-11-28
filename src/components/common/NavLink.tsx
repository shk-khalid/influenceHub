import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  collapsed?: boolean;
  isBottomNav?: boolean;
}

export function NavLink({ name, icon: Icon, href, badge, collapsed, isBottomNav }: NavLinkProps) {
  return (
    <Link
      to={href}
      className={`
        flex items-center p-2 rounded-lg transition-colors
        ${isBottomNav ? 'flex-col text-xs' : 'space-x-3 text-base'}
        hover:bg-indigo-100 dark:hover:bg-gray-700
      `}
    >
      <Icon className={`h-6 w-6 ${collapsed || isBottomNav ? 'mx-auto' : ''}`} />
      {!collapsed && !isBottomNav && <span>{name}</span>}
      {badge && (
        <span className={`ml-auto text-xs font-medium bg-red-500 text-white rounded-full px-2 py-0.5 ${isBottomNav ? 'mt-1' : ''}`}>
          {badge}
        </span>
      )}
    </Link>
  );
}
