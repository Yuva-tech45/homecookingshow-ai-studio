import React, { useState, useEffect } from 'react';
import { X, Clock, Users, Flame, Check, Bookmark, Share2, ChefHat, Sparkles } from 'lucide-react';
import { Recipe } from '../types/recipe';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onSaveToPlan?: (recipe: Recipe) => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose, onSaveToPlan }) => {
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [activeStep, setActiveStep] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Reset state when recipe changes
    if (recipe) {
      setServingsMultiplier(1);
      setCheckedIngredients({});
      setActiveStep(1);
      setIsSaved(false);
    }
  }, [recipe]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!recipe) return null;

  const currentServings = Math.round(recipe.servings * servingsMultiplier);

  const toggleIngredient = (name: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FFF8E9] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#68472F]/20 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-[#68472F]/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#68472F]">
              {recipe.cuisine} · {recipe.category}
            </span>
            {recipe.tamilName && (
              <span className="text-xs font-serif text-[#8B877E]">
                ({recipe.tamilName})
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              type="button"
              className="p-2 text-[#58554D] hover:text-[#25241F] hover:bg-[#FAF2E0] rounded-full transition-colors"
              title="Copy recipe link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setIsSaved(!isSaved);
                if (onSaveToPlan) onSaveToPlan(recipe);
              }}
              type="button"
              className={`p-2 rounded-full transition-colors ${
                isSaved ? 'text-[#D3A713] bg-[#FAF2E0]' : 'text-[#58554D] hover:text-[#25241F] hover:bg-[#FAF2E0]'
              }`}
              title="Save to Kitchen Plan"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={onClose}
              type="button"
              className="p-2 text-[#58554D] hover:text-[#25241F] hover:bg-[#FAF2E0] rounded-full transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-8 divide-y divide-[#68472F]/10">
          
          {/* Hero Recipe Card Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <h2 id="recipe-modal-title" className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25241F]">
                {recipe.title}
              </h2>
              <p className="text-sm sm:text-base text-[#58554D] leading-relaxed">
                {recipe.description}
              </p>

              {/* Timing & Spec strip */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium text-[#58554D]">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#68472F]/10 shadow-2xs">
                  <Clock className="w-4 h-4 text-[#68472F]" />
                  <span>Prep: {recipe.prepTimeMinutes}m</span>
                  <span className="text-slate-300">·</span>
                  <span>Cook: {recipe.cookTimeMinutes}m</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#68472F]/10 shadow-2xs">
                  <Users className="w-4 h-4 text-[#466044]" />
                  <span>Base: {recipe.servings} Servings</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#68472F]/10 shadow-2xs">
                  <Flame className="w-4 h-4 text-[#D3A713]" />
                  <span>{recipe.difficulty}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-xl overflow-hidden shadow-md border border-[#68472F]/15 aspect-4/3 relative">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Golden Tadka Secret Box */}
          <div className="pt-6">
            <div className="bg-[#FAF2E0] border border-[#F3C928]/50 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
              <div className="w-9 h-9 rounded-full bg-[#F3C928] text-[#25241F] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#25241F]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#25241F] tracking-wide uppercase">The Video Tadka Secret</h4>
                <p className="text-sm text-[#58554D] leading-relaxed">
                  {recipe.tadkaTip}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Ingredients List */}
          <div className="pt-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif-display text-xl font-bold text-[#25241F]">
                  Ingredients Checklist
                </h3>
                <p className="text-xs text-[#8B877E]">Tap items as you prepare them in your kitchen.</p>
              </div>

              {/* Servings Adjuster */}
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#68472F]/15 self-start sm:self-auto">
                <span className="text-xs text-[#58554D] font-medium">Servings:</span>
                {[0.5, 1, 1.5, 2].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setServingsMultiplier(m)}
                    className={`px-2 py-0.5 text-xs font-semibold rounded transition-colors ${
                      servingsMultiplier === m
                        ? 'bg-[#25241F] text-white'
                        : 'text-[#58554D] hover:bg-[#FAF2E0]'
                    }`}
                  >
                    {Math.round(recipe.servings * m)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {recipe.ingredients.map((ing) => {
                const isChecked = !!checkedIngredients[ing.name];
                const calculatedAmount = Number((ing.amount * servingsMultiplier).toFixed(2));
                return (
                  <button
                    key={ing.name}
                    type="button"
                    onClick={() => toggleIngredient(ing.name)}
                    className={`flex items-center justify-between text-left p-3 rounded-xl border text-sm transition-all ${
                      isChecked
                        ? 'bg-emerald-50/60 border-emerald-200 text-[#8B877E] line-through'
                        : 'bg-white border-[#68472F]/10 text-[#25241F] hover:border-[#68472F]/30 hover:bg-[#FAF2E0]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-[#466044] border-[#466044] text-white' : 'border-[#68472F]/30 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span>{ing.name}</span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-[#68472F] shrink-0 ml-2">
                      {calculatedAmount} {ing.unit}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="pt-6 space-y-4">
            <h3 className="font-serif-display text-xl font-bold text-[#25241F]">
              Step-by-Step Cooking Method
            </h3>

            <div className="space-y-4">
              {recipe.instructions.map((step) => (
                <div
                  key={step.step}
                  onClick={() => setActiveStep(step.step)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    activeStep === step.step
                      ? 'bg-white border-[#F3C928] shadow-sm ring-1 ring-[#F3C928]'
                      : 'bg-white/60 border-[#68472F]/10 hover:bg-white hover:border-[#68472F]/25'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        activeStep === step.step
                          ? 'bg-[#F3C928] text-[#25241F]'
                          : 'bg-[#FAF2E0] text-[#68472F]'
                      }`}
                    >
                      {step.step}
                    </span>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#25241F]">
                          {step.title}
                        </h4>
                        {step.durationMinutes && (
                          <span className="text-xs font-mono text-[#8B877E] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            ~{step.durationMinutes} min
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#58554D] leading-relaxed">
                        {step.instruction}
                      </p>
                      {step.tip && (
                        <p className="text-xs text-[#466044] font-medium bg-[#466044]/10 p-2 rounded-lg mt-2">
                          <span className="font-semibold">Pro tip:</span> {step.tip}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-white border-t border-[#68472F]/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-[#8B877E] text-center sm:text-left">
            Inspired by warm home-cooking video tutorials. Tested for home kitchens.
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              type="button"
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium text-[#58554D] hover:text-[#25241F] bg-[#FAF2E0] hover:bg-[#FAF2E0]/80 rounded-lg"
            >
              Close
            </button>
            <button
              onClick={() => {
                if (onSaveToPlan) onSaveToPlan(recipe);
                onClose();
              }}
              type="button"
              className="flex-1 sm:flex-none px-5 py-2 text-xs font-semibold text-[#25241F] bg-[#F3C928] hover:bg-[#D3A713] rounded-lg shadow-xs"
            >
              Add to Weekly Meal Plan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
