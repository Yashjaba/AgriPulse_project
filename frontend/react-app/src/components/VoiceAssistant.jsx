import React, { useState } from 'react';
import { Mic, Volume2, X, Bot } from 'lucide-react';

const VoiceDatabase = {
  en: {
    voiceCode: 'en-IN',
    pesticide: "Do not spray pesticide today! Heavy rainfall of 48mm will wash away the chemical. Spray on Friday morning.",
    irrigation: "Do not start irrigation! Even though your soil is dry at 28%, torrential rain is arriving in 4 hours.",
    soil: "Your soil moisture is 28 percent (Dry), temperature is 29.4 degrees, and pH is 6.5 which is balanced."
  },
  hi: {
    voiceCode: 'hi-IN',
    pesticide: "आज कीटनाशक का छिड़काव न करें! 48mm भारी बारिश से दवा बह जाएगी। शुक्रवार सुबह धूप निकलने पर छिड़काव करें।",
    irrigation: "सिंचाई पंप चालू न करें! मिट्टी में नमी कम होने पर भी कुछ ही घंटों में भारी बारिश होने वाली है।",
    soil: "आपकी मिट्टी की नमी 28% (कम) है, तापमान 29.4 डिग्री सेल्सियस और पीएच 6.5 उत्तम है।"
  },
  kn: {
    voiceCode: 'kn-IN',
    pesticide: "ಇಂದು ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸಬೇಡಿ! ಮುಂದಿನ 4 ಗಂಟೆಗಳಲ್ಲಿ 48ಮಿಮೀ ಭಾರಿ ಮಳೆಯಿಂದ ಔಷಧಿ ವ್ಯರ್ಥವಾಗುತ್ತದೆ. ಶುಕ್ರವಾರ ಬೆಳಿಗ್ಗೆ ಸಿಂಪಡಿಸಿ.",
    irrigation: "ದಯವಿಟ್ಟು ನೀರಾವರಿ ಪಂಪ್ ಆನ್ ಮಾಡಬೇಡಿ! ಮಣ್ಣಿನಲ್ಲಿ ತೇವಾಂಶ 28% ಇದ್ದರೂ ಭಾರಿ ಮಳೆ ಬರಲಿದೆ.",
    soil: "ನಿಮ್ಮ ಮಣ್ಣಿನ ತೇವಾಂಶ 28% (ಕಡಿಮೆ), ತಾಪಮಾನ 29.4°C ಮತ್ತು ಪಿಹೆಚ್ 6.5 (ಉತ್ತಮ) ಮಟ್ಟದಲ್ಲಿದೆ."
  },
  te: {
    voiceCode: 'te-IN',
    pesticide: "ఈరోజు పురుగుమందు పిచికారీ చేయవద్దు! 48 మి.మీ భారీ వర్షం కురవనుంది. శుక్రవారం ఉదయం పిచికారీ చేయండి.",
    irrigation: "మోటారు ఆన్ చేయవద్దు! నేల తేమ తక్కువగా ఉన్నప్పటికీ త్వరలో భారీ వర్షం రానుంది.",
    soil: "మీ నేల తేమ 28% (తక్కువ), ఉష్ಣోగ్రత 29.4 డిగ్రీలు, pH 6.5 సాధారణంగా ఉంది."
  },
  ta: {
    voiceCode: 'ta-IN',
    pesticide: "இன்று பூச்சிக்கொல்லி தெளிக்க வேண்டாம்! கனமழையால் மருந்து வீணாகும். வெள்ளிக்கிழமை தெளிக்கவும்.",
    irrigation: "பாசனத்தை தொடங்க வேண்டாம்! மழை வரவிருப்பதால் பயிர்கள் அழுகும் அபாயம் உள்ளது.",
    soil: "மண் ஈரப்பதம் 28%, வெப்பநிலை 29.4°C மற்றும் pH அளவு 6.5 ஆக உள்ளது."
  },
  mr: {
    voiceCode: 'mr-IN',
    pesticide: "आज औषध फवारणी करू नका! मुसळधार पावसामुळे औषध वाहून जाईल. शुक्रवारी फवारणी करा.",
    irrigation: "पंप सुरू करू नका! थोड्याच वेळात मोठा पाऊस येत आहे.",
    soil: "तुमच्या शेतातील ओलावा २८%, तापमान २९.४ अंश आणि सामू ६.५ आहे."
  }
};

export default function VoiceAssistant({ language, setLanguage, onClose }) {
  const [transcribed, setTranscribed] = useState("Should I spray pesticide on my crops today?");
  const [response, setResponse] = useState(VoiceDatabase[language]?.pesticide || VoiceDatabase.en.pesticide);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = VoiceDatabase[language]?.voiceCode || 'en-IN';
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    }
  };

  const handlePreset = (type) => {
    const qMap = {
      pesticide: "Should I spray pesticide on my crops today?",
      irrigation: "Should I turn on the water irrigation pump?",
      soil: "What is my soil moisture and temperature status?"
    };
    const reply = VoiceDatabase[language]?.[type] || VoiceDatabase.en[type];
    setTranscribed(qMap[type]);
    setResponse(reply);
    speakText(reply);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl p-6 space-y-5 shadow-2xl text-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Local Language Voice Assistant</h3>
              <p className="text-xs text-slate-400">Requirement 9: Multilingual voice interaction for farmers</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between bg-slate-950 p-2 rounded-xl text-xs">
          <span className="text-slate-400">Language:</span>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-slate-800 text-white rounded-lg px-2.5 py-1 border border-slate-700">
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="kn">ಕನ್ನಡ (Kannada)</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="mr">मराठी (Marathi)</option>
          </select>
        </div>

        <div className="flex flex-col items-center justify-center py-4 space-y-3">
          <button onClick={() => speakText(response)} className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-105 transition-transform">
            <Mic className="w-8 h-8 text-white" />
          </button>
          <span className="text-xs text-slate-400">Click to listen to AI spoken response</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
          <span className="text-slate-500 text-[10px] uppercase font-bold">Farmer Voice Input:</span>
          <p className="text-white italic">"{transcribed}"</p>
        </div>

        <div className="bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/30 text-xs space-y-1">
          <div className="flex justify-between items-center text-emerald-400 font-semibold text-[10px]">
            <span className="flex items-center gap-1"><Bot className="w-3.5 h-3.5" /> AI Response:</span>
            <button onClick={() => speakText(response)} className="hover:underline flex items-center gap-1">
              <Volume2 className="w-3 h-3" /> Replay
            </button>
          </div>
          <p className="text-slate-200">"{response}"</p>
        </div>

        <div className="text-xs space-y-1">
          <span className="text-slate-400 font-medium">Quick Test Prompts:</span>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => handlePreset('pesticide')} className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
              🌧️ Pesticide today?
            </button>
            <button onClick={() => handlePreset('irrigation')} className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
              💧 Irrigation pump?
            </button>
            <button onClick={() => handlePreset('soil')} className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
              🌱 Soil status?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
