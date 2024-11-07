import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, Target, Award, ChevronRight, Star, Users, Rocket, Brain, Trophy, ArrowRight } from 'lucide-react';
import { useUserStore } from '../store/userStore';

const learningPaths = [
  {
    title: 'Full-Stack Development',
    description: 'Master both frontend and backend development with modern technologies',
    duration: '6 months',
    level: 'Intermediate',
    rating: 4.8,
    students: 1234,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Data Science & AI',
    description: 'Learn data analysis, machine learning, and artificial intelligence',
    duration: '8 months',
    level: 'Advanced',
    rating: 4.9,
    students: 892,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Digital Marketing',
    description: 'Master modern marketing techniques and strategies',
    duration: '4 months',
    level: 'Beginner',
    rating: 4.7,
    students: 2156,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  }
];

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Personalized curriculum adapts to your learning style and pace'
  },
  {
    icon: Users,
    title: 'Expert Mentorship',
    description: 'Get guidance from industry professionals and tech leaders'
  },
  {
    icon: Trophy,
    title: 'Industry Recognition',
    description: 'Earn certificates valued by top tech companies'
  }
];

const slideImages = [
  {
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
    alt: 'Students collaborating',
  },
  {
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80',
    alt: 'Learning in progress',
  },
  {
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80',
    alt: 'Team discussion',
  },
  {
    url: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&w=1600&q=80',
    alt: 'Digital learning',
  }
];

export default function LearningPaths() {
  const [showAll, setShowAll] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const displayedPaths = showAll ? learningPaths : learningPaths.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      const loginElement = document.getElementById('login');
      if (loginElement) {
        loginElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const assessmentElement = document.getElementById('assessment');
      if (assessmentElement) {
        assessmentElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="learning" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Start Your Learning Journey
          </h2>
          <p className="text-lg text-gray-600">
            Choose from our curated learning paths or get a personalized recommendation
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {displayedPaths.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={path.image}
                  alt={path.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{path.rating}</span>
                    <span className="text-gray-300">•</span>
                    <Users className="h-4 w-4" />
                    <span>{path.students.toLocaleString()} students</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {path.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{path.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                    <span>{path.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Target className="h-5 w-5 mr-2 text-indigo-600" />
                    <span>{path.level}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 group">
                  <BookOpen className="h-5 w-5" />
                  <span>Start Learning</span>
                  <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Get Started Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to accelerate your career?
              </h2>
              <p className="text-indigo-100 mb-8">
                Join thousands of learners already on their path to success
              </p>
              
              <div className="space-y-6 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-white/10 rounded-lg p-2">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{feature.title}</h3>
                      <p className="text-indigo-100 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={handleGetStarted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-200 flex items-center space-x-2 group"
              >
                <Rocket className="h-5 w-5" />
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-transparent z-10" />
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={slideImages[currentSlide].url}
                  alt={slideImages[currentSlide].alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Join Our Success Stories
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white px-6 py-3 rounded-full shadow-md text-gray-600 flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span>90% Job Placement Rate</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-full shadow-md text-gray-600 flex items-center space-x-2">
              <Users className="h-5 w-5 text-indigo-500" />
              <span>10,000+ Active Learners</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-full shadow-md text-gray-600 flex items-center space-x-2">
              <Star className="h-5 w-5 text-purple-500" />
              <span>4.9/5 Average Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}