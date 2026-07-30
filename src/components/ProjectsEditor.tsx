import { useState } from 'react';
import { Plus, Trash2, Edit3, X, Save, Image } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  description: string;
  tag: string;
  icon: string;
  color: string;
  iconColor: string;
}

interface ProjectsEditorProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSave: (projects: Project[]) => void;
}

const tagOptions = ['Video', 'Web', 'Security', 'Marketing', 'IT', 'Analytics'];
const categoryOptions = ['Video Editing', 'Web Development', 'Cyber Safety', 'Social Media', 'IT Technician', 'Business Analytics'];

export default function ProjectsEditor({ isOpen, onClose, projects, onSave }: ProjectsEditorProps) {
  const [localProjects, setLocalProjects] = useState<Project[]>(projects);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Project>({
    title: '',
    category: '',
    description: '',
    tag: 'Video',
    icon: 'Film',
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...localProjects[index] });
    setIsAdding(false);
  };

  const handleDelete = (index: number) => {
    setLocalProjects(localProjects.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingIndex(null);
    setEditForm({
      title: '',
      category: categoryOptions[0],
      description: '',
      tag: 'Video',
      icon: 'Film',
      color: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
    });
  };

  const handleSave = () => {
    if (editForm.title.trim() === '') return;

    if (editingIndex !== null) {
      const updated = [...localProjects];
      updated[editingIndex] = editForm;
      setLocalProjects(updated);
      setEditingIndex(null);
    } else if (isAdding) {
      setLocalProjects([...localProjects, editForm]);
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setIsAdding(false);
  };

  const handleSaveAll = () => {
    onSave(localProjects);
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
            <h3 className="text-white font-bold text-xl">Manage Projects</h3>
            <p className="text-gray-400 text-sm">{localProjects.length} projects</p>
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
              Add New Project
            </button>
          )}

          {/* Projects list */}
          <div className="space-y-3">
            {localProjects.map((project, index) => (
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
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      placeholder="Project Title"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50"
                      >
                        {categoryOptions.map((cat) => (
                          <option key={cat} value={cat} className="bg-[#12121a]">{cat}</option>
                        ))}
                      </select>
                      <select
                        value={editForm.tag}
                        onChange={(e) => setEditForm({ ...editForm, tag: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50"
                      >
                        {tagOptions.map((tag) => (
                          <option key={tag} value={tag} className="bg-[#12121a]">{tag}</option>
                        ))}
                      </select>
                    </div>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      placeholder="Project description"
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50 resize-none"
                    />
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
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                        <Image className="w-5 h-5 text-white/50" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{project.title}</div>
                        <div className="text-gray-500 text-xs">{project.category} • {project.tag}</div>
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
