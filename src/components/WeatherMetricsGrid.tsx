import React from 'react';
import { CurrentWeather, DailyItem, UnitSettings } from '../types/weather';
import {
  Thermometer,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Compass,
  Sparkles,
  Cloud,
} from 'lucide-react';

interface WeatherMetricsGridProps {
  current: CurrentWeather;
  today: DailyItem;
  units: UnitSettings;
  timezone: string;
}

export const WeatherMetricsGrid: React.FC<WeatherMetricsGridProps> = ({
  current,
  today,
  units,
  timezone,
}) => {
  const tempSymbol = units.temp === 'fahrenheit' ? '°F' : '°C';
  const speedSymbol = units.speed === 'mph' ? 'mph' : 'km/h';

  // Format Sunrise / Sunset
  let sunriseStr = 'N/A';
  let sunsetStr = 'N/A';
  if (today?.sunrise) {
    try {
      sunriseStr = new Date(today.sunrise).toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch {
      sunriseStr = new Date(today.sunrise).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
    }
  }
  if (today?.sunset) {
    try {
      sunsetStr = new Date(today.sunset).toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch {
      sunsetStr = new Date(today.sunset).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
    }
  }

  // UV Index Level
  const uvMax = today?.uvIndexMax || 0;
  let uvLevel = 'Low';
  let uvColor = 'text-green-400 bg-green-500/10 border-green-500/30';
  if (uvMax >= 11) {
    uvLevel = 'Extreme';
    uvColor = 'text-purple-400 bg-purple-500/10 border-purple-500/30';
  } else if (uvMax >= 8) {
    uvLevel = 'Very High';
    uvColor = 'text-red-400 bg-red-500/10 border-red-500/30';
  } else if (uvMax >= 6) {
    uvLevel = 'High';
    uvColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  } else if (uvMax >= 3) {
    uvLevel = 'Moderate';
    uvColor = 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
  }

  // Wind direction text
  const getWindDirectionText = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* 1. Feels Like Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Thermometer className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-300">Feels Like</span>
          </div>
          <span className="text-2xl font-black text-white">
            {Math.round(current.apparentTemperature)}
            {tempSymbol}
          </span>
        </div>
        <div className="mt-4 text-xs text-slate-400">
          {Math.abs(current.apparentTemperature - current.temperature) < 1.5 ? (
            <p>Humidity and wind speed make it feel close to actual temperature.</p>
          ) : current.apparentTemperature < current.temperature ? (
            <p>Wind chill effect makes it feel colder than actual reading.</p>
          ) : (
            <p>Humidity makes it feel warmer than actual reading.</p>
          )}
        </div>
      </div>

      {/* 2. Wind & Gusts Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Wind className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-300">Wind Status</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-white">
              {current.windSpeed.toFixed(1)}
            </span>
            <span className="text-xs font-semibold text-slate-400 ml-1">{speedSymbol}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Compass
              className="w-4 h-4 text-blue-400 transition-transform"
              style={{ transform: `rotate(${current.windDirection}deg)` }}
            />
            <span>Direction: {getWindDirectionText(current.windDirection)} ({current.windDirection}°)</span>
          </div>
          <div className="text-slate-400">
            Gusts: <span className="font-bold text-slate-200">{current.windGusts.toFixed(1)} {speedSymbol}</span>
          </div>
        </div>
      </div>

      {/* 3. UV Index Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-300">Max UV Index</span>
          </div>
          <div className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${uvColor}`}>
            {uvLevel} ({uvMax.toFixed(1)})
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
            <div className="h-full bg-green-500 w-[20%]" />
            <div className="h-full bg-yellow-500 w-[20%]" />
            <div className="h-full bg-amber-500 w-[20%]" />
            <div className="h-full bg-red-500 w-[20%]" />
            <div className="h-full bg-purple-500 w-[20%]" />
          </div>
          <div className="text-[11px] text-slate-400">
            {uvMax <= 2 && 'Low exposure. Enjoy the outdoors!'}
            {uvMax >= 3 && uvMax <= 5 && 'Moderate risk. Wear sunglasses on sunny days.'}
            {uvMax >= 6 && uvMax <= 7 && 'High risk. Apply SPF 30+ sunscreen every 2 hours.'}
            {uvMax >= 8 && 'Very high to extreme risk. Seek shade during midday.'}
          </div>
        </div>
      </div>

      {/* 4. Humidity & Dew Point */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Droplets className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-300">Humidity</span>
          </div>
          <span className="text-2xl font-black text-white">{current.relativeHumidity}%</span>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>Cloud Cover: <strong className="text-slate-200">{current.cloudCover}%</strong></span>
          <span>Pressure: <strong className="text-slate-200">{current.pressureMsl.toFixed(0)} hPa</strong></span>
        </div>
      </div>

      {/* 5. Sunrise & Sunset Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between sm:col-span-2 lg:col-span-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Sunrise className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold text-slate-300">Sun Cycle</span>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <Sunrise className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Sunrise</div>
              <div className="text-base font-bold text-white">{sunriseStr}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Sunset className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Sunset</div>
              <div className="text-base font-bold text-white">{sunsetStr}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
