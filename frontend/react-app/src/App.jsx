import React, { useState, useEffect } from 'react';
import { 
  Sprout, Gauge, CloudLightning, Scan, Cpu, MapPin, Calendar, 
  Mic, MessageSquare, Volume2, AlertTriangle, ShieldCheck, Sliders, CheckCircle 
} from 'lucide-react';

import FarmerRegistration from './components/FarmerRegistration';
import SoilMonitoring from './components/SoilMonitoring';
import WeatherMonitoring from './components/WeatherMonitoring';
import CropDiseaseDetection from './components/CropDiseaseDetection';
import PestDetection from './components/PestDetection';
import AIAgentsCommand from './components/AIAgentsCommand';
import CrisisDetection from './components/CrisisDetection';
import RiskAssessment from './components/RiskAssessment';
import VoiceAssistant from './components/VoiceAssistant';
import AlertSystem from './components/AlertSystem';
import FarmSchedule from './components/FarmSchedule';
import LocationTracking from './components/LocationTracking';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState('kn'); // Kannada default
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isSmsOpen, setIsSmsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Global State for IoT Telemetry & Farm Info
  const [farmer, setFarmer] = useState({
    name: 'S Vinod Kumar',
    phone: '+91 98450 12345',
    farmTitle: 'Titans Green Acres Farm',
    location: 'Mandya, Karnataka',
    coordinates: [12.5234, 76.8967],
    sizeAcres: 4.5,
    soilType: 'Red Loamy',
    irrigation: 'Drip Irrigation',
    crops: 'Paddy (Basmati), Tomato, Cotton',
    esp32Id: 'ESP32-NODE-KA-094'
  });

  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const API_BASE = "http://localhost:8000/api";

  // Connect to FastAPI backend on mount
  useEffect(() => {
    async function syncWithBackend() {
      try {
        const rootRes = await fetch("http://localhost:8000/");
        if (rootRes.ok) {
          setIsBackendOnline(true);
          
          // Fetch farmer profile
          const fRes = await fetch(`${API_BASE}/farmer/profile`);
          if (fRes.ok) {
            const f = await fRes.json();
            setFarmer({
              name: f.name,
              phone: f.phone,
              farmTitle: f.farm_title,
              location: f.location,
              coordinates: [f.latitude || 12.5234, f.longitude || 76.8967],
              sizeAcres: f.size_acres,
              soilType: f.soil_type,
              irrigation: f.irrigation_method,
              crops: f.crops,
              esp32Id: f.esp32_device_id
            });
            if (f.preferred_language) setLanguage(f.preferred_language);
          }

          // Fetch latest telemetry
          const telRes = await fetch(`${API_BASE}/iot/telemetry/latest`);
          if (telRes.ok) {
            const tel = await telRes.json();
            setTelemetry(prev => ({
              ...prev,
              moisture: tel.moisture,
              temperature: tel.temperature,
              ph: tel.ph
            }));
          }
        }
      } catch (err) {
        console.log("FastAPI backend not running. Using simulated state.");
      }
    }

    syncWithBackend();
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans">
      
      {/* Top Urgent Crisis Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-red-600 to-rose-700 px-4 py-2 text-white text-xs sm:text-sm font-semibold flex items-center justify-between shadow-lg sticky top-0 z-50">
        <div className="flex items-center space-x-2 max-w-5xl mx-auto truncate">
          <span className="flex h-3 w-3 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <span className="truncate">
            🚨 <strong>CRISIS ALERT:</strong> 48mm heavy rain expected in 4h. Soil dry (28%) vs Climate rain conflict resolved: Irrigation suspended!
          </span>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button onClick={() => setIsVoiceOpen(true)} className="bg-black/30 hover:bg-black/50 px-2.5 py-1 rounded text-xs flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5" /> Spoken Alert
          </button>
        </div>
      </div>

      {/* Header Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-8 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg text-white tracking-tight">AgriCrisis<span className="text-emerald-400">Command</span></span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">GATEWAYS 2026</span>
                </div>
                <p className="text-[10px] text-slate-400">Team Titans • AI Multi-Agent Crisis Network</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs lg:text-sm">
              <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-1.5 rounded-lg font-medium transition-all ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                Dashboard
              </button>
              <button onClick={() => setActiveTab('soil')} className={`px-3 py-1.5 rounded-lg font-medium transition-all ${activeTab === 'soil' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                Soil IoT
              </button>
              <button onClick={() => setActiveTab('weather')} className={`px-3 py-1.5 rounded-lg font-medium transition-all ${activeTab === 'weather' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                Climate
              </button>
              <button onClick={() => setActiveTab('vision')} className={`px-3 py-1.5 rounded-lg font-medium transition-all ${activeTab === 'vision' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                Crop & Pest
              </button>
              <button onClick={() => setActiveTab('agents')} className={`px-3 py-1.5 rounded-lg font-medium transition-all ${activeTab === 'agents' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                AI Agents
              </button>
              <button onClick={() => setActiveTab('map')} className={`px-3 py-1.5 rounded-lg font-medium transition-all ${activeTab === 'map' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                Crisis Map
              </button>
              <button onClick={() => setActiveTab('schedule')} className={`px-3 py-1.5 rounded-lg font-medium transition-all ${activeTab === 'schedule' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                Schedule
              </button>
            </nav>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border ${isBackendOnline ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'}`}>
                <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`}></span>
                <span>{isBackendOnline ? 'FastAPI: Connected (Port 8000)' : 'FastAPI: Offline'}</span>
              </div>

              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-slate-800 text-slate-200 border border-slate-700 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none">
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>

              <button onClick={() => setIsVoiceOpen(true)} className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs flex items-center gap-1 font-medium">
                <Mic className="w-4 h-4" />
                <span className="hidden sm:inline">Voice AI</span>
              </button>

              <button onClick={() => setIsSmsOpen(true)} className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span className="bg-blue-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span>
              </button>

              <button onClick={() => setIsProfileOpen(true)} className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-800 border border-slate-700">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  VK
                </div>
                <span className="text-xs font-medium text-slate-300 hidden lg:inline">{farmer.name}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <CrisisDetection telemetry={telemetry} />
            <RiskAssessment telemetry={telemetry} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SoilMonitoring telemetry={telemetry} setTelemetry={setTelemetry} previewOnly={true} />
              <WeatherMonitoring previewOnly={true} />
            </div>
            <AIAgentsCommand />
          </div>
        )}

        {activeTab === 'soil' && <SoilMonitoring telemetry={telemetry} setTelemetry={setTelemetry} />}
        {activeTab === 'weather' && <WeatherMonitoring />}
        {activeTab === 'vision' && (
          <div className="space-y-6">
            <CropDiseaseDetection language={language} />
            <PestDetection />
          </div>
        )}
        {activeTab === 'agents' && <AIAgentsCommand fullDetail={true} />}
        {activeTab === 'map' && <LocationTracking farmer={farmer} />}
        {activeTab === 'schedule' && <FarmSchedule />}
      </main>

      {/* Modals for Voice, SMS, Farmer Profile */}
      {isVoiceOpen && <VoiceAssistant language={language} setLanguage={setLanguage} onClose={() => setIsVoiceOpen(false)} />}
      {isSmsOpen && <AlertSystem onClose={() => setIsSmsOpen(false)} farmer={farmer} />}
      {isProfileOpen && <FarmerRegistration farmer={farmer} setFarmer={setFarmer} onClose={() => setIsProfileOpen(false)} />}

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>GATEWAYS 2026</strong> • Round 1 Ideation & Architecture • <strong>Team Titans</strong>
          </div>
          <div>
            Team: S Vinod Kumar (Frontend & IoT) • Prajwal N (Backend) • Yash R (Database)
          </div>
        </div>
      </footer>
    </div>
  );
}
