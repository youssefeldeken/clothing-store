import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
      setCartCount(count);
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-serif text-2xl text-black">
              ÉLÉGANCE
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/men" className="nav-link text-gray-700 hover:text-black">Men</Link>
            <Link to="/women" className="nav-link text-gray-700 hover:text-black">Women</Link>
            <Link to="/accessories" className="nav-link text-gray-700 hover:text-black">Accessories</Link>
            <Link to="/new-arrivals" className="nav-link text-gray-700 hover:text-black">New Arrivals</Link>
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/search" className="text-gray-700 hover:text-black">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            {user && user.role === 'admin' && (
              <Link to="/admin" className="text-gray-700 hover:text-black" title="Admin Dashboard">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-14C6.48 4 2 8.48 2 14c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10z" />
                </svg>
              </Link>
            )}
            {user ? (
              <div className="relative group">
                <button className="text-gray-700 hover:text-black flex items-center space-x-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm">{user.firstName}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-black">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}
            <Link to="/cart" className="text-gray-700 hover:text-black relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="cart-count bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{cartCount}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/men" className="block px-3 py-2 text-gray-700 hover:text-black">Men</Link>
          <Link to="/women" className="block px-3 py-2 text-gray-700 hover:text-black">Women</Link>
          <Link to="/accessories" className="block px-3 py-2 text-gray-700 hover:text-black">Accessories</Link>
          <Link to="/new-arrivals" className="block px-3 py-2 text-gray-700 hover:text-black">New Arrivals</Link>
          {user && user.role === 'admin' && (
            <Link to="/admin" className="block px-3 py-2 text-gray-700 hover:text-black">Admin</Link>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5 space-x-6">
            <Link to="/search" className="text-gray-700 hover:text-black">Search</Link>
            {user ? (
              <>
                <Link to="/account" className="text-gray-700 hover:text-black">My Account</Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-black"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-black">Sign in</Link>
            )}
            <Link to="/cart" className="text-gray-700 hover:text-black">Cart ({cartCount})</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 