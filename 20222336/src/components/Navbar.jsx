import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-500 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white">
          PropertyFinder
        </Link>
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        <div
          className={`md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <Link to="/" className="text-white hover:text-blue-600">
            Home
          </Link>
          <Link to="/favorites" className="text-white hover:text-blue-600">
          Favorites
           </Link>

          <Link to="/about" className="text-white hover:text-blue-600">
            
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
