import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { usePhotoStore } from '../store/photoStore';
import PhotoGrid from '../components/gallery/PhotoGrid';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { photos, selectedCategory, fetchPhotosByCategory, isLoading } = usePhotoStore();
  
  useEffect(() => {
    if (categoryId) {
      fetchPhotosByCategory(categoryId);
    }
  }, [categoryId, fetchPhotosByCategory]);
  
  return (
    <div className="container-custom py-24">
      <div className="mb-8">
        <Link
          to="/gallery"
          className="mb-4 inline-flex items-center text-sm font-medium text-secondary-600 hover:text-primary-500 dark:text-secondary-400 dark:hover:text-primary-400"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gallery
        </Link>
        
        <h1 className="mb-2 text-3xl font-semibold">
          {isLoading ? 'Loading...' : selectedCategory?.name || 'Category'}
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          {photos.length} {photos.length === 1 ? 'photo' : 'photos'} in this category
        </p>
      </div>
      
      <PhotoGrid photos={photos} loading={isLoading} />
      
      {photos.length === 0 && !isLoading && (
        <div className="rounded-lg bg-white p-8 text-center shadow-smooth dark:bg-secondary-800">
          <h3 className="mb-3 text-xl font-medium">No photos in this category</h3>
          <p className="mb-6 text-secondary-600 dark:text-secondary-400">
            Start by uploading photos to this category.
          </p>
          <Link to="/upload" className="btn btn-primary">
            <Upload className="mr-2 h-4 w-4" />
            Upload Photos
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;