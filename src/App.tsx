import React, { useState, useEffect, useCallback } from 'react';
import { CityResult, WeatherData, UnitSettings, PlanningRecommendations } from './types/weather';
import {
  fetchWeatherData,
  getCityFromCoords,
  generateRecommendations,
} from './services/weatherApi';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FavoritesList } from './components/FavoritesList';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { HourlyForecastChart } from './components/HourlyForecastChart';
import { DailyForecastCards } from './components/DailyForecastCards';
import { WeatherMetricsGrid } from './components/WeatherMetricsGrid';
import { PlanningInsights } from './components/PlanningInsights';
import { ErrorMessage } from './components/ErrorMessage';
import {
  Loader2,
  CloudSun,
  Sparkles,
  LayoutDashboard,
  Shirt,
  Calendar,
  Globe,
  Compass,
} from 'lucide-react';

// Default initial city: London
const DEFAULT_CITY: CityResult = {
  id: 2643743,
  name: 'London',
  latitude: 51.5074,
  longitude: -0.1278,
  country: 'United Kingdom',
  country_code: 'GB',
  admin1: 'England',
  timezone: 'Europe/London',
};

// Popular default suggestions for empty states
const POPULAR_CITIES: CityResult[] = [
  { id: 2643743, name: 'London', latitude: 51.5074, longitude: -0.1278, country: 'United Kingdom', country_code: 'GB' },
  { id: 5128581, name: 'New York', latitude: 40.7143, longitude: -74.006, country: 'United States', country_code: 'US' },
  { id: 1850147, name: 'Tokyo', latitude: 35.6895, longitude: 139.6917, country: 'Japan', country_code: 'JP' },
  { id: 2988507, name: 'Paris', latitude: 48.8534, longitude: 2.3488, country: 'France', country_code: 'FR' },
  { id: 2147714, name: 'Sydney', latitude: -33.8678, longitude: 151.2073, country: 'Australia', country_code: 'AU' },
];

export default function App() {
  const [city, setCity] = useState<CityResult>(() => {
    const saved = localStorage.getItem('wi_last_city');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_CITY;
      }
    }
    return DEFAULT_CITY;
  });

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [recommendations, setRecommendations] = useState<PlanningRecommendations | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [units, setUnits] = useState<UnitSettings>(() => {
    const saved = localStorage.getItem('wi_units');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return { temp: 'celsius', speed: 'kmh', precip: 'mm' };
      }
    }
    return { temp: 'celsius', speed: 'kmh', precip: 'mm' };
  });

  const [favorites, setFavorites] = useState<CityResult[]>(() => {
    const saved = localStorage.getItem('wi_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return POPULAR_CITIES.slice(0, 3);
      }
    }
    return POPULAR_CITIES.slice(0, 3);
  });

  const [activeView, setActiveView] = useState<'all' | 'forecast' | 'planning'>('all');

  // Load weather for current city
  const loadWeather = useCallback(
    async (targetCity: CityResult, currentUnits: UnitSettings) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData(
          targetCity,
          currentUnits.temp,
          currentUnits.speed,
          currentUnits.precip
        );
        setWeather(data);
        const recs = generateRecommendations(
          data.current,
          data.daily,
          data.hourly,
          currentUnits.temp
        );
        setRecommendations(recs);
        localStorage.setItem('wi_last_city', JSON.stringify(targetCity));
      } catch (err: any) {
        console.error('Failed to load weather:', err);
        setError('City not found or network error');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Initial Load & unit change trigger
  useEffect(() => {
    loadWeather(city, units);
  }, [city, units, loadWeather]);

  // Save units to local storage
  const handleUpdateUnits = (newUnits: UnitSettings) => {
    setUnits(newUnits);
    localStorage.setItem('wi_units', JSON.stringify(newUnits));
  };

  // Select City
  const handleSelectCity = (newCity: CityResult) => {
    setCity(newCity);
  };

  // Favorites Management
  const isFavorite = favorites.some((f) => f.id === city.id);

  const handleToggleFavorite = () => {
    let updated: CityResult[];
    if (isFavorite) {
      updated = favorites.filter((f) => f.id !== city.id);
    } else {
      updated = [city, ...favorites];
    }
    setFavorites(updated);
    localStorage.setItem('wi_favorites', JSON.stringify(updated));
  };

  const handleRemoveFavorite = (cityId: number) => {
    const updated = favorites.filter((f) => f.id !== cityId);
    setFavorites(updated);
    localStorage.setItem('wi_favorites', JSON.stringify(updated));
  };

  // Geolocation trigger
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const locCity = await getCityFromCoords(lat, lon);
          setCity(locCity);
        } catch (err) {
          setError('City not found or network error');
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        console.warn('Geolocation denied or failed:', err);
        setIsLocating(false);
        alert('Could not retrieve your location. Please enable location permissions or search for a city manually.');
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white pb-16">
      {/* Top Fixed Header */}
      <Header
        currentCity={city}
        units={units}
        onUpdateUnits={handleUpdateUnits}
        onUseLocation={handleUseLocation}
        onRefresh={() => loadWeather(city, units)}
        isLocating={isLocating}
        isLoading={isLoading}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* City Search Bar & Favorite Quick Chips */}
        <section className="space-y-3">
          <SearchBar onSelectCity={handleSelectCity} isLoading={isLoading} />
          <FavoritesList
            favorites={favorites}
            onSelectCity={handleSelectCity}
            onRemoveFavorite={handleRemoveFavorite}
            currentCityId={city.id}
          />
        </section>

        {/* Error Handling State */}
        {error ? (
          <ErrorMessage
            message={error}
            onRetry={() => loadWeather(city, units)}
            onUseDefault={() => handleSelectCity(DEFAULT_CITY)}
            onUseLocation={handleUseLocation}
          />
        ) : isLoading && !weather ? (
          /* Loading Skeleton State */
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="text-sm font-semibold text-slate-400">
              Fetching Open-Meteo weather intelligence for {city.name}...
            </p>
          </div>
        ) : weather && recommendations ? (
          /* Weather Dashboard Content */
          <div className="space-y-6 animate-fade-in">
            {/* Navigation Section Tabs (Overview vs 7-Day Forecast vs Planning Insights) */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800 text-xs sm:text-sm font-bold">
                <button
                  onClick={() => setActiveView('all')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    activeView === 'all'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Full Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveView('forecast')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    activeView === 'forecast'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>7-Day Forecast</span>
                </button>
                <button
                  onClick={() => setActiveView('planning')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    activeView === 'planning'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Shirt className="w-4 h-4" />
                  <span>Planning Insights</span>
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Timezone: {weather.timezone}</span>
              </div>
            </div>

            {/* Views Layout */}
            {activeView === 'all' && (
              <div className="space-y-6">
                {/* Hero Current Weather Card */}
                <CurrentWeatherCard weather={weather} units={units} />

                {/* Planning Recommendations & Umbrella Banner */}
                <PlanningInsights recommendations={recommendations} units={units} />

                {/* 24-Hour Forecast Interactive Chart */}
                <HourlyForecastChart hourly={weather.hourly} units={units} />

                {/* Detailed Key Metrics Grid */}
                <WeatherMetricsGrid
                  current={weather.current}
                  today={weather.daily[0]}
                  units={units}
                  timezone={weather.timezone}
                />

                {/* 7-Day Outlook */}
                <DailyForecastCards daily={weather.daily} units={units} />
              </div>
            )}

            {activeView === 'forecast' && (
              <div className="space-y-6">
                <CurrentWeatherCard weather={weather} units={units} />
                <HourlyForecastChart hourly={weather.hourly} units={units} />
                <DailyForecastCards daily={weather.daily} units={units} />
              </div>
            )}

            {activeView === 'planning' && (
              <div className="space-y-6">
                <CurrentWeatherCard weather={weather} units={units} />
                <PlanningInsights recommendations={recommendations} units={units} />
                <WeatherMetricsGrid
                  current={weather.current}
                  today={weather.daily[0]}
                  units={units}
                  timezone={weather.timezone}
                />
              </div>
            )}
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-slate-500 max-w-7xl mx-auto px-4">
        <p>
          Powered by{' '}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline font-semibold"
          >
            Open-Meteo Public APIs
          </a>{' '}
          • No secret API keys required.
        </p>
      </footer>
    </div>
  );
}
