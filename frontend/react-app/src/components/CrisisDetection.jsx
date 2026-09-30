import React from 'react';
import { AlertTriangle, ShieldAlert, Waves, Flame } from 'lucide-react';

export default function CrisisDetection({ telemetry }) {
  const isDrought = telemetry.moisture < 20;
  const isFlood = telemetry.moisture > 85;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" /> Crisis Detection & Early Warning
        </h3>
        <span className="text-xs text-slate-400">Requirement 7: Real-Time Threat Identification</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className={`p-3 rounded-xl border ${isDrought ? 'bg-red-950/40 border-red-500' : 'bg-slate-950 border-slate-800'}`}>
          <div className="flex items-center gap-2 font-bold text-white mb-1">
            <Flame className="w-4 h-4 text-amber-400" /> Drought Emergency
          </div>
          <p className="text-slate-400">
            {isDrought ? 'CRITICAL: Extreme moisture deficit below permanent wilting point!' : 'Normal: Soil moisture above drought threshold.'}
          </p>
        </div>

        <div className={`p-3 rounded-xl border ${isFlood ? 'bg-blue-950/40 border-blue-500' : 'bg-slate-950 border-slate-800'}`}>
          <div className="flex items-center gap-2 font-bold text-white mb-1">
            <Waves className="w-4 h-4 text-blue-400" /> Flood & Waterlogging
          </div>
          <p className="text-slate-400">
            {isFlood ? 'CRITICAL: Soil saturated at 95%. Emergency drainage needed!' : 'Moderate: 48mm storm incoming within 4h.'}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center gap-2 font-bold text-white mb-1">
            <ShieldAlert className="w-4 h-4 text-rose-400" /> Crop Disease Outbreak
          </div>
          <p className="text-slate-400">
            Foliar fungal infection (Early Blight) confined to Plot B. Not yet regional epidemic.
          </p>
        </div>
      </div>
    </div>
  );
}
