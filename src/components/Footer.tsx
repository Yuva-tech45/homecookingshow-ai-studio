import React from 'react';
import { UtensilsCrossed, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavClick: (selector: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-[#25241F] text-stone-300 pt-16 pb-12 border-t border-[#68472F]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#F3C928] text-[#25241F] flex items-center justify-center font-bold">
                <UtensilsCrossed className="w-4 h-4 text-[#25241F]" />
              </span>
              <span className="font-serif-display text-xl font-bold text-white tracking-tight">
                HomeCooking <span className="text-[#F3C928] font-normal italic">Companion</span>
              </span>
            </div>
            
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              An affectionate, fan-created cooking hub dedicated to translating the sensory pleasure of warm Indian cooking tutorials into joyful, stress-free everyday kitchen triumphs.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-stone-400">
              <Sparkles className="w-3.5 h-3.5 text-[#F3C928]" />
              <span>Dedicated to home cooks who love cooking with warmth and care.</span>
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F3C928]">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavClick('#discover')}
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  Recipe Discovery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavClick('#recipes')}
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  Featured Collections
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavClick('#companion')}
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  Kitchen Companion (Preview)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavClick('#community')}
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  Community Kitchen Wall
                </button>
              </li>
            </ul>
          </div>

          {/* Culinary Categories (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F3C928]">
              Recipe Pillars
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-stone-400">
              <div>• South Indian Breakfasts</div>
              <div>• Fragrant Dum Biryanis</div>
              <div>• Rich North Indian Curries</div>
              <div>• Crisp Evening Tiffin</div>
              <div>• Traditional Saffron Sweets</div>
              <div>• Quick Rasam & Tadkas</div>
            </div>
            <p className="text-[11px] text-stone-400 pt-2">
              All recipe formulations are tested for home stovetops with metric and cup measures.
            </p>
          </div>

        </div>

        {/* Mandatory Explicit Legal & Fan-Made Disclosure */}
        <div className="pt-8 space-y-4">
          <div className="bg-stone-900/80 rounded-xl p-4 sm:p-5 border border-stone-800 text-xs text-stone-400 leading-relaxed">
            <p className="font-semibold text-stone-300 mb-1">
              Independent Fan-Project Disclosure:
            </p>
            <p>
              An independent, fan-made project inspired by HomeCookingShow. Not affiliated with or endorsed by HomeCookingShow or Hema Subramanian. All trademarks, channel names, and creator references belong to their respective copyright owners. This website does not sell merchandise or collect payments on behalf of the creators.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 pt-2">
            <p>© {new Date().getFullYear()} HomeCooking Companion · Version A Prototype</p>
            <p className="flex items-center gap-1.5">
              <span>Made with care & desi ghee</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
