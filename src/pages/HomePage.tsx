import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Upload, Search, Layers } from 'lucide-react';
import { usePhotoStore } from '../store/photoStore';
import CategoryCard from '../components/gallery/CategoryCard';
import PhotoGrid from '../components/gallery/PhotoGrid';

const HomePage = () => {
  const { recentPhotos, categories, fetchRecentPhotos, fetchCategories, isLoading } = usePhotoStore();
  
  useEffect(() => {
    fetchRecentPhotos(8);
    fetchCategories();
  }, [fetchRecentPhotos, fetchCategories]);
  
  const features = [
    {
      icon: <Layers className="h-6 w-6" />,
      title: 'Organized Categories',
      description: 'Keep your photos neatly organized in predefined categories like Rajyotsava, Verve Cup, JSS Run, and more.'
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: 'Facial Recognition',
      description: 'Find photos of specific people using our advanced facial recognition technology.'
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: 'Smart Search',
      description: 'Easily find any photo with our powerful search capabilities.'
    },
    {
      icon: <Upload className="h-6 w-6" />,
      title: 'Google Drive Integration',
      description: 'All your photos are securely stored in Google Drive for easy access anywhere.'
    }
  ];
  
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-400 py-24 text-white">
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-semibold leading-tight md:text-5xl">
              Organize, Find, and Share Your Memories
            </h1>
            <p className="mb-8 text-lg text-white/90">
              VerveGallery helps you manage your photo collections with smart organization, 
              facial recognition, and seamless Google Drive integration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/gallery" className="btn btn-lg bg-white text-primary-600 hover:bg-white/90">
                View Gallery
              </Link>
              <Link to="/upload" className="btn btn-lg bg-white/20 text-white hover:bg-white/30">
                Upload Photos
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-5 -top-5 h-64 w-64 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-10 -left-10 h-80 w-80 rounded-full bg-white/5"></div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold">Powerful Features</h2>
            <p className="mx-auto max-w-2xl text-secondary-600 dark:text-secondary-400">
              VerveGallery brings together all the tools you need to manage your photo collection effortlessly.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="rounded-lg bg-white p-6 shadow-smooth transition-transform hover:translate-y-[-5px] dark:bg-secondary-800"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary-50 p-3 text-primary-500 dark:bg-primary-900/20">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-lg font-medium">{feature.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-secondary-50 dark:bg-secondary-900/50">
        <div className="container-custom">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Categories</h2>
            <Link 
              to="/gallery"
              className="text-sm font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
            >
              View All
            </Link>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                  No categories found. Start by uploading photos to create your collection.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Recent Photos Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recent Photos</h2>
            <Link 
              to="/gallery"
              className="text-sm font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
            >
              View All
            </Link>
          </div>
          
          <PhotoGrid photos={recentPhotos} loading={isLoading} />
          
          {recentPhotos.length === 0 && !isLoading && (
            <div className="rounded-lg bg-white p-8 text-center shadow-smooth dark:bg-secondary-800">
              <h3 className="mb-3 text-xl font-medium">No photos yet</h3>
              <p className="mb-6 text-secondary-600 dark:text-secondary-400">
                Start building your collection by uploading your first photos.
              </p>
              <Link to="/upload" className="btn btn-primary">
                <Upload className="mr-2 h-4 w-4" />
                Upload Photos
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;