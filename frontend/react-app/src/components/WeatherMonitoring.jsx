import React from 'react';
import { CloudLightning, CloudRain, Sun, Wind, Droplet, AlertOctagon } from 'lucide-react';

export default function WeatherMonitoring({ previewOnly = false }) {
  if (previewOnly) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CloudLightning className="w-5 h-5 text-yellow-400" /> Climate & Weather
          </h3>
          <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-mono font-bold">STORM WARNING</span>
        </div>
        <div className="flex items-center space-x-3">
          <CloudLightning className="w-10 h-10 text-yellow-400" />
          <div>
            <div className="text-2xl font-bold text-white">27°C</div>
            <div className="text-xs text-blue-300">Heavy Rain (48mm in 4h)</div>
          </div>
        </div>
        <div className="text-xs text-slate-400">Precipitation Chance: <strong className="text-white">88%</strong> | Wind: <strong className="text-white">34 km/h</strong></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Weather API Live Feed
              </span>
              <span className="text-xs text-slate-400">Mandya Agri-Meteorology Station</span>
            </div>
            <div className="flex items-center space-x-4 mt-3">
              <CloudLightning className="w-12 h-12 text-yellow-400" />
              <div>
                <div className="text-4xl font-extrabold text-white">27°C</div>
                <div className="text-sm font-semibold text-blue-300">Severe Thunderstorm & Flash Rain Warning</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 max-w-sm">
            <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase">
              <AlertOctagon className="w-4 h-4" />
              <span>Extreme Weather Warning</span>
            </div>
            <p className="text-xs text-slate-200 mt-1">
              Waterlogging hazard for lower paddy basins. Open emergency field furrows immediately.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400">Relative Humidity</span>
            <div className="text-lg font-bold text-white flex items-center gap-1 mt-1">
              <Droplet className="w-4 h-4 text-blue-400" /> 89%
            </div>
          </div>
          <div>
            <span className="text-slate-400">Wind Velocity</span>
            <div className="text-lg font-bold text-white flex items-center gap-1 mt-1">
              <Wind className="w-4 h-4 text-teal-400" /> 34 km/h (WSW)
            </div>
          </div>
          <div>
            <span className="text-slate-400">Rain Probability</span>
            <div className="text-lg font-bold text-white flex items-center gap-1 mt-1">
              <CloudRain className="w-4 h-4 text-indigo-400" /> 88%
            </div>
          </div>
          <div>
            <span className="text-slate-400">Expected Precipitation</span>
            <div className="text-lg font-bold text-white flex items-center gap-1 mt-1">
              <CloudRain className="w-4 h-4 text-yellow-400" /> 48 mm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
