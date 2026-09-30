import React, { useState } from 'react';
import { UserCheck, X, Save } from 'lucide-react';

export default function FarmerRegistration({ farmer, setFarmer, onClose }) {
  const [formData, setFormData] = useState({ ...farmer });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFarmer(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-3xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-100">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Farmer & Farm Profile Registration</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Requirement 1: Manage farmer identity, location, soil properties, and connected ESP32 sensor hardware.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Farmer Full Name *</label>
              <input 
                type="text" 
                name="name"
                value={formData.name} 
                onChange={handleChange}
                required 
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Mobile Number (Voice/SMS) *</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone} 
                onChange={handleChange}
                required 
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Farm Name / Plot Title</label>
              <input 
                type="text" 
                name="farmTitle"
                value={formData.farmTitle} 
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Village / District / State</label>
              <input 
                type="text" 
                name="location"
                value={formData.location} 
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Farm Size (Acres)</label>
              <input 
                type="number" 
                step="0.1"
                name="sizeAcres"
                value={formData.sizeAcres} 
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Soil Type</label>
              <select 
                name="soilType"
                value={formData.soilType} 
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="Red Loamy">Red Loamy Soil</option>
                <option value="Black Cotton">Black Cotton Soil</option>
                <option value="Alluvial">Alluvial Soil</option>
                <option value="Clayey">Clayey Soil</option>
                <option value="Sandy Loam">Sandy Loam</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Irrigation Method</label>
              <select 
                name="irrigation"
                value={formData.irrigation} 
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="Drip Irrigation">Drip Irrigation</option>
                <option value="Sprinkler">Sprinkler System</option>
                <option value="Canal / Flood">Canal / Surface Flood</option>
                <option value="Rainfed">Purely Rainfed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-1 font-medium">Primary Crops Grown</label>
            <input 
              type="text" 
              name="crops"
              value={formData.crops} 
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1 font-medium">ESP32 IoT Node Serial ID</label>
            <input 
              type="text" 
              name="esp32Id"
              value={formData.esp32Id} 
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 shadow-lg shadow-emerald-600/30">
              <Save className="w-4 h-4" /> Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
