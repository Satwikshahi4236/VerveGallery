import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Image, Search, Upload, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, signIn, signOut } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    {
      path: '/',
      label: 'Home',
      icon: <span className="hidden"></span>
    },
    {
      path: '/gallery',
      label: 'Gallery',
      icon: <Image className="h-5 w-5" />
    },
    {
      path: '/face-search',
      label: 'Face Search',
      icon: <Camera className="h-5 w-5" />
    },
    {
      path: '/search',
      label: 'Search',
      icon: <Search className="h-5 w-5" />
    },
    {
      path: '/upload',
      label: 'Upload',
      icon: <Upload className="h-5 w-5" />
    }
  ];

  const headerClass = `fixed z-50 w-full transition-all duration-300 ${
    isScrolled
      ? 'bg-white/90 backdrop-blur-md shadow-sm dark:bg-secondary-900/90'
      : 'bg-transparent'
  }`;

  return (
    <header className={headerClass}>
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="rounded-md bg-primary-500 p-1.5 text-white">
            <Image className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold">VerveGallery</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center space-x-1 py-2 text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary-500'
                      : 'text-secondary-600 hover:text-primary-500 dark:text-secondary-300 dark:hover:text-primary-400'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Menu or Sign In */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={signOut}
                className="hidden text-sm font-medium text-secondary-600 hover:text-primary-500 dark:text-secondary-300 dark:hover:text-primary-400 md:block"
              >
                Sign Out
              </button>
              <Link to="/profile" className="block">
                <img
                  src={user?.photoUrl || 'https://via.placeholder.com/40'}
                  alt={user?.name || 'User profile'}
                  className="h-8 w-8 rounded-full border border-secondary-200 object-cover transition-all hover:border-primary-500 dark:border-secondary-700"
                />
              </Link>
            </div>
          ) : (
            <button
              onClick={signIn}
              className="btn btn-primary btn-sm md:btn-md"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center md:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="absolute left-0 right-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto bg-white pb-6 pt-4 shadow-lg dark:bg-secondary-900 md:hidden">
          <div className="container-custom">
            <ul className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center space-x-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'bg-primary-50 text-primary-500 dark:bg-secondary-800 dark:text-primary-400'
                        : 'text-secondary-600 hover:bg-secondary-50 hover:text-primary-500 dark:text-secondary-300 dark:hover:bg-secondary-800 dark:hover:text-primary-400'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              {isAuthenticated && (
                <li>
                  <button
                    onClick={signOut}
                    className="flex w-full items-center space-x-2 rounded-lg px-4 py-3 text-sm font-medium text-secondary-600 transition-colors hover:bg-secondary-50 hover:text-primary-500 dark:text-secondary-300 dark:hover:bg-secondary-800 dark:hover:text-primary-400"
                  >
                    <span>Sign Out</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;