import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2, Globe } from 'lucide-react';
import { CityResult } from '../types/weather';
import { searchCities } from '../services/weatherApi';

interface SearchBarProps {
  onSelectCity: (city: CityResult) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSelectCity, isLoading }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CityResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      setErrorMsg(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      setErrorMsg(null);
      try {
        const cities = await searchCities(query);
        setResults(cities);
        setIsOpen(true);
        if (cities.length === 0) {
          setErrorMsg('No matching cities found');
        }
      } catch (err: any) {
        setErrorMsg('City not found or network error');
        setResults([]);
        setIsOpen(true);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: CityResult) => {
    onSelectCity(city);
    setQuery(`${city.name}${city.country ? `, ${city.country}` : ''}`);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      handleSelect(results[0]);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 pointer-events-none text-slate-400">
            {isSearching ? (
              <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
            ) : (
              <Search className="w-5 h-5 text-slate-400" />
            )}
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
            placeholder="Search city name (e.g. London, Tokyo, New York, Paris)..."
            className="w-full pl-11 pr-10 py-3.5 bg-slate-800/90 hover:bg-slate-800 focus:bg-slate-900 border border-slate-700/80 focus:border-blue-500 rounded-2xl text-white placeholder-slate-400 text-sm sm:text-base outline-none transition-all shadow-xl backdrop-blur-md focus:ring-4 focus:ring-blue-500/20"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 p-1.5 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded-full transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl max-h-80 overflow-y-auto divide-y divide-slate-800/60">
          {errorMsg ? (
            <div className="p-4 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>{errorMsg}</span>
            </div>
          ) : (
            results.map((city) => (
              <button
                key={`${city.id}-${city.latitude}-${city.longitude}`}
                onClick={() => handleSelect(city)}
                className="w-full text-left px-4 py-3 hover:bg-blue-600/10 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-800 group-hover:bg-blue-600/20 text-slate-400 group-hover:text-blue-400 transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-100 group-hover:text-blue-300">
                      {city.name}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5">
                      {city.admin1 && <span>{city.admin1} •</span>}
                      <span>{city.country || 'Global'}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-400 font-mono">
                  {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
