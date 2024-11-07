import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Presentation, Database, ChevronRight } from 'lucide-react';
import { useUserStore } from '../store/userStore';

const skillCategories = [
  {
    id: 'tech',
    name: 'Technical Skills',
    icon: Code,
    skills: ['Programming', 'Web Development', 'Data Analysis', 'Mobile Development']
  },
  {
    id: 'soft',
    name: 'Soft Skills',
    icon: Brain,
    skills: ['Communication', 'Leadership', 'Problem Solving', 'Time Management']
  },
  {
    id: 'business',
    name: 'Business Skills',
    icon: Presentation,
    skills: ['Project Management', 'Digital Marketing', 'Business Analysis', 'Sales']
  },
  {
    id: 'data',
    name: 'Data Skills',
    icon: Database,
    skills: ['SQL', 'Data Visualization', 'Machine Learning', 'Statistics']
  }
];

export default function SkillAssessment() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleGeneratePath = () => {
    if (!isAuthenticated) {
      const loginElement = document.getElementById('login');
      if (loginElement) {
        loginElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const learningElement = document.getElementById('learning');
    if (learningElement) {
      learningElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="assessment" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Skill Assessment
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Select your current skills to receive personalized learning recommendations
            and career path suggestions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <category.icon className="h-6 w-6 text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
              </div>
              <div className="space-y-3">
                {category.skills.map(skill => (
                  <label
                    key={skill}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      className="form-checkbox h-5 w-5 text-indigo-600 rounded transition-all duration-200 ease-in-out group-hover:scale-110"
                    />
                    <span className="text-gray-700 group-hover:text-indigo-600 transition-colors duration-200">
                      {skill}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button
            onClick={handleGeneratePath}
            className="inline-flex items-center px-8 py-3 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
          >
            <span>Generate Learning Path</span>
            <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}