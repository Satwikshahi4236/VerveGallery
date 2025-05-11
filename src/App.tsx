import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { loadGapiClient } from './services/googleDriveService';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/ui/LoadingScreen';
import { useAuthStore } from './store/authStore';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const PhotoPage = lazy(() => import('./pages/PhotoPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const UploadPage = lazy(() => import('./pages/UploadPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const FaceSearchPage = lazy(() => import('./pages/FaceSearchPage'));

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { initAuth } = useAuthStore();

  // Initialize Google API
  useEffect(() => {
    const initGoogleApi = async () => {
      try {
        await loadGapiClient();
        await initAuth();
      } catch (error) {
        console.error('Failed to initialize Google API:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initGoogleApi();
  }, [initAuth]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/photo/:photoId" element={<PhotoPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/face-search" element={<FaceSearchPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;