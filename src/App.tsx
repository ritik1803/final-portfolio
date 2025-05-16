import React from 'react';
import { NavBar } from './components/NavBar';
import Banner from './components/Banner'; 
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import 'animate.css';

function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <NavBar />
      <Banner />
      <Skills />
      <Experience />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;