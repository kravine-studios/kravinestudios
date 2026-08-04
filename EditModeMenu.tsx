import { Folder, Users, BarChart3, Link2, LogOut, X, ChevronRight } from 'lucide-react';

interface EditModeMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onManageProjects: () => void;
  onManageTeam: () => void;
  onManageStats: () => void;
  onManageSocial: () => void;
  onLogout: () => void;
}

export default function EditModeMenu({
  isOpen,
  onClose,
  onManageProjects,
  onManageTeam,
  onManageStats,
  onManageSocial,
  onLogout,
}: EditModeMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-end p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-sm animate-slide-down">
        <div className="bg-[#12121a] border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/50">
          {/* Header */}
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white font-bold">Edit Mode Active</span>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
              <div className="px-8">
                <span className="text-[#3BA5F6] font-extrabold text-lg">KRAVINE</span>
                <span className="text-[#3A3A3A] font-extrabold text-lg ml-1">STUDIOS</span>
              </div>
          </div>

          {/* Manage Content */}
          <div className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 px-2">
              Manage Content
            </p>
            <div className="space-y-1">
              <button
                onClick={onManageProjects}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Folder className="w-4 h-4 text-yellow-400" />
                </div>
                <span className="text-sm font-medium">Manage Projects</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={onManageTeam}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm font-medium">Manage Team</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={onManageStats}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm font-medium">Manage Stats</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={onManageSocial}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <Link2 className="w-4 h-4 text-pink-400" />
                </div>
                <span className="text-sm font-medium">Social Links</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          <div className="mx-4 border-t border-white/5"></div>

          <div className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 px-2">
              Session
            </p>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                <LogOut className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Lock & Exit</span>
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
