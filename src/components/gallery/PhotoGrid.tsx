import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { useInView } from 'react-intersection-observer';
import { Download, Maximize2 } from 'lucide-react';
import { Photo } from '../../types';

interface PhotoGridProps {
  photos: Photo[];
  loading?: boolean;
}

const PhotoGrid = ({ photos, loading = false }: PhotoGridProps) => {
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // Responsive breakpoints for the masonry grid
  const breakpointColumns = {
    default: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1
  };
  
  // Handle escape key to close lightbox
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isLightboxOpen]);
  
  // Lock scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLightboxOpen]);
  
  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };
  
  const navigateToPhotoPage = (photoId: string) => {
    navigate(`/photo/${photoId}`);
  };
  
  // Create download link for a photo
  const downloadPhoto = (photo: Photo, event: React.MouseEvent) => {
    event.stopPropagation();
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = photo.downloadUrl || photo.fullImageUrl;
    link.download = photo.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Load immediately visible content with intersection observer
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  if (loading) {
    return (
      <div className="flex h-60 flex-col items-center justify-center">
        <div className="spinner" />
        <p className="mt-4 text-secondary-600 dark:text-secondary-400">
          Loading photos...
        </p>
      </div>
    );
  }
  
  if (photos.length === 0) {
    return (
      <div className="flex h-60 flex-col items-center justify-center text-center">
        <p className="mb-2 text-lg font-medium">No photos found</p>
        <p className="text-secondary-600 dark:text-secondary-400">
          Try uploading some photos or changing your search criteria.
        </p>
      </div>
    );
  }
  
  return (
    <>
      <div ref={ref} className="w-full">
        {inView && (
          <Masonry
            breakpointCols={breakpointColumns}
            className="masonry-grid"
            columnClassName="masonry-grid-column"
          >
            {photos.map((photo) => (
              <div 
                key={photo.id}
                className="image-card mb-4 overflow-hidden rounded-lg bg-white shadow-smooth transition-transform hover:shadow-smooth-md hover:brightness-105 dark:bg-secondary-800"
                onClick={() => navigateToPhotoPage(photo.id)}
              >
                <div className="relative aspect-auto">
                  <img
                    src={photo.thumbnailUrl || photo.fullImageUrl}
                    alt={photo.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="image-card-overlay">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(photo);
                        }}
                        className="rounded-full bg-white/90 p-2 text-secondary-800 transition-colors hover:bg-white hover:text-primary-500"
                        aria-label="View fullscreen"
                      >
                        <Maximize2 className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={(e) => downloadPhoto(photo, e)}
                        className="rounded-full bg-white/90 p-2 text-secondary-800 transition-colors hover:bg-white hover:text-primary-500"
                        aria-label="Download photo"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        )}
      </div>
      
      {/* Lightbox */}
      {isLightboxOpen && selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={selectedPhoto.fullImageUrl}
              alt={selectedPhoto.name}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToPhotoPage(selectedPhoto.id);
                }}
                className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-secondary-800 transition-colors hover:bg-white hover:text-primary-500"
              >
                View Details
              </button>
              <button 
                onClick={(e) => downloadPhoto(selectedPhoto, e)}
                className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-secondary-800 transition-colors hover:bg-white hover:text-primary-500"
              >
                Download
              </button>
            </div>
          </div>
          <button 
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/30"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default PhotoGrid;