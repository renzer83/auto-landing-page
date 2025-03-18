import React from 'react';
import { Video } from '../../types/landing';

interface VideoSectionProps {
  videos: Video[];
  title?: string;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ videos, title }) => {
  // Função para extrair o ID do vídeo do YouTube da URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold text-center text-primary mb-12">{title}</h2>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {videos.map((video, index) => {
            const videoId = getYouTubeVideoId(video.url);
            
            return (
              <div 
                key={index} 
                className="bg-gray-900 rounded-xl overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/20"
              >
                <div className="aspect-w-16 aspect-h-9">
                  {videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={video.title || `Video ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      style={{ aspectRatio: '16/9' }}
                    ></iframe>
                  ) : (
                    <video
                      src={video.url}
                      controls
                      poster={video.thumbnailUrl}
                      className="w-full h-full object-cover"
                      style={{ aspectRatio: '16/9' }}
                    ></video>
                  )}
                </div>
                
                {(video.title || video.description) && (
                  <div className="p-4">
                    {video.title && (
                      <h3 className="text-lg font-semibold text-primary mb-2">{video.title}</h3>
                    )}
                    {video.description && (
                      <p className="text-gray-300 text-sm">{video.description}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
