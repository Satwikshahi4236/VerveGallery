import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Calendar, FileText, Maximize2 } from 'lucide-react';
import { format } from 'date-fns';
import { getFileDetails } from '../services/googleDriveService';
import { Photo } from '../types';

const PhotoPage = () => {
  const { photoId } = useParams<{ photoId: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  useEffect(() => {
    const fetchPhotoDetails = async () => {
      if (!photoId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const photoDetails = await getFileDetails(photoId);
        setPhoto(photoDetails);
      } catch (err) {
        console.error('Error fetching photo details:', err);
        setError('Failed to load photo details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPhotoDetails();
  }, [photoId]);
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };
  
  const downloadPhoto = () => {
    if (!photo) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = photo.downloadUrl || photo.fullImageUrl;
    link.download = photo.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
  
  if (isLoading) {
    return (
      <div className="container-custom flex min-h-screen items-center justify-center py-24">
        <div className="flex flex-col items-center">
          <div className="spinner" />
          <p className="mt-4 text-secondary-600 dark:text-secondary-400">
            Loading photo...
          </p>
        </div>
      </div>
    );
  }
  
  if (error || !photo) {
    return (
      <div className="container-custom py-24">
        <div className="rounded-lg bg-white p-8 text-center shadow-smooth dark:bg-secondary-800">
          <h2 className="mb-4 text-2xl font-semibold">Error</h2>
          <p className="mb-6 text-secondary-600 dark:text-secondary-400">
            {error || 'Photo not found'}
          </p>
          <Link to="/gallery" className="btn btn-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className="container-custom py-24">
        <div className="mb-8">
          <Link
            to="/gallery"
            className="mb-4 inline-flex items-center text-sm font-medium text-secondary-600 hover:text-primary-500 dark:text-secondary-400 dark:hover:text-primary-400"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Link>
          
          <h1 className="mb-2 text-3xl font-semibold">{photo.name}</h1>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-lg bg-white shadow-smooth dark:bg-secondary-800">
              <div className="relative">
                <img
                  src={photo.fullImageUrl}
                  alt={photo.name}
                  className="w-full"
                />
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-4 right-4 rounded-full bg-white/90 p-2 text-secondary-800 transition-colors hover:bg-white hover:text-primary-500"
                  aria-label="View fullscreen"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-smooth dark:bg-secondary-800">
              <h2 className="mb-4 text-xl font-medium">Photo Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 rounded-md bg-secondary-100 p-2 dark:bg-secondary-700">
                    <Calendar className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Date</h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {photo.dateCreated ? format(new Date(photo.dateCreated), 'PPP') : 'Unknown'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 mt-1 rounded-md bg-secondary-100 p-2 dark:bg-secondary-700">
                    <FileText className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">File Information</h3>
                    <div className="mt-1 space-y-1 text-sm text-secondary-600 dark:text-secondary-400">
                      <p>Type: {photo.type}</p>
                      <p>Size: {formatFileSize(photo.size)}</p>
                      <p>Dimensions: {photo.width} × {photo.height} px</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={downloadPhoto}
                  className="btn btn-primary w-full"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Original
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setIsLightboxOpen(false)}
        >
          <img
            src={photo.fullImageUrl}
            alt={photo.name}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button 
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/30"
            onClick={() => setIsLightboxOpen(false)}
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

export default PhotoPage;