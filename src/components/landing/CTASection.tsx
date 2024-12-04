import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Github } from 'lucide-react';

const CTASection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="cta"
      className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900"
    >
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Explore the Project
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            Check out the source code and technical documentation to learn more about the implementation details.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group flex items-center gap-2 bg-white text-indigo-600 px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors">
              <Github className="w-5 h-5" />
              View Source Code
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="text-white hover:text-indigo-200 transition-colors">
              Read Documentation →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;