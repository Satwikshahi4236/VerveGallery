import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Home', path: '/' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Face Search', path: '/face-search' },
    { label: 'Upload', path: '/upload' },
    { label: 'Privacy', path: '/privacy' },
    { label: 'Terms', path: '/terms' }
  ];

  return (
    <footer className="bg-white pt-12 dark:bg-secondary-900">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="mb-4 flex items-center space-x-2">
              <div className="rounded-md bg-primary-500 p-1.5 text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <span className="text-xl font-semibold">VerveGallery</span>
            </Link>
            <p className="mb-4 max-w-md text-secondary-600 dark:text-secondary-400">
              A beautiful photo management application with Google Drive integration,
              facial recognition search, and smart categorization features.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="mb-4 font-medium">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.slice(0, 3).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-secondary-600 transition-colors hover:text-primary-500 dark:text-secondary-400 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="mb-4 font-medium">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.slice(3).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-secondary-600 transition-colors hover:text-primary-500 dark:text-secondary-400 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-200 py-6 dark:border-secondary-800">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-secondary-600 dark:text-secondary-400">
              © {currentYear} VerveGallery. All rights reserved.
            </p>
            <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
              <span>Made with</span>
              <Heart className="mx-1 h-4 w-4 text-error-500" />
              <span>by VerveGallery Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;