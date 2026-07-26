import React, { useState } from 'react';
import { HourlyItem, UnitSettings } from '../types/weather';
import { getWeatherConditionInfo } from '../services/weatherApi';
import { WeatherIcon } from './WeatherIcon';
import { Clock, TrendingUp, CloudRain, Droplets } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface HourlyForecastChartProps {
  hourly: HourlyItem[];
  units: UnitSettings;
}

export const HourlyForecastChart: React.FC<HourlyForecastChartProps> = ({ hourly, units }) => {
  const [activeTab, setActiveTab] = useState<'temp' | 'rain'>('temp');

  const tempSymbol = units.temp === 'fahrenheit' ? '°F' : '°C';

  // Prepare chart dataset
  const chartData = hourly.slice(0, 24).map((item) => {
    const date = new Date(item.time);
    const hourLabel = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    return {
      time: hourLabel,
      rawTime: item.time,
      temp: Math.round(item.temperature),
      apparentTemp: Math.round(item.apparentTemperature),
      rainProb: item.precipitationProbability || 0,
      precip: item.precipitation || 0,
      weatherCode: item.weatherCode,
      windSpeed: Math.round(item.windSpeed),
    };
  });

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
      {/* Header with Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">24-Hour Forecast Projections</h3>
            <p className="text-xs text-slate-400">Hourly temperature and precipitation probability curve</p>
          </div>
        </div>

        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700/80 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('temp')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'temp'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Temperature</span>
          </button>
          <button
            onClick={() => setActiveTab('rain')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'rain'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Precipitation %</span>
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-56 sm:h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              unit={activeTab === 'temp' ? tempSymbol : '%'}
            />
            <Tooltip content={<CustomTooltip activeTab={activeTab} tempSymbol={tempSymbol} />} />
            {activeTab === 'temp' ? (
              <Area
                type="monotone"
                dataKey="temp"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#tempGradient)"
                name="Temperature"
              />
            ) : (
              <Area
                type="monotone"
                dataKey="rainProb"
                stroke="#06b6d4"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#rainGradient)"
                name="Precipitation %"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Scrollable Hourly Cards Row */}
      <div className="mt-6 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
          {hourly.slice(0, 24).map((item, idx) => {
            const condition = getWeatherConditionInfo(item.weatherCode);
            const date = new Date(item.time);
            const hourFormatted = idx === 0 ? 'Now' : date.toLocaleTimeString('en-US', { hour: 'numeric' });

            return (
              <div
                key={item.time}
                className={`flex-shrink-0 flex flex-col items-center justify-between p-3 rounded-2xl border w-20 transition-all ${
                  idx === 0
                    ? 'bg-blue-600/20 border-blue-500/50 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
                }`}
              >
                <span className="text-xs font-semibold text-slate-300">{hourFormatted}</span>

                <div className="my-2">
                  <WeatherIcon name={condition.iconName} className="w-6 h-6 text-blue-400" />
                </div>

                <div className="text-sm font-bold text-white">
                  {Math.round(item.temperature)}
                  {tempSymbol}
                </div>

                <div className="flex items-center gap-0.5 text-[10px] text-cyan-400 font-semibold mt-1">
                  <Droplets className="w-2.5 h-2.5" />
                  <span>{item.precipitationProbability || 0}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Custom Chart Tooltip
const CustomTooltip = ({ active, payload, label, activeTab, tempSymbol }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const condition = getWeatherConditionInfo(data.weatherCode);

    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs space-y-1 z-50">
        <div className="font-bold text-white border-b border-slate-800 pb-1 mb-1 flex items-center justify-between gap-3">
          <span>{label}</span>
          <span className="text-blue-400">{condition.label}</span>
        </div>
        <div className="text-slate-300">
          Temp: <span className="font-bold text-white">{data.temp}{tempSymbol}</span> (Feels {data.apparentTemp}{tempSymbol})
        </div>
        <div className="text-cyan-400">
          Rain Chance: <span className="font-bold">{data.rainProb}%</span>
        </div>
        <div className="text-slate-400">
          Wind: <span className="font-bold text-slate-200">{data.windSpeed} speed</span>
        </div>
      </div>
    );
  }
  return null;
};
