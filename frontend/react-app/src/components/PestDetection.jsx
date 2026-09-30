import React from 'react';
import { Bug, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function PestDetection() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Bug className="w-5 h-5 text-rose-400" /> Pest/Disease Agent Surveillance
        </h3>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          THREAT: LOW-MODERATE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="font-bold text-slate-200">Aphid Vector Alert (1.8 km East)</div>
          <p className="text-slate-400">
            Satellite and neighboring farmer report clusters indicate initial aphid migrations along border weed strips.
          </p>
          <div className="text-emerald-400 font-medium">Recommended: Plant yellow sticky traps & border marigolds.</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="font-bold text-slate-200">Fall Armyworm Surveillance</div>
          <p className="text-slate-400">
            Corn & Cotton plots clear of egg clusters. Pheromone lure monitoring active.
          </p>
          <div className="text-emerald-400 font-medium">Zero emergency chemical spray required.</div>
        </div>
      </div>
    </div>
  );
}
