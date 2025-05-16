import React, { useState, useEffect, useRef } from 'react';
import { Palette, Video, Package, PenTool, FileText, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export const Skills = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef(null);
  const sliderRef = useRef(null);

  const skills = [
    { name: "Video Editing", icon: Video, level: 95, color: "#FF5757" },
    { name: "Graphic Design", icon: Palette, level: 95, color: "#36D399" },
    { name: "Complete Branding", icon: Package, level: 85, color: "#3ABFF8" },
    { name: "Logo Design", icon: PenTool, level: 90, color: "#F471B5" },
    { name: "Brochures", icon: FileText, level: 95, color: "#FBBD23" }
  ];

  // Determine how many slides to show based on viewport width
  const getItemsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    }
    return 3; // Default for SSR
  };

  const [itemsToShow, setItemsToShow] = useState(3);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('skills');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Handle resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow());
    };

    // Set initial value
    setItemsToShow(getItemsToShow());
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && isVisible) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 2500);
    } else {
      clearInterval(intervalRef.current);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentSlide, isVisible]);

  const totalSlides = skills.length;
  const maxSlideIndex = Math.max(0, totalSlides - itemsToShow);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev >= maxSlideIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev <= 0 ? maxSlideIndex : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(Math.min(index, maxSlideIndex));
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }
    
    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  const fadeInClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';

  return (
    <section 
      id="skills" 
      className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-1000 ${fadeInClass}`}>
          <h5 className="uppercase tracking-widest text-sm font-semibold mb-3 text-blue-400">My Expertise</h5>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Professional Skills
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Creating stunning visuals and videos using Photoshop, Illustrator, Premiere Pro, and After Effects. 
            Let's bring your ideas to life with style and precision!
          </p>
        </div>
        
        <div className={`relative transition-all duration-1000 delay-300 ${fadeInClass}`}>
          {/* Custom Slider Control Buttons */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -ml-4 z-10">
            <button
              onClick={prevSlide}
              className="p-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-full shadow-lg text-white hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 -mr-4 z-10">
            <button
              onClick={nextSlide}
              className="p-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-full shadow-lg text-white hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Custom Slider */}
          <div 
            ref={sliderRef}
            className="overflow-hidden pb-16"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / itemsToShow)}%)` }}
            >
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="group flex-shrink-0"
                  style={{ width: `${100 / itemsToShow}%`, padding: '0 1rem' }}
                >
                  <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-md rounded-xl p-8 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-gray-700 h-full">
                    <div className="flex flex-col items-center">
                      <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg group-hover:scale-110 transition-all duration-500">
                        <skill.icon size={48} style={{ color: skill.color }} />
                      </div>
                      
                      <h5 className="text-xl font-semibold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">{skill.name}</h5>
                      
                      <div className="w-36 h-36 mx-auto relative">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <circle
                            cx="18" cy="18" r="16"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="2"
                          />
                          <circle
                            cx="18" cy="18" r="16"
                            fill="none"
                            stroke={skill.color}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray={isVisible ? `${skill.level}, 100` : "0, 100"}
                            className="transition-all duration-1000 ease-out"
                            style={{
                              transitionDelay: `${index * 0.2}s`
                            }}
                          />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="text-2xl font-bold text-white">{skill.level}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Manual/Auto Controls */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-8 bg-gray-800 bg-opacity-40 backdrop-filter backdrop-blur-md rounded-full px-6 py-3 border border-gray-700">
              <button 
                onClick={togglePlay}
                className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors duration-300"
              >
                {isPlaying ? (
                  <>
                    <Pause size={18} />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play size={18} />
                    <span>Auto Play</span>
                  </>
                )}
              </button>
              
              <div className="h-6 w-px bg-gray-600"></div>
              
              <div className="flex items-center space-x-2">
                {skills.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx >= currentSlide && idx < currentSlide + itemsToShow
                        ? 'bg-blue-400 w-6' 
                        : 'bg-gray-500 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;