import { MenuItem } from "../types";
import { X, Coffee, ShieldAlert, Sparkles, CheckCircle, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ItemPreviewModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToBasket: (id: string) => void;
}

export default function ItemPreviewModal({ item, onClose, onAddToBasket }: ItemPreviewModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-forest/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-cream w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gold/20 z-10">
        
        {/* Banner Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full cursor-pointer z-20"
          title="Close"
        >
          <X size={18} />
        </button>

        {/* Media Block */}
        <div className="h-56 relative overflow-hidden bg-forest/5">
          <img 
            alt={item.name} 
            src={item.image} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
            <span className="text-[10px] text-gold uppercase tracking-widest font-black flex items-center space-x-1">
              <Sparkles size={11} />
              <span>Chamba Mountain Kitchens</span>
            </span>
            <span className="font-serif text-2xl text-white font-extrabold leading-tight mt-1">{item.name}</span>
            {item.hindiName && (
              <span className="text-white/60 text-xs font-semibold block mt-0.5">{item.hindiName}</span>
            )}
          </div>
        </div>

        {/* Details and Ingredients */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs text-forest/40 uppercase tracking-widest font-bold">Chef's Flavor Notes</span>
            <p className="text-sm text-forest/80 leading-relaxed font-sans mt-1">
              {item.description}
            </p>
          </div>

          {/* Sizing & Sourcing */}
          <div className="grid grid-cols-2 gap-4 text-xs font-sans">
            <div className="bg-white p-3.5 border border-forest/10 rounded-lg">
              <strong className="text-forest block uppercase text-[10px] text-forest/50 tracking-wider">Estimated Price</strong>
              <span className="font-serif text-lg font-bold text-forest mt-1 block">₹{item.price}</span>
            </div>
            <div className="bg-white p-3.5 border border-forest/10 rounded-lg">
              <strong className="text-forest block uppercase text-[10px] text-forest/50 tracking-wider">Source standard</strong>
              <span className="font-sans font-bold text-emerald-800 mt-1 block flex items-center space-x-1">
                <Leaf size={12} className="text-emerald-700" />
                <span>100% Organic</span>
              </span>
            </div>
          </div>

          {/* Nutrition and Allergen alerts */}
          <div className="bg-gold/10 p-4 border border-gold/10 rounded-xl space-y-2.5">
            <div className="flex items-center space-x-2 text-xs text-forest font-bold">
              <ShieldAlert className="text-gold" size={16} />
              <span>Nutrition & Allergen Indexes</span>
            </div>
            <p className="text-[11px] leading-relaxed text-forest/75 mt-1">
              Contains no artificial concentrates, trans fat or preservatives. Stitched with Himalayan mountain spring waters and dairy sourced directly from Chamba valley cooperatives.
            </p>
          </div>

          {/* Action button */}
          <div className="pt-4 border-t border-forest/5 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 border border-forest/15 hover:bg-forest/5 text-forest py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Back to Board
            </button>
            <button
              onClick={() => {
                onAddToBasket(item.id);
                onClose();
              }}
              className="flex-grow-[2] bg-forest text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
            >
              <CheckCircle size={14} className="text-gold" />
              <span>Add to Basket</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
