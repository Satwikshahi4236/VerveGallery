import { useEffect } from 'react';
import { UploadCloud } from 'lucide-react';
import { usePhotoStore } from '../store/photoStore';
import UploadForm from '../components/upload/UploadForm';

const UploadPage = () => {
  const { categories, fetchCategories } = usePhotoStore();
  
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  
  return (
    <div className="container-custom py-24">
      <div className="mb-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-primary-100 p-4 text-primary-500 dark:bg-primary-900/20">
            <UploadCloud className="h-8 w-8" />
          </div>
        </div>
        <h1 className="mb-2 text-3xl font-semibold">Upload Photos</h1>
        <p className="mx-auto max-w-xl text-secondary-600 dark:text-secondary-400">
          Add new photos to your collection. Choose a category to organize your uploads or create new ones.
        </p>
      </div>
      
      <UploadForm categories={categories} />
    </div>
  );
};

export default UploadPage;