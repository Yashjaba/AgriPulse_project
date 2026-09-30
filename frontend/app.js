/**
 * AgriCrisis Command - Multi-Agent AI-Powered Agricultural Crisis Command System
 * GATEWAYS 2026 | Round 1 Ideation & Architecture
 * Team Titans: S Vinod Kumar, Prajwal N, Yash R
 *
 * FULLY CONNECTED FRONTEND <---> FASTAPI BACKEND (http://localhost:8000/api)
 */

// ==========================================
// 1. BACKEND API CONFIGURATION & STATE
// ==========================================
const API_BASE = "http://localhost:8000/api";
let isBackendOnline = false;

const AppState = {
  // Farmer & Farm Details (Req 1)
  farmer: {
    id: 1,
    name: "S Vinod Kumar",
    phone: "+91 98450 12345",
    farmTitle: "Titans Green Acres Farm",
    location: "Mandya, Karnataka",
    coordinates: [12.5234, 76.8967],
    sizeAcres: 4.5,
    soilType: "Red Loamy",
    irrigation: "Drip Irrigation",
    crops: "Paddy (Basmati), Tomato, Cotton",
    esp32Id: "ESP32-NODE-KA-094",
    language: "kn"
  },

  // IoT Sensor Telemetry (Req 2)
  telemetry: {
    moisture: 28,      // %
    temperature: 29.4, // °C
    ph: 6.5,           // pH
    nitrogen: 140,     // mg/kg
    phosphorus: 45,    // mg/kg
    potassium: 180,    // mg/kg
    battery: 92,       // %
    lastSync: new Date()
  },

  // Weather & Climate (Req 3)
  weather: {
    temperature: 27,
    condition: "Heavy Rain Imminent",
    humidity: 89,
    windSpeed: 34,
    rainProbability: 88,
    rainExpectedMm: 48,
    extremeAlert: true
  },

  // Active Crisis & Risk Engine (Req 7, Req 8)
  crisis: {
    active: true,
    type: "Heavy Rain / Conflicting Irrigation",
    severity: "HIGH",
    riskScore: 74,
    confidence: 92,
    hasConflict: true,
    conflictDetails: "Soil sensor reports dry (28%) -> calls for irrigation; Weather forecasts 48mm torrential rain within 4h -> calls for drainage. Conflict resolved: Irrigation held to avoid crop root hypoxia."
  },

  // Current Crop Vision Case (Req 4, Req 5)
  currentCropCase: {
    id: "tomato-blight",
    title: "Early Blight (Alternaria solani)",
    severity: "MODERATE",
    confidence: 94.6,
    symptoms: "Concentric rings forming target board lesions on lower leaves. Early fungal spore proliferation triggered by >85% ambient humidity.",
    organicRemedy: [
      "Spray 5% Neem Seed Kernel Extract (NSKE).",
      "Apply Trichoderma viride @ 5g/L soil drench.",
      "Prune infected lower foliage & burn safely."
    ],
    chemicalRemedy: [
      "Mancozeb 75 WP @ 2g/litre of water.",
      "Alternatively, Copper Oxychloride 50 WP @ 2.5g/L.",
      "WARNING: Spray only AFTER Friday's rainstorm clears!"
    ],
    pestAssessment: "Surrounding fields show zero locust activity. Moderate aphid density near plot borders.",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=600&auto=format&fit=crop&q=80"
  },

  // Dynamic Farming Schedule (Req 11)
  schedule: [],

  // SMS Delivery Logs (Req 10)
  smsLogs: []
};

// Multilingual Text & Voice Resource Bundle
const Translations = {
  en: {
    langName: "English",
    voiceCode: "en-IN",
    alertSpoken: "Alert: Heavy rain of 48 millimeters expected within 4 hours. Cancel irrigation pumps immediately to prevent crop damage.",
    bannerText: "🚨 <strong>CRISIS ALERT:</strong> Heavy unseasonal rain (48mm) expected in 4h. Conflict detected: Soil Agent dry, Climate Agent wet. Irrigation suspended!",
    playBtnText: "Play Audio Warning in English"
  },
  hi: {
    langName: "हिंदी (Hindi)",
    voiceCode: "hi-IN",
    alertSpoken: "चेतावनी: अगले चार घंटों में 48 मिलीमीटर भारी बारिश होने की संभावना है। कृपया सिंचाई तुरंत रोक दें और जल निकासी खोलें।",
    bannerText: "🚨 <strong>संकट चेतावनी:</strong> 4 घंटों में 48mm भारी बारिश। मिट्टी सूखी है परंतु भारी बारिश आ रही है। सिंचाई रोक दी गई है!",
    playBtnText: "हिंदी में चेतावनी सुनें (Play Hindi)"
  },
  kn: {
    langName: "ಕನ್ನಡ (Kannada)",
    voiceCode: "kn-IN",
    alertSpoken: "ಎಚ್ಚರಿಕೆ: ಮುಂದಿನ ನಾಲ್ಕು ಗಂಟೆಗಳಲ್ಲಿ 48 ಮಿಲಿಮೀಟರ್ ಭಾರಿ ಮಳೆಯಾಗಲಿದೆ. ನೀರಾವರಿ ಪಂಪ್ ತಕ್ಷಣ ನಿಲ್ಲಿಸಿ, ಕಾಲುವೆಗಳನ್ನು ತೆರೆಯಿರಿ.",
    bannerText: "🚨 <strong>ತುರ್ತು ಎಚ್ಚರಿಕೆ:</strong> 4 ಗಂಟೆಗಳಲ್ಲಿ 48mm ಭಾರಿ ಮಳೆ. ಮಣ್ಣು ಒಣಗಿದ್ದರೂ ಮಳೆಯ ಮುನ್ಸೂಚನೆ ಇರುವುದರಿಂದ ನೀರಾವರಿ ಸ್ಥಗಿತಗೊಳಿಸಲಾಗಿದೆ!",
    playBtnText: "ಕನ್ನಡದಲ್ಲಿ ಎಚ್ಚರಿಕೆ ಕೇಳಿ (Play Kannada)"
  },
  te: {
    langName: "తెలుగు (Telugu)",
    voiceCode: "te-IN",
    alertSpoken: "హెచ్చరిక: రాబోయే 4 గంటల్లో 48 మిల్లీమీటర్ల భారీ వర్షం కురిసే అవకాశం ఉంది. దయచేసి నీటిపారుదల వెంటనే నిలిపివేయండి.",
    bannerText: "🚨 <strong>సంక్షోభ హెచ్చరిక:</strong> రాబోయే 4 గంటల్లో 48మి.మీ భారీ వర్షం. నేల పొడిగా ఉన్నప్పటికీ వర్షం వల్ల నీటిపారుదల రద్దు చేయబడింది!",
    playBtnText: "తెలుగులో హెచ్చరిక వినండి (Play Telugu)"
  },
  ta: {
    langName: "தமிழ் (Tamil)",
    voiceCode: "ta-IN",
    alertSpoken: "எச்சரிக்கை: அடுத்த 4 மணி நேரத்தில் 48 மில்லிமீட்டர் கனமழை பெய்ய வாய்ப்புள்ளது. பாசனத்தை உடனடியாக நிறுத்தவும்.",
    bannerText: "🚨 <strong>எச்சரிக்கை:</strong> 4 மணி நேரத்தில் 48 மி.மீ கனமழை. மண் வறண்டிருந்தாலும் பாசனம் நிறுத்தப்பட்டுள்ளது!",
    playBtnText: "தமிழில் எச்சரிக்கை கேட்கவும் (Play Tamil)"
  },
  mr: {
    langName: "मराठी (Marathi)",
    voiceCode: "mr-IN",
    alertSpoken: "सावधान: पुढील ४ तासांत ४८ मिमी मुसळधार पाऊस पडण्याची शक्यता आहे. कृपया पाणी देणे त्वरित थांबवा.",
    bannerText: "🚨 <strong>संकट सूचना:</strong> पुढील ४ तासांत ४८ मिमी पाऊस. माती कोरडी असली तरी पाऊस येत असल्याने पाणी देणे स्थगित केले आहे!",
    playBtnText: "मराठीत सूचना ऐका (Play Marathi)"
  }
};

// ==========================================
// 2. BACKEND CONNECTION & SYNC ENGINE
// ==========================================
async function checkBackendConnectivity() {
  const badge = document.getElementById("backendStatusBadge");
  const dot = document.getElementById("backendDot");
  const text = document.getElementById("backendText");

  try {
    const res = await fetch("http://localhost:8000/");
    if (res.ok) {
      isBackendOnline = true;
      if (badge) {
        badge.className = "hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border bg-emerald-500/10 border-emerald-500/30 text-emerald-300 transition-all";
      }
      if (dot) {
        dot.className = "w-2 h-2 rounded-full bg-emerald-400";
      }
      if (text) {
        text.innerText = "FastAPI: Connected (Port 8000)";
      }
      appendAgentLog("FastAPI Uplink", "text-emerald-400", "Connected to Python FastAPI Backend (http://localhost:8000). Syncing data...");
      
      // Load all data from real backend
      await loadInitialBackendData();
    }
  } catch (err) {
    isBackendOnline = false;
    if (badge) {
      badge.className = "hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border bg-amber-500/10 border-amber-500/30 text-amber-300 transition-all";
    }
    if (dot) dot.className = "w-2 h-2 rounded-full bg-amber-400";
    if (text) text.innerText = "FastAPI: Offline (Simulation Mode)";
    console.log("FastAPI backend not detected. Running client-side simulation.");
    renderScheduleTable();
  }
}

async function loadInitialBackendData() {
  if (!isBackendOnline) return;

  try {
    // 1. Fetch Farmer Profile from Backend
    const farmerRes = await fetch(`${API_BASE}/farmer/profile`);
    if (farmerRes.ok) {
      const f = await farmerRes.json();
      AppState.farmer.id = f.id;
      AppState.farmer.name = f.name;
      AppState.farmer.phone = f.phone;
      AppState.farmer.farmTitle = f.farm_title;
      AppState.farmer.location = f.location;
      AppState.farmer.sizeAcres = f.size_acres;
      AppState.farmer.soilType = f.soil_type;
      AppState.farmer.irrigation = f.irrigation_method;
      AppState.farmer.crops = f.crops;
      AppState.farmer.esp32Id = f.esp32_device_id;
      AppState.farmer.language = f.preferred_language || "kn";

      document.getElementById("dashFarmerName").innerText = f.name;
      document.getElementById("headerFarmerName").innerText = f.name;
      document.getElementById("dashFarmTitle").innerText = `${f.farm_title} • ${f.location}`;
      document.getElementById("dashCrops").innerText = f.crops;
      document.getElementById("dashFarmSize").innerText = `${f.size_acres} Acres (${f.soil_type})`;
      
      // Sync form values
      document.getElementById("regFarmerName").value = f.name;
      document.getElementById("regFarmerPhone").value = f.phone;
      document.getElementById("regFarmTitle").value = f.farm_title;
      document.getElementById("regLocation").value = f.location;
      document.getElementById("regFarmSize").value = f.size_acres;
      document.getElementById("regSoilType").value = f.soil_type;
      document.getElementById("regIrrigation").value = f.irrigation_method;
      document.getElementById("regCrops").value = f.crops;
      document.getElementById("regESP32Id").value = f.esp32_device_id;
      document.getElementById("regLanguage").value = f.preferred_language || "kn";
      
      changeLanguage(f.preferred_language || "kn");
    }

    // 2. Fetch Latest IoT Telemetry
    const telRes = await fetch(`${API_BASE}/iot/telemetry/latest`);
    if (telRes.ok) {
      const tel = await telRes.json();
      updateSimulatedSensor("moisture", tel.moisture, false);
      updateSimulatedSensor("temp", tel.temperature, false);
      updateSimulatedSensor("ph", tel.ph, false);
    }

    // 3. Fetch Crisis Status & Risk Score
    const crisisRes = await fetch(`${API_BASE}/crisis/status`);
    if (crisisRes.ok) {
      const c = await crisisRes.json();
      AppState.crisis.active = c.active_crisis;
      AppState.crisis.riskScore = c.risk_score;
      AppState.crisis.confidence = c.confidence_pct;
      AppState.crisis.hasConflict = c.has_conflict;
      AppState.crisis.conflictDetails = c.conflict_resolution;
      
      document.getElementById("statRiskScore").innerHTML = `${c.risk_score}<span class="text-sm font-normal text-slate-400">/100</span>`;
      document.getElementById("statRiskConf").innerText = `${c.confidence_pct}%`;
    }

    // 4. Fetch Dynamic Schedule from Backend
    const schedRes = await fetch(`${API_BASE}/schedule/`);
    if (schedRes.ok) {
      const tasks = await schedRes.json();
      AppState.schedule = tasks.map(t => ({
        id: t.id,
        activity: t.activity,
        plot: t.plot,
        window: t.scheduled_window,
        status: t.status,
        badgeClass: t.status === "POSTPONED" ? "bg-rose-500/20 text-rose-300 border-rose-500/30" : 
                    t.status === "URGENT" ? "bg-red-500/20 text-red-300 border-red-500/30" :
                    t.status === "RECOMMENDED" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" :
                    "bg-blue-500/20 text-blue-300 border-blue-500/30",
        reason: t.reason,
        completed: t.is_completed
      }));
      renderScheduleTable();
    }

    // 5. Fetch Dispatched Alerts History
    const alertsRes = await fetch(`${API_BASE}/alerts/recent`);
    if (alertsRes.ok) {
      const alerts = await alertsRes.json();
      const container = document.getElementById("smsListContainer");
      if (container) {
        container.innerHTML = "";
        alerts.forEach(a => {
          const smsCard = document.createElement("div");
          smsCard.className = "bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-slate-700 text-xs space-y-1 shadow";
          smsCard.innerHTML = `
            <div class="text-[10px] text-amber-400 font-bold uppercase">${a.title}</div>
            <p>${a.message}</p>
            <div class="text-[10px] text-slate-400 text-right">Delivered via ${a.channel}</div>
          `;
          container.appendChild(smsCard);
        });
      }
    }

    // 6. Fetch Pest Surveillance Report
    const pestRes = await fetch(`${API_BASE}/vision/pest-surveillance`);
    if (pestRes.ok) {
      const pest = await pestRes.json();
      document.getElementById("pestThreatLevel").innerText = `Threat: ${pest.threat_level}`;
      document.getElementById("pestAdvice").innerText = `${pest.density_per_acre}. ${pest.recommended_bio_control[0]}`;
    }

  } catch (e) {
    console.warn("Backend sync error", e);
  }
}

// ==========================================
// 3. CHART & MAP CONTROLLERS
// ==========================================
let telemetryChartInstance = null;
let leafletMap = null;
let mapLayers = {
  farmPolygon: null,
  sensorMarkers: [],
  crisisZones: []
};

async function initTelemetryChart() {
  const ctx = document.getElementById("soilTelemetryChart");
  if (!ctx) return;

  let labels = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00 (Now)"];
  let moistureData = [45, 42, 38, 35, 31, 29, AppState.telemetry.moisture];
  let tempData = [27.5, 28.2, 29.8, 30.5, 30.0, 29.6, AppState.telemetry.temperature];

  // If backend is online, query real historical telemetry
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE}/iot/telemetry/history?limit=7`);
      if (res.ok) {
        const hist = await res.json();
        if (hist.length > 0) {
          labels = hist.map(h => new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          moistureData = hist.map(h => h.moisture);
          tempData = hist.map(h => h.temperature);
        }
      }
    } catch (e) {
      console.warn("Could not load backend chart history, using fallback", e);
    }
  }

  telemetryChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Soil Moisture (%)",
          data: moistureData,
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.15)",
          borderWidth: 2.5,
          tension: 0.35,
          fill: true,
          yAxisID: "y"
        },
        {
          label: "Soil Temperature (°C)",
          data: tempData,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.05)",
          borderWidth: 2,
          borderDash: [4, 4],
          tension: 0.35,
          fill: false,
          yAxisID: "y1"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: { legend: { labels: { color: "#94a3b8", font: { size: 11 } } } },
      scales: {
        x: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#94a3b8", font: { size: 10 } } },
        y: { type: "linear", display: true, position: "left", grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#10b981", font: { size: 10 } }, min: 0, max: 100 },
        y1: { type: "linear", display: true, position: "right", grid: { drawOnChartArea: false }, ticks: { color: "#3b82f6", font: { size: 10 } }, min: 15, max: 45 }
      }
    }
  });
}

function initLocationMap() {
  const mapElement = document.getElementById("map");
  if (!mapElement || leafletMap) return;

  const farmCenter = AppState.farmer.coordinates;

  leafletMap = L.map("map", {
    zoomControl: true,
    scrollWheelZoom: false
  }).setView(farmCenter, 14);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19
  }).addTo(leafletMap);

  const farmCoords = [
    [12.5210, 76.8940],
    [12.5260, 76.8950],
    [12.5255, 76.8995],
    [12.5205, 76.8985]
  ];
  mapLayers.farmPolygon = L.polygon(farmCoords, {
    color: "#10b981",
    fillColor: "#10b981",
    fillOpacity: 0.25,
    weight: 2
  }).addTo(leafletMap);

  mapLayers.farmPolygon.bindPopup(`
    <div style="font-family: sans-serif; color: #1e293b;">
      <strong style="color: #065f46;">${AppState.farmer.farmTitle}</strong><br>
      Farmer: ${AppState.farmer.name}<br>
      Area: ${AppState.farmer.sizeAcres} Acres (${AppState.farmer.soilType})<br>
      Crops: ${AppState.farmer.crops}
    </div>
  `);

  const sensorIcon = L.divIcon({
    className: "custom-sensor-marker",
    html: `
      <div style="background-color: #059669; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px #10b981; border: 2px solid white;">
        📡
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

  const sensorMarker = L.marker(farmCenter, { icon: sensorIcon }).addTo(leafletMap);
  sensorMarker.bindPopup(`
    <div style="font-family: sans-serif; color: #1e293b;">
      <strong>ESP32 Sensor Station #094</strong><br>
      Moisture: ${AppState.telemetry.moisture}%<br>
      Temp: ${AppState.telemetry.temperature}°C<br>
      pH: ${AppState.telemetry.ph}<br>
      Status: FastAPI Live Synced
    </div>
  `);
  mapLayers.sensorMarkers.push(sensorMarker);

  const floodCircle = L.circle([12.5320, 76.8920], {
    color: "#ef4444",
    fillColor: "#ef4444",
    fillOpacity: 0.2,
    radius: 750
  }).addTo(leafletMap);
  floodCircle.bindPopup("<strong>⚠️ North Basin Flood Hazard Zone</strong><br>River runoff risk from 48mm heavy rain.");
  mapLayers.crisisZones.push(floodCircle);

  const pestCircle = L.circle([12.5180, 76.9050], {
    color: "#f59e0b",
    fillColor: "#f59e0b",
    fillOpacity: 0.18,
    radius: 600
  }).addTo(leafletMap);
  pestCircle.bindPopup("<strong>🐛 East Pest Infestation Cluster</strong><br>Aphid colonies spotted 1.8km east.");
  mapLayers.crisisZones.push(pestCircle);
}

function toggleMapLayer(layerName) {
  if (!leafletMap) return;
  if (layerName === "farm") {
    if (leafletMap.hasLayer(mapLayers.farmPolygon)) {
      leafletMap.removeLayer(mapLayers.farmPolygon);
      document.getElementById("btnLayerFarm").classList.replace("bg-emerald-500/20", "bg-slate-800");
    } else {
      leafletMap.addLayer(mapLayers.farmPolygon);
      document.getElementById("btnLayerFarm").classList.replace("bg-slate-800", "bg-emerald-500/20");
    }
  } else if (layerName === "sensors") {
    mapLayers.sensorMarkers.forEach(m => {
      if (leafletMap.hasLayer(m)) {
        leafletMap.removeLayer(m);
        document.getElementById("btnLayerSensors").classList.replace("bg-blue-500/20", "bg-slate-800");
      } else {
        leafletMap.addLayer(m);
        document.getElementById("btnLayerSensors").classList.replace("bg-slate-800", "bg-blue-500/20");
      }
    });
  } else if (layerName === "threats") {
    mapLayers.crisisZones.forEach(c => {
      if (leafletMap.hasLayer(c)) {
        leafletMap.removeLayer(c);
        document.getElementById("btnLayerThreats").classList.replace("bg-red-500/20", "bg-slate-800");
      } else {
        leafletMap.addLayer(c);
        document.getElementById("btnLayerThreats").classList.replace("bg-slate-800", "bg-red-500/20");
      }
    });
  }
}

// ==========================================
// 4. TAB NAVIGATION
// ==========================================
function switchTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
  const activeSection = document.getElementById("tab-" + tabId);
  if (activeSection) activeSection.classList.remove("hidden");

  document.querySelectorAll(".nav-tab").forEach(btn => {
    if (btn.getAttribute("data-tab") === tabId) {
      btn.classList.add("bg-emerald-600", "text-white", "shadow-md");
      btn.classList.remove("text-slate-300", "hover:bg-slate-800");
    } else {
      btn.classList.remove("bg-emerald-600", "text-white", "shadow-md");
      btn.classList.add("text-slate-300", "hover:bg-slate-800");
    }
  });

  if (tabId === "map-view") {
    setTimeout(() => {
      initLocationMap();
      if (leafletMap) leafletMap.invalidateSize();
    }, 200);
  } else if (tabId === "soil-iot") {
    setTimeout(() => {
      if (!telemetryChartInstance) initTelemetryChart();
    }, 150);
  }

  lucide.createIcons();
}

// ==========================================
// 5. MULTI-AGENT AI DELIBERATION (Req 6)
// ==========================================
function appendAgentLog(agentName, agentColor, message) {
  const container = document.getElementById("interAgentLogContainer");
  if (!container) return;

  const now = new Date();
  const timeStr = now.toTimeString().split(" ")[0];

  const logEntry = document.createElement("div");
  logEntry.innerHTML = `<span class="text-slate-500">[${timeStr}]</span> <span class="${agentColor}">[${agentName}]</span>: ${message}`;
  container.appendChild(logEntry);
  container.scrollTop = container.scrollHeight;
}

async function triggerFullAgentDeliberation() {
  appendAgentLog("Crisis Command", "text-purple-400", "--- Initiating System-Wide Coordination Cycle ---");

  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE}/agents/deliberate?simulated_moisture=${AppState.telemetry.moisture}`, {
        method: "POST"
      });
      if (res.ok) {
        const result = await res.json();
        
        // Update each Agent's Card on screen from Backend
        result.agent_reports.forEach(rep => {
          if (rep.agent_id === "agent_soil") {
            document.getElementById("soilAgentStatus").innerText = rep.observation;
          } else if (rep.agent_id === "agent_climate") {
            document.getElementById("climateAgentStatus").innerText = rep.observation;
          } else if (rep.agent_id === "agent_crop") {
            document.getElementById("cropAgentStatus").innerText = rep.observation;
          } else if (rep.agent_id === "agent_pest") {
            document.getElementById("pestAgentStatus").innerText = rep.observation;
          } else if (rep.agent_id === "agent_location") {
            document.getElementById("locationAgentStatus").innerText = rep.observation;
          } else if (rep.agent_id === "agent_risk") {
            document.getElementById("riskAgentStatus").innerText = rep.observation;
          }
        });

        document.getElementById("commandAgentStatus").innerText = result.master_mandate;
        
        // Log all responses
        result.agent_reports.forEach((rep, idx) => {
          setTimeout(() => {
            appendAgentLog(rep.name, "text-emerald-400", `${rep.observation} -> Action: ${rep.recommended_action}`);
          }, (idx + 1) * 300);
        });

        setTimeout(() => {
          appendAgentLog("Crisis Command", "text-purple-400", `EXECUTIVE MANDATE: ${result.master_mandate}`);
        }, 2200);

        return;
      }
    } catch (e) {
      console.warn("Backend deliberation call failed, falling back to local runner", e);
    }
  }

  // Local fallback runner
  setTimeout(() => appendAgentLog("Soil Agent", "text-emerald-400", `Telemetry poll: Moisture ${AppState.telemetry.moisture}%, pH ${AppState.telemetry.ph}.`), 350);
  setTimeout(() => appendAgentLog("Climate Agent", "text-blue-400", `Atmospheric scan: Rainfront approaching. Precip ETA 3.5h.`), 700);
  setTimeout(() => appendAgentLog("Crop Agent", "text-amber-400", `Vision scan: Early Blight pathogen sensitivity high.`), 1050);
  setTimeout(() => appendAgentLog("Pest Agent", "text-rose-400", `Pest vector model: High humidity facilitates fungal sporulation.`), 1400);
  setTimeout(() => appendAgentLog("Location Agent", "text-purple-400", `Geofence verified: Farm in Mandya Block 4 under flash flood advisory.`), 1750);
  setTimeout(() => appendAgentLog("Risk Agent", "text-yellow-400", `Conflict resolution engine: Override pump activation. Risk score 74/100.`), 2100);
  setTimeout(() => appendAgentLog("Crisis Command", "text-purple-400", `DECISION: Dispatched localized voice warning to farmer. Irrigation pump locked.`), 2500);
}

// ==========================================
// 6. IOT SENSOR SIMULATION & TELEMETRY (Req 2)
// ==========================================
async function updateSimulatedSensor(sensorKey, value, syncToBackend = true) {
  value = parseFloat(value);

  if (sensorKey === "moisture") {
    AppState.telemetry.moisture = value;
    document.getElementById("sliderMoistureDisplay").innerText = value + "%";
    document.getElementById("statMoisture").innerText = value + "%";
    document.getElementById("iotMoistureVal").innerText = value + "%";
    document.getElementById("statMoistureBar").style.width = Math.min(value, 100) + "%";

    const offset = 276 - (276 * value) / 100;
    const gauge = document.getElementById("gaugeMoistureCircle");
    if (gauge) gauge.style.strokeDashoffset = offset;

    reevaluateCrisisCondition();

  } else if (sensorKey === "temp") {
    AppState.telemetry.temperature = value;
    document.getElementById("sliderTempDisplay").innerText = value + "°C";
    document.getElementById("statTemp").innerText = value + "°C";
    document.getElementById("iotTempVal").innerText = value + "°C";

    const offset = 276 - (276 * (value - 10)) / 40;
    const gauge = document.getElementById("gaugeTempCircle");
    if (gauge) gauge.style.strokeDashoffset = offset;

  } else if (sensorKey === "ph") {
    AppState.telemetry.ph = value;
    document.getElementById("sliderPHDisplay").innerText = value;
    document.getElementById("statPH").innerText = value + " pH";
    document.getElementById("iotPHVal").innerText = value;

    const offset = 276 - (276 * (value - 4)) / 6;
    const gauge = document.getElementById("gaugePHCircle");
    if (gauge) gauge.style.strokeDashoffset = offset;
  }

  // Update chart real-time point
  if (telemetryChartInstance) {
    const dataLen = telemetryChartInstance.data.datasets[0].data.length;
    telemetryChartInstance.data.datasets[0].data[dataLen - 1] = AppState.telemetry.moisture;
    telemetryChartInstance.data.datasets[1].data[dataLen - 1] = AppState.telemetry.temperature;
    telemetryChartInstance.update();
  }

  // Send Telemetry to FastAPI Backend
  if (syncToBackend && isBackendOnline) {
    try {
      await fetch(`${API_BASE}/iot/telemetry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          device_id: AppState.farmer.esp32Id,
          moisture: AppState.telemetry.moisture,
          temperature: AppState.telemetry.temperature,
          ph: AppState.telemetry.ph,
          nitrogen: AppState.telemetry.nitrogen,
          phosphorus: AppState.telemetry.phosphorus,
          potassium: AppState.telemetry.potassium,
          battery_level: AppState.telemetry.battery
        })
      });
    } catch (e) {
      console.warn("Backend telemetry ingestion failed", e);
    }
  }
}

function reevaluateCrisisCondition() {
  const m = AppState.telemetry.moisture;
  const banner = document.getElementById("globalCrisisBanner");
  const bannerText = document.getElementById("bannerText");
  const riskBadge = document.getElementById("statRiskBadge");
  const riskScore = document.getElementById("statRiskScore");
  const conflictSummary = document.getElementById("statConflictSummary");

  if (m < 20) {
    AppState.crisis.severity = "CRITICAL";
    AppState.crisis.riskScore = 89;
    riskBadge.innerText = "CRITICAL DROUGHT";
    riskBadge.className = "px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30";
    riskScore.innerHTML = `89<span class="text-sm font-normal text-slate-400">/100</span>`;
    bannerText.innerHTML = `🔥 <strong>DROUGHT ALERT:</strong> Soil moisture critically low (${m}%). Irrigation required before permanent wilting point!`;
    banner.className = "bg-gradient-to-r from-red-600 via-rose-700 to-amber-700 px-4 py-2 text-white text-xs sm:text-sm font-semibold flex items-center justify-between shadow-lg sticky top-0 z-50";
    appendAgentLog("Soil Agent", "text-rose-400", `ALERT: Soil moisture collapsed to ${m}%. Permanent wilting danger!`);
  } else if (m > 85) {
    AppState.crisis.severity = "CRITICAL FLOOD";
    AppState.crisis.riskScore = 95;
    riskBadge.innerText = "WATERLOGGING HAZARD";
    riskBadge.className = "px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30";
    riskScore.innerHTML = `95<span class="text-sm font-normal text-slate-400">/100</span>`;
    bannerText.innerHTML = `🌊 <strong>FLOOD HAZARD:</strong> Soil fully saturated (${m}%). Waterlogging detected! Open emergency drainage.`;
    banner.className = "bg-gradient-to-r from-blue-700 via-cyan-800 to-slate-900 px-4 py-2 text-white text-xs sm:text-sm font-semibold flex items-center justify-between shadow-lg sticky top-0 z-50";
    appendAgentLog("Soil Agent", "text-blue-400", `ALERT: Soil saturated at ${m}%. Root hypoxia risk active!`);
  } else {
    AppState.crisis.severity = "HIGH RISK";
    AppState.crisis.riskScore = 74;
    riskBadge.innerText = "HIGH RISK";
    riskBadge.className = "px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30";
    riskScore.innerHTML = `74<span class="text-sm font-normal text-slate-400">/100</span>`;
    conflictSummary.innerText = "Conflict: Soil Dry vs Imminent Rain";
    bannerText.innerHTML = `🚨 <strong>CRISIS ALERT:</strong> Heavy unseasonal rain (48mm) expected in 4h. Conflict detected: Soil Agent dry, Climate Agent wet. Irrigation suspended!`;
    banner.className = "bg-gradient-to-r from-amber-600 via-red-600 to-rose-700 px-4 py-2 text-white text-xs sm:text-sm font-semibold flex items-center justify-between shadow-lg sticky top-0 z-50";
  }
}

function triggerPresetCrisis(type) {
  if (type === "drought") {
    document.getElementById("sliderMoisture").value = 12;
    updateSimulatedSensor("moisture", 12);
  } else if (type === "flood") {
    document.getElementById("sliderMoisture").value = 95;
    updateSimulatedSensor("moisture", 95);
  }
}

function refreshIoTTelemetry() {
  const delta = (Math.random() * 2 - 1).toFixed(1);
  const newMoisture = Math.max(10, Math.min(95, AppState.telemetry.moisture + parseFloat(delta)));
  updateSimulatedSensor("moisture", newMoisture);
  appendAgentLog("ESP32 IoT", "text-emerald-400", `Telemetry refresh packet ACK from node ${AppState.farmer.esp32Id}.`);
}

// ==========================================
// 7. CROP DISEASE & PEST VISION SCANNER (Req 4, 5)
// ==========================================
async function loadSampleCropImage(caseKey) {
  const scannerBox = document.getElementById("scannerBox");
  const imgElem = document.getElementById("scannedImagePreview");
  const statusBadge = document.getElementById("scanStatusBadge");

  scannerBox.classList.add("is-scanning");
  statusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span> AI Inferring on FastAPI Backend...`;

  if (isBackendOnline) {
    try {
      const formData = new FormData();
      formData.append("case_key", caseKey);
      formData.append("crop_type", caseKey.includes("rice") ? "Paddy" : "Tomato");

      const res = await fetch(`${API_BASE}/vision/detect-disease`, {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        const diag = await res.json();
        
        setTimeout(() => {
          const sampleImgMap = {
            "tomato-blight": "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=600&auto=format&fit=crop&q=80",
            "rice-blast": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
            "armyworm-pest": "https://images.unsplash.com/photo-1533293046038-f99a9a08159b?w=600&auto=format&fit=crop&q=80",
            "healthy-paddy": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80"
          };

          imgElem.src = sampleImgMap[caseKey] || imgElem.src;
          document.getElementById("dashCropThumb").src = imgElem.src;
          document.getElementById("diagTitle").innerText = `${diag.disease_name} (${diag.scientific_name})`;
          document.getElementById("diagSeverity").innerText = `SEVERITY: ${diag.severity}`;
          document.getElementById("diagConfidence").innerText = `Confidence: ${diag.confidence_pct}%`;
          document.getElementById("diagSymptoms").innerText = diag.symptoms;
          
          if (diag.pest_threat_note) {
            document.getElementById("pestAdvice").innerText = diag.pest_threat_note;
          }

          const orgList = document.getElementById("diagOrganicList");
          orgList.innerHTML = "";
          diag.organic_remedies.forEach(item => {
            const li = document.createElement("li");
            li.innerText = item;
            orgList.appendChild(li);
          });

          const chemList = document.getElementById("diagChemicalList");
          chemList.innerHTML = "";
          diag.chemical_treatments.forEach(item => {
            const li = document.createElement("li");
            li.innerText = item;
            chemList.appendChild(li);
          });

          scannerBox.classList.remove("is-scanning");
          statusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span> Backend Analysis Complete`;
          appendAgentLog("Crop Health Agent", "text-amber-400", `FastAPI CNN classified image: ${diag.disease_name} (${diag.confidence_pct}%)`);
        }, 900);
        return;
      }
    } catch (e) {
      console.warn("Backend vision API error, using local fallback", e);
    }
  }

  // Local fallback
  setTimeout(() => {
    scannerBox.classList.remove("is-scanning");
    statusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span> Analysis Complete`;
  }, 1000);
}

async function handleCropImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const scannerBox = document.getElementById("scannerBox");
  const imgElem = document.getElementById("scannedImagePreview");
  const statusBadge = document.getElementById("scanStatusBadge");

  const reader = new FileReader();
  reader.onload = async function(e) {
    imgElem.src = e.target.result;
    document.getElementById("dashCropThumb").src = e.target.result;

    scannerBox.classList.add("is-scanning");
    statusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span> Uploading to FastAPI CNN Model...`;

    if (isBackendOnline) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("crop_type", "Tomato");

        const res = await fetch(`${API_BASE}/vision/detect-disease`, {
          method: "POST",
          body: formData
        });

        if (res.ok) {
          const diag = await res.json();
          scannerBox.classList.remove("is-scanning");
          statusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span> Image Processed via FastAPI`;
          document.getElementById("diagTitle").innerText = `${diag.disease_name} (${diag.scientific_name})`;
          document.getElementById("diagSeverity").innerText = `SEVERITY: ${diag.severity}`;
          document.getElementById("diagConfidence").innerText = `Confidence: ${diag.confidence_pct}%`;
          appendAgentLog("Crop Health Agent", "text-amber-400", "Custom farmer photo uploaded and classified via FastAPI CNN.");
          return;
        }
      } catch (err) {
        console.warn("Upload to backend failed", err);
      }
    }

    setTimeout(() => {
      scannerBox.classList.remove("is-scanning");
      statusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span> Custom Upload Analyzed`;
    }, 1500);
  };
  reader.readAsDataURL(file);
}

// ==========================================
// 8. MULTILINGUAL VOICE ASSISTANT (Req 9)
// ==========================================
let speechRecognitionInstance = null;
let isListening = false;

function openVoiceAssistantModal() {
  document.getElementById("voiceModal").classList.remove("hidden");
  lucide.createIcons();
}

function closeVoiceAssistantModal() {
  document.getElementById("voiceModal").classList.add("hidden");
  if (isListening && speechRecognitionInstance) {
    speechRecognitionInstance.stop();
  }
}

function changeLanguage(langKey) {
  AppState.farmer.language = langKey;
  const bundle = Translations[langKey] || Translations["en"];

  const sel1 = document.getElementById("languageSelect");
  const sel2 = document.getElementById("modalVoiceLangSelect");
  if (sel1) sel1.value = langKey;
  if (sel2) sel2.value = langKey;

  const playBtnText = document.getElementById("playVoiceBtnText");
  if (playBtnText) playBtnText.innerText = bundle.playBtnText;

  const transLang = document.getElementById("transcriptionLang");
  if (transLang) transLang.innerText = bundle.voiceCode;

  const bannerText = document.getElementById("bannerText");
  if (bannerText) bannerText.innerHTML = bundle.bannerText;

  appendAgentLog("Voice Assistant", "text-emerald-400", `Language switched to ${bundle.langName} (${bundle.voiceCode}).`);
}

function speakTextAloud(text, langCode) {
  if (!("speechSynthesis" in window)) {
    alert("Speech Synthesis not supported by this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode || (Translations[AppState.farmer.language] || Translations["en"]).voiceCode;
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  const waveContainer = document.getElementById("voiceWaveform");
  if (waveContainer) waveContainer.classList.add("listening");

  utterance.onend = function() {
    if (waveContainer) waveContainer.classList.remove("listening");
  };
  utterance.onerror = function() {
    if (waveContainer) waveContainer.classList.remove("listening");
  };

  window.speechSynthesis.speak(utterance);
}

function playCrisisAudioAlert() {
  const langKey = AppState.farmer.language;
  const bundle = Translations[langKey] || Translations["en"];
  speakTextAloud(bundle.alertSpoken, bundle.voiceCode);
}

function replayCurrentVoiceReply() {
  const replyElem = document.getElementById("aiVoiceResponseText");
  if (replyElem) {
    const text = replyElem.innerText;
    const bundle = Translations[AppState.farmer.language] || Translations["en"];
    speakTextAloud(text, bundle.voiceCode);
  }
}

function toggleSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition API is not supported in this browser. Please test using the quick question buttons below!");
    return;
  }

  const statusText = document.getElementById("voiceStatusText");
  const waveContainer = document.getElementById("voiceWaveform");
  const micRecordBtn = document.getElementById("micRecordBtn");

  if (isListening) {
    if (speechRecognitionInstance) speechRecognitionInstance.stop();
    isListening = false;
    statusText.innerText = "Click microphone to speak your question";
    waveContainer.classList.remove("listening");
    micRecordBtn.classList.remove("pulse-critical");
    return;
  }

  try {
    speechRecognitionInstance = new SpeechRecognition();
    const bundle = Translations[AppState.farmer.language] || Translations["en"];
    speechRecognitionInstance.lang = bundle.voiceCode;
    speechRecognitionInstance.continuous = false;
    speechRecognitionInstance.interimResults = false;

    speechRecognitionInstance.onstart = function() {
      isListening = true;
      statusText.innerText = `Listening in ${bundle.langName}... Speak now!`;
      waveContainer.classList.add("listening");
      micRecordBtn.classList.add("pulse-critical");
    };

    speechRecognitionInstance.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      document.getElementById("transcribedSpeechText").innerText = `"${transcript}"`;
      handleFarmerVoiceQuery(transcript);
    };

    speechRecognitionInstance.onerror = function(event) {
      console.warn("Speech recognition error:", event.error);
      statusText.innerText = "Could not detect voice. Please test using preset chips below.";
      isListening = false;
      waveContainer.classList.remove("listening");
      micRecordBtn.classList.remove("pulse-critical");
    };

    speechRecognitionInstance.onend = function() {
      isListening = false;
      waveContainer.classList.remove("listening");
      micRecordBtn.classList.remove("pulse-critical");
      statusText.innerText = "Click microphone to speak your question";
    };

    speechRecognitionInstance.start();
  } catch (err) {
    console.error("Speech recognition startup error:", err);
    statusText.innerText = "Speech mic access blocked. Use sample questions below.";
  }
}

async function handleFarmerVoiceQuery(queryText) {
  const langKey = AppState.farmer.language;
  const bundle = Translations[langKey] || Translations["en"];
  let reply = "";

  // Query Backend Voice NLP Endpoint
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE}/voice/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query_text: queryText,
          language: langKey
        })
      });
      if (res.ok) {
        const data = await res.json();
        reply = data.spoken_response;
        document.getElementById("aiVoiceResponseText").innerText = `"${reply}"`;
        speakTextAloud(reply, bundle.voiceCode);
        appendAgentLog("FastAPI Voice NLP", "text-emerald-400", `Voice query processed via backend in ${bundle.langName}.`);
        return;
      }
    } catch (e) {
      console.warn("Backend voice query failed, using local fallback", e);
    }
  }

  // Fallback local logic
  const q = queryText.toLowerCase();
  if (q.includes("spray") || q.includes("pesticide") || q.includes("ಕೀಟನಾಶಕ") || q.includes("कीटनाशक")) {
    reply = "Do not spray pesticide today! 48mm heavy rain expected. Spray on Friday morning.";
  } else if (q.includes("irrigate") || q.includes("water") || q.includes("pump") || q.includes("ನೀರು") || q.includes("सिंचाई")) {
    reply = "Do not start irrigation! 48mm storm rainfall is arriving in 4 hours.";
  } else {
    reply = "Your soil moisture is 28%, pH is 6.5. Weather warning is active.";
  }

  document.getElementById("aiVoiceResponseText").innerText = `"${reply}"`;
  speakTextAloud(reply, bundle.voiceCode);
}

function askPresetVoiceQuestion(category) {
  const questionMap = {
    pesticide: "Should I spray pesticide on my crops today?",
    irrigation: "Should I turn on the water irrigation pump?",
    soil: "What is the condition of my soil sensors?",
    disease: "What crop disease is detected on tomato leaves?"
  };

  const text = questionMap[category] || questionMap.pesticide;
  document.getElementById("transcribedSpeechText").innerText = `"${text}"`;
  handleFarmerVoiceQuery(text);
}

function speakCurrentDiagnosis() {
  const title = document.getElementById("diagTitle").innerText;
  const bundle = Translations[AppState.farmer.language] || Translations["en"];
  const message = `Crop Diagnosis: ${title}. Please review recommended treatments before incoming rain.`;
  speakTextAloud(message, bundle.voiceCode);
}

// ==========================================
// 9. SMS ALERT NOTIFICATION SIMULATOR (Req 10)
// ==========================================
function openSmsModal() {
  document.getElementById("smsModal").classList.remove("hidden");
  lucide.createIcons();
}

function closeSmsModal() {
  document.getElementById("smsModal").classList.add("hidden");
}

async function sendSimulatedSMS() {
  const input = document.getElementById("customSmsInput");
  const text = input.value.trim();
  if (!text) return;

  const container = document.getElementById("smsListContainer");
  const now = new Date();
  const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;

  // Call FastAPI backend to dispatch SMS
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE}/alerts/dispatch-sms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: AppState.farmer.phone,
          message: text,
          sender_id: "AGRI-CRISIS"
        })
      });
      if (res.ok) {
        const report = await res.json();
        appendAgentLog("FastAPI GSM Gateway", "text-blue-400", `SMS ACK: Delivered to ${report.phone} [${report.gateway_ack_id}]`);
      }
    } catch (e) {
      console.warn("Backend SMS dispatch failed", e);
    }
  }

  const smsCard = document.createElement("div");
  smsCard.className = "bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-slate-700 text-xs space-y-1 shadow";
  smsCard.innerHTML = `
    <div class="text-[10px] text-emerald-400 font-bold uppercase">📱 MANUAL AGENT DISPATCH (FASTAPI)</div>
    <p>${text}</p>
    <div class="text-[10px] text-slate-400 text-right">${timeStr} • Delivered</div>
  `;

  container.prepend(smsCard);
  input.value = "";

  const badge = document.getElementById("smsBadge");
  if (badge) badge.innerText = parseInt(badge.innerText || "0") + 1;
}

// ==========================================
// 10. FARMER PROFILE & REGISTRATION (Req 1)
// ==========================================
function openFarmerProfileModal() {
  document.getElementById("farmerProfileModal").classList.remove("hidden");
  lucide.createIcons();
}

function closeFarmerProfileModal() {
  document.getElementById("farmerProfileModal").classList.add("hidden");
}

async function saveFarmerProfile(event) {
  event.preventDefault();

  const profileData = {
    name: document.getElementById("regFarmerName").value,
    phone: document.getElementById("regFarmerPhone").value,
    farm_title: document.getElementById("regFarmTitle").value,
    location: document.getElementById("regLocation").value,
    size_acres: parseFloat(document.getElementById("regFarmSize").value) || 4.5,
    soil_type: document.getElementById("regSoilType").value,
    irrigation_method: document.getElementById("regIrrigation").value,
    crops: document.getElementById("regCrops").value,
    esp32_device_id: document.getElementById("regESP32Id").value,
    preferred_language: document.getElementById("regLanguage").value
  };

  // Sync to FastAPI Backend (Yash R's Database model)
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE}/farmer/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData)
      });
      if (res.ok) {
        appendAgentLog("FastAPI DB", "text-purple-400", `Profile saved in SQLite/PostgreSQL database for ${profileData.name}.`);
      }
    } catch (e) {
      console.warn("Failed to persist profile to backend DB", e);
    }
  }

  // Update frontend state
  AppState.farmer.name = profileData.name;
  AppState.farmer.phone = profileData.phone;
  AppState.farmer.farmTitle = profileData.farm_title;
  AppState.farmer.location = profileData.location;
  AppState.farmer.sizeAcres = profileData.size_acres;
  AppState.farmer.soilType = profileData.soil_type;
  AppState.farmer.irrigation = profileData.irrigation_method;
  AppState.farmer.crops = profileData.crops;
  AppState.farmer.esp32Id = profileData.esp32_device_id;
  AppState.farmer.language = profileData.preferred_language;

  document.getElementById("dashFarmerName").innerText = AppState.farmer.name;
  document.getElementById("headerFarmerName").innerText = AppState.farmer.name;
  document.getElementById("dashFarmTitle").innerText = `${AppState.farmer.farmTitle} • ${AppState.farmer.location}`;
  document.getElementById("dashCrops").innerText = AppState.farmer.crops;
  document.getElementById("dashFarmSize").innerText = `${AppState.farmer.sizeAcres} Acres (${AppState.farmer.soilType})`;

  changeLanguage(AppState.farmer.language);
  closeFarmerProfileModal();
  alert("Farmer profile saved successfully & persisted to FastAPI Database!");
}

// ==========================================
// 11. DYNAMIC FARM SCHEDULING (Req 11)
// ==========================================
async function toggleTaskStatus(taskIndex) {
  const task = AppState.schedule[taskIndex];
  if (!task) return;

  task.completed = !task.completed;

  if (isBackendOnline && task.id) {
    try {
      await fetch(`${API_BASE}/schedule/item/${task.id}/toggle`, { method: "PATCH" });
      appendAgentLog("FastAPI DB", "text-emerald-400", `Updated task ${task.id} status in database.`);
    } catch (e) {
      console.warn("Failed to toggle task status in backend", e);
    }
  }

  const tbody = document.getElementById("scheduleTableBody");
  const row = tbody.children[taskIndex];
  if (row) {
    if (task.completed) {
      row.classList.add("opacity-50", "line-through");
    } else {
      row.classList.remove("opacity-50", "line-through");
    }
  }
}

async function openAddTaskModal() {
  const taskName = prompt("Enter new farm task (e.g. Sowing, Weeding, Fertilizing):");
  if (!taskName) return;

  const newTask = {
    activity: taskName,
    plot: "Tomato • Plot B",
    scheduled_window: "Saturday, 8:00 AM",
    status: "AI VERIFIED",
    reason: "Scheduled in dry window following rain precipitation."
  };

  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE}/schedule/item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
      });
      if (res.ok) {
        const created = await res.json();
        AppState.schedule.push({
          id: created.id,
          activity: created.activity,
          plot: created.plot,
          window: created.scheduled_window,
          status: created.status,
          badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
          reason: created.reason,
          completed: created.is_completed
        });
        renderScheduleTable();
        appendAgentLog("FastAPI DB", "text-purple-400", `Persisted dynamic task: "${taskName}" to backend.`);
        return;
      }
    } catch (e) {
      console.warn("Failed to create task on backend", e);
    }
  }

  AppState.schedule.push({
    id: Date.now(),
    activity: taskName,
    plot: "Tomato • Plot B",
    window: "Saturday, 8:00 AM",
    status: "AI VERIFIED",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    reason: "Scheduled in dry window following rain precipitation.",
    completed: false
  });
  renderScheduleTable();
}

function renderScheduleTable() {
  const tbody = document.getElementById("scheduleTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";
  AppState.schedule.forEach((task, index) => {
    const tr = document.createElement("tr");
    tr.className = `hover:bg-slate-900/50 transition-all ${task.completed ? "opacity-50 line-through" : ""}`;
    tr.innerHTML = `
      <td class="p-4 font-bold text-white flex items-center gap-2">
        <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i> ${task.activity}
      </td>
      <td class="p-4 text-slate-300">${task.plot}</td>
      <td class="p-4 text-slate-300">${task.window}</td>
      <td class="p-4">
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${task.badgeClass} border">
          ${task.status}
        </span>
      </td>
      <td class="p-4 text-slate-400 max-w-xs">${task.reason}</td>
      <td class="p-4 text-right">
        <button onclick="toggleTaskStatus(${index})" class="text-slate-400 hover:text-white p-1" title="Mark Complete">
          <i data-lucide="check" class="w-4 h-4"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  lucide.createIcons();
}

// ==========================================
// 12. ESCALATION TO AGRICULTURAL EXPERT
// ==========================================
async function escalateToExpert() {
  if (isBackendOnline) {
    try {
      const res = await fetch(`${API_BASE}/crisis/escalate`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        appendAgentLog("FastAPI Escalation", "text-yellow-400", `ESCALATION: Case ${data.escalation_ticket_id} assigned to ${data.assigned_officer}.`);
        alert(`Case Escalated via FastAPI!\n\nTicket: ${data.escalation_ticket_id}\nAssigned: ${data.assigned_officer}\n\n${data.message}`);
        return;
      }
    } catch (e) {
      console.warn("Backend escalation failed", e);
    }
  }

  appendAgentLog("Risk Agent", "text-yellow-400", "ESCALATION: Low-confidence conflict packet forwarded to Krishi Vigyan Kendra (KVK) Agronomist.");
  alert("Case Escalated!\n\nTelemetry packet and leaf images have been forwarded to the local Krishi Vigyan Kendra (KVK) Agronomist Dr. Ramesh K. (Mandya).");
}

function dismissBanner() {
  const b = document.getElementById("globalCrisisBanner");
  if (b) b.classList.add("hidden");
}

function openSimulationDrawer() {
  switchTab("soil-iot");
}

// ==========================================
// 13. INITIALIZATION ON DOM LOAD
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  changeLanguage("kn");

  // Check and establish live link with FastAPI Backend (port 8000)
  checkBackendConnectivity();

  // Auto-refresh telemetry sync every 15 seconds
  setInterval(() => {
    refreshIoTTelemetry();
  }, 15000);
});
