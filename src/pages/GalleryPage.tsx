import { useEffect, useState } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { usePhotoStore } from '../store/photoStore';
import PhotoGrid from '../components/gallery/PhotoGrid';
import CategoryCard from '../components/gallery/CategoryCard';

const GalleryPage = () => {
  const { photos, categories, fetchAllPhotos, fetchCategories, isLoading } = usePhotoStore();
  const [view, setView] = useState<'photos' | 'categories'>('photos');
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    fetchAllPhotos();
    fetchCategories();
  }, [fetchAllPhotos, fetchCategories]);
  
  return (
    <div className="container-custom py-24">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-semibold">Photo Gallery</h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Browse your entire photo collection or explore by category
        </p>
      </div>
      
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            className={`btn ${
              view === 'photos' ? 'btn-primary' : 'btn-outline'
            }`}
            onClick={() => setView('photos')}
          >
            <Grid className="mr-2 h-4 w-4" />
            Photos
          </button>
          <button
            className={`btn ${
              view === 'categories' ? 'btn-primary' : 'btn-outline'
            }`}
            onClick={() => setView('categories')}
          >
            <List className="mr-2 h-4 w-4" />
            Categories
          </button>
        </div>
        
        <button
          className="btn btn-outline"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </button>
      </div>
      
      {showFilters && (
        <div className="mb-6 rounded-lg bg-white p-4 shadow-smooth dark:bg-secondary-800">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Sort By
              </label>
              <select className="input">
                <option value="date-desc">Date (Newest First)</option>
                <option value="date-asc">Date (Oldest First)</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
              </select>
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>
              <select className="input">
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-medium">
                Date Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  className="input"
                  placeholder="From"
                />
                <span>to</span>
                <input
                  type="date"
                  className="input"
                  placeholder="To"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {view === 'photos' ? (
        <PhotoGrid photos={photos} loading={isLoading} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <div 
                key={index}
                className="h-64 animate-pulse rounded-lg bg-white dark:bg-secondary-800"
              />
            ))
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-secondary-600 dark:text-secondary-400">
                No categories found.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;