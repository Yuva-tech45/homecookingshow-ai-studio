import React, { useState } from 'react';
import { Calendar, ShoppingBag, CheckSquare, Plus, Check, ArrowRight, Bell, Sparkles } from 'lucide-react';

interface DayPlan {
  day: string;
  short: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

const DEFAULT_DAYS: DayPlan[] = [
  { day: 'Monday', short: 'Mon', breakfast: 'Steamed Idli with Sambar', lunch: 'Lemon Rice & Crispy Potato Fry', dinner: 'Creamy Palak Paneer & Roti' },
  { day: 'Tuesday', short: 'Tue', breakfast: 'Ghee Roast Dosa', lunch: 'Curd Rice & Mango Thokku', dinner: 'Chettinad Mushroom Sukka' },
  { day: 'Wednesday', short: 'Wed', breakfast: 'Upma with Coconut Chutney', lunch: 'Tomato Rasam & Steamed Rice', dinner: 'Paneer Butter Masala & Naan' },
  { day: 'Thursday', short: 'Thu', breakfast: 'Poha with Roasted Peanuts', lunch: 'Sambar Rice & Appalam', dinner: 'Dal Tadka & Phulkas' },
  { day: 'Friday', short: 'Fri', breakfast: 'Medu Vada & Filter Kaapi', lunch: 'Bisi Bele Bath & Boondi', dinner: 'Vegetable Kurma & Parotta' },
  { day: 'Saturday', short: 'Sat', breakfast: 'Rava Dosa with Ginger Chutney', lunch: 'Vegetable Dum Biryani', dinner: 'Pav Bhaji Feast' },
  { day: 'Sunday', short: 'Sun', breakfast: 'Poori & Potato Masala', lunch: 'Festive Thali with Saffron Kesari', dinner: 'Comforting Moong Dal Khichdi' },
];

interface GroceryItem {
  id: string;
  name: string;
  category: 'Produce' | 'Spices' | 'Pantry';
  checked: boolean;
}

const INITIAL_GROCERIES: GroceryItem[] = [
  { id: '1', name: 'Fresh Curry Leaves (2 bunches)', category: 'Produce', checked: true },
  { id: '2', name: 'Small Shallots (Chinna Vengayam - 500g)', category: 'Produce', checked: false },
  { id: '3', name: 'Desi Cow Ghee (500ml)', category: 'Pantry', checked: false },
  { id: '4', name: 'Aged Basmati Rice (1kg)', category: 'Pantry', checked: true },
  { id: '5', name: 'Tellicherry Black Peppercorns', category: 'Spices', checked: false },
  { id: '6', name: 'Kashmiri Saffron (1g)', category: 'Spices', checked: false },
];

export const KitchenCompanionPreview: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(1); // Tuesday
  const [groceries, setGroceries] = useState<GroceryItem[]>(INITIAL_GROCERIES);
  const [newItemName, setNewItemName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const activeDay = DEFAULT_DAYS[selectedDayIndex];

  const toggleGrocery = (id: string) => {
    setGroceries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleAddGrocery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    setGroceries((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newItemName.trim(),
        category: 'Produce',
        checked: false,
      },
    ]);
    setNewItemName('');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
    }
  };

  return (
    <section id="companion" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#68472F]">
          <span className="w-2 h-2 rounded-full bg-[#466044]" />
          <span>Interactive Feature Preview</span>
          <span className="text-[#68472F]/40">·</span>
          <span>Upcoming Kitchen Companion</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#25241F]">
          A peaceful, organised kitchen companion.
        </h2>
        <p className="text-base sm:text-lg text-[#58554D] leading-relaxed">
          Say goodbye to the daily 6 PM dilemma: <em>"What should we cook tonight?"</em> The upcoming Kitchen Companion brings effortless meal schedules, smart pantry checks, and shopping checklists into one gentle workspace.
        </p>
      </div>

      {/* Miniature Interactive Interface Workspace */}
      <div className="bg-white rounded-3xl border border-[#68472F]/15 p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
        
        {/* Subtle decorative banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#68472F]/10">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-[#FAF2E0] text-[#68472F]">
              <Calendar className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif-display text-xl font-bold text-[#25241F]">
                Weekly Meal Board & Shopping Sync
              </h3>
              <p className="text-xs text-[#8B877E]">Interactive demo preview of planned tools</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#FAF2E0] text-[#68472F] border border-[#68472F]/10 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#D3A713]" />
            <span>Prototype Version · No Account Needed</span>
          </div>
        </div>

        {/* Dual Panel Grid: Meal Planner Left, Shopping List Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
          
          {/* Left: Interactive Week Planner (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Day Selector Tabs */}
            <div>
              <label className="text-xs uppercase tracking-wider font-bold text-[#68472F] block mb-2">
                Select Day to Preview
              </label>
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {DEFAULT_DAYS.map((d, idx) => {
                  const isSelected = selectedDayIndex === idx;
                  return (
                    <button
                      key={d.day}
                      onClick={() => setSelectedDayIndex(idx)}
                      type="button"
                      className={`p-2 sm:py-3 rounded-xl text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#25241F] text-white shadow-sm'
                          : 'bg-[#FAF2E0]/70 text-[#58554D] hover:bg-[#FAF2E0] hover:text-[#25241F]'
                      }`}
                    >
                      <span className="block text-[11px] font-mono uppercase">{d.short}</span>
                      <span className="block text-xs sm:text-sm font-bold mt-0.5">
                        {idx + 12}th
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Day's Meals */}
            <div className="bg-[#FAF2E0]/50 rounded-2xl p-5 border border-[#68472F]/10 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif-display text-lg font-bold text-[#25241F]">
                  {activeDay.day}’s Kitchen Menu
                </h4>
                <span className="text-xs font-mono text-[#8B877E]">3 Home-Cooked Meals</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-white rounded-xl border border-[#68472F]/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#F3C928]" />
                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#8B877E]">Breakfast</span>
                      <p className="text-sm font-semibold text-[#25241F]">{activeDay.breakfast}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#466044] bg-[#466044]/10 px-2 py-0.5 rounded">
                    Planned
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#68472F]/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#466044]" />
                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#8B877E]">Lunch</span>
                      <p className="text-sm font-semibold text-[#25241F]">{activeDay.lunch}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#466044] bg-[#466044]/10 px-2 py-0.5 rounded">
                    Planned
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#68472F]/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#68472F]" />
                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#8B877E]">Dinner</span>
                      <p className="text-sm font-semibold text-[#25241F]">{activeDay.dinner}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#466044] bg-[#466044]/10 px-2 py-0.5 rounded">
                    Planned
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Right: Smart Shopping Checklist (5 Columns) */}
          <div className="lg:col-span-5 space-y-4 bg-[#FFF8E9] p-5 sm:p-6 rounded-2xl border border-[#68472F]/15">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#68472F]" />
                <h4 className="font-serif-display text-base font-bold text-[#25241F]">
                  Market Shopping List
                </h4>
              </div>
              <span className="text-xs font-mono text-[#68472F]">
                {groceries.filter((g) => g.checked).length}/{groceries.length} gathered
              </span>
            </div>

            {/* Quick Add item form */}
            <form onSubmit={handleAddGrocery} className="flex gap-2">
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Add ingredient (e.g. Sambar powder)..."
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#68472F]/20 rounded-lg text-[#25241F] placeholder-[#8B877E] focus:outline-none focus:ring-1 focus:ring-[#F3C928]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#25241F] text-white rounded-lg text-xs font-semibold hover:bg-[#68472F] transition-colors flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>

            {/* Checklist items */}
            <div className="space-y-2 pt-1 max-h-60 overflow-y-auto pr-1">
              {groceries.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleGrocery(item.id)}
                  type="button"
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left text-xs transition-colors ${
                    item.checked
                      ? 'bg-stone-50 border-stone-200 text-[#8B877E] line-through'
                      : 'bg-white border-[#68472F]/10 text-[#25241F] hover:border-[#68472F]/25'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        item.checked ? 'bg-[#466044] border-[#466044] text-white' : 'border-[#68472F]/30 bg-white'
                      }`}
                    >
                      {item.checked && <Check className="w-3 h-3" />}
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8B877E] uppercase">{item.category}</span>
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Clear Call to Action for Exploring Planned Experience */}
        <div className="mt-8 pt-8 border-t border-[#68472F]/10 bg-[#FAF2E0]/40 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 lg:-mx-10 lg:-mb-10 p-6 sm:p-8 rounded-b-3xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="font-serif-display text-lg font-bold text-[#25241F]">
                Be the first to test the full Kitchen Companion suite
              </h4>
              <p className="text-xs sm:text-sm text-[#58554D]">
                Get notified when printable recipe cards, cloud grocery sync, and step cooking timers launch.
              </p>
            </div>

            {isSubscribed ? (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#466044]/10 text-[#466044] rounded-xl text-sm font-semibold border border-[#466044]/20">
                <Check className="w-4 h-4" />
                <span>You're on the list! We'll send early invites.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex w-full md:w-auto items-stretch gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#68472F]/20 rounded-xl text-[#25241F] placeholder-[#8B877E] focus:outline-none focus:ring-2 focus:ring-[#F3C928] w-full md:w-64"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#F3C928] text-[#25241F] font-bold text-xs sm:text-sm rounded-xl hover:bg-[#D3A713] transition-colors whitespace-nowrap shadow-2xs"
                >
                  Join Waitlist
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </section>
  );
};
