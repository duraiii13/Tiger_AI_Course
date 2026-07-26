import React from 'react';
import { CityResult } from '../types/weather';
import { Star, MapPin, X, Compass } from 'lucide-react';

interface FavoritesListProps {
  favorites: CityResult[];
  onSelectCity: (city: CityResult) => void;
  onRemoveFavorite: (cityId: number) => void;
  currentCityId?: number;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onSelectCity,
  onRemoveFavorite,
  currentCityId,
}) => {
  if (favorites.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto my-3">
      <div className="flex items-center gap-2 mb-2 px-1 text-xs font-semibold text-slate-400">
        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span>Saved Favorite Locations ({favorites.length})</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700">
        {favorites.map((city) => {
          const isSelected = city.id === currentCityId;

          return (
            <div
              key={city.id}
              className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all group ${
                isSelected
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <button
                onClick={() => onSelectCity(city)}
                className="flex items-center gap-1.5 focus:outline-none"
              >
                <MapPin className="w-3.5 h-3.5 opacity-80" />
                <span>{city.name}</span>
                {city.country_code && (
                  <span className="text-[10px] opacity-70 uppercase">({city.country_code})</span>
                )}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite(city.id);
                }}
                className="p-0.5 rounded-full hover:bg-black/20 text-slate-400 hover:text-white transition-colors"
                title="Remove favorite"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
