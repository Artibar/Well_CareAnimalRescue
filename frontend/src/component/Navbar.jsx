import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/Logo.jpeg'
import {User } from 'lucide-react'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className='sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 sm:h-20'>
          
          {/* Logo Section */}
          
          <NavLink to='/' className='flex items-center space-x-2 sm:space-x-3 group'>
            <div className='relative'>
              <img src={Logo} alt="Logo.jpeg"  className='h-15 w-15'/>
            </div>
            <div className='block'>
              <h1 className='text-sm sm:text-base md:text-xl font-bold text-gray-900 tracking-tight'>
                WellCare Animal Rescue
              </h1>
              <p className='hidden sm:block text-xs text-gray-500 font-medium'>Every life matters, every paw counts</p>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center space-x-1'>
            <NavLink 
              to='/' 
              onClick={closeMenu}
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'text-green-900 bg-green-50' 
                    : 'text-gray-800 hover:text-green-800 hover:bg-gray-50'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to='/adopt' 
              onClick={closeMenu}
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'text-green-900 bg-green-50' 
                    : 'text-gray-800 hover:text-green-800 hover:bg-gray-50'
                }`
              }
            >
              Adopt
            </NavLink>
            <NavLink 
              to='/rescue' 
              onClick={closeMenu}
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'text-green-900 bg-green-50' 
                    : 'text-gray-800 hover:text-green-800 hover:bg-gray-50'
                }`
              }
            >
              Rescue
            </NavLink>
            <NavLink 
              to='/volunteer' 
              onClick={closeMenu}
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'text-green-900 bg-green-50' 
                    : 'text-gray-800 hover:text-green-800 hover:bg-gray-50'
                }`
              }
            >
              Volunteer
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={closeMenu}
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'text-green-900 bg-green-50' 
                    : 'text-gray-800 hover:text-green-800 hover:bg-gray-50'
                }`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              onClick={closeMenu}
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'text-green-900 bg-green-50' 
                    : 'text-gray-800 hover:text-green-800 hover:bg-gray-50'
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink 
              to='/donate' 
              onClick={closeMenu}
              className='ml-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-sm hover:shadow-md hover:from-orange-600 hover:to-pink-600 flex items-center space-x-1'
            >
              <span>❤️</span>
              <span>Donate</span>
            </NavLink>
            <NavLink 
              to='/login' 
              onClick={closeMenu}
              className='ml-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200  text-black shadow-sm  flex items-center space-x-1'
            >
              
              <span>
                <User className='w-4 h-4'/>
              </span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className='lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg className='w-6 h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className='lg:hidden py-4 border-t border-gray-100'>
            <div className='space-y-1'>
              <NavLink 
                to='/' 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `block px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'text-green-900 bg-green-50' 
                      : 'text-gray-800 hover:text-green-800 hover:bg-gray-50'
                  }`
                }
              >
                🏠 Home
              </NavLink>
              <NavLink 
                to='/adopt' 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `block px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'text-green-900 bg-green-50' 
                      : 'text-gray-800 hover:text-green-800 hover:bg-gray-50'
                  }`
                }
              >
                🐕 Adopt
              </NavLink>
              <NavLink 
                to='/rescue' 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `block px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'text-green-900 bg-green-50' 
                      : 'text-gray-800 hover:text-green-800 hover:bg-gray-50'
                  }`
                }
              >
                🚑 Rescue
              </NavLink>
              <NavLink 
                to='/volunteer' 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `block px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'text-green-900 bg-green-50' 
                      : 'text-gray-800 hover:text-green-800 hover:bg-gray-50'
                  }`
                }
              >
                🤝 Volunteer
              </NavLink>
              <NavLink 
                to="/about" 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `block px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'text-green-900 bg-green-50' 
                      : 'text-gray-800 hover:text-green-800 hover:bg-gray-50'
                  }`
                }
              >
                ℹ️ About
              </NavLink>
              <NavLink 
                to="/contact" 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `block px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'text-green-900 bg-green-50' 
                      : 'text-gray-800 hover:text-green-800 hover:bg-gray-50'
                  }`
                }
              >
                📞 Contact
              </NavLink>
              <NavLink 
                to='/donate' 
                onClick={closeMenu}
                className='block mt-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-center shadow-sm hover:shadow-md'
              >
                ❤️ Donate Now
              </NavLink>
              <NavLink 
                to='/login' 
                onClick={closeMenu}
                className='block mt-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-center shadow-sm hover:shadow-md'
              >
                <User className='w-4 h-4'/>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;