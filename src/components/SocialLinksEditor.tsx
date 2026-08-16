import { useState } from 'react';
import { Link2, X, Save } from 'lucide-react';

interface SocialLinks {
  instagram: string;
  linkedin: string;
}

interface SocialLinksEditorProps {
  isOpen: boolean;
  onClose: () => void;
  links: SocialLinks;
  onSave: (links: SocialLinks) => void;
}

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function SocialLinksEditor({ isOpen, onClose, links, onSave }: SocialLinksEditorProps) {
  const [localLinks, setLocalLinks] = useState<SocialLinks>(links);

  const handleSave = () => {
    onSave(localLinks);
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
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">Social Links</h3>
              <p className="text-gray-400 text-sm">Connect your social profiles</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Instagram */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <InstagramIcon />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Instagram</h4>
                <p className="text-gray-500 text-xs">https://www.instagram.com/kravine.studios?igsh=MWR3anprNXZxYndnMQ==&igsi=MWR3anprNXZxYndnMQ==</p>
              </div>
            </div>
            <input
              type="url"
              value={localLinks.instagram}
              onChange={(e) => setLocalLinks({ ...localLinks, instagram: e.target.value })}
              placeholder="https://www.instagram.com/kravine.studios?igsh=MWR3anprNXZxYndnMQ==&igsi=MWR3anprNXZxYndnMQ=="
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
            />
            {localLinks.instagram && (
              <a
                href={localLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-purple-400 text-xs hover:text-purple-300 transition-colors"
              >
                <Link2 size={12} />
                Test Link
              </a>
            )}
          </div>

          {/* LinkedIn */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
                <LinkedInIcon />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">LinkedIn</h4>
                <p className="text-gray-500 text-xs">https://www.linkedin.com/company/kravine-studios/</p>
              </div>
            </div>
            <input
              type="url"
              value={localLinks.linkedin}
              onChange={(e) => setLocalLinks({ ...localLinks, linkedin: e.target.value })}
              placeholder="https://www.linkedin.com/company/kravine-studios/"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
            />
            {localLinks.linkedin && (
              <a
                href={localLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-purple-400 text-xs hover:text-purple-300 transition-colors"
              >
                <Link2 size={12} />
                Test Link
              </a>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-white/10">
          <button
            onClick={handleSave}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            <Save size={16} />
            Save Links
          </button>
        </div>
      </div>
    </div>
  );
}
