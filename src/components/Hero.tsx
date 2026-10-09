import React from 'react';
import { ArrowRight, Sparkles, ChefHat, Clock, Flame } from 'lucide-react';
import { heroImg } from '../data/recipes';

interface HeroProps {
  onExploreClick: () => void;
  onPlanClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onPlanClick }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#68472F]/10">
      {/* Subtle organic background tint */}
      <div className="absolute inset-0 bg-radial-[at_top_right] from-[#FDE888]/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8">
            
            {/* Subtle editorial kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#68472F]">
              <span className="w-2 h-2 rounded-full bg-[#F3C928]" />
              <span>Independent Fan Kitchen Companion</span>
              <span className="text-[#68472F]/40">/</span>
              <span>Inspired by HomeCookingShow</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#25241F] leading-[1.12] text-balance">
              Your next favourite <span className="italic font-normal text-[#68472F] underline decoration-[#F3C928] decoration-4 underline-offset-4">meal</span> starts here.
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-[#58554D] leading-relaxed max-w-xl">
              Discover inspiring recipes, bring your favourite cooking videos into your kitchen, and make every homemade meal a little more special.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                type="button"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#F3C928] hover:bg-[#D3A713] text-[#25241F] font-semibold text-base rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25241F]"
              >
                <span>Explore Recipes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onPlanClick}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-[#FAF2E0] text-[#25241F] font-semibold text-base rounded-xl border border-[#68472F]/20 hover:border-[#68472F]/40 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#68472F]"
              >
                <span>Plan My Meals</span>
              </button>
            </div>

            {/* Kitchen Quality Guarantees / Human Notes */}
            <div className="pt-4 border-t border-[#68472F]/10 flex flex-wrap items-center gap-6 text-sm text-[#58554D]">
              <div className="flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-[#466044]" />
                <span>Video-tested measurements</span>
              </div>
              <span className="text-[#68472F]/30">·</span>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#D3A713]" />
                <span>Authentic tadka guides</span>
              </div>
              <span className="text-[#68472F]/30">·</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#68472F]" />
                <span>Real weeknight prep</span>
              </div>
            </div>

          </div>

          {/* Right Column: Striking Editorial Food Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Backing warm wood accent frame */}
              <div className="absolute -inset-3 bg-[#FAF2E0] rounded-3xl -rotate-1 border border-[#68472F]/10" />
              
              {/* Main Editorial Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#68472F]/15 bg-stone-100 aspect-16/10">
                <img
                  src={heroImg}
                  alt="Lavish spread of homemade Indian curries, layered parottas, and aromatic rice in traditional brass bowls"
                  className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle scrim for bottom text grounding */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#25241F]/80 via-[#25241F]/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#F3C928] font-semibold">Today's Kitchen Feature</p>
                      <p className="font-serif-display text-lg font-bold">The Art of the Sunday Feast</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-md border border-white/20 text-white/90">
                      Step-by-step
                    </span>
                  </div>
                </div>
              </div>

              {/* Asymmetric Floating Accent Card: Tadka Secret */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-[#68472F]/15 max-w-xs transition-transform hover:-translate-y-1">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF2E0] text-[#68472F] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-[#D3A713]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#25241F] uppercase tracking-wide">Cooking Along Tip</p>
                    <p className="text-xs text-[#58554D] leading-relaxed mt-0.5">
                      "Always crackle mustard seeds before adding curry leaves to lock in that nutty sweetness."
                    </p>
                  </div>
                </div>
              </div>

              {/* Top-Right Badge: 100% Homemade */}
              <div className="hidden sm:flex items-center gap-1.5 absolute -top-4 -right-4 bg-[#466044] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3C928]" />
                <span>Simmered with Love & Patience</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
