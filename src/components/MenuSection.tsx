import { useState, useEffect } from "react";
import { Coffee, Pizza, Cake, Compass, Sparkles, Plus, Minus, ShoppingBag, Search, Eye, Calendar } from "lucide-react";
import { MENU_ITEMS } from "../data";
import { MenuItem, FoodTag } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface MenuSectionProps {
  onOpenBooking: () => void;
  onPreviewItem: (item: MenuItem) => void;
}

export default function MenuSection({ onOpenBooking, onPreviewItem }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "brews" | "bites" | "sweets" | "mountain_specials">("all");
  const [activeTag, setActiveTag] = useState<"all" | FoodTag>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const handleAddToCartDirect = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        addToCart(customEvent.detail);
      }
    };
    window.addEventListener("add-to-cart-direct", handleAddToCartDirect);
    return () => window.removeEventListener("add-to-cart-direct", handleAddToCartDirect);
  }, []);

  const categories = [
    { id: "all", label: "Full Board", subtitle: "All Delicacies", icon: Compass },
    { id: "brews", label: "Specialty Brews", subtitle: "Beans & Leaves", icon: Coffee },
    { id: "bites", label: "Garden Bites", subtitle: "Sourdoughs & Pastas", icon: Pizza },
    { id: "sweets", label: "Alpine Patisserie", subtitle: "Freshly Baked", icon: Cake },
    { id: "mountain_specials", label: "Pahadi Treasures", subtitle: "Native Heritage", icon: Sparkles },
  ] as const;

  const tagFilters = [
    { id: "all", label: "All Items" },
    { id: "must_try", label: "★ Best Sellers" },
    { id: "signature", label: "🌿 Signature Dishes" },
    { id: "vegan", label: "🍃 Dairy Free / Vegan" },
    { id: "gluten_free", label: "🌾 Gluten Free" },
    { id: "hot", label: "🔥 Warm & Cozied" },
    { id: "cold", label: "❄️ Chilled Crafts" },
  ] as const;

  // Add & Subtract from Taste Basket
  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const updated = { ...prev };
      if (updated[id] <= 1) {
        delete updated[id];
      } else {
        updated[id] -= 1;
      }
      return updated;
    });
  };

  const clearCart = () => setCart({});

  // Filter computation
  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesTag = activeTag === "all" || item.tags.includes(activeTag);
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.hindiName && item.hindiName.includes(searchQuery)) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTag && matchesSearch;
  });

  // Basket summary values
  const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
    const item = MENU_ITEMS.find(m => m.id === id);
    const itemQty = qty as number;
    return total + (item ? item.price * itemQty : 0);
  }, 0);

  const cartCount = Object.values(cart).reduce((a, b) => (a as number) + (b as number), 0) as number;

  return (
    <div className="w-full relative shrink-0">
      
      {/* Decorative coffee bean image floating on visual backdrop */}
      <div className="absolute right-0 top-0 opacity-10 pointer-events-none w-52 h-48 select-none">
        <img 
          alt="bean decor" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjU15pC-it6ev6kQ0ajuoqnrq1hFjDMX1tD2qh2AvqScTUYCLkPikXH8yUx_sRzrkukXtrB8zxU59Fd2xInpfmTZrapf0kD8cHSwcg1MCQOS2wBLjiZ7qXb-gPZvj_2ER9R7OuGyxL5d_5LZ080HTkSKTYpZw8ZRIh8Sbz4uDxGhTr8bT2SlVmhN0af7Z-xK74SDtoCwKzHjb8Mm6sWFX31iIp9QqDDp8oiXEJNe-xHrTYLHRUp4TP8naDpEkZ9Cg0dVpqehW65j8S" 
          className="w-full h-full object-contain rotate-12"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Menu Controls column */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Categories Tab Bar */}
          <div className="flex -mx-4 px-4 overflow-x-auto pb-4 gap-4 scrollbar-none items-center">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setActiveTag("all"); // Reset tag filter on major tab switch
                  }}
                  className={`flex items-center space-x-3.5 px-6 py-4 rounded-xl transition-all border shrink-0 text-left cursor-pointer duration-300 ${
                    isActive 
                      ? "bg-forest border-forest text-white shadow-lg shadow-forest/15 translate-y-[-2px]" 
                      : "bg-white border-forest/15 text-forest hover:border-gold hover:bg-cream-dim"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? "bg-gold/20 text-gold" : "bg-[#163B34]/5 text-forest"}`}>
                    <IconComp size={18} />
                  </div>
                  <div>
                    <span className="font-serif text-sm font-extrabold block leading-tight">{cat.label}</span>
                    <span className={`text-[10px] tracking-wider uppercase block ${isActive ? "text-gold" : "text-forest/50"}`}>{cat.subtitle}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Search bar and Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Tag pills */}
            <div className="flex overflow-x-auto -mx-4 px-4 pb-2 gap-2 scrollbar-none md:flex-wrap">
              {tagFilters.map(pill => (
                <button
                  key={pill.id}
                  onClick={() => setActiveTag(pill.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors shrink-0 whitespace-nowrap ${
                    activeTag === pill.id 
                      ? "bg-gold text-forest" 
                      : "bg-white border border-forest/5 text-forest/70 hover:text-forest hover:bg-forest/5"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative flex items-center w-full md:w-72">
              <Search className="absolute left-3.5 text-forest/40" size={16} />
              <input
                type="text"
                placeholder="Search coffee, Siddu, desserts..."
                value={searchQuery}
                aria-label="Search items"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white rounded-lg pl-10 pr-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15 placeholder-forest/40"
              />
            </div>
          </div>

          {/* Menu Food Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const qtyInCart = cart[item.id] || 0;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-2xl overflow-hidden border border-forest/10 hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:border-[#D4A373]/30"
                  >
                    {/* Media Display container */}
                    <div className="relative h-48 overflow-hidden bg-forest/5 shrink-0">
                      <img 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src={item.image}
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Dark overlay vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-45" />

                      {/* Best Seller / Chef Special Tags overlay */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        {item.tags.includes("must_try") && (
                          <span className="bg-gold text-forest text-[9px] uppercase font-black px-2.5 py-1 rounded-sm tracking-wider shadow-sm">
                            Best Seller
                          </span>
                        )}
                        {item.tags.includes("signature") && (
                          <span className="bg-forest text-white text-[9px] uppercase font-black px-2.5 py-1 rounded-sm tracking-wider shadow-sm border border-gold/15">
                            Chef Special
                          </span>
                        )}
                      </div>

                      {/* View details eye button overlay */}
                      <button 
                        onClick={() => onPreviewItem(item)}
                        className="absolute bottom-3 right-3 bg-white/90 text-forest p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:scale-105 shadow-sm"
                        title="Ingredients Details"
                      >
                        <Eye size={14} />
                      </button>
                    </div>

                    {/* Meta description blocks */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-serif text-base font-extrabold text-forest group-hover:text-gold transition-colors duration-300 block leading-tight">
                              {item.name}
                            </span>
                            {item.hindiName && (
                              <span className="text-[11px] font-sans font-bold text-forest/40 block mt-0.5 tracking-wide">
                                {item.hindiName}
                              </span>
                            )}
                          </div>
                          <span className="font-serif font-extrabold text-sm text-[#163B34] whitespace-nowrap bg-cream/70 px-2 py-0.5 rounded-xs">
                            ₹{item.price}
                          </span>
                        </div>
                        <p className="text-xs text-[#163B34]/70 mt-3 leading-relaxed font-sans line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {/* Add Button Action bar */}
                      <div className="pt-4 mt-4 border-t border-forest/10 flex items-center justify-between shrink-0">
                        <div className="flex gap-1.5">
                          {item.tags.includes("vegan") && (
                            <span className="bg-emerald-50 text-emerald-800 text-[10px] uppercase font-black tracking-wide px-2 py-0.5 rounded-xs" title="Vegan">
                              Vegan
                            </span>
                          )}
                          {item.tags.includes("gluten_free") && (
                            <span className="bg-amber-50 text-amber-800 text-[10px] uppercase font-black tracking-wide px-2 py-0.5 rounded-xs" title="Gluten-Free">
                              GF
                            </span>
                          )}
                        </div>

                        {qtyInCart > 0 ? (
                          <div className="flex items-center space-x-2 bg-forest text-white rounded-lg px-2.5 py-1.5 shadow-sm">
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="hover:text-gold p-1 cursor-pointer"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-extrabold w-4 text-center">{qtyInCart}</span>
                            <button 
                              onClick={() => addToCart(item.id)}
                              className="hover:text-gold p-1 cursor-pointer"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item.id)}
                            className="bg-forest/5 hover:bg-forest hover:text-white text-forest font-bold px-3 py-1.5 rounded-lg text-xs transition-all duration-300 flex items-center space-x-1 cursor-pointer active:scale-95"
                          >
                            <Plus size={12} />
                            <span>Add Taste</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredItems.length === 0 && (
              <div className="col-span-1 md:col-span-3 text-center py-16 bg-white rounded-2xl border border-forest/10">
                <span className="text-4xl">🌾</span>
                <span className="font-serif text-lg font-bold text-forest block mt-3">No matching treats found</span>
                <p className="text-xs text-[#163B34]/60 mt-1 max-w-sm mx-auto">
                  Try adjusting categories, clearing queries or selecting our Buransh herbal teas.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setActiveTag("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 bg-forest text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-95"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Taste Basket (Right Sidebar pre-order simulation) */}
        <div className="lg:col-span-1 shrink-0">
          <div className="bg-forest text-white rounded-2xl p-6 shadow-xl sticky top-28 border border-white/10 flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="text-gold" size={18} />
                <span className="font-serif text-lg font-extrabold">Taste Basket</span>
              </div>
              {(cartCount as number) > 0 && (
                <button
                  onClick={clearCart}
                  className="text-white/40 hover:text-white text-[10px] uppercase font-bold tracking-wider cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto space-y-4 py-4 min-h-[120px]">
              {Object.entries(cart).map(([id, qty]) => {
                const item = MENU_ITEMS.find((m) => m.id === id);
                if (!item) return null;
                return (
                  <div key={id} className="flex justify-between items-start text-xs border-b border-white/5 pb-3">
                    <div className="max-w-[70%]">
                      <span className="font-bold text-white block truncate leading-tight">{item.name}</span>
                      <span className="text-[10px] text-white/50 block mt-0.5">₹{item.price} each</span>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="font-bold text-gold">₹{item.price * (qty as number)}</span>
                      <div className="flex items-center space-x-1.5 bg-black/45 rounded-sm px-1 py-0.5 border border-white/15">
                        <button onClick={() => removeFromCart(id)} className="text-white/60 hover:text-white cursor-pointer select-none">
                          <Minus size={10} />
                        </button>
                        <span className="font-extrabold text-[10px] min-w-4 text-center">{qty}</span>
                        <button onClick={() => addToCart(id)} className="text-white/60 hover:text-white cursor-pointer select-none">
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {cartCount === 0 && (
                <div role="status" className="text-center py-6 text-white/50 space-y-2 mt-4">
                  <span className="text-2xl block">☕</span>
                  <p className="text-xs font-medium">Bageecha basket is empty</p>
                  <p className="text-[10px] text-white/35 max-w-[150px] mx-auto leading-relaxed">
                    Select a few woodfired pizzas or local Siddu pastries above to list.
                  </p>
                </div>
              )}
            </div>

            {/* Total Block */}
            {(cartCount as number) > 0 && (
              <div className="border-t border-white/10 pt-4 shrink-0">
                <div className="flex items-center justify-between text-sm font-semibold mb-5">
                  <span className="text-white/75">Taste Basket Est:</span>
                  <span className="text-gold font-serif text-lg font-bold">₹{cartTotal}</span>
                </div>
                
                <button
                  onClick={onOpenBooking}
                  className="w-full bg-gold hover:bg-white text-forest font-bold py-3.5 rounded-lg text-xs uppercase tracking-[0.14em] transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer duration-300"
                >
                  <Calendar size={14} />
                  <span>Book and Link Order</span>
                </button>
                <span className="text-[9px] text-white/40 block text-center mt-2.5">
                  Pre-ordered taste items stored and loaded.
                </span>
              </div>
            )}

            {cartCount === 0 && (
              <button
                onClick={onOpenBooking}
                className="w-full border border-white/20 hover:border-gold hover:bg-white/5 text-white py-3 rounded-lg text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer inline-block shrink-0"
              >
                Book a Table First
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
