import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import DesktopLightLogo from '../../assets/logo/LightLogoOnly.png';
import DesktopDarkLogo from '../../assets/logo/DarkLogoOnly.png';

const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Utility functions
const isElementInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  return (
    (rect.top >= 0 && rect.top <= windowHeight * 0.5) ||
    (rect.bottom >= windowHeight * 0.5 && rect.top <= 0)
  );
};

const getActiveSection = (): string => {
  const sections = ['hero', 'features', 'about', 'testimonials', 'code', 'cta'];
  for (const section of sections) {
    const element = document.getElementById(section);
    if (element && isElementInViewport(element)) {
      return section;
    }
  }
  return '';
};

const smoothScrollTo = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (!element) return;
  const headerOffset = 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

// Logo Component
const Logo: React.FC = () => (
  
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center space-x-2"
  >
    <img
      src={isDarkMode ? DesktopDarkLogo : DesktopLightLogo}
      alt="Logo"
      className="h-12"
    />
    <span className="block text-2xl font-bold text-gray-900 dark:text-white">
      influenceHub
    </span>
  </motion.div>
);

// Theme Toggle Component
const ThemeToggle: React.FC<{ isDarkMode: boolean; toggleDarkMode: () => void }> = ({
  isDarkMode,
  toggleDarkMode
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={toggleDarkMode}
    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    <motion.div
      initial={false}
      animate={{ rotate: isDarkMode ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-amber-500" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600" />
      )}
    </motion.div>
  </motion.button>
);


interface NavLinksProps {
  scrollToSection: (id: string) => void;
  variant: 'mobile' | 'desktop';
  activeSection: string;
}

const links = [
  { id: 'features', label: 'Features' },
  { id: 'about', label: 'About' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'code', label: 'Code' },
];

const NavLinks: React.FC<NavLinksProps> = ({ scrollToSection, variant, activeSection }) => {
  const isMobile = variant === 'mobile';
  
  return (
    <div className={isMobile ? 'flex flex-col space-y-4' : 'flex items-center space-x-8'}>
      {links.map((link, index) => (
        <motion.button
          key={link.id}
          onClick={() => scrollToSection(link.id)}
          className={`
            relative group transition-colors
            ${isMobile
              ? 'w-full py-3 text-lg font-medium'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }
            ${activeSection === link.id ? 'text-indigo-600 dark:text-indigo-400' :
              isMobile ? 'text-gray-900 dark:text-white' : ''}
          `}
          whileHover={!isMobile ? { y: -2 } : undefined}
          custom={index}
          initial={isMobile ? { opacity: 0, x: -50 } : false}
          animate={isMobile ? { opacity: 1, x: 0 } : undefined}
          transition={{ delay: isMobile ? index * 0.1 : 0 }}
        >
          {link.label}
          {!isMobile && (
            <motion.span
              className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300
                ${activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`}
            />
          )}
        </motion.button>
      ))}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          ${isMobile
            ? 'mt-6 w-full py-3 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg'
          }
          transition-all duration-300 hover:opacity-90
        `}
        onClick={() => scrollToSection('cta')}
      >
        Get Started
      </motion.button>
    </div>
  );
};

// Mobile Menu Component
const MobileMenu: React.FC<{
  isOpen: boolean;
  scrollToSection: (id: string) => void;
  activeSection: string;
}> = ({ isOpen, scrollToSection, activeSection }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm md:hidden z-40"
        />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-0 top-[73px] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden z-50"
        >
          <div className="container mx-auto px-6 py-8">
            <NavLinks scrollToSection={scrollToSection} variant="mobile" activeSection={activeSection} />
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// Scroll Progress Component
const ScrollProgress: React.FC = () => {
  const scaleX = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = currentProgress / scrollHeight;
      scaleX.set(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, [scaleX]);

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 h-1 bg-indigo-600/20 dark:bg-indigo-400/20 transform origin-left z-50"
      style={{ scaleX }}
    >
      <div className="h-full bg-indigo-600 dark:bg-indigo-400" />
    </motion.div>
  );
};

// Main Header Component
const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest < lastScrollY;
    setIsScrollingUp(direction);
    setLastScrollY(latest);
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = getActiveSection();
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const scrollToSection = useCallback((id: string) => {
    smoothScrollTo(id);
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: !isScrollingUp && isScrolled && !isMenuOpen ? -100 : 0,
        }}
        transition={{ duration: 0.3 }}
        className={`
          fixed w-full z-50 transition-all duration-300
          ${isScrolled || isMenuOpen
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg'
            : 'bg-transparent'
          }
        `}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLinks
                scrollToSection={scrollToSection}
                variant="desktop"
                activeSection={activeSection}
              />
              <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-900 dark:text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
                )}
              </motion.button>
            </div>
          </div>
        </nav>

        <MobileMenu
          isOpen={isMenuOpen}
          scrollToSection={scrollToSection}
          activeSection={activeSection}
        />
      </motion.header>
      <ScrollProgress />
    </>
  );
};

export default Header;