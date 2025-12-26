import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../auth';

export default function Navigation({ location: userLocation, onLocationClick }) {
  const routerLocation = useLocation();
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
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
    { label: "Settings", path: "/settings" },
  ];

  return (
    <header className="bg-gradient-to-r from-[#5C4033] to-[#8B4513] px-6 py-4 flex items-center justify-between shadow-lg">
      <Link to="/" className="flex items-center gap-3">
        <img src="/BlanketWise-Logo.svg" alt="BlanketWise - Keep them cozy" className="h-20 w-20 rounded-full" />
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-[#FDF8F0] tracking-wide" style={{ fontFamily: "'Recoleta', Georgia, serif" }}>BlanketWise</span>
          <span className="text-sm text-[#FDF8F0]/70" style={{ fontFamily: "'Quicksand', sans-serif" }}>Keep them cozy</span>
        </div>
      </Link>

      <nav className="flex gap-8">
        {navItems.map((item) => {
          const isActive = routerLocation.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium relative transition-colors ${
                isActive
                  ? 'text-[#FDF8F0] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-[#D4A84B] after:rounded'
                  : 'text-[#FDF8F0]/80 hover:text-[#FDF8F0]'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-4">
        <button
          onClick={onLocationClick}
          className="text-[#FDF8F0]/80 text-sm flex items-center gap-1 hover:text-[#FDF8F0] transition-colors"
        >
          <MapPin className="w-4 h-4" /> {userLocation}
        </button>

        {/* User Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 bg-[#D4A84B] rounded-full flex items-center justify-center font-semibold text-[#5C4033]">
              {getUserInitials()}
            </div>
            <ChevronDown className={`w-4 h-4 text-[#FDF8F0]/80 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
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
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left text-sm text-[#5C4033] hover:bg-[#FDF8F0] flex items-center gap-3 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
