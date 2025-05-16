import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Film,
  Edit,
  Layers,
  Play,
  Clock,
  Zap,
  Code,
  PenTool,
  Star,
} from "lucide-react";

const Banner = () => {
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const toRotate = ["Graphic Designer", "Video Editor", "Motion Artist"];
  const period = 2000;

  const contentRef = useRef(null);
  const imageRef = useRef(null);

  // Animation frames for the waveform
  const [frameCount, setFrameCount] = useState(0);

  useEffect(() => {
    const animationTimer = setInterval(() => {
      setFrameCount((prevCount) => (prevCount + 1) % 60);
    }, 50);

    return () => clearInterval(animationTimer);
  }, []);

  // Visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) observer.observe(contentRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  // Text animation
  useEffect(() => {
    let ticker = setInterval(() => tick(), delta);
    return () => clearInterval(ticker);
  }, [text, delta]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  // Generate waveform points
  const generateWaveform = () => {
    const points = [];
    const segmentCount = 40;

    for (let i = 0; i < segmentCount; i++) {
      const height = Math.sin((i + frameCount) * 0.2) * 10 + Math.random() * 5;
      points.push(height);
    }

    return points;
  };

  const wavePoints = generateWaveform();

  return (
    <section
      className="relative pt-32 pb-16 px-4 md:pt-40 md:pb-20 overflow-hidden"
      id="home"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-indigo-950"></div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full bg-indigo-500 opacity-20"
              style={{
                width: `${Math.random() * 10 + 2}px`,
                height: `${Math.random() * 10 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s infinite linear`,
              }}
            ></div>
          ))}
        </div>

        {/* Video Editing Interface Elements */}
        <div className="absolute inset-0">
          {/* Timeline grid */}
          <div className="absolute left-0 right-0 top-1/4 h-40 opacity-20">
            <div className="h-full w-full grid grid-cols-12">
              {[...Array(12)].map((_, i) => (
                <div
                  key={`grid-${i}`}
                  className="border-l border-indigo-500 h-full"
                ></div>
              ))}
            </div>
          </div>

          {/* Circular elements */}
          <div className="absolute top-1/6 right-1/6 w-64 h-64 rounded-full border border-purple-500 opacity-10 animate-pulse"></div>
          <div
            className="absolute bottom-1/3 left-1/5 w-40 h-40 rounded-full border border-blue-400 opacity-10 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Video controls mockup */}
          <div className="absolute bottom-20 left-0 right-0 h-32 flex flex-col justify-end px-8 opacity-40">
            {/* Audio waveform */}
            <div className="h-16 w-full flex items-center justify-between">
              {wavePoints.map((height, i) => (
                <div
                  key={`wave-${i}`}
                  className="w-1 bg-indigo-500 rounded-full"
                  style={{ height: `${Math.abs(height) + 5}px` }}
                ></div>
              ))}
            </div>

            {/* Controls */}
            <div className="h-16 flex items-center justify-center space-x-8">
              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
                <Play size={24} className="text-white ml-1" />
              </div>
              <div className="flex-1 max-w-3xl">
                <div className="h-1 bg-gray-700 rounded-full w-full">
                  <div className="h-full w-1/3 bg-indigo-500 rounded-full relative">
                    <div className="absolute -right-2 -top-1.5 w-4 h-4 bg-white rounded-full border-2 border-indigo-500"></div>
                  </div>
                </div>
              </div>
              <div className="text-white text-xs">01:45 / 04:30</div>
            </div>
          </div>

          {/* Timeline clips */}
          <div className="absolute bottom-1/3 left-0 right-0 h-16 flex items-center px-8 opacity-50">
            <div className="w-full h-12 bg-gray-900 bg-opacity-50 rounded-lg flex items-center px-4">
              <div className="h-8 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 w-1/4 mr-4"></div>
              <div className="h-8 rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 w-2/5 mr-4"></div>
              <div className="h-8 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 w-1/5"></div>
            </div>
          </div>

          {/* Extra UI elements */}
          <div className="absolute top-20 left-8 flex flex-col space-y-4 opacity-30">
            {[...Array(5)].map((_, i) => (
              <div
                key={`tool-${i}`}
                className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center"
              >
                {i === 0 && <Edit size={18} className="text-indigo-400" />}
                {i === 1 && <Film size={18} className="text-blue-400" />}
                {i === 2 && <Layers size={18} className="text-purple-400" />}
                {i === 3 && <Zap size={18} className="text-yellow-400" />}
                {i === 4 && <Code size={18} className="text-green-400" />}
              </div>
            ))}
          </div>

          <div className="absolute top-20 right-8 flex flex-col space-y-4 opacity-30">
            <div className="w-32 h-24 rounded-lg bg-gray-900 border border-gray-800 p-2">
              <div className="text-xs text-gray-400 mb-2">Properties</div>
              <div className="space-y-2">
                <div className="h-2 bg-gray-800 rounded-full w-3/4"></div>
                <div className="h-2 bg-gray-800 rounded-full w-full"></div>
                <div className="h-2 bg-gray-800 rounded-full w-1/2"></div>
              </div>
            </div>
            <div className="w-32 h-24 rounded-lg bg-gray-900 border border-gray-800 p-2">
              <div className="text-xs text-gray-400 mb-2">Effects</div>
              <div className="grid grid-cols-3 gap-1">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`effect-${i}`}
                    className="h-6 bg-gray-800 rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div
            ref={contentRef}
            className={`md:col-span-7 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-opacity-20 rounded-full text-lg font-medium mb-8">
              <Star size={18} className="mr-2" />
              <span>Welcome to my Creative Portfolio</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="block mb-2 text-white">
                Hi! I'm Aashish Arya
              </span>
              <div className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                <span className="inline-block min-h-12">{text}</span>
                <span className="animate-blink ml-1">|</span>
              </div>
            </h1>

            <p className="text-gray-300 text-xl mb-10 max-w-2xl leading-relaxed">
              I'm a motion and graphic designer with over 2+ years of dedicated
              experience. My passion for design drives me to create visually
              stunning and impactful content that helps brands make a lasting
              impression.
            </p>

            <div className="flex flex-wrap gap-8 mt-6">
              <div className="flex items-center bg-indigo-500 bg-opacity-20 border border-indigo-500 border-opacity-40 rounded-full px-5 py-3">
                <Film size={22} className="text-indigo-400 mr-3" />
                <span className="text-white font-medium">Video Editing</span>
              </div>
              <div className="flex items-center bg-purple-500 bg-opacity-20 border border-purple-500 border-opacity-40 rounded-full px-5 py-3">
                <Layers size={22} className="text-purple-400 mr-3" />
                <span className="text-white font-medium">Motion Graphics</span>
              </div>
              <div className="flex items-center bg-blue-500 bg-opacity-20 border border-blue-500 border-opacity-40 rounded-full px-5 py-3">
              <PenTool size={22} className="text-blue-400 mr-3" />
              <span className="text-white font-medium">Logo Design</span>
              </div>
            </div>
          </div>

          <div
            ref={imageRef}
            className={`md:col-span-5 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="relative">
              {/* Glowing background elements */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
              <div
                className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"
                style={{ animationDelay: "1.5s" }}
              ></div>

              {/* Profile container */}
              <div className="relative mx-auto w-72 h-72 md:w-96 md:h-96">
                {/* Rotating border */}
                <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-opacity-30 animate-spin-slow"></div>
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-purple-500 border-opacity-20 animate-reverse-spin"></div>

                {/* Profile image */}
                <div className="absolute inset-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full p-1">
                  <div className="rounded-full bg-gray-900 h-full w-full flex items-center justify-center overflow-hidden relative">
                    {/* Video editing elements inside profile */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-12">
                        <div className="flex h-full items-center justify-around">
                          {[...Array(10)].map((_, i) => {
                            const height =
                              Math.sin(i + frameCount * 0.2) * 15 + 20;
                            return (
                              <div
                                key={`eq-${i}`}
                                className="w-2 bg-indigo-400 rounded-full transform transition-all"
                                style={{ height: `${height}px` }}
                              ></div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* User icon */}
                    <div className="relative z-10 bg-gray-900 rounded-full p-8 w-3/5 h-3/5 flex items-center justify-center">
                      <User size={80} className="text-indigo-400" />
                    </div>
                  </div>
                </div>

                {/* Floating editing icons */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center animate-float">
                  <Edit size={20} className="text-white" />
                </div>
                <div
                  className="absolute -bottom-2 left-10 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <Film size={18} className="text-white" />
                </div>
                <div
                  className="absolute top-10 -left-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-float"
                  style={{ animationDelay: "2s" }}
                >
                  <Layers size={24} className="text-white" />
                </div>
                <div
                  className="absolute -bottom-8 -right-2 w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center animate-float"
                  style={{ animationDelay: "1.5s" }}
                >
                  <Clock size={28} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes reverse-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 25s linear infinite;
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  );
};

export default Banner;
