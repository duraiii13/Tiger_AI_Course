import React from 'react';
import { PlanningRecommendations, UnitSettings } from '../types/weather';
import {
  Umbrella,
  Shirt,
  AlertTriangle,
  Info,
  CheckCircle2,
  Activity,
  Bike,
  Utensils,
  Camera,
  Sparkles,
  Car,
  Clock,
  ShieldAlert,
  Sun,
  Wind,
} from 'lucide-react';

interface PlanningInsightsProps {
  recommendations: PlanningRecommendations;
  units: UnitSettings;
}

export const PlanningInsights: React.FC<PlanningInsightsProps> = ({
  recommendations,
  units,
}) => {
  const {
    umbrellaAlert,
    umbrellaReason,
    clothingTips,
    alerts,
    activities,
    bestOutdoorHours,
    uvAdvice,
    windAdvice,
  } = recommendations;

  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-4 h-4 text-emerald-400" />;
      case 'Bike':
        return <Bike className="w-4 h-4 text-blue-400" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4 text-amber-400" />;
      case 'Camera':
        return <Camera className="w-4 h-4 text-indigo-400" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'Car':
        return <Car className="w-4 h-4 text-cyan-400" />;
      default:
        return <Activity className="w-4 h-4 text-blue-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ideal':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Good':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Fair':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Poor':
        return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
      case 'Not Recommended':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Primary Umbrella & Weather Advisory Alert Banners */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border backdrop-blur-md flex items-start gap-3.5 shadow-lg ${
                alert.type === 'warning'
                  ? 'bg-rose-950/40 border-rose-800/80 text-rose-200'
                  : alert.type === 'caution'
                  ? 'bg-amber-950/40 border-amber-800/80 text-amber-200'
                  : 'bg-blue-950/40 border-blue-800/80 text-blue-200'
              }`}
            >
              <div
                className={`p-2 rounded-xl flex-shrink-0 ${
                  alert.type === 'warning'
                    ? 'bg-rose-500/20 text-rose-400'
                    : alert.type === 'caution'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}
              >
                {alert.title.includes('Umbrella') || alert.title.includes('Rain') ? (
                  <Umbrella className="w-5 h-5" />
                ) : alert.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : (
                  <Info className="w-5 h-5" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-tight">{alert.title}</h4>
                <p className="text-xs mt-1 leading-relaxed opacity-90">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Clothing & Outfit Recommendations */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Shirt className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Smart Clothing Tips</h3>
            <p className="text-xs text-slate-400">Outfit guidance based on temperature & precipitation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Primary Wear
            </div>
            <div className="text-sm font-bold text-white">{clothingTips.primary}</div>
            <p className="text-xs text-slate-300">{clothingTips.layers}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Recommended Accessories
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {clothingTips.accessories.map((acc, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-600/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  {acc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Outdoor Activity Intelligence Index */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Outdoor Activity Index</h3>
              <p className="text-xs text-slate-400">Suitability calculated from wind, rain & heat factors</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activities.map((act) => (
            <div
              key={act.name}
              className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:bg-slate-800/80 transition-all flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-700/50">{getActivityIcon(act.icon)}</div>
                  <span className="text-xs font-bold text-slate-100">{act.name}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getStatusBadge(act.status)}`}>
                  {act.status}
                </span>
              </div>

              <div className="space-y-1">
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      act.score >= 75
                        ? 'bg-emerald-500'
                        : act.score >= 50
                        ? 'bg-blue-500'
                        : act.score >= 30
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${act.score}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-400">{act.reason}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Best Hours for Outdoor Plans Today */}
      {bestOutdoorHours.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Best Outdoor Windows Today</h3>
              <p className="text-xs text-slate-400">Optimal weather windows with minimal rain & comfortable temperature</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {bestOutdoorHours.map((slot, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex flex-col justify-between"
              >
                <div className="text-xs font-bold text-white flex items-center justify-between">
                  <span>{slot.time}</span>
                  <span className="text-amber-400">{slot.temp}{units.temp === 'fahrenheit' ? '°F' : '°C'}</span>
                </div>
                <div className="text-[11px] text-amber-300/80 mt-1">{slot.reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
