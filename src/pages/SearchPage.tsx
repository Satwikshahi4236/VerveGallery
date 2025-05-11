import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { usePhotoStore } from '../store/photoStore';
import PhotoGrid from '../components/gallery/PhotoGrid';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { photos, fetchAllPhotos } = usePhotoStore();
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      // In a real implementation, this would send the search query to the backend
      // For now, we'll just fetch all photos and filter them client-side
      await fetchAllPhotos();
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  // Client-side filtering based on search query
  const filteredPhotos = searchQuery.trim()
    ? photos.filter(photo => 
        photo.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  return (
    <div className="container-custom py-24">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-semibold">Search Photos</h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Find photos by name, date, or content
        </p>
      </div>
      
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex w-full max-w-3xl flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-5 w-5 text-secondary-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search photos by name, date, or people"
              className="input pl-10"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching || !searchQuery.trim()}
            className="btn btn-primary sm:w-auto"
          >
            {isSearching ? (
              <>
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Searching...
              </>
            ) : (
              <>
                <SearchIcon className="mr-2 h-5 w-5" />
                Search
              </>
            )}
          </button>
        </form>
      </div>
      
      {searchQuery && (
        <div className="mb-6">
          <h2 className="mb-4 text-xl font-medium">
            Search Results {filteredPhotos.length > 0 && `(${filteredPhotos.length})`}
          </h2>
          
          {searchQuery && filteredPhotos.length === 0 && !isSearching && (
            <div className="rounded-lg bg-white p-8 text-center shadow-smooth dark:bg-secondary-800">
              <h3 className="mb-3 text-xl font-medium">No results found</h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                Try searching with different keywords or check your spelling.
              </p>
            </div>
          )}
          
          <PhotoGrid photos={filteredPhotos} loading={isSearching} />
        </div>
      )}
      
      {!searchQuery && (
        <div className="rounded-lg bg-white p-8 text-center shadow-smooth dark:bg-secondary-800">
          <h3 className="mb-3 text-xl font-medium">Enter a search term</h3>
          <p className="text-secondary-600 dark:text-secondary-400">
            Type in the search box to find photos by name, date, or content.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;