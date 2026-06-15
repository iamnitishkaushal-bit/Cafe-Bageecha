import React, { useState } from "react";
import { EVENTS } from "../data";
import { EventItem } from "../types";
import { Calendar, Clock, Ticket, Sparkles, User, Mail, ShieldAlert, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function EventsSection() {
  const [items, setItems] = useState<EventItem[]>(EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [rsvpGuests, setRsvpGuests] = useState(1);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [ticketCode, setTicketCode] = useState("");

  const handleOpenRsvp = (event: EventItem) => {
    setSelectedEvent(event);
    setRsvpSuccess(false);
    setRsvpName("");
    setRsvpEmail("");
    setRsvpGuests(1);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    if (selectedEvent.seatsLeft < rsvpGuests) {
      alert("Apologies! Not enough seat spots remain for that party capacity.");
      return;
    }

    // Decrement seatsLeft in state
    setItems(prev => prev.map(evt => {
      if (evt.id === selectedEvent.id) {
        return {
          ...evt,
          seatsLeft: evt.seatsLeft - rsvpGuests
        };
      }
      return evt;
    }));

    const code = `EVT-${selectedEvent.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketCode(code);
    setRsvpSuccess(true);
  };

  return (
    <div className="w-full shrink-0">
      
      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((evt) => {
          const isSoldOut = evt.seatsLeft === 0;

          return (
            <div 
              key={evt.id}
              className="bg-white rounded-2xl overflow-hidden border border-forest/10 hover:border-[#D4A373]/30 transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col h-full group"
            >
              {/* Media image header */}
              <div className="relative h-48 overflow-hidden bg-forest/5 shrink-0">
                <img 
                  alt={evt.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src={evt.image}
                />
                
                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-45" />

                {/* Admission Fee custom label overlay */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center space-x-1.5 bg-forest text-[#D4A373] text-[10px] uppercase font-black tracking-wider px-3 py-1.5 rounded-sm shadow-md border border-gold/10">
                  <Ticket size={12} />
                  <span>{evt.price === 0 ? "Complimentary Pass" : `Entrance ₹${evt.price}`}</span>
                </div>

                {/* Remaining seats count overlay */}
                <div className="absolute top-4 right-4 z-10">
                  {isSoldOut ? (
                    <span className="bg-red-900 text-white text-[9px] uppercase font-bold px-2 py-1 rounded-sm shadow-sm">
                      Sold out
                    </span>
                  ) : (
                    <span className="bg-white/95 text-forest text-[9px] uppercase font-bold px-2.5 py-1 rounded-sm shadow-sm inline-block">
                      {evt.seatsLeft} of {evt.seatsTotal} seats remain
                    </span>
                  )}
                </div>
              </div>

              {/* Event descriptors block */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex-1">
                  
                  {/* Calender stamp */}
                  <div className="flex items-center space-x-2 text-xs text-gold font-bold uppercase tracking-wider mb-2.5">
                    <Calendar size={14} />
                    <span>{evt.date}</span>
                  </div>

                  <span className="font-serif text-xl font-bold text-forest block leading-snug group-hover:text-[#D4A373] transition-colors duration-300">
                    {evt.title}
                  </span>

                  <p className="text-xs text-forest/70 mt-3.5 leading-relaxed font-sans line-clamp-3">
                    {evt.description}
                  </p>
                </div>

                {/* Footers action row */}
                <div className="pt-4 mt-6 border-t border-forest/10 flex items-center justify-between shrink-0">
                  <div className="flex items-center space-x-1.5 text-xs text-forest/60">
                    <Clock size={13} className="text-gold" />
                    <span className="truncate max-w-[130px]">{evt.time}</span>
                  </div>

                  <button
                    disabled={isSoldOut}
                    onClick={() => handleOpenRsvp(evt)}
                    className={`font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-95 cursor-pointer ${
                      isSoldOut 
                        ? "bg-forest/5 text-forest/30 cursor-not-allowed" 
                        : "bg-forest text-white hover:bg-[#D4A373] hover:text-forest"
                    }`}
                  >
                    {isSoldOut ? "Full House" : "Secure RSVP"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RSVP Modal Overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 block">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-forest/80 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedEvent(null)}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-cream w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gold/15 z-10"
            >
              {/* Header */}
              <div className="bg-forest px-6 py-5 text-white border-b border-white/5 flex justify-between items-center">
                <div>
                  <span className="font-serif text-xl font-bold tracking-wide">Event Spot Registration</span>
                  <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest mt-0.5">Secure your seat inside Chamba</p>
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {rsvpSuccess ? (
                // Success Voucher inside Modal
                <div className="p-6 text-center space-y-5">
                  <div className="inline-block bg-forest text-gold rounded-full p-2.5 shadow-sm">
                    <CheckCircle size={28} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-forest">Spot Secured Successfully!</h3>
                    <p className="text-xs text-forest/70 mt-1">We've added your group to our guest list for {selectedEvent.title}.</p>
                  </div>

                  {/* Tiny Voucher info strip */}
                  <div className="bg-white border border-dashed border-gold/30 rounded-xl p-4 text-xs text-forest text-left space-y-2">
                    <div className="flex justify-between font-bold">
                      <span>Event Ticket Code</span>
                      <span className="font-mono text-gold">{ticketCode}</span>
                    </div>
                    <div className="h-[1px] bg-forest/5" />
                    <div>
                      <span className="text-forest/50 uppercase tracking-widest text-[9px] block">Event Name</span>
                      <strong>{selectedEvent.title}</strong>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <span className="text-forest/50 uppercase tracking-widest text-[9px] block">Reserved Guest count</span>
                        <strong>{rsvpGuests} {rsvpGuests === 1 ? "Person" : "People"}</strong>
                      </div>
                      <div>
                        <span className="text-forest/50 uppercase tracking-widest text-[9px] block">Price Estimate</span>
                        <strong>{selectedEvent.price === 0 ? "Complimentary" : `${selectedEvent.price * rsvpGuests}`}</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="bg-forest text-white font-bold px-8 py-3.5 rounded-lg text-xs uppercase tracking-widest hover:bg-forest/90 cursor-pointer"
                  >
                    Got it, Thanks!
                  </button>
                </div>
              ) : (
                // Input form
                <form onSubmit={handleRsvpSubmit} className="p-6 space-y-4">
                  {/* Selected event summary */}
                  <div className="bg-white p-3.5 border border-forest/10 rounded-lg flex items-center space-x-3 text-xs shrink-0">
                    <img 
                      alt="" 
                      className="w-12 h-12 rounded object-cover" 
                      src={selectedEvent.image}
                    />
                    <div>
                      <span className="font-bold text-forest block leading-tight">{selectedEvent.title}</span>
                      <span className="text-[10px] text-forest/50 block mt-0.5">{selectedEvent.date} @ {selectedEvent.time}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase font-extrabold tracking-widest text-forest/60 block mb-1.5">
                      Your Name *
                    </label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3 text-gold" size={16} />
                      <input 
                        type="text"
                        required
                        placeholder="E.g., Anjali Sharma"
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        className="w-full bg-white rounded-lg pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase font-extrabold tracking-widest text-forest/60 block mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3 text-gold" size={16} />
                      <input 
                        type="email"
                        required
                        placeholder="E.g., anjali.sharma@gmail.com"
                        value={rsvpEmail}
                        onChange={(e) => setRsvpEmail(e.target.value)}
                        className="w-full bg-white rounded-lg pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase font-extrabold tracking-widest text-forest/60 block mb-1.5">
                      Reserved Party Spot size
                    </label>
                    <select
                      value={rsvpGuests}
                      onChange={(e) => setRsvpGuests(parseInt(e.target.value))}
                      className="w-full bg-white rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15"
                    >
                      {[1, 2, 4, 6].map(num => (
                        <option 
                          key={num} 
                          value={num}
                          disabled={selectedEvent.seatsLeft < num}
                        >
                          {num} {num === 1 ? "Seat Placeholder" : "Seats Group"} {selectedEvent.seatsLeft < num ? "(Unavailable)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedEvent.price > 0 && (
                    <div className="bg-gold/10 p-3 rounded-lg flex items-center space-x-2 text-[10px] text-forest/75 shrink-0">
                      <ShieldAlert size={14} className="text-gold mt-0.5 shrink-0" />
                      <span>Note: Pay entrance cover of ₹{selectedEvent.price * rsvpGuests} upon arrival at reception counter.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-forest text-white font-bold py-3 rounded-lg text-xs uppercase tracking-[0.15em] transition-all hover:bg-forest/90 cursor-pointer shadow-md mt-2"
                  >
                    Secure {rsvpGuests} Seats • Total Est: {selectedEvent.price === 0 ? "Free Passed" : `₹${selectedEvent.price * rsvpGuests}`}
                  </button>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
