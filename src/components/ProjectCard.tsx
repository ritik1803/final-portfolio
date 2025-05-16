import React, { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  imgUrl?: string;
  mediaUrls: string[];
  mediaType?: 'video' | 'image';
  category: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  imgUrl, 
  mediaUrls,
  mediaType = 'image'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="group relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="aspect-[16/9] overflow-hidden">
          {mediaType === 'video' ? (
            <video
              src={mediaUrls[0]}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              autoPlay={isHovered}
            />
          ) : (
            <img 
              src={imgUrl || mediaUrls[0]} 
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-200 mb-4">{description}</p>
            <button 
              className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              View Project
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setIsModalOpen(false)}>
          <div className="bg-[#1a1a1a] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                {mediaType === 'video' ? (
                  <video
                    src={mediaUrls[0]}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                  />
                ) : (
                  <img 
                    src={mediaUrls[0]} 
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <p className="text-gray-300">{description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};