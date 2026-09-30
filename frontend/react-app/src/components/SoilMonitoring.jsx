import React from 'react';
import { Gauge, Droplets, Thermometer, RefreshCw, Sliders } from 'lucide-react';

export default function SoilMonitoring({ telemetry, setTelemetry, previewOnly = false }) {
  const handleSliderChange = (key, val) => {
    setTelemetry(prev => ({ ...prev, [key]: parseFloat(val) }));
  };

  if (previewOnly) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Gauge className="w-5 h-5 text-emerald-400" /> Live Soil Telemetry
          </h3>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">ESP32 LIVE</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400">Moisture</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{telemetry.moisture}%</div>
            <div className="text-[10px] text-amber-400">Low (Deficit)</div>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400">Soil Temp</span>
            <div className="text-2xl font-bold text-blue-400 mt-1">{telemetry.temperature}°C</div>
            <div className="text-[10px] text-slate-400">Optimal Range</div>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400">Acidity (pH)</span>
            <div className="text-2xl font-bold text-purple-400 mt-1">{telemetry.ph}</div>
            <div className="text-[10px] text-slate-400">Balanced</div>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400">NPK Nitrogen</span>
            <div className="text-2xl font-bold text-yellow-400 mt-1">{telemetry.nitrogen} mg/kg</div>
            <div className="text-[10px] text-slate-400">Normal</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Gauge className="w-6 h-6 text-emerald-400" /> ESP32 IoT Soil Telemetry Station
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              CONNECTED
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Uplink: MQTT / REST from field probes (GPIO34 Capacitive, DS18B20 Temp, pH Sensor).</p>
        </div>
        <button onClick={() => setTelemetry(prev => ({ ...prev, moisture: Math.min(95, prev.moisture + 1) }))} className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-medium flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Telemetry
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center space-y-2">
          <div className="text-slate-400 font-semibold uppercase">Soil Moisture</div>
          <div className="text-3xl font-black text-emerald-400">{telemetry.moisture}%</div>
          <p className="text-[11px] text-amber-400">Target Range: 50% - 70%</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center space-y-2">
          <div className="text-slate-400 font-semibold uppercase">Soil Temperature</div>
          <div className="text-3xl font-black text-blue-400">{telemetry.temperature}°C</div>
          <p className="text-[11px] text-slate-400">Threshold: 18°C - 35°C</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center space-y-2">
          <div className="text-slate-400 font-semibold uppercase">Soil pH Level</div>
          <div className="text-3xl font-black text-purple-400">{telemetry.ph}</div>
          <p className="text-[11px] text-slate-400">Optimum (Neutral)</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="text-slate-400 font-semibold uppercase text-center">NPK Nutrients</div>
          <div className="space-y-1">
            <div className="flex justify-between"><span>N:</span> <strong className="text-emerald-400">{telemetry.nitrogen} mg/kg</strong></div>
            <div className="flex justify-between"><span>P:</span> <strong className="text-blue-400">{telemetry.phosphorus} mg/kg</strong></div>
            <div className="flex justify-between"><span>K:</span> <strong className="text-amber-400">{telemetry.potassium} mg/kg</strong></div>
          </div>
        </div>
      </div>

      {/* Simulator Control Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-400" /> Interactive Sensor Telemetry Simulator
        </h3>
        <p className="text-xs text-slate-400">Adjust simulated sensor readings to test how AI agents react to sudden drought or flooding.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span>Soil Moisture</span>
              <strong className="text-emerald-400">{telemetry.moisture}%</strong>
            </div>
            <input type="range" min="5" max="100" value={telemetry.moisture} onChange={(e) => handleSliderChange('moisture', e.target.value)} className="w-full h-1.5 bg-slate-800 rounded-lg accent-emerald-500 cursor-pointer" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Soil Temp</span>
              <strong className="text-blue-400">{telemetry.temperature}°C</strong>
            </div>
            <input type="range" min="15" max="45" step="0.5" value={telemetry.temperature} onChange={(e) => handleSliderChange('temperature', e.target.value)} className="w-full h-1.5 bg-slate-800 rounded-lg accent-blue-500 cursor-pointer" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Soil pH</span>
              <strong className="text-purple-400">{telemetry.ph}</strong>
            </div>
            <input type="range" min="4" max="10" step="0.1" value={telemetry.ph} onChange={(e) => handleSliderChange('ph', e.target.value)} className="w-full h-1.5 bg-slate-800 rounded-lg accent-purple-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
