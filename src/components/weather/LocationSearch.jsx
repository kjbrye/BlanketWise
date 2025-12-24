import { useState, useEffect, useRef } from 'react';
import { MapPin, Search, X, Loader2 } from 'lucide-react';
import { searchLocation } from '../../utils/weather';

export default function LocationSearch({ currentLocation, onLocationSelect, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Debounce search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsSearching(true);
      setError(null);
      try {
        const locations = await searchLocation(query);
        setResults(locations);
      } catch (err) {
        setError('Failed to search locations');
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  const handleSelect = (location) => {
    onLocationSelect({
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.displayName
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-[rgba(139,69,19,0.1)]">
          <Search className="w-5 h-5 text-[#6B5344]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="flex-1 text-[#2C1810] placeholder-[#6B5344]/50 outline-none"
          />
          {isSearching ? (
            <Loader2 className="w-5 h-5 text-[#6B5344] animate-spin" />
          ) : query && (
            <button onClick={() => setQuery('')} className="text-[#6B5344] hover:text-[#2C1810]">
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-sm text-[#8B4513] hover:text-[#5C4033] font-medium"
          >
            Cancel
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {error && (
            <div className="p-4 text-center text-red-600 text-sm">{error}</div>
          )}

          {!query && (
            <div className="p-4 text-center text-[#6B5344] text-sm">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Type a city name to search</p>
              <p className="text-xs mt-1 opacity-75">Current: {currentLocation}</p>
            </div>
          )}

          {query && !isSearching && results.length === 0 && !error && (
            <div className="p-4 text-center text-[#6B5344] text-sm">
              No locations found for "{query}"
            </div>
          )}

          {results.map((location) => (
            <button
              key={location.id}
              onClick={() => handleSelect(location)}
              className="w-full flex items-center gap-3 p-4 hover:bg-[#FDF8F0] transition-colors text-left border-b border-[rgba(139,69,19,0.05)] last:border-b-0"
            >
              <MapPin className="w-5 h-5 text-[#8B4513] flex-shrink-0" />
              <div>
                <div className="font-medium text-[#2C1810]">{location.name}</div>
                <div className="text-sm text-[#6B5344]">
                  {[location.region, location.country].filter(Boolean).join(', ')}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
