import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Image, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  const toggleNav = () => setIsOpen(!isOpen);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.05)] md:hidden">
      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 bg-white p-4 shadow-lg">
          <div className="grid gap-2">
            {isAuthenticated && (
              <>
                <Link
                  to="/rajyotsava"
                  className={`rounded-md p-2 ${
                    location.pathname.includes('rajyotsava')
                      ? 'bg-blue-50 text-blue-800'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={toggleNav}
                >
                  Rajyotsava
                </Link>
                <Link
                  to="/jss-verve-cup"
                  className={`rounded-md p-2 ${
                    location.pathname.includes('jss-verve-cup')
                      ? 'bg-blue-50 text-blue-800'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={toggleNav}
                >
                  JSS Verve Cup
                </Link>
                <Link
                  to="/jss-run"
                  className={`rounded-md p-2 ${
                    location.pathname.includes('jss-run')
                      ? 'bg-blue-50 text-blue-800'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={toggleNav}
                >
                  JSS Run
                </Link>
                <Link
                  to="/verve"
                  className={`rounded-md p-2 ${
                    location.pathname.includes('/verve') && !location.pathname.includes('jss-verve-cup')
                      ? 'bg-blue-50 text-blue-800'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={toggleNav}
                >
                  Verve
                </Link>
                <Link
                  to="/upload"
                  className="rounded-md bg-blue-50 p-2 text-blue-800"
                  onClick={toggleNav}
                >
                  Upload Media
                </Link>
                <Link
                  to="/search"
                  className="rounded-md bg-gray-50 p-2 text-gray-800"
                  onClick={toggleNav}
                >
                  Face Search
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-3 items-center">
        <Link
          to="/"
          className="flex flex-col items-center justify-center p-3 text-gray-700"
          onClick={() => isOpen && setIsOpen(false)}
        >
          <Home className="h-6 w-6" />
          <span className="mt-1 text-xs">Home</span>
        </Link>
        
        {isAuthenticated && (
          <Link
            to="/upload"
            className="flex flex-col items-center justify-center p-3 text-blue-800"
            onClick={() => isOpen && setIsOpen(false)}
          >
            <Image className="h-6 w-6" />
            <span className="mt-1 text-xs">Gallery</span>
          </Link>
        )}
        
        <button
          className="flex flex-col items-center justify-center p-3 text-gray-700"
          onClick={toggleNav}
        >
          {isOpen ? (
            <>
              <X className="h-6 w-6" />
              <span className="mt-1 text-xs">Close</span>
            </>
          ) : (
            <>
              <Menu className="h-6 w-6" />
              <span className="mt-1 text-xs">Menu</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MobileNav;