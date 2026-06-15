import React, { useState, useEffect } from "react";
import { INITIAL_REVIEWS } from "../data";
import { Review } from "../types";
import { Star, Check, PenTool, ShieldCheck, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function GuestReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [comment, setComment] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    // Load reviews on mount
    const savedReviewsString = localStorage.getItem("bageecha_reviews");
    if (savedReviewsString) {
      try {
        const saved = JSON.parse(savedReviewsString);
        setReviews([...saved, ...INITIAL_REVIEWS]);
      } catch (err) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      alert("Please enter both your name and feedback to register your comment.");
      return;
    }

    const newReview: Review = {
      id: `rev_${Date.now()}`,
      stars: rating,
      name: name.trim(),
      text: comment.trim(),
      date: new Date().toISOString().split("T")[0],
      verified: true,
      avatarColor: ["bg-forest", "bg-amber-800", "bg-[#D4A373]", "bg-teal-900", "bg-emerald-800"][Math.floor(Math.random() * 5)],
      origin: origin.trim() || "Verified Explorer"
    };

    const localSavedString = localStorage.getItem("bageecha_reviews");
    let currentSavedList: Review[] = [];
    if (localSavedString) {
      try {
        currentSavedList = JSON.parse(localSavedString);
      } catch (e) {
        currentSavedList = [];
      }
    }

    const updatedLocalStorageList = [newReview, ...currentSavedList];
    localStorage.setItem("bageecha_reviews", JSON.stringify(updatedLocalStorageList));

    // Update state to prepend review
    setReviews(prev => [newReview, ...prev]);

    // Clear state
    setName("");
    setComment("");
    setOrigin("");
    setRating(5);
    setIsSuccess(true);
    setFormOpen(false);

    // Timeout response reset
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="w-full shrink-0">
      
      {/* Testimonials Summary Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-12">
        <div className="text-center md:text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-gold mb-1">Guest Sentiment Board</p>
          <span className="font-serif text-3xl font-extrabold text-[#163B34]">Pahadi Guest Experiences</span>
          <div className="flex items-center justify-center md:justify-start space-x-1.5 mt-2 text-gold">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={15} fill="currentColor" />
            ))}
            <span className="text-xs text-[#163B34]/60 font-medium ml-2">Based on 145+ TripAdvisor & Google reviews</span>
          </div>
        </div>

        {/* Call to write review */}
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="bg-forest text-white hover:bg-gold hover:text-forest px-6 py-3.5 rounded-lg text-xs uppercase tracking-widest font-bold transition-all duration-300 flex items-center space-x-2 shadow-md cursor-pointer inline-block"
        >
          <PenTool size={13} />
          <span>{formOpen ? "Close Guestbook" : "Register a Review"}</span>
        </button>
      </div>

      {/* Success Banner */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-4 rounded-xl mb-8 flex items-center space-x-3 text-sm"
          >
            <div className="bg-emerald-800 text-white p-1 rounded-full shrink-0">
              <Check size={14} />
            </div>
            <div>
              <strong>Review submitted successfully!</strong> your thoughts have been logged dynamically. Refresh or trek on.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Form wrapper */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, height: 0 }}
            animate={{ opacity: 1, scale: 1, height: "auto" }}
            exit={{ opacity: 0, scale: 0.98, height: 0 }}
            className="bg-white rounded-2xl p-6 border border-gold/15 mb-10 overflow-hidden shadow-lg h-auto"
          >
            <div className="border-b border-forest/10 pb-4 mb-4">
              <span className="font-serif text-lg font-bold text-forest">Leave a Chamba Memory</span>
              <p className="text-xs text-forest/50 font-sans mt-0.5">Please share your honest ratings of our coffee, food and staff hospitality.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rating selector stars */}
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#163B34]/60 block mb-2">
                  Overall Rating *
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((starIndex) => {
                    const isHighlighted = (hoverRating !== null ? hoverRating : rating) >= starIndex;
                    return (
                      <button
                        key={starIndex}
                        type="button"
                        onClick={() => setRating(starIndex)}
                        onMouseEnter={() => setHoverRating(starIndex)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="text-gold p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                      >
                        <Star 
                          size={24} 
                          fill={isHighlighted ? "currentColor" : "none"} 
                          stroke="currentColor" 
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs text-[#163B34]/60 font-semibold ml-3 block text-center min-w-[70px]">
                    {rating === 5 && "⭐ Exceptional"}
                    {rating === 4 && "⭐ Very Good"}
                    {rating === 3 && "⭐ Satisfactory"}
                    {rating === 2 && "⭐ Mediocre"}
                    {rating === 1 && "⭐ Disappointed"}
                  </span>
                </div>
              </div>

              {/* Input grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#163B34]/60 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Nitish Kaushal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-cream rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15 font-medium placeholder-forest/30 text-forest"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#163B34]/60 block mb-1">
                    Your Home Town / City
                  </label>
                  <input
                    type="text"
                    placeholder="E.g., Chandigarh"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-cream rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15 font-medium placeholder-forest/30 text-forest"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#163B34]/60 block mb-1">
                    Review Details *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Write a warm note on how your visit turned out. Mention favorite corners, signature lattes or if they tasted the local Siddu buns..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-cream rounded-lg px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15 font-medium placeholder-forest/30 text-forest"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-forest/70 hover:bg-forest/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-forest text-white font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-widest hover:opacity-90 cursor-pointer shadow-md"
                >
                  Publish Memories
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews Grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {reviews.map((rev) => (
            <motion.div
              layout
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-forest/10 hover:shadow-md hover:border-gold/20 duration-300 relative flex flex-col h-full"
            >
              {/* Stars display */}
              <div className="text-gold flex space-x-0.5 mb-5 shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < rev.stars ? "currentColor" : "none"} 
                    stroke="currentColor" 
                  />
                ))}
              </div>

              {/* Text content block */}
              <p className="italic text-forest/80 text-sm leading-relaxed mb-6 font-sans flex-1">
                "{rev.text}"
              </p>

              {/* Guest metadata footer */}
              <div className="flex items-center space-x-3.5 pt-4 border-t border-forest/5 shrink-0 block">
                {/* Visual Avatar circle */}
                <div className={`w-9 h-9 rounded-full ${rev.avatarColor || "bg-[#163B34]"} text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm shrink-0`}>
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <div className="font-extrabold text-xs text-forest flex items-center space-x-1.5 leading-snug">
                    <span>{rev.name}</span>
                    {rev.verified && (
                      <ShieldCheck size={14} className="text-emerald-700 mt-0.5" title="Verified Customer" />
                    )}
                  </div>
                  <div className="text-[10px] text-forest/50 font-bold uppercase tracking-wider flex items-center space-x-1 mt-0.5">
                    <MapPin size={9} className="text-gold" />
                    <span>{rev.origin}</span>
                    <span className="mx-1">•</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
