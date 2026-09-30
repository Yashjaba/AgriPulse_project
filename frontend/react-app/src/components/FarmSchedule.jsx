import React, { useState } from 'react';
import { Calendar, Plus, CheckCircle, Droplet, Shield, Sprout, AlertTriangle } from 'lucide-react';

export default function FarmSchedule() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Drip Irrigation Cycle",
      plot: "Paddy • Plot A",
      time: "Today, 5:00 PM",
      status: "POSTPONED",
      badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      reason: "Climate Agent predicts 48mm storm in 4h. Delaying prevents root hypoxia.",
      done: false
    },
    {
      id: 2,
      title: "Bio-Fungicide Foliar Spray",
      plot: "Tomato • Plot B",
      time: "Friday, 7:30 AM",
      status: "RECOMMENDED",
      badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      reason: "Clear sunny window after storm. Best window to curb Early Blight.",
      done: false
    },
    {
      id: 3,
      title: "Clear Drainage Furrows",
      plot: "All Plots",
      time: "Immediate (Before 3 PM)",
      status: "URGENT",
      badgeClass: "bg-red-500/20 text-red-300 border-red-500/30",
      reason: "Unblock field channels immediately before downpour arrives.",
      done: false
    }
  ]);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTask = () => {
    const title = prompt("Enter farm activity name (e.g. Sowing, Weeding):");
    if (!title) return;
    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        title,
        plot: "Plot C",
        time: "Saturday, 8:00 AM",
        status: "SCHEDULED",
        badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        reason: "Scheduled in optimal post-rainfall soil moisture window.",
        done: false
      }
    ]);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-400" /> Dynamic AI Farm Activity Schedule
          </h2>
          <p className="text-slate-400 mt-1">Requirement 11: Activities auto-rescheduled according to weather forecasts & soil conditions.</p>
        </div>
        <button onClick={addTask} className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1.5 self-start">
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map(t => (
          <div key={t.id} className={`p-4 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${t.done ? 'opacity-50 line-through' : ''}`}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-white text-sm">{t.title}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.badgeClass} border`}>{t.status}</span>
              </div>
              <div className="text-slate-400 flex gap-4">
                <span>{t.plot}</span>
                <span>•</span>
                <span>{t.time}</span>
              </div>
              <p className="text-slate-300 text-[11px] mt-1">{t.reason}</p>
            </div>
            <button onClick={() => toggleTask(t.id)} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 self-start sm:self-auto flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.done ? 'Completed' : 'Mark Done'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
