import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import SkillAssessment from './components/SkillAssessment';
import LearningPaths from './components/LearningPaths';
import LoginForm from './components/auth/LoginForm';
import UserProfile from './components/profile/UserProfile';
import UserSettings from './components/profile/UserSettings';
import { useUserStore } from './store/userStore';

function App() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const [activeModal, setActiveModal] = useState<'profile' | 'settings' | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header onOpenModal={setActiveModal} />
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <LoginForm key="login" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero />
            <main className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none" />
              <SkillAssessment />
              <LearningPaths />
            </main>
            <footer className="bg-gray-800 text-white py-8">
              <div className="container mx-auto px-6 text-center">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  © 2024 SkillBridge. Empowering students to build their future.
                </motion.p>
              </div>
            </footer>

            <AnimatePresence>
              {activeModal === 'profile' && (
                <UserProfile onClose={() => setActiveModal(null)} />
              )}
              {activeModal === 'settings' && (
                <UserSettings onClose={() => setActiveModal(null)} />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;