import { 
  LayoutDashboard, 
  Megaphone, 
  Users, 
  MessageSquare, 
  BarChart2, 
  Wallet, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { NavLink } from './NavLink';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Campaigns', icon: Megaphone, href: '/campaigns' },
  { name: 'Influencer Discovery', icon: Users, href: '/discovery' },
  { name: 'Messages', icon: MessageSquare, href: '/messages', badge: '3' },
  { name: 'Analytics', icon: BarChart2, href: '/analytics' },
  { name: 'Payments', icon: Wallet, href: '/payments' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside 
      className={`
        fixed left-0 top-0 z-40 h-screen glass-effect
        transition-all duration-300 ease-in-out shadow-glow
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10 dark:border-gray-800/50">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                InfluenceHub
              </span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-white/10 dark:hover:bg-gray-800/50 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              {...item}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}