import React from 'react';
import { Instagram, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Aashish Arya</h3>
            <p className="text-gray-400">
              A passionate graphic designer and video editor dedicated to creating stunning visual experiences.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={18} />
                <a href="tel:+918302847049" className="hover:text-indigo-400 transition-colors">
                  +91 8302847049
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={18} />
                <a href="mailto:aashisharya084@gmail.com" className="hover:text-indigo-400 transition-colors">
                  aashisharya084@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={18} />
                <span>Delhi, India</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#experience" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Projects
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Me</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/aashish_arya___"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/+918302847049"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-500 transition-colors"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Aashish Arya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};