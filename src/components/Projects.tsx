import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ExternalLink, Play } from 'lucide-react';

// Updated projects data with real content
const projects = [
  {
    title: "Brand Identity Design",
    description: "Complete brand identity including logo, color palette, and brand guidelines for a modern tech startup.",
    imgUrl: "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg",
    mediaUrls: [
      "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg",
      "https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg",
      "https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg"
    ],
    category: "Complete Branding",
    isVideo: false
  },
  {
    title: "Social Media Campaign",
    description: "Engaging social media graphics and animations for a fitness brand's summer campaign.",
    imgUrl: "https://images.pexels.com/photos/3277808/pexels-photo-3277808.jpeg",
    mediaUrls: [
      "https://images.pexels.com/photos/3277808/pexels-photo-3277808.jpeg",
      "https://images.pexels.com/photos/3277920/pexels-photo-3277920.jpeg"
    ],
    category: "Graphic Design",
    isVideo: false
  },
  {
    title: "Corporate Video",
    description: "Professional company overview video showcasing products and services.",
    imgUrl: "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg",
    mediaUrls: ["https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg"],
    category: "Video Editing",
    isVideo: true
  },
  {
    title: "Logo Collection",
    description: "Modern and minimalist logo designs for various clients across different industries.",
    imgUrl: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg",
    mediaUrls: [
      "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg",
      "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg",
      "https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg"
    ],
    category: "Logo Design",
    isVideo: false
  },
  {
    title: "Product Brochure",
    description: "Elegant product catalog design for a luxury furniture brand.",
    imgUrl: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg",
    mediaUrls: ["https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg"],
    category: "Brochures",
    isVideo: false
  },
  {
    title: "Motion Graphics",
    description: "Dynamic animated content for digital advertising campaigns.",
    imgUrl: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg",
    mediaUrls: ["https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg"],
    category: "Video Editing",
    isVideo: true
  }
];

// Project Card Component
const ProjectCard = ({ title, description, imgUrl, mediaUrls, category, isVideo, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group overflow-hidden rounded-xl cursor-pointer transform transition-all duration-500 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <img 
          src={imgUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110">
              <Play size={24} className="text-indigo-600 ml-1" />
            </div>
          </div>
        )}
        
        <div className={`absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/60 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <span className="inline-block px-3 py-1 bg-indigo-500 text-white text-xs rounded-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {category}
          </span>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">{description}</p>
          
          <div className="mt-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
            <span className="text-xs text-white">View Project</span>
            <ExternalLink size={16} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal Carousel Component
const MediaCarousel = ({ isOpen, onClose, project, currentIndex, setCurrentIndex }) => {
  if (!isOpen) return null;
  
  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? project.mediaUrls.length - 1 : prev - 1));
  };
  
  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === project.mediaUrls.length - 1 ? 0 : prev + 1));
  };
  
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-5xl mx-4 animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-indigo-400 transition-colors p-2 z-10"
        >
          <X size={24} />
        </button>
        
        <div className="relative aspect-video rounded-lg overflow-hidden">
          {project.isVideo ? (
            <div className="w-full h-full bg-black flex items-center justify-center">
              <img 
                src={project.mediaUrls[currentIndex]} 
                alt={`${project.title} media`}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                  <Play size={36} className="text-indigo-600 ml-2" />
                </div>
              </div>
            </div>
          ) : (
            <img 
              src={project.mediaUrls[currentIndex]} 
              alt={`${project.title} media`}
              className="w-full h-full object-contain"
            />
          )}
          
          {/* Carousel Controls */}
          {project.mediaUrls.length > 1 && (
            <>
              <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-sm p-3 rounded-full transition-all duration-300"
              >
                <ChevronLeft size={24} className="text-white" />
              </button>
              
              <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-sm p-3 rounded-full transition-all duration-300"
              >
                <ChevronRight size={24} className="text-white" />
              </button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2">
                {project.mediaUrls.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'bg-indigo-500 w-8' : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to item ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="mt-4 text-white">
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <p className="text-gray-300 mt-2">{project.description}</p>
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showMore, setShowMore] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // For visibility tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('projects');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setCurrentMediaIndex(0);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const categories = ['All', 'Complete Branding', 'Graphic Design', 'Video Editing', 'Logo Design', 'Brochures'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const visibleProjects = showMore ? filteredProjects : filteredProjects.slice(0, 6);

  const fadeInClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden" id="projects">
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${fadeInClass}`}>
          <h5 className="uppercase tracking-widest text-xs font-semibold mb-2 text-indigo-400">My Work</h5>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Featured Projects
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-indigo-400 to-purple-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            I specialize in graphic design and video editing, with a portfolio that spans wedding invitations, 
            impactful product launches, user-friendly digital menus (E-Menu), captivating brochures, iconic logos, 
            and dynamic brand promotion materials. My work aims to create visual experiences that leave a lasting impression.
          </p>
        </div>

        <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-1000 delay-100 ${fadeInClass}`}>
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium focus:outline-none transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-indigo-500/20'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${fadeInClass}`}
              style={{ transitionDelay: `${(index % 3) * 150}ms` }}
            >
              <ProjectCard
                {...project}
                onClick={() => handleProjectClick(project)}
              />
            </div>
          ))}
        </div>

        {filteredProjects.length > 6 && (
          <div className={`flex justify-center mt-12 transition-all duration-1000 delay-500 ${fadeInClass}`}>
            <button
              onClick={() => setShowMore(!showMore)}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>

      {/* Modal Carousel */}
      <MediaCarousel
        isOpen={modalOpen}
        onClose={closeModal}
        project={selectedProject}
        currentIndex={currentMediaIndex}
        setCurrentIndex={setCurrentMediaIndex}
      />
      
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
        
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite alternate;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-modal-in {
          animation: modalIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Projects;