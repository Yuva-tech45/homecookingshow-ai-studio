import React, { useState } from 'react';
import { Play, Sparkles, Flame, Volume2, ArrowRight } from 'lucide-react';
import { inspirationImg } from '../data/recipes';

interface CookingInspirationProps {
  onExploreClick: () => void;
}

export const CookingInspiration: React.FC<CookingInspirationProps> = ({ onExploreClick }) => {
  const [activeRhythm, setActiveRhythm] = useState(0);

  const rhythms = [
    {
      title: 'The Spluttering Tadka',
      subtitle: 'First 60 seconds',
      description: 'The instant mustard seeds pop in hot ghee or sesame oil, add hing and torn curry leaves. The sound and sudden burst of aroma wakes up your senses.',
      technique: 'Never let mustard seeds stay unpopped; unbroken seeds taste bitter.',
    },
    {
      title: 'The Patient Golden Onion',
      subtitle: 'Minutes 2 to 8',
      description: 'Slowly sautéing finely sliced shallots or onions with a pinch of salt until they transition from translucent to deep caramel amber.',
      technique: 'Medium flame preserves the natural sweetness without scorching.',
    },
    {
      title: 'The Masala Oil Separation',
      subtitle: 'Minutes 8 to 15',
      description: 'Cooking ginger, garlic, and freshly pounded spice powders with tomatoes until bright red droplets of oil bead around the rim of your kadai.',
      technique: 'This is the visual cue that raw spices are fully cooked and mellowed.',
    },
    {
      title: 'The Dum & Resting Simmer',
      subtitle: 'Final 15 minutes',
      description: 'Turning the heat down to low, covering the pot, and allowing steam to marry every flavor together into a harmonious gravy.',
      technique: 'Rest curries for 10 minutes off heat before serving; the taste deepens noticeably.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF2E0] border-y border-[#68472F]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#68472F]">
            <Sparkles className="w-3.5 h-3.5 text-[#F3C928]" />
            <span>The Video Cooking Experience</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#25241F] leading-tight">
            Step into the rhythm of your home kitchen.
          </h2>
          <p className="text-base sm:text-lg text-[#58554D] leading-relaxed">
            Cooking alongside videos is not just about memorizing a checklist—it's about training your senses. Listen for the sizzle of the tempering, smell when roasted spices turn fragrant, and cook with genuine confidence.
          </p>
        </div>

        {/* 2-Column Split: Visual Cinematic Showcase & Interactive Rhythm Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Cinematic Sizzling Tadka Feature */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#68472F]/15 aspect-16/10 bg-stone-900 group">
              <img
                src={inspirationImg}
                alt="Sizzling mustard seeds and curry leaves in hot ghee inside a seasoned cast iron skillet"
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700 opacity-90"
                referrerPolicy="no-referrer"
              />
              
              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#25241F]/90 via-[#25241F]/30 to-transparent" />

              {/* In-Image Caption Strip */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#F3C928] font-semibold tracking-wide uppercase">
                  <Volume2 className="w-4 h-4" />
                  <span>The Music of the Kadai</span>
                </div>
                <h3 className="font-serif-display text-xl sm:text-2xl font-bold">
                  Curry leaves crackling in golden ghee
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-lg leading-relaxed line-clamp-2">
                  Representative kitchen memory. Notice the precise moment the spluttering quiets down—that's when your vegetables or lentils are ready to dive in.
                </p>
              </div>

              {/* Soft fan watermark label */}
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-white/80 border border-white/10">
                Fan Companion Visual
              </div>
            </div>
          </div>

          {/* Right: Interactive 4 Rhythms Guide */}
          <div className="lg:col-span-5 space-y-3">
            <div className="pb-2">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#68472F]">
                The Four Sensory Milestones
              </h4>
              <p className="text-xs text-[#8B877E] mt-0.5">Click any stage to reveal its sensory cue</p>
            </div>

            <div className="space-y-2.5">
              {rhythms.map((rhythm, idx) => {
                const isActive = activeRhythm === idx;
                return (
                  <div
                    key={rhythm.title}
                    onClick={() => setActiveRhythm(idx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white border-[#F3C928] shadow-sm ring-1 ring-[#F3C928]/40'
                        : 'bg-white/50 border-[#68472F]/10 hover:bg-white hover:border-[#68472F]/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#68472F]">
                            0{idx + 1}.
                          </span>
                          <h5 className="text-sm font-bold text-[#25241F]">
                            {rhythm.title}
                          </h5>
                        </div>
                        <p className="text-xs text-[#58554D] leading-relaxed">
                          {rhythm.description}
                        </p>
                        {isActive && (
                          <div className="pt-2 text-xs font-medium text-[#466044] border-t border-[#68472F]/10 mt-2">
                            <span className="font-bold">Sensory Rule:</span> {rhythm.technique}
                          </div>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-[#8B877E] shrink-0">
                        {rhythm.subtitle}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Section CTA */}
            <div className="pt-4">
              <button
                onClick={onExploreClick}
                type="button"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#68472F] hover:text-[#25241F] group cursor-pointer"
              >
                <span>Find recipes featuring authentic tadka</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#F3C928]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
