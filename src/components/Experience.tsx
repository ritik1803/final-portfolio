import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Briefcase, Calendar } from 'lucide-react';

const experienceData = [
  {
    title: "Graphic Designer & Video Editor",
    date: "September 2022 - Present",
    company: "Digital Buzz Solution, Delhi, India",
    tasks: [
      "Lead in the design, development, and implementation of the graphic, layout",
      "Developed numerous marketing programs (logos, brochures, infographics, presentations, and advertisements)",
      "Delegate tasks to the 7 members of the design team and provide counsel on all aspects of the project.",
      "Supervise the assessment of all graphic materials in order to ensure quality and accuracy of the design"
    ]
  },
  {
    title: "Graphic Designer & Video Editor",
    date: "December 2021 - August 2022",
    company: "Digital Socialite, Jaipur, Rajasthan",
    tasks: [
      "Developed numerous marketing programs (logos, brochures, infographics, presentations, and advertisements).",
      "Managed up to 5 projects or tasks at a given time while under pressure",
      "Recommended and consulted with clients on the most appropriate graphic design",
      "Created 4+ design presentations and proposals a month for clients"
    ]
  }
];

export const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState([]);

  useEffect(() => {
    // Set up intersection observer for main component
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    const section = document.getElementById('experience-section');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Add items to animated array with delay
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedItems([0]);
        
        const timer2 = setTimeout(() => {
          setAnimatedItems([0, 1]);
        }, 300);
        
        return () => clearTimeout(timer2);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <div 
      id="experience-section"
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8 min-h-screen relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div 
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Professional Experience
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
          {experienceData.map((item, index) => (
            <div 
              key={index} 
              className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden border-l-4 transition-all duration-500 ${
                expandedIndex === index ? 'border-teal-400 shadow-teal-500/20' : 'border-gray-700'
              } ${
                animatedItems.includes(index) 
                  ? 'opacity-100 transform translate-x-0' 
                  : 'opacity-0 transform translate-x-24'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div 
                className="p-6 cursor-pointer flex justify-between items-center group hover:bg-gray-700/20 transition-all duration-300"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-3 rounded-full transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                    <Briefcase size={24} className="text-gray-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-blue-500 transition-all duration-300">{item.title}</h3>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar size={16} className="mr-2" />
                      {item.date}
                    </div>
                  </div>
                </div>
                {expandedIndex === index ? 
                  <ChevronUp className="text-teal-400 transform transition-transform duration-500" /> : 
                  <ChevronDown className="text-gray-400 group-hover:text-gray-300 transform transition-transform duration-500" />
                }
              </div>
              
              {expandedIndex === index && (
                <div className="p-6 pt-0 bg-gray-800">
                  <div className="mb-4 animation-fade-in">
                    <p className="text-teal-400 italic">{item.company}</p>
                  </div>
                  <ul className="space-y-3">
                    {item.tasks.map((task, i) => (
                      <li 
                        key={i} 
                        className="flex items-start opacity-0 animation-slide-in" 
                        style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'forwards' }}
                      >
                        <span className="h-6 w-6 rounded-full bg-teal-400 text-gray-900 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 task-number-animation">
                          {i + 1}
                        </span>
                        <span className="text-gray-300">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateX(-20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite alternate;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animation-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
        
        .task-number-animation {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Experience;