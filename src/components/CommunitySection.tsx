import React, { useState } from 'react';
import { Heart, MessageCircle, PlusCircle, Check, Send, Sparkles, MapPin } from 'lucide-react';
import { CommunityStory } from '../types/recipe';
import { INITIAL_COMMUNITY_STORIES } from '../data/recipes';

export const CommunitySection: React.FC = () => {
  const [stories, setStories] = useState<CommunityStory[]>(INITIAL_COMMUNITY_STORIES);
  const [likedStories, setLikedStories] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'Tadka Tip' | 'Family Memory' | 'Kitchen Secret'>('Tadka Tip');
  const [successToast, setSuccessToast] = useState(false);

  const toggleLike = (id: string) => {
    setLikedStories((prev) => {
      const isCurrentlyLiked = !!prev[id];
      const newStatus = !isCurrentlyLiked;
      
      setStories((currStories) =>
        currStories.map((story) =>
          story.id === id
            ? { ...story, likes: story.likes + (newStatus ? 1 : -1) }
            : story
        )
      );

      return { ...prev, [id]: newStatus };
    });
  };

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim() || !recipeName.trim()) return;

    const newStory: CommunityStory = {
      id: `story-${Date.now()}`,
      author: author.trim(),
      location: location.trim() || 'Home Kitchen',
      recipeName: recipeName.trim(),
      content: content.trim(),
      timestamp: 'Just now',
      likes: 1,
      category,
    };

    setStories([newStory, ...stories]);
    setLikedStories((prev) => ({ ...prev, [newStory.id]: true }));
    setIsModalOpen(false);
    setAuthor('');
    setLocation('');
    setRecipeName('');
    setContent('');
    
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 4000);
  };

  return (
    <section id="community" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#68472F]/10">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#466044] text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium animate-bounce">
          <Check className="w-4 h-4 text-[#F3C928]" />
          <span>Your kitchen memory has been added to the community wall!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#68472F]">
            <Sparkles className="w-3.5 h-3.5 text-[#F3C928]" />
            <span>Community Table</span>
            <span className="text-[#68472F]/40">·</span>
            <span>Shared Kitchen Stories</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#25241F]">
            From Home Kitchens Around the World
          </h2>
          <p className="text-base text-[#58554D] leading-relaxed">
            The joy of home cooking is magnified when shared. Discover secret family seasoning tricks, triumphant dinner stories, and personal twists from fellow cooks inspired by the videos.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#F3C928] hover:bg-[#D3A713] text-[#25241F] font-semibold text-sm rounded-xl shadow-xs transition-colors self-start md:self-auto shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Share Your Kitchen Memory</span>
        </button>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story) => {
          const isLiked = !!likedStories[story.id];
          return (
            <article
              key={story.id}
              className="bg-white rounded-2xl border border-[#68472F]/12 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow relative"
            >
              <div className="space-y-4">
                {/* Author row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#25241F]">{story.author}</h3>
                    <div className="flex items-center gap-1 text-[11px] text-[#8B877E] mt-0.5">
                      <MapPin className="w-3 h-3 text-[#68472F]" />
                      <span>{story.location}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-[#68472F] bg-[#FAF2E0] px-2.5 py-1 rounded-md">
                    {story.category}
                  </span>
                </div>

                {/* Recipe Tag */}
                <div className="text-xs font-semibold text-[#466044]">
                  Dish: {story.recipeName}
                </div>

                {/* Content */}
                <p className="text-sm text-[#58554D] leading-relaxed italic">
                  "{story.content}"
                </p>
              </div>

              {/* Bottom bar */}
              <div className="pt-4 mt-4 border-t border-[#68472F]/10 flex items-center justify-between text-xs text-[#8B877E]">
                <span>{story.timestamp}</span>
                <button
                  onClick={() => toggleLike(story.id)}
                  type="button"
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
                    isLiked
                      ? 'text-rose-600 bg-rose-50 font-bold'
                      : 'hover:text-[#25241F] hover:bg-[#FAF2E0]'
                  }`}
                  aria-label="Applaud tip"
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="font-mono">{story.likes}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Share Modal Dialog */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[#FFF8E9] w-full max-w-lg rounded-2xl shadow-xl border border-[#68472F]/20 p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#68472F]/10 pb-4">
              <div>
                <h3 className="font-serif-display text-xl font-bold text-[#25241F]">
                  Share a Kitchen Memory or Tip
                </h3>
                <p className="text-xs text-[#8B877E] mt-0.5">
                  Inspire other home cooks with your experience.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="text-[#8B877E] hover:text-[#25241F] p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitStory} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#25241F] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Ananya R."
                    className="w-full px-3 py-2 text-xs bg-white border border-[#68472F]/20 rounded-lg text-[#25241F] focus:outline-none focus:ring-1 focus:ring-[#F3C928]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#25241F] block mb-1">
                    City / Country
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Chennai, India"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#68472F]/20 rounded-lg text-[#25241F] focus:outline-none focus:ring-1 focus:ring-[#F3C928]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#25241F] block mb-1">
                  Dish or Recipe Name *
                </label>
                <input
                  type="text"
                  required
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  placeholder="e.g. Crispy Medu Vada, Filter Kaapi, Sambar..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#68472F]/20 rounded-lg text-[#25241F] focus:outline-none focus:ring-1 focus:ring-[#F3C928]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#25241F] block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#68472F]/20 rounded-lg text-[#25241F] focus:outline-none focus:ring-1 focus:ring-[#F3C928]"
                >
                  <option value="Tadka Tip">Tadka Tip (Technique)</option>
                  <option value="Kitchen Secret">Kitchen Secret (Flavor twist)</option>
                  <option value="Family Memory">Family Memory (Story)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#25241F] block mb-1">
                  Your Memory or Tip *
                </label>
                <textarea
                  required
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What made this dish special? Did a particular cooking cue help it turn out delicious?"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#68472F]/20 rounded-lg text-[#25241F] focus:outline-none focus:ring-1 focus:ring-[#F3C928]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#68472F]/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#58554D] hover:bg-[#FAF2E0] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-[#25241F] bg-[#F3C928] hover:bg-[#D3A713] rounded-lg shadow-2xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish to Community</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
