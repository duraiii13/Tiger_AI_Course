import React from 'react';
import { AlertCircle, RefreshCw, MapPin, Globe } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
  onUseDefault: () => void;
  onUseLocation: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  onUseDefault,
  onUseLocation,
}) => {
  return (
    <div className="max-w-xl mx-auto my-8 p-6 sm:p-8 bg-slate-900/95 border border-rose-800/80 rounded-3xl shadow-2xl backdrop-blur-xl text-center space-y-5">
      <div className="mx-auto w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xl font-bold text-white">Weather Data Unavailable</h3>
        <p className="text-sm text-slate-300 font-medium">
          {message || 'City not found or network error'}
        </p>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Please check your spelling, try searching for a major nearby city, or check your Internet connection.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Connection</span>
        </button>

        <button
          onClick={onUseDefault}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-all"
        >
          <Globe className="w-4 h-4 text-sky-400" />
          <span>Load London (Default)</span>
        </button>

        <button
          onClick={onUseLocation}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-all"
        >
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>Use Geolocation</span>
        </button>
      </div>
    </div>
  );
};
