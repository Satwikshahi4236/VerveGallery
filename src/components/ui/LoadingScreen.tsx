// filepath: c:\Users\shahi\OneDrive\Desktop\project\src\components\ui\LoadingScreen.tsx
import { Camera } from 'lucide-react'; // Replace 'Image' with a valid export

const LoadingScreen = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-secondary-900">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 rounded-md bg-primary-500 p-3 text-white">
          <Camera className="h-8 w-8" /> {/* Updated icon */}
        </div>
        <h1 className="mb-2 text-2xl font-semibold">VerveGallery</h1>
        <p className="mb-6 text-secondary-600 dark:text-secondary-400">
          Loading your photo experience...
        </p>
        <div className="spinner" />
      </div>
    </div>
  );
};

export default LoadingScreen;