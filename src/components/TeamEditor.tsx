import { useState } from 'react';
import { Plus, Trash2, Edit3, X, Save, Users } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  icon: string;
  gradient: string;
}

interface TeamEditorProps {
  isOpen: boolean;
  onClose: () => void;
  team: TeamMember[];
  onSave: (team: TeamMember[]) => void;
}

const iconOptions = [
  { name: 'Video', value: 'Video' },
  { name: 'Shield', value: 'Shield' },
  { name: 'Code', value: 'Code' },
  { name: 'PenTool', value: 'PenTool' },
  { name: 'Camera', value: 'Camera' },
  { name: 'BarChart', value: 'BarChart' },
  { name: 'Wrench', value: 'Wrench' },
  { name: 'Globe', value: 'Globe' },
];

const gradientOptions = [
  { name: 'Red-Orange', value: 'from-red-500 to-orange-500' },
  { name: 'Green-Emerald', value: 'from-green-500 to-emerald-500' },
  { name: 'Blue-Cyan', value: 'from-blue-500 to-cyan-500' },
  { name: 'Purple-Pink', value: 'from-purple-500 to-pink-500' },
  { name: 'Violet-Purple', value: 'from-violet-500 to-purple-500' },
  { name: 'Yellow-Amber', value: 'from-yellow-500 to-amber-500' },
  { name: 'Teal-Green', value: 'from-teal-500 to-green-500' },
  { name: 'Pink-Rose', value: 'from-pink-500 to-rose-500' },
];

export default function TeamEditor({ isOpen, onClose, team, onSave }: TeamEditorProps) {
  const [localTeam, setLocalTeam] = useState<TeamMember[]>(team);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<TeamMember>({
    name: '',
    role: '',
    description: '',
    icon: 'Video',
    gradient: 'from-purple-500 to-pink-500',
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...localTeam[index] });
    setIsAdding(false);
  };

  const handleDelete = (index: number) => {
    setLocalTeam(localTeam.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingIndex(null);
    setEditForm({
      name: '',
      role: '',
      description: '',
      icon: 'Video',
      gradient: 'from-purple-500 to-pink-500',
    });
  };

  const handleSave = () => {
    if (editForm.name.trim() === '') return;

    if (editingIndex !== null) {
      const updated = [...localTeam];
      updated[editingIndex] = editForm;
      setLocalTeam(updated);
      setEditingIndex(null);
    } else if (isAdding) {
      setLocalTeam([...localTeam, editForm]);
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setIsAdding(false);
  };

  const handleSaveAll = () => {
    onSave(localTeam);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#12121a] border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/50 flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
          <div>
            <h3 className="text-white font-bold text-xl">Manage Team</h3>
            <p className="text-gray-400 text-sm">{localTeam.length} members</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              <Save size={16} />
              Save All
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Add button */}
          {!isAdding && (
            <button
              onClick={handleAdd}
              className="w-full p-4 rounded-xl border-2 border-dashed border-white/10 text-gray-400 hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all flex items-center justify-center gap-2 mb-6"
            >
              <Plus size={18} />
              Add New Team Member
            </button>
          )}

          {/* Team list */}
          <div className="space-y-3">
            {localTeam.map((member, index) => (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-300 ${
                  editingIndex === index
                    ? 'border-purple-500/50 bg-purple-500/5 p-4'
                    : 'border-white/5 bg-white/[0.02] p-4'
                }`}
              >
                {editingIndex === index || isAdding ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Member Name"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50"
                    />
                    <input
                      type="text"
                      value={editForm.role}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                      placeholder="Role / Position"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50"
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      placeholder="Short bio"
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50 resize-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Icon</label>
                        <select
                          value={editForm.icon}
                          onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50"
                        >
                          {iconOptions.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-[#12121a]">{opt.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Color</label>
                        <select
                          value={editForm.gradient}
                          onChange={(e) => setEditForm({ ...editForm, gradient: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50"
                        >
                          {gradientOptions.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-[#12121a]">{opt.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-medium flex items-center gap-2"
                      >
                        <Save size={14} />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 text-sm font-medium flex items-center gap-2 hover:text-white"
                      >
                        <X size={14} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${member.gradient} flex items-center justify-center`}>
                        <Users className="w-5 h-5 text-white/70" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{member.name}</div>
                        <div className="text-purple-400 text-xs">{member.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(index)}
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
