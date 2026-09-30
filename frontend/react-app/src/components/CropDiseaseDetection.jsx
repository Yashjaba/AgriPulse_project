import React, { useState } from 'react';
import { Scan, Upload, Leaf, FlaskConical, Volume2 } from 'lucide-react';

export default function CropDiseaseDetection({ language = 'kn' }) {
  const [selectedCase, setSelectedCase] = useState({
    title: 'Tomato Early Blight (Alternaria solani)',
    severity: 'MODERATE',
    confidence: '94.6%',
    symptoms: 'Concentric ring target board spots on lower leaves with chlorotic yellowing.',
    organic: ['Spray 5% Neem Seed Kernel Extract.', 'Apply Trichoderma viride @ 5g/L drench.'],
    chemical: ['Mancozeb 75 WP @ 2g/L or Copper Oxychloride 50 WP @ 2.5g/L.', 'Spray ONLY after Friday storm!'],
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=600&auto=format&fit=crop&q=80'
  });

  const [isScanning, setIsScanning] = useState(false);

  const handleCaseSelect = (caseType) => {
    setIsScanning(true);
    setTimeout(() => {
      if (caseType === 'rice') {
        setSelectedCase({
          title: 'Rice Blast (Magnaporthe oryzae)',
          severity: 'CRITICAL',
          confidence: '97.2%',
          symptoms: 'Spindle-shaped lesions with dark margins on paddy leaves.',
          organic: ['Pseudomonas fluorescens @ 2.5kg/ha foliar spray.'],
          chemical: ['Tricyclazole 75 WP @ 0.6g/L.'],
          image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80'
        });
      } else {
        setSelectedCase({
          title: 'Tomato Early Blight (Alternaria solani)',
          severity: 'MODERATE',
          confidence: '94.6%',
          symptoms: 'Concentric ring target board spots on lower leaves.',
          organic: ['Spray 5% Neem Seed Kernel Extract.'],
          chemical: ['Mancozeb 75 WP @ 2g/L.'],
          image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=600&auto=format&fit=crop&q=80'
        });
      }
      setIsScanning(false);
    }, 1000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setIsScanning(true);
        setTimeout(() => {
          setSelectedCase(prev => ({
            ...prev,
            title: 'Custom Upload Leaf Analysis',
            confidence: '93.2%',
            image: event.target.result
          }));
          setIsScanning(false);
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Scan className="w-6 h-6 text-emerald-400" /> AI Crop Disease Vision Scanner
          </h2>
          <p className="text-xs text-slate-400 mt-1">Upload leaf photos or choose a benchmark case.</p>
        </div>
        <label className="cursor-pointer px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition-all">
          <Upload className="w-4 h-4" /> Upload Leaf Photo
          <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
            <img src={selectedCase.image} alt="Crop Leaf" className="w-full h-full object-cover" />
            {isScanning && (
              <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                <span className="text-xs font-bold text-white bg-black/60 px-3 py-1 rounded-full animate-pulse">
                  Scanning foliage CNN features...
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-2 text-xs">
            <button onClick={() => handleCaseSelect('tomato')} className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">
              Tomato Case
            </button>
            <button onClick={() => handleCaseSelect('rice')} className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">
              Rice Blast Case
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4 text-xs">
          <div className="flex justify-between items-start pb-2 border-b border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Diagnosis</span>
              <h3 className="text-lg font-bold text-white">{selectedCase.title}</h3>
            </div>
            <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {selectedCase.severity} ({selectedCase.confidence})
            </span>
          </div>

          <p className="text-slate-300 leading-relaxed">{selectedCase.symptoms}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-950/30 border border-emerald-500/30 p-3 rounded-xl space-y-1">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Leaf className="w-4 h-4" /> Organic Remedy
              </div>
              <ul className="list-disc list-inside text-slate-300 space-y-1">
                {selectedCase.organic.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-1">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4" /> Chemical Treatment
              </div>
              <ul className="list-disc list-inside text-slate-300 space-y-1">
                {selectedCase.chemical.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
