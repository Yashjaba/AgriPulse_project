import React, { useState } from 'react';
import { Smartphone, Send, X } from 'lucide-react';

export default function AlertSystem({ onClose, farmer }) {
  const [messages, setMessages] = useState([
    {
      title: "🚨 URGENT CRISIS ALERT",
      text: "CRITICAL: 48mm heavy rain within 4 hours. STOP ALL IRRIGATION PUMPS. Open field drainage ditches immediately to protect paddy crops. - Team Titans Agri Command",
      time: "18:28"
    },
    {
      title: "🌾 ಬೆಳೆ ಎಚ್ಚರಿಕೆ (CROP ADVISORY)",
      text: "ಟೊಮೆಟೊ ಬೆಳೆಯಲ್ಲಿ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಶಿಲೀಂಧ್ರ ರೋಗ ಪತ್ತೆಯಾಗಿದೆ. ಮಳೆ ನಿಂತ ನಂತರ ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ (2.5 ಗ್ರಾಂ/ಲೀ) ಸಿಂಪಡಿಸಿ. - ಅಗ್ರಿಕ್ರೈಸಿಸ್",
      time: "18:15"
    }
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
    setMessages(prev => [
      {
        title: "📱 MANUAL SMS DISPATCH",
        text: inputVal,
        time: timeStr
      },
      ...prev
    ]);
    setInputVal("");
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl p-6 space-y-4 shadow-2xl text-slate-100">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">Farmer SMS Simulator</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Requirement 10: Multi-channel alert dispatch (In-App, Voice, SMS) for farmers without continuous internet access.
        </p>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 font-sans">
          <div className="flex justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
            <span className="font-bold text-white">Recipient: {farmer.phone}</span>
            <span>AGRI-CMD</span>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {messages.map((m, i) => (
              <div key={i} className="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-slate-700 text-xs space-y-1 shadow">
                <div className="text-[10px] text-red-400 font-bold uppercase">{m.title}</div>
                <p>{m.text}</p>
                <div className="text-[10px] text-slate-400 text-right">{m.time} • Delivered</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <input 
            type="text" 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type emergency alert message..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          />
          <button onClick={handleSend} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1">
            <Send className="w-3.5 h-3.5" /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
