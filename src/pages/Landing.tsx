import { useState, useEffect } from 'react';
import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import AboutSection from '../components/landing/AboutSection';
import GithubSection from '../components/landing/GithubSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

function Landing() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <GithubSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default Landing;