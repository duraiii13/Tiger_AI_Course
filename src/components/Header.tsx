import React from 'react';
import { CloudSun, MapPin, SlidersHorizontal, RefreshCw, Star, Thermometer } from 'lucide-react';
import { UnitSettings, CityResult } from '../types/weather';

interface HeaderProps {
  currentCity: CityResult | null;
  units: UnitSettings;
  onUpdateUnits: (units: UnitSettings) => void;
  onUseLocation: () => void;
  onRefresh: () => void;
  isLocating: boolean;
  isLoading: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCity,
  units,
  onUpdateUnits,
  onUseLocation,
  onRefresh,
  isLocating,
  isLoading,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20">
            <CloudSun className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Weather Intelligence
            </h1>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Open-Meteo Precision Analytics
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Favorite Toggle Button */}
          {currentCity && (
            <button
              onClick={onToggleFavorite}
              title={isFavorite ? 'Remove from saved locations' : 'Save location'}
              className={`p-2 rounded-lg border transition-all ${
                isFavorite
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 hover:bg-amber-500/20'
                  : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>
          )}

          {/* Use Location Button */}
          <button
            onClick={onUseLocation}
            disabled={isLocating}
            title="Use current geolocation"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-all disabled:opacity-50"
          >
            <MapPin className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">{isLocating ? 'Locating...' : 'My Location'}</span>
          </button>

          {/* Refresh Data Button */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            title="Refresh forecast data"
            className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
          </button>

          {/* Unit Selector Toggle */}
          <div className="flex items-center bg-slate-800/90 rounded-lg p-0.5 border border-slate-700/80 text-xs font-semibold">
            <button
              onClick={() =>
                onUpdateUnits({
                  ...units,
                  temp: 'celsius',
                  speed: 'kmh',
                  precip: 'mm',
                })
              }
              className={`px-2.5 py-1 rounded-md transition-all ${
                units.temp === 'celsius'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              °C
            </button>
            <button
              onClick={() =>
                onUpdateUnits({
                  ...units,
                  temp: 'fahrenheit',
                  speed: 'mph',
                  precip: 'inch',
                })
              }
              className={`px-2.5 py-1 rounded-md transition-all ${
                units.temp === 'fahrenheit'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
