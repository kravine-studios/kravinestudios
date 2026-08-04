import { useState } from 'react';
import { BarChart3, X, Save, Plus, Trash2 } from 'lucide-react';

interface Stat {
  number: string;
  label: string;
}

interface StatsEditorProps {
  isOpen: boolean;
  onClose: () => void;
  stats: Stat[];
  onSave: (stats: Stat[]) => void;
}

export default function StatsEditor({ isOpen, onClose, stats, onSave }: StatsEditorProps) {
  const [localStats, setLocalStats] = useState<Stat[]>(stats);

  const handleChange = (index: number, field: keyof Stat, value: string) => {
    const updated = [...localStats];
    updated[index] = { ...updated[index], [field]: value };
    setLocalStats(updated);
  };

  const handleAdd = () => {
    setLocalStats([...localStats, { number: '0', label: 'New Stat' }]);
  };

  const handleDelete = (index: number) => {
    if (localStats.length <= 1) return;
    setLocalStats(localStats.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(localStats);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-lg bg-[#12121a] border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/50 flex flex-col animate-fade-in-up">
        <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">Manage Stats</h3>
              <p className="text-gray-400 text-sm">Edit hero section statistics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {localStats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Number</label>
                <input
                  type="text"
                  value={stat.number}
                  onChange={(e) => handleChange(index, 'number', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleChange(index, 'label', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50"
                />
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all mt-5"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          <button
            onClick={handleAdd}
            className="w-full p-3 rounded-xl border-2 border-dashed border-white/10 text-gray-400 hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add Stat
          </button>
        </div>

        <div className="p-6 border-t border-white/10">
          <button
            onClick={handleSave}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
