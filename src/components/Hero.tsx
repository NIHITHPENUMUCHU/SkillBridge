import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Award } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: Users, value: '10K+', label: 'Active Learners' },
    { icon: Award, value: '150+', label: 'Expert Mentors' },
    { icon: Sparkles, value: '95%', label: 'Success Rate' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/90 via-purple-900/90 to-indigo-900/90" />
      </div>
      
      <div className="container mx-auto px-6 pt-32 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Shape Your Future with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                AI-Powered Learning
              </span>
            </h1>
            <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto lg:mx-0">
              Discover personalized learning paths that align with your career goals
              and industry demands. Start your journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <motion.button
                onClick={() => scrollToSection('assessment')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition flex items-center space-x-2 group w-full sm:w-auto justify-center"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('learning')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition w-full sm:w-auto justify-center"
              >
                Explore Courses
              </motion.button>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center sm:items-start"
                >
                  <div className="flex items-center space-x-2 text-indigo-400 mb-2">
                    <stat.icon className="h-6 w-6" />
                    <span className="text-3xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-indigo-200">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex-1 w-full max-w-xl"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
                alt="Students learning"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}