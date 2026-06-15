import React, { useState } from "react";
import { GALLERY_PHOTOS } from "../data";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<"all" | "garden" | "food" | "ambience">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const tabs = [
    { id: "all", label: "Full Sanctuary" },
    { id: "garden", label: "Garden Sanctuary" },
    { id: "food", label: "Deli & Coffee" },
    { id: "ambience", label: "Cozy Spaces" },
  ] as const;

  const filteredPhotos = activeTab === "all" 
    ? GALLERY_PHOTOS 
    : GALLERY_PHOTOS.filter(p => p.tag === activeTab);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <div className="w-full shrink-0">
      
      {/* Filters */}
      <div className="flex justify-center flex-wrap gap-3.5 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setLightboxIndex(null);
            }}
            className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#163B34] text-white shadow-md"
                : "bg-white border border-[#163B34]/15 hover:border-[#D4A373] text-[#163B34]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group relative cursor-pointer aspect-square rounded-2xl overflow-hidden shadow-sm border border-forest/5 hover:shadow-xl hover:border-[#D4A373]/30 transition-all duration-300"
              onClick={() => setLightboxIndex(index)}
            >
              <img
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={photo.url}
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                <span className="text-[10px] text-gold uppercase tracking-widest font-bold">
                  {photo.tag === "garden" ? "Sanctuary Way" : photo.tag === "food" ? "Handcrafted Brew" : "Lakeside Ambience"}
                </span>
                <span className="font-serif text-lg text-white mt-1 leading-tight font-semibold">
                  {photo.title}
                </span>
                <div className="mt-3 text-white/50 text-[10px] flex items-center space-x-1.5 uppercase font-bold tracking-widest">
                  <Maximize2 size={12} className="text-gold" />
                  <span>View Fullsize</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Fullscreen Lightbox Carousel */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 shadow-2xl block"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button top corner */}
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors z-55 cursor-pointer"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={28} />
            </button>

            {/* Left Button */}
            <button 
              onClick={handlePrev}
              className="absolute left-6 text-white/70 hover:text-white p-3 hover:bg-white/5 rounded-full transition-colors z-52 cursor-pointer border border-white/15"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Main Visual Display */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl max-h-[75vh] flex flex-col items-center select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredPhotos[lightboxIndex].url}
                alt={filteredPhotos[lightboxIndex].title}
                className="max-w-full max-h-[65vh] object-contain rounded-lg border border-white/5 shadow-2xl"
              />
              <div className="text-center mt-5 space-y-1 px-4">
                <span className="text-gold/80 text-[10px] uppercase font-bold tracking-widest block">
                  {filteredPhotos[lightboxIndex].tag.toUpperCase()} ARCHIVES
                </span>
                <span className="font-serif text-base text-white/90 leading-tight font-medium">
                  {filteredPhotos[lightboxIndex].title}
                </span>
                <span className="text-white/40 font-mono text-[10px] block pt-1.5">
                  Image {lightboxIndex + 1} of {filteredPhotos.length}
                </span>
              </div>
            </motion.div>

            {/* Right Button */}
            <button 
              onClick={handleNext}
              className="absolute right-6 text-white/70 hover:text-white p-3 hover:bg-white/5 rounded-full transition-colors z-52 cursor-pointer border border-white/15"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
