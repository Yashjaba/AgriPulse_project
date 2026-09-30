import React, { useEffect, useRef } from 'react';
import { MapPin, Layers, AlertCircle, Shield } from 'lucide-react';

export default function LocationTracking({ farmer }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Check if Leaflet is present in window
    if (window.L && mapContainerRef.current) {
      const L = window.L;
      const map = L.map(mapContainerRef.current).setView(farmer.coordinates || [12.5234, 76.8967], 14);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19
      }).addTo(map);

      // Farm Polygon
      const farmCoords = [
        [12.5210, 76.8940],
        [12.5260, 76.8950],
        [12.5255, 76.8995],
        [12.5205, 76.8985]
      ];
      L.polygon(farmCoords, {
        color: '#10b981',
        fillColor: '#10b981',
        fillOpacity: 0.25,
        weight: 2
      }).addTo(map).bindPopup(`<strong>${farmer.farmTitle}</strong><br>Farmer: ${farmer.name}<br>Area: ${farmer.sizeAcres} Acres`);

      // ESP32 Sensor Marker
      const sensorMarker = L.circleMarker(farmer.coordinates || [12.5234, 76.8967], {
        radius: 8,
        color: '#059669',
        fillColor: '#34d399',
        fillOpacity: 0.9
      }).addTo(map).bindPopup(`<strong>ESP32 Sensor Station #094</strong><br>Status: Online`);

      // Hazard Zones
      L.circle([12.5320, 76.8920], {
        color: '#ef4444',
        fillColor: '#ef4444',
        fillOpacity: 0.2,
        radius: 750
      }).addTo(map).bindPopup(`<strong>⚠️ Flood Inundation Hazard</strong><br>Heavy rainfall runoff zone.`);

      return () => {
        map.remove();
      };
    }
  }, [farmer]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-400" /> Geospatial Farm & Regional Crisis Map
          </h2>
          <p className="text-slate-400 mt-1">Requirement 12: Identify affected agricultural areas and sensor stations on an interactive map.</p>
        </div>
      </div>

      <div ref={mapContainerRef} className="w-full h-96 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
        {/* Leaflet map is mounted here */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500"></div>
          <div>
            <div className="font-bold text-white">Your Farm (Plot Boundary)</div>
            <div className="text-slate-400 text-[11px]">{farmer.location} (4.5 Acres)</div>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
          <div>
            <div className="font-bold text-white">River Basin Flood Warning</div>
            <div className="text-slate-400 text-[11px]">750m Inundation Risk Zone</div>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-500"></div>
          <div>
            <div className="font-bold text-white">Border Pest Surveillance</div>
            <div className="text-slate-400 text-[11px]">Aphid cluster monitored 1.8km east</div>
          </div>
        </div>
      </div>
    </div>
  );
}
