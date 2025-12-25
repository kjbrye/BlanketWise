import { Link, useLocation } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function Navigation({ location: userLocation, onLocationClick }) {
  const routerLocation = useLocation();

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
        <div className="w-10 h-10 bg-[#D4A84B] rounded-full flex items-center justify-center font-semibold text-[#5C4033]">
          KB
        </div>
      </div>
    </header>
  );
}
