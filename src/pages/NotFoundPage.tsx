import { Link } from 'react-router-dom';
import { Home, Image } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="container-custom flex min-h-screen flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 rounded-full bg-primary-100 p-6 text-primary-500 dark:bg-primary-900/20">
        <Image className="h-16 w-16" />
      </div>
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-8 max-w-md text-secondary-600 dark:text-secondary-400">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/" className="btn btn-primary">
          <Home className="mr-2 h-4 w-4" />
          Go Home
        </Link>
        <Link to="/gallery" className="btn btn-outline">
          <Image className="mr-2 h-4 w-4" />
          View Gallery
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;