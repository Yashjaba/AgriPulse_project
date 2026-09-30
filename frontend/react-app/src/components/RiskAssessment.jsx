import React from 'react';
import { ShieldCheck, GitMerge, PhoneCall } from 'lucide-react';

export default function RiskAssessment({ telemetry }) {
  const handleEscalate = () => {
    alert("Case Escalated to Krishi Vigyan Kendra (KVK) Agronomist Dr. Ramesh K. (Mandya). You will receive an automated callback.");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" /> Risk Assessment & Conflict Resolution Engine
        </h3>
        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
          CONFIDENCE: 92% | RISK SCORE: 74/100
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Edge Case Handling (PDF Section 6) */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-200">
            <GitMerge className="w-4 h-4 text-amber-400" /> Edge Case: Conflicting Sensor & Weather Data
          </div>
          <p className="text-slate-400 leading-relaxed">
            Soil sensor reports <strong>dry soil (28%)</strong>, which normally commands immediate irrigation. However, Climate Agent forecasts <strong>48mm heavy downpour</strong> in 4 hours.
          </p>
          <div className="text-emerald-400 font-semibold pt-1 border-t border-slate-800">
            💡 AI Resolution: Irrigation withheld! Irrigating now causes severe waterlogging and root necrosis.
          </div>
        </div>

        {/* Escalation to Extension Expert */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="font-bold text-slate-200 mb-1">Human-In-The-Loop Expert Escalation</div>
            <p className="text-slate-400">
              When confidence drops or conflicting data cannot be autonomously reconciled, cases are escalated to the KVK Agricultural Extension Officer.
            </p>
          </div>
          <button onClick={handleEscalate} className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium flex items-center justify-center gap-2">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" /> Escalate Case to KVK Agronomist
          </button>
        </div>
      </div>
    </div>
  );
}
