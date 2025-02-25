import { useEffect, useState } from 'react';
import { LayoutDashboard, Megaphone, Handshake, Briefcase, BarChart2 } from 'lucide-react';
import { NavLink } from '../common/NavLink';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Campaigns', icon: Megaphone, href: '/campaigns' },
  { name: 'Match Making', icon: Handshake, href: '/match' },
  { name: 'Brands Insight', icon: Briefcase, href: '/insights' },
  { name: 'Analytics', icon: BarChart2, href: '/analytics' },
];

export function BottomNav() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-0 left-0 z-40 w-full glass-effect border-t border-white/10 dark:border-gray-800/50 shadow-glow">
      <div className="flex justify-around py-2">
        {navigation.map((item) => (
          <NavLink key={item.name} {...item} isBottomNav />
        ))}
      </div>
    </nav>
  );
}
