import React, { useState } from 'react';
import { DailyItem, UnitSettings } from '../types/weather';
import { getWeatherConditionInfo } from '../services/weatherApi';
import { WeatherIcon } from './WeatherIcon';
import {
  Calendar,
  Droplets,
  Wind,
  Sunrise,
  Sunset,
  ChevronDown,
  ChevronUp,
  Sun,
  ShieldAlert,
} from 'lucide-react';

interface DailyForecastCardsProps {
  daily: DailyItem[];
  units: UnitSettings;
}

export const DailyForecastCards: React.FC<DailyForecastCardsProps> = ({ daily, units }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const tempSymbol = units.temp === 'fahrenheit' ? '°F' : '°C';
  const speedSymbol = units.speed === 'mph' ? 'mph' : 'km/h';

  // Calculate 7-day overall min and max for the visual temperature range bar
  const allMinTemps = daily.map((d) => d.tempMin);
  const allMaxTemps = daily.map((d) => d.tempMax);
  const overallMin = Math.min(...allMinTemps);
  const overallMax = Math.max(...allMaxTemps);
  const tempRange = overallMax - overallMin || 1;

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">7-Day Weather Outlook</h3>
          <p className="text-xs text-slate-400">Daily temperature ranges, rain probability & details</p>
        </div>
      </div>

      <div className="space-y-3">
        {daily.map((item, idx) => {
          const condition = getWeatherConditionInfo(item.weatherCode);
          const isExpanded = expandedIndex === idx;

          // Calculate percentage position for high/low bar
          const leftPercent = Math.max(0, Math.min(100, ((item.tempMin - overallMin) / tempRange) * 100));
          const rightPercent = Math.max(0, Math.min(100, ((item.tempMax - overallMin) / tempRange) * 100));
          const barWidth = Math.max(5, rightPercent - leftPercent);

          const dateObj = new Date(item.date + 'T00:00:00');
          const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

          const sunriseFormatted = item.sunrise
            ? new Date(item.sunrise).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
            : 'N/A';
          const sunsetFormatted = item.sunset
            ? new Date(item.sunset).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
            : 'N/A';

          return (
            <div
              key={item.date}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? 'bg-slate-800/90 border-blue-500/40 shadow-lg shadow-blue-500/5'
                  : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-700'
              }`}
            >
              {/* Main Summary Row */}
              <button
                onClick={() => toggleExpand(idx)}
                className="w-full px-4 py-3.5 flex flex-wrap items-center justify-between gap-3 text-left focus:outline-none"
              >
                {/* Day & Date */}
                <div className="w-28 sm:w-36 flex-shrink-0">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{item.dayName}</span>
                    {idx === 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        Today
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">{formattedDate}</div>
                </div>

                {/* Condition & Icon */}
                <div className="flex items-center gap-2.5 w-32 sm:w-44 flex-shrink-0">
                  <WeatherIcon name={condition.iconName} className="w-6 h-6 text-indigo-400 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-200 line-clamp-1">
                    {condition.label}
                  </span>
                </div>

                {/* Rain Chance Badge */}
                <div className="w-16 flex items-center gap-1 text-xs font-semibold text-cyan-400">
                  {item.precipProbMax > 0 ? (
                    <>
                      <Droplets className="w-3.5 h-3.5" />
                      <span>{item.precipProbMax}%</span>
                    </>
                  ) : (
                    <span className="text-slate-500 text-[11px]">0%</span>
                  )}
                </div>

                {/* Temperature High/Low Visual Range Bar */}
                <div className="flex-1 min-w-[140px] max-w-xs hidden md:flex items-center gap-3 px-2">
                  <span className="text-xs font-semibold text-slate-400 w-8 text-right">
                    {Math.round(item.tempMin)}{tempSymbol}
                  </span>
                  <div className="relative flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="absolute h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-500"
                      style={{
                        left: `${leftPercent}%`,
                        width: `${barWidth}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-white w-8">
                    {Math.round(item.tempMax)}{tempSymbol}
                  </span>
                </div>

                {/* Simple High/Low text fallback for smaller screens */}
                <div className="md:hidden flex items-center gap-2 text-xs font-bold">
                  <span className="text-slate-400">{Math.round(item.tempMin)}{tempSymbol}</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-white">{Math.round(item.tempMax)}{tempSymbol}</span>
                </div>

                {/* Expand Toggle Chevron */}
                <div className="text-slate-400 p-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Accordion Detail Breakdown */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-700/50 bg-slate-900/50 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
                    <Sunrise className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-[10px] text-slate-400">Sunrise</div>
                      <div className="font-semibold text-slate-200">{sunriseFormatted}</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
                    <Sunset className="w-4 h-4 text-amber-500" />
                    <div>
                      <div className="text-[10px] text-slate-400">Sunset</div>
                      <div className="font-semibold text-slate-200">{sunsetFormatted}</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-300" />
                    <div>
                      <div className="text-[10px] text-slate-400">Max UV Index</div>
                      <div className="font-semibold text-slate-200">{item.uvIndexMax.toFixed(1)}</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
                    <Wind className="w-4 h-4 text-blue-400" />
                    <div>
                      <div className="text-[10px] text-slate-400">Max Wind</div>
                      <div className="font-semibold text-slate-200">
                        {item.windSpeedMax.toFixed(1)} {speedSymbol}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
