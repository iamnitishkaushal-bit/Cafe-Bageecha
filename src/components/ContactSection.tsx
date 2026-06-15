import React, { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Send, Check, ShieldCheck, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ContactSection() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [subject, setSubject] = useState("general");
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [currentLocalTime, setCurrentLocalTime] = useState<Date>(new Date());
  
  // Update virtual clock relative to true local time and check open status
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLocalTime(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Cafe schedule logic: 9:00 AM (9) to 10:00 PM (22)
  const getOpenStatus = () => {
    // Let's determine if the cafe is currently open.
    // In HP local typical zone (India timezone, which is usually ahead),
    // let's create a beautiful, descriptive check. Let's assume standard local clock hours.
    const currentHour = currentLocalTime.getHours();
    
    if (currentHour >= 9 && currentHour < 22) {
      return {
        open: true,
        text: "OPENS DAILY • OPEN NOW",
        detailed: "Come down under our green arches for warm wood-fired pizza and freshly roasted lattes. Coffee machines are warmed up!",
        color: "bg-emerald-500 ring-emerald-500/20 text-emerald-800 bg-emerald-50"
      };
    } else {
      return {
        open: false,
        text: "CLOSED FOR THE NIGHT",
        detailed: "Tucked in of alpine cold! We open doors tomorrow morning at 09:00 AM. See you after sunrise!",
        color: "bg-red-500 ring-red-500/20 text-red-800 bg-red-50"
      };
    }
  };

  const status = getOpenStatus();

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail || !messageText) {
      alert("Please supply all necessary fields to route your inquiries safely.");
      return;
    }

    setIsSending(true);

    // Simulate standard SMTP server dispatching with micro-interaction loaders
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setUserName("");
      setUserEmail("");
      setMessageText("");
      setSubject("general");
      
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  return (
    <div className="w-full shrink-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Contact info column */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Live Open Hours Status widget */}
            <div className={`p-5 rounded-2xl border border-forest/10 relative overflow-hidden flex flex-col justify-center shadow-xs shrink-0 ${status.color}`}>
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status.open ? "bg-emerald-400" : "bg-red-400"}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${status.open ? "bg-emerald-600" : "bg-red-600"}`}></span>
                </span>
                <span className="text-[10px] font-sans font-black tracking-[0.2em] uppercase">
                  {status.text}
                </span>
              </div>
              <p className="text-xs font-medium mt-1.5 leading-relaxed text-forest/80 italic">
                "{status.detailed}"
              </p>
            </div>

            {/* Direct coordinate list */}
            <div className="bg-white p-8 rounded-2xl border border-forest/10 space-y-7 shadow-xs">
              <span className="font-serif text-lg font-bold text-forest block">Coordinates & Channels</span>
              <ul className="space-y-5 text-sm text-forest/80">
                <li className="flex items-start space-x-4">
                  <div className="bg-gold/15 p-2 rounded-lg text-gold shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <strong className="text-forest font-bold block text-xs uppercase tracking-wider">Cafe Address</strong>
                    <span className="text-xs leading-normal block mt-1">
                      Cafe Bageecha, Near Valley Overlook, Chamba, Himachal Pradesh, 176310, India
                    </span>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="bg-gold/15 p-2 rounded-lg text-gold shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <strong className="text-forest font-bold block text-xs uppercase tracking-wider">Call Coordinates</strong>
                    <span className="text-xs leading-normal block mt-1 font-mono">
                      +91 98765 43210
                    </span>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="bg-gold/15 p-2 rounded-lg text-gold shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <strong className="text-forest font-bold block text-xs uppercase tracking-wider">Electronic Mail</strong>
                    <span className="text-xs leading-normal block mt-1 font-mono hover:text-[#D4A373] transition-colors">
                      hello@cafebageecha.com
                    </span>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="bg-gold/15 p-2 rounded-lg text-gold shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <strong className="text-forest font-bold block text-xs uppercase tracking-wider">Operational Lounge</strong>
                    <span className="text-xs leading-normal block mt-1">
                      Every single day: 09:00 AM - 10:00 PM <span className="text-[10px] text-forest/50 font-sans block mt-0.5">(Includes national holidays and snowfall sessions)</span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Social connections block */}
          <div className="bg-forest text-white p-6 rounded-2xl shadow-md border border-white/5 space-y-4 shrink-0 block">
            <span className="font-serif text-sm font-semibold tracking-wider text-gold block uppercase tracking-[0.15em]">Direct Social Hooks</span>
            <p className="text-[11px] text-white/60 leading-normal">
              Need immediate answers? Ring us up on WhatsApp or browse our visual gallery feed directly under the handle <strong className="text-white font-medium">@cafe_bageecha_chamba</strong>.
            </p>
            <div className="flex gap-2.5">
              <a href="#" className="flex-1 bg-white/10 hover:bg-gold hover:text-forest py-2.5 px-3 rounded-lg text-center text-xs font-bold transition-all uppercase tracking-widest border border-white/5">Instagram</a>
              <a href="#" className="flex-1 bg-white/10 hover:bg-gold hover:text-forest py-2.5 px-3 rounded-lg text-center text-xs font-bold transition-all uppercase tracking-widest border border-white/5">WhatsApp</a>
              <a href="#" className="flex-1 bg-white/10 hover:bg-gold hover:text-forest py-2.5 px-3 rounded-lg text-center text-xs font-bold transition-all uppercase tracking-widest border border-white/5">Facebook</a>
            </div>
          </div>
        </div>

        {/* Operational inquiry form panel */}
        <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-forest/10 flex flex-col justify-between shadow-xs">
          <div>
            <div className="border-b border-forest/10 pb-4 mb-6">
              <span className="font-serif text-xl font-bold text-forest block leading-snug">Inquiry & Event Desks</span>
              <p className="text-xs text-forest/50 font-sans mt-0.5">Planning private birthday celebrations, custom romantic mountain proposals, or high end retreat catering? Let us craft it.</p>
            </div>

            <AnimatePresence>
              {isSent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-4 rounded-xl mb-6 flex items-center space-x-3 text-xs shrink-0"
                >
                  <div className="bg-emerald-800 text-white p-1 rounded-full shrink-0">
                    <Check size={14} />
                  </div>
                  <div>
                    <strong>Operational transmission success!</strong> we have received your request and will follow up within <strong>4 hours</strong>.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#163B34]/60 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Nitish Kaushal"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-cream rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15 font-medium text-forest"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#163B34]/60 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="E.g., you@domain.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full bg-cream rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15 font-medium text-forest"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#163B34]/60 block mb-1">
                  Topic & Desk Section
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-cream rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15 text-forest"
                >
                  <option value="general">General Lounge Information & Seats</option>
                  <option value="birthday">Private Birthday / Anniversary Lawn Arrangements</option>
                  <option value="proposal">Cozy Cliff Proposal setups</option>
                  <option value="corporate">Himalayan Corporate Offsites & Retreats</option>
                  <option value="catering">Bulk Siddu/Pastry Delivery & Catering</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#163B34]/60 block mb-1">
                  Inquiry Message text *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about guest capacity counts, specific dates, standard diets and custom visual decorations needed."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full bg-cream rounded-lg px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15 font-medium text-forest"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-forest text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#D4A373] hover:text-forest flex items-center justify-center space-x-2 shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Transmitting inquiries...</span>
                  </>
                ) : (
                  <>
                    <Send size={13} className="text-gold" />
                    <span>Send Desk inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 pt-5 border-t border-forest/5 flex items-center space-x-2 text-[10px] text-forest/40">
            <ShieldCheck size={12} className="text-gold" />
            <span>Encrypted transmission. Coordinates are secured fully.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
