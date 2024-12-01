import { LayoutDashboard, Megaphone, Handshake, Briefcase, BarChart2, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink } from '../common/NavLink';
import DesktopLightLogo from '../../assets/logo/LightLogoOnly.png';
import DesktopDarkLogo from '../../assets/logo/DarkLogoOnly.png';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Campaigns', icon: Megaphone, href: '/campaigns' },
  { name: 'Match Making', icon: Handshake, href: '/match' },
  { name: 'Brands Insight', icon: Briefcase, href: '/insights' },
  { name: 'Trend Analysis', icon: BarChart2, href: '/analytics' },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <aside
      className={`
        fixed left-0 top-0 z-40 h-screen glass-effect
        transition-all duration-300 ease-in-out shadow-glow
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >
      <div className="flex h-full flex-col">
        {/* Logo Section */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10 dark:border-gray-800/50 mt-3">
          <img src={isDarkMode ? DesktopDarkLogo : DesktopLightLogo} alt="Logo" className={`h-12 transition-opacity ${collapsed ? 'hidden' : 'block'}`}/>
          <span className={`text-2xl font-bold text-gray-900 dark:text-white ${collapsed ? 'hidden' : 'block'}`}>CollabWise</span>
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

        {/* Navigation Section */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => (
            <NavLink key={item.name} {...item} collapsed={collapsed} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
