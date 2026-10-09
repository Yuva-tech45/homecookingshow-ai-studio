import React, { useState, useMemo } from 'react';
import { Search, X, Clock, Users, ArrowUpRight, ChefHat, Sparkles } from 'lucide-react';
import { Recipe, RecipeCategory } from '../types/recipe';
import { SAMPLE_RECIPES } from '../data/recipes';

interface RecipeDiscoveryProps {
  onSelectRecipe: (recipe: Recipe) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const CATEGORIES: RecipeCategory[] = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'];

export const RecipeDiscovery: React.FC<RecipeDiscoveryProps> = ({
  onSelectRecipe,
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory>('All');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);

  // Filter recipes based on category, search term, and dietary flag
  const filteredRecipes = useMemo(() => {
    return SAMPLE_RECIPES.filter((recipe) => {
      // Category check
      if (selectedCategory !== 'All' && recipe.category !== selectedCategory) {
        return false;
      }
      // Vegetarian check
      if (vegetarianOnly && !recipe.isVegetarian) {
        return false;
      }
      // Search query check (title, description, ingredients, cuisine)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = recipe.title.toLowerCase().includes(query);
        const matchesCuisine = recipe.cuisine.toLowerCase().includes(query);
        const matchesDesc = recipe.description.toLowerCase().includes(query);
        const matchesIngredient = recipe.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(query)
        );
        return matchesTitle || matchesCuisine || matchesDesc || matchesIngredient;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, vegetarianOnly]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setVegetarianOnly(false);
  };

  return (
    <section id="discover" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#68472F]/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#68472F]">
            <span>Curated Collection</span>
            <span className="text-[#68472F]/40">·</span>
            <span>Indian Home Cooking</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#25241F]">
            Discover Comforting Homemade Dishes
          </h2>
          <p className="text-base text-[#58554D] max-w-2xl">
            From the crisp morning dosas to slow-steamed fragrant biryanis, find reliable measurements and authentic tadka techniques.
          </p>
        </div>

        {/* Total count indicator */}
        <div className="text-xs text-[#8B877E] shrink-0 font-medium">
          Showing <span className="text-[#25241F] font-bold font-mono">{filteredRecipes.length}</span> of{' '}
          <span className="font-mono">{SAMPLE_RECIPES.length}</span> curated recipes
        </div>
      </div>

      {/* Interactive Controls Bar: Search & Category Tabs */}
      <div className="space-y-5 mb-10" id="recipes">
        
        {/* Search Input Bar */}
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-[#68472F]/60" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by dish name, spice, or ingredient (e.g., Dosa, Biryani, Paneer, Tadka)..."
            className="w-full pl-12 pr-10 py-3.5 bg-white border border-[#68472F]/20 rounded-xl text-base text-[#25241F] placeholder-[#8B877E] shadow-2xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F3C928] focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              type="button"
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8B877E] hover:text-[#25241F]"
              aria-label="Clear search query"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category Filter Buttons & Dietary Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF2E0] rounded-xl border border-[#68472F]/10">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  type="button"
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#25241F] text-white shadow-2xs'
                      : 'text-[#58554D] hover:text-[#25241F] hover:bg-white/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick Dietary Filter */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVegetarianOnly(!vegetarianOnly)}
              type="button"
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                vegetarianOnly
                  ? 'bg-[#466044] text-white border-[#466044]'
                  : 'bg-white text-[#58554D] border-[#68472F]/15 hover:border-[#68472F]/30'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${vegetarianOnly ? 'bg-[#F3C928]' : 'bg-[#466044]'}`} />
              <span>Pure Veg Only</span>
            </button>
          </div>
        </div>

      </div>

      {/* Recipe Cards Grid or Empty State */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <article
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="group bg-white rounded-2xl border border-[#68472F]/12 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Image Container with 4:3 Ratio */}
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Visual hover quick-action */}
                <div className="absolute inset-0 bg-[#25241F]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-lg text-xs font-bold text-[#25241F] shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span>View Full Recipe</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  {/* Clean unboxed metadata with dot separators - following anti-slop rule */}
                  <div className="flex items-center gap-2 text-xs font-medium text-[#68472F]">
                    <span>{recipe.category}</span>
                    <span aria-hidden="true" className="text-[#68472F]/40">·</span>
                    <span>{recipe.cuisine}</span>
                    <span aria-hidden="true" className="text-[#68472F]/40">·</span>
                    <span>{recipe.difficulty}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif-display text-xl font-bold text-[#25241F] group-hover:text-[#68472F] transition-colors line-clamp-1">
                    {recipe.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#58554D] leading-relaxed line-clamp-2">
                    {recipe.description}
                  </p>
                </div>

                {/* Footer Strip */}
                <div className="pt-4 border-t border-[#68472F]/10 flex items-center justify-between text-xs text-[#58554D]">
                  <div className="flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#68472F]" />
                    <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins total</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[#68472F] font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>{recipe.servings} Servings</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty Results State */
        <div className="bg-white rounded-2xl border border-[#68472F]/15 p-12 text-center max-w-lg mx-auto space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-[#FAF2E0] text-[#68472F] flex items-center justify-center mx-auto">
            <ChefHat className="w-6 h-6" />
          </div>
          <h3 className="font-serif-display text-2xl font-bold text-[#25241F]">
            No matching recipes found
          </h3>
          <p className="text-sm text-[#58554D] leading-relaxed">
            We couldn't find any recipes matching "<span className="font-semibold text-[#25241F]">{searchQuery}</span>" in the {selectedCategory} category.
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetFilters}
              type="button"
              className="px-5 py-2.5 bg-[#F3C928] text-[#25241F] font-semibold text-xs rounded-xl hover:bg-[#D3A713] transition-colors cursor-pointer shadow-2xs"
            >
              Reset Filters & Show All
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
