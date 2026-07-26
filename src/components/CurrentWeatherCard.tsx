import React from 'react';
import { WeatherData, UnitSettings } from '../types/weather';
import { getWeatherConditionInfo } from '../services/weatherApi';
import { WeatherIcon } from './WeatherIcon';
import { Wind, Droplets, ArrowUp, ArrowDown, ShieldAlert, Sparkles, MapPin } from 'lucide-react';

interface CurrentWeatherCardProps {
  weather: WeatherData;
  units: UnitSettings;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ weather, units }) => {
  const { city, current, daily } = weather;
  const condition = getWeatherConditionInfo(current.weatherCode, current.isDay);
  const today = daily[0];

  const tempUnitSymbol = units.temp === 'fahrenheit' ? '°F' : '°C';
  const speedUnitSymbol = units.speed === 'mph' ? 'mph' : 'km/h';

  // Format local time using city timezone
  let localTimeString = '';
  try {
    const now = new Date();
    localTimeString = now.toLocaleTimeString('en-US', {
      timeZone: weather.timezone,
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch (e) {
    localTimeString = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-2xl bg-gradient-to-br ${condition.backgroundGradient} transition-all duration-500 border border-white/20`}
    >
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-black/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full gap-6">
        {/* Location Header & Local Time */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-white/90 drop-shadow-sm" />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-sm">
                {city.name}
              </h2>
            </div>
            <p className="text-sm font-medium text-white/80 mt-1 pl-7">
              {[city.admin1, city.country].filter(Boolean).join(', ')}
            </p>
          </div>

          <div className="text-right bg-black/20 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/15">
            <div className="text-xs font-semibold text-white/90 tracking-wide uppercase">
              Local Time
            </div>
            <div className="text-sm font-bold text-white">{localTimeString}</div>
          </div>
        </div>

        {/* Main Temperature & Big Condition Display */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 my-2">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/15 backdrop-blur-md rounded-3xl border border-white/20 shadow-inner">
              <WeatherIcon
                name={condition.iconName}
                className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-md"
              />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="text-6xl sm:text-7xl font-black tracking-tighter drop-shadow-md">
                  {Math.round(current.temperature)}
                </span>
                <span className="text-2xl sm:text-3xl font-bold ml-1 text-white/90">
                  {tempUnitSymbol}
                </span>
              </div>
              <div className="text-base sm:text-lg font-semibold text-white/90 mt-0.5 capitalize">
                {condition.label}
              </div>
            </div>
          </div>

          {/* Feels Like & High/Low Pills */}
          <div className="flex flex-col gap-2 w-full sm:w-auto bg-black/25 backdrop-blur-md p-4 rounded-2xl border border-white/15">
            <div className="text-sm font-medium text-white/90 flex items-center justify-between gap-4">
              <span>Feels Like</span>
              <span className="font-bold text-white">
                {Math.round(current.apparentTemperature)}
                {tempUnitSymbol}
              </span>
            </div>

            {today && (
              <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/15 text-xs font-semibold">
                <div className="flex items-center gap-1 text-amber-200">
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>High: {Math.round(today.tempMax)}{tempUnitSymbol}</span>
                </div>
                <div className="flex items-center gap-1 text-sky-200">
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>Low: {Math.round(today.tempMin)}{tempUnitSymbol}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Quick Snapshot Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/20 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
            <Droplets className="w-4 h-4 text-cyan-300" />
            <div>
              <div className="text-[11px] text-white/70">Humidity</div>
              <div className="font-bold text-white">{current.relativeHumidity}%</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
            <Wind className="w-4 h-4 text-sky-300" />
            <div>
              <div className="text-[11px] text-white/70">Wind Speed</div>
              <div className="font-bold text-white">
                {current.windSpeed.toFixed(1)} {speedUnitSymbol}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <div>
              <div className="text-[11px] text-white/70">Max UV Index</div>
              <div className="font-bold text-white">
                {today?.uvIndexMax.toFixed(1) || '0'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
            <ShieldAlert className="w-4 h-4 text-blue-300" />
            <div>
              <div className="text-[11px] text-white/70">Rain Chance</div>
              <div className="font-bold text-white">{today?.precipProbMax || 0}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
