import React from 'react';
import { Cpu, Terminal, ArrowDown, BrainCircuit } from 'lucide-react';

export default function AIAgentsCommand({ fullDetail = false }) {
  const agents = [
    { name: "🌱 Soil Agent", status: "Active", conf: "96%", out: "Moisture 28% (Dry), Temp 29.4°C" },
    { name: "🌦️ Climate Agent", status: "Active", conf: "91%", out: "Inbound Storm: 48mm in 4h" },
    { name: "🌾 Crop Agent", status: "Active", conf: "94%", out: "Early Blight detected" },
    { name: "🐛 Pest Agent", status: "Active", conf: "89%", out: "Low threat, Aphids at border" },
    { name: "📍 Location Agent", status: "Active", conf: "100%", out: "Mandya Block 4 geofenced" },
    { name: "📊 Risk Agent", status: "Active", conf: "92%", out: "Conflict: Soil Dry vs Weather Rain" },
    { name: "🧠 Crisis Command", status: "Orchestrating", conf: "98%", out: "DECISION: Override pump, send voice SMS" }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" /> Multi-Agent AI Crisis Coordination
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">7 Specialized Agents coordinating in real time (PDF Architecture Sec 4)</p>
        </div>
        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">ALL AGENTS ONLINE</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {agents.map((ag, i) => (
          <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">{ag.name}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <p className="text-slate-400 text-[11px]">{ag.out}</p>
            <div className="text-[10px] text-emerald-400 font-mono">Conf: {ag.conf}</div>
          </div>
        ))}
      </div>

      {fullDetail && (
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
          <div className="flex items-center gap-2 text-slate-400 pb-2 border-b border-slate-800">
            <Terminal className="w-4 h-4 text-emerald-400" /> Real-Time Cross-Agent Bus Log
          </div>
          <p className="text-slate-300"><span className="text-emerald-400">[Soil Agent]</span>: Soil moisture 28% -> Triggers irrigation flag.</p>
          <p className="text-slate-300"><span className="text-blue-400">[Climate Agent]</span>: Severe storm front detected within 25km radius. Rainfall: 48mm.</p>
          <p className="text-slate-300"><span className="text-amber-400">[Risk Agent]</span>: Conflict identified! Resolving: Hold irrigation to prevent flooding.</p>
          <p className="text-slate-300"><span className="text-purple-400">[Crisis Command]</span>: OVERRIDE: Suppress pump activation. Dispatch voice alert in local language.</p>
        </div>
      )}
    </div>
  );
}
