import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, LogOut, User, ChevronDown, Menu, X, Settings } from 'lucide-react';
import { useAuth } from '../auth';

export default function Navigation({ location: userLocation, onLocationClick }) {
  const routerLocation = useLocation();
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef(null);

  // Get user initials from email or display name
  const getUserInitials = () => {
    if (!user) return '??';
    const email = user.email || '';
    const name = user.user_metadata?.display_name || user.user_metadata?.full_name;

    if (name) {
      const parts = name.split(' ').filter(Boolean);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }

    return email.substring(0, 2).toUpperCase();
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setShowUserMenu(false);
    await signOut();
  };

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "My Horses", path: "/horses" },
    { label: "Blanket Inventory", path: "/inventory" },
    { label: "About", path: "/about" },
  ];

  return (
    <header className="bg-gradient-to-r from-[#5C4033] to-[#8B4513] px-4 sm:px-6 py-3 sm:py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img src="/BlanketWise-Logo.svg" alt="BlanketWise - Keep them cozy" className="h-12 w-12 sm:h-20 sm:w-20 rounded-full" />
          <div className="flex flex-col">
            <span className="text-lg sm:text-2xl font-bold text-[#FDF8F0] tracking-wide" style={{ fontFamily: "'Recoleta', Georgia, serif" }}>BlanketWise</span>
            <span className="text-xs sm:text-sm text-[#FDF8F0]/70 hidden sm:block" style={{ fontFamily: "'Quicksand', sans-serif" }}>Keep them cozy</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 xl:gap-8">
          {navItems.map((item) => {
            const isActive = routerLocation.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm font-medium relative transition-colors py-2 ${
                  isActive
                    ? 'text-[#FDF8F0] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#D4A84B] after:rounded'
                    : 'text-[#FDF8F0]/80 hover:text-[#FDF8F0]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Location button - hidden on small mobile */}
          <button
            onClick={onLocationClick}
            className="hidden sm:flex text-[#FDF8F0]/80 text-sm items-center gap-1 hover:text-[#FDF8F0] transition-colors min-h-[44px] px-2"
          >
            <MapPin className="w-4 h-4" /> <span className="hidden md:inline">{userLocation}</span>
          </button>

        {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-expanded={showUserMenu}
              aria-haspopup="menu"
              className="flex items-center gap-2 hover:opacity-90 transition-opacity min-h-[44px]"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#D4A84B] rounded-full flex items-center justify-center font-semibold text-[#5C4033] text-sm sm:text-base">
                {getUserInitials()}
              </div>
              <ChevronDown className={`w-4 h-4 text-[#FDF8F0]/80 transition-transform hidden sm:block ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[rgba(139,69,19,0.1)] py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-[rgba(139,69,19,0.1)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D4A84B] rounded-full flex items-center justify-center font-semibold text-[#5C4033]">
                      {getUserInitials()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#5C4033] truncate">
                        {user?.user_metadata?.display_name || 'User'}
                      </p>
                      <p className="text-xs text-[#6B5344] truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    to="/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="w-full px-4 py-3 min-h-[44px] text-left text-sm text-[#5C4033] hover:bg-[#FDF8F0] flex items-center gap-3 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-3 min-h-[44px] text-left text-sm text-[#5C4033] hover:bg-[#FDF8F0] flex items-center gap-3 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden flex items-center justify-center w-10 h-10 min-h-[44px] min-w-[44px] text-[#FDF8F0] hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <nav className="lg:hidden mt-4 pb-2 border-t border-white/20 pt-4">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = routerLocation.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMobileMenu(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm font-medium py-3 px-3 rounded-lg min-h-[44px] flex items-center transition-colors ${
                    isActive
                      ? 'text-[#FDF8F0] bg-white/15'
                      : 'text-[#FDF8F0]/80 hover:text-[#FDF8F0] hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {/* Mobile location button */}
            <button
              onClick={() => {
                setShowMobileMenu(false);
                onLocationClick();
              }}
              className="sm:hidden text-[#FDF8F0]/80 text-sm py-3 px-3 rounded-lg min-h-[44px] flex items-center gap-2 hover:text-[#FDF8F0] hover:bg-white/10 transition-colors"
            >
              <MapPin className="w-4 h-4" /> {userLocation}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
