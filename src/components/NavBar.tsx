import React, { useState, useEffect } from 'react';
import { Instagram, Phone, Menu, X } from 'lucide-react';

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value: string) => {
    setActiveLink(value);
    setIsMenuOpen(false);
  };

  const handleConnectButtonClick = () => {
    const email = 'aashisharya084@gmail.com';
    const subject = 'Let\'s Connect';
    const body = 'Hello,\n\n I would like to connect with you.\n\n Regards';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <nav className={`fixed w-full z-50 px-4 py-2 ${scrolled ? "bg-[#050505] shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="text-white font-bold text-xl">
          Aashish Arya
        </a>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-[#050505] md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 md:items-center`}>
          <div className="flex flex-col md:flex-row md:mr-6 space-y-4 md:space-y-0 md:space-x-6">
            <a 
              href="#home"
              className={`text-white hover:text-indigo-400 ${activeLink === 'home' ? 'text-indigo-400' : ''}`}
              onClick={() => onUpdateActiveLink('home')}
            >
              Home
            </a>
            <a 
              href="#skills"
              className={`text-white hover:text-indigo-400 ${activeLink === 'skills' ? 'text-indigo-400' : ''}`}
              onClick={() => onUpdateActiveLink('skills')}
            >
              Skills
            </a>
            <a 
              href="#experience-section"
              className={`text-white hover:text-indigo-400 ${activeLink === 'experience' ? 'text-indigo-400' : ''}`}
              onClick={() => onUpdateActiveLink('experience')}
            >
              Experience
            </a>
            <a 
  href="#projects"
  className={`text-white hover:text-indigo-400 ${activeLink === 'projects' ? 'text-indigo-400' : ''}`}
  onClick={() => onUpdateActiveLink('projects')}
>
  Projects
</a>

          </div>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-3">
              <a 
                href="https://wa.me/+918302847049" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-indigo-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/aashish_arya___" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-indigo-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>

            </div>
            <button 
              onClick={handleConnectButtonClick}
              className="px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-black transition-colors"
            >
              Let's Connect
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};