import { useState } from 'react';
import { usePhotoStore } from '../store/photoStore';
import FaceDetection from '../components/search/FaceDetection';
import PhotoGrid from '../components/gallery/PhotoGrid';

const FaceSearchPage = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const { photos, isLoading, searchPhotosByFace } = usePhotoStore();
  
  const handleFaceDetected = async (faceImageData: string) => {
    await searchPhotosByFace(faceImageData);
    setHasSearched(true);
  };
  
  return (
    <div className="container-custom py-24">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-semibold">Face Search</h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Find photos containing specific people using facial recognition
        </p>
      </div>
      
      <FaceDetection onFaceDetected={handleFaceDetected} />
      
      {hasSearched && (
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-medium">
            Search Results {photos.length > 0 && `(${photos.length})`}
          </h2>
          
          <PhotoGrid photos={photos} loading={isLoading} />
          
          {photos.length === 0 && !isLoading && (
            <div className="rounded-lg bg-white p-8 text-center shadow-smooth dark:bg-secondary-800">
              <h3 className="mb-3 text-xl font-medium">No matching photos found</h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                We couldn't find any photos matching this face. Try with a different photo or adjust the lighting and positioning.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FaceSearchPage;