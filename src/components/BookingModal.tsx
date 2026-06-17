import React, { useState } from "react";
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  Map, 
  CheckCircle, 
  Info, 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  CalendarPlus, 
  MessageSquare, 
  Home, 
  ShieldCheck, 
  Check, 
  AlertTriangle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TableType } from "../types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("01:30 PM");
  const [tableType, setTableType] = useState<TableType>("garden_seating");
  
  // Form fields
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [specialNotes, setSpecialNotes] = useState<string>("");
  
  // Real-time validation visual states
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);

  // Success state storage
  const [bookingCode, setBookingCode] = useState<string>("");
  const [assignedTable, setAssignedTable] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState(false);

  // Available seating areas config
  const seatingAreas = [
    {
      id: "garden_seating",
      name: "Open Garden Seating",
      headline: "Arched Floral Sanctuary",
      description: "Dine amongst freshly blooming climbing roses, paved stone paths and the whispering mountain breeze. Perfect for the ultimate outdoor afternoon.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7LuOFCG5vbvJIEMIpGeeRsywKa78bYxmwfp_gJzPuNfdbObKWZ1PIYvTOxqY7hIj4kyB3Y1BeQ8YTEPyFLM6yBz3VupEAOTw1GMucsDCipcmgr_uTOcsapUm6RADsieLWBYqvImOoIEC-jYjz0JQO4bOeireg9KdI6CFgsVwkUaRBuKjL8AJFUabKo054AjWl_tacqzu1Si6GaGuftw_gjvum3sMsNpMY3QzPxMlzzoKoXz32ufx__iAm_ztbbDjaYk2QXmmAVm7k"
    },
    {
      id: "cozy_benches",
      name: "Cozy Garden Benches",
      headline: "Fireplace Sitting",
      description: "Warm timber benches surrounding central stone campfires. Furnished with plaid wool throw-blankets for a cozy high-elevation evening ambiance.",
      image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "glasshouse",
      name: "Glasshouse Oasis",
      headline: "Indoor Plant Sanctuary",
      description: "An elegant timber-framed glass conservatory lined with exotic ferns. Offers absolute warmth and spectacular panoramic valley views on clear and misty days alike.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "mountain_view_balcony",
      name: "Mountain View Balcony",
      headline: "Summit Viewing Ridge",
      description: "Suspended platform hanging over the alpine pine cliffs. Boasts pristine unobstructed vistas of the Snowclad Dhauladhar peaks. Highly demanded for romantic evenings.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJjy7n9DJx66A64l3sLB3KM0PTPyXWKlknnDXoEVCx-5ausrfsKlUR9mkf-1BVJNVdFsievcdaNeZIOJvXwqGC43TuQDay9pvQBksNpZ9D4OPNsSA92Sh4h4KxfsasOz8PlgIP_KXTIwkfha0NsSUjzUvUJ9wEg4UW-kuNB8OXlEuz_WcdxgAE5k9h61iBt-PEp7PHtey8kjvbO5g7J_U1CVmwvQKlhHJXofwRMNXRInQYUSlGE973BvuASKEPRCx4UDlD8RNfNYK6"
    }
  ];

  const timeSlots = [
    "09:30 AM", "11:00 AM", "12:30 PM", "01:30 PM", "03:00 PM",
    "04:30 PM", "06:00 PM", "07:30 PM", "09:00 PM"
  ];

  // Simple inline validation formulas
  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length >= 10;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!date) {
        alert("Please select a calendar date to align our kitchen ledger resources.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setNameTouched(true);
      setEmailTouched(true);
      setPhoneTouched(true);

      if (!userName.trim()) {
        alert("Please supply your full name so our host can welcome you.");
        return;
      }
      if (!isEmailValid(userEmail)) {
        alert("Please double check your email address coordinate for verified transmission.");
        return;
      }
      if (!isPhoneValid(userPhone)) {
        alert("A robust 10-digit telephone coordinate guarantees table notifications reach you.");
        return;
      }

      // Generate randomized premium booking details
      const code = `GBC-${Math.floor(1000 + Math.random() * 9000)}-${date.replace(/-/g, "").substring(4, 8).toUpperCase()}`;
      const randomTable = Math.floor(1 + Math.random() * 18);
      setBookingCode(code);
      setAssignedTable(randomTable);

      // Save to localStorage for robust full-stack persistence simulation page
      const newReservation = {
        code,
        userName,
        userEmail,
        userPhone,
        date,
        time,
        guests,
        tableType,
        specialNotes,
        tableNumber: randomTable,
        timestamp: new Date().toISOString()
      };
      
      const existing = localStorage.getItem("bageecha_reservations");
      if (existing) {
        const parsed = JSON.parse(existing);
        parsed.push(newReservation);
        localStorage.setItem("bageecha_reservations", JSON.stringify(parsed));
      } else {
        localStorage.setItem("bageecha_reservations", JSON.stringify([newReservation]));
      }

      setStep(3);
    }
  };

  const handleReset = () => {
    setStep(1);
    setGuests(2);
    setDate("");
    setTime("01:30 PM");
    setTableType("garden_seating");
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setSpecialNotes("");
    setEmailTouched(false);
    setPhoneTouched(false);
    setNameTouched(false);
    onClose();
  };

  // Modern PDF Receipt simulation triggers downloading file
  const triggerDownloadMock = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      
      // Build textual receipt content
      const content = `
=========================================
       CAFE BAGEECHA TABLE SECURITY
=========================================
Booking Code    : ${bookingCode}
Customer Name   : ${userName}
Seating Zone    : ${tableType.replace(/_/g, " ").toUpperCase()}
Party Size      : ${guests} Guests
Reserved Date   : ${date}
Arrival Bracket : ${time}
Coordinate Tel  : ${userPhone}
Secured Table   : Table #${assignedTable}
Status          : VERIFIED & CONFIRMED

Location        : Cafe Bageecha, Panchvati,
                  Sarol, Chamba, Himachal Pradesh
=========================================
   Show this voucher upon garden entrance.
      Thank you for choosing Cafe Bageecha.
      `;
      
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `bageecha_voucher_${bookingCode}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1200);
  };

  // Google Calendar trigger
  const generateGoogleCalendarLink = () => {
    const formattedDate = date.replace(/-/g, "");
    // Default 2 hour duration
    const startHour = time.includes("PM") && !time.startsWith("12")
      ? parseInt(time.split(":")[0]) + 12 
      : parseInt(time.split(":")[0]);
    
    const formattedStart = `${formattedDate}T${startHour.toString().padStart(2, "0")}3000`;
    const formattedEnd = `${formattedDate}T${(startHour + 2).toString().padStart(2, "0")}3000`;
    
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cafe+Bageecha+LUNCH/DINNER+Reservation&dates=${formattedStart}/${formattedEnd}&details=Your+premium+table+ #${assignedTable} is secured under booking code: +${bookingCode}.+Ambiance+Selected:+${tableType.replace(/_/g, "+")}&location=Cafe+Bageecha,+Panchvati,+Sarol,+Chamba,+Himachal+Pradesh`;
    
    window.open(gCalUrl, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Heavy velvet blur background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-forest/85 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Container Wrapper */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
        className="relative bg-cream w-full max-w-4xl h-[92vh] md:h-auto md:max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 border border-gold/20"
      >
        
        {/* Header Ribbon */}
        <div className="bg-forest px-6 py-5 flex items-center justify-between text-white border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide">
                {step === 3 ? "Reservation Confirmed!" : "Secure An Alpine Sanctuary Spot"}
              </span>
            </div>
            <p className="text-white/60 text-[10px] sm:text-xs tracking-wider uppercase mt-1 font-mono">
              {step === 1 && "Phase 1 • Seating Ambiance & Gathering Size"}
              {step === 2 && "Phase 2 • Guest Parameters & Desires"}
              {step === 3 && "Verified Reservation Voucher issued"}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all cursor-pointer"
            aria-label="Close booking wizard"
          >
            <X size={22} />
          </button>
        </div>

        {/* Dynamic Progressive Step Indicator Bar (Conversion-proven Linear/Stripe style) */}
        <div className="bg-cream-dim border-b border-forest/10 px-6 py-3 flex items-center justify-between text-xs font-mono shrink-0">
          <div className="flex items-center space-x-6 w-full max-w-xl">
            {/* Step 1 */}
            <div className="flex items-center space-x-2">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= 1 ? "bg-forest text-gold" : "bg-forest/10 text-forest/40"
              }`}>
                {step > 1 ? <Check size={10} className="stroke-[3]" /> : "1"}
              </div>
              <span className={`font-semibold ${step === 1 ? "text-forest" : "text-forest/40"}`}>Ambiance</span>
            </div>

            <div className="h-[1px] flex-1 bg-forest/10" />

            {/* Step 2 */}
            <div className="flex items-center space-x-2">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= 2 ? "bg-forest text-gold" : "bg-forest/10 text-forest/40"
              }`}>
                {step > 2 ? <Check size={10} className="stroke-[3]" /> : "2"}
              </div>
              <span className={`font-semibold ${step === 2 ? "text-forest" : "text-forest/40"}`}>Guest Parameters</span>
            </div>

            <div className="h-[1px] flex-1 bg-forest/10" />

            {/* Step 3 */}
            <div className="flex items-center space-x-2">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === 3 ? "bg-forest text-gold" : "bg-forest/10 text-forest/40"
              }`}>
                {step === 3 ? <Check size={10} className="stroke-[3]" /> : "3"}
              </div>
              <span className={`font-semibold ${step === 3 ? "text-forest" : "text-forest/40"}`}>Confirmed</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 text-forest/60 text-[11px]">
            <ShieldCheck size={14} className="text-gold" />
            <span>Guaranteed Spot Isolation</span>
          </div>
        </div>

        {/* Content Body area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-cream">
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Form elements row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-white p-5 rounded-xl border border-forest/5 shadow-xs text-left">
                  <div>
                    <label className="text-[10px] uppercase font-black tracking-widest text-forest/60 block mb-2">
                      Party Capacity *
                    </label>
                    <div className="relative flex items-center">
                      <Users className="absolute left-3.5 text-gold" size={16} />
                      <select 
                        value={guests} 
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full bg-cream rounded-lg pl-11 pr-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/10 font-medium text-forest"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 20].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? "Guest Seating" : `Guests (${n} Seats)`}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-black tracking-widest text-forest/60 block mb-2">
                      Choose Date *
                    </label>
                    <div className="relative flex items-center">
                      <Calendar className="absolute left-3.5 text-gold" size={15} />
                      <input 
                        type="date"
                        required
                        value={date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-cream rounded-lg pl-11 pr-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/10 font-semibold text-forest"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-black tracking-widest text-[#163B34]/60 block mb-2">
                      Arrival Slot *
                    </label>
                    <div className="relative flex items-center">
                      <Clock className="absolute left-3.5 text-gold" size={15} />
                      <select 
                        value={time} 
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-cream rounded-lg pl-11 pr-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/10 font-medium text-forest"
                      >
                        {timeSlots.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Live seating visual selection */}
                <div className="text-left">
                  <span className="text-[10px] uppercase font-black tracking-widest text-forest/65 block mb-3.5">
                    Select Your Seating Ambiance Area
                  </span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {seatingAreas.map((area) => (
                      <div 
                        key={area.id}
                        onClick={() => setTableType(area.id as TableType)}
                        className={`group border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col md:flex-row bg-white hover:shadow-md ${
                          tableType === area.id 
                            ? "border-gold ring-2 ring-gold/20 shadow-sm bg-gold/5" 
                            : "border-forest/10"
                        }`}
                      >
                        <div className="w-full md:w-36 h-28 shrink-0 relative overflow-hidden">
                          <img 
                            alt={area.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            src={area.image}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 md:from-transparent to-transparent pointer-events-none" />
                        </div>
                        <div className="p-4 flex flex-col justify-center flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-serif text-base font-bold text-forest">{area.name}</span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              tableType === area.id ? "border-gold bg-gold" : "border-forest/20"
                            }`}>
                              {tableType === area.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </div>
                          <span className="text-[9px] uppercase font-bold text-[#D4A373] tracking-widest mt-0.5">{area.headline}</span>
                          <p className="text-[11px] text-forest/75 mt-1 leading-normal line-clamp-2">
                            {area.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6 text-left"
              >
                {/* Visual breadcrumbs summary bar */}
                <div className="bg-white/80 p-4 border border-forest/5 rounded-xl flex flex-wrap gap-4 items-center justify-between text-xs text-forest/80">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-forest uppercase text-[10px] tracking-wide">Seating Ambiance:</span>
                    <span className="bg-gold/15 text-forest font-bold px-2.5 py-0.5 rounded-full capitalize text-[10px] font-mono">
                      {tableType.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-[11px] font-mono">
                    <span>Party: <strong>{guests} Guests</strong></span>
                    <span>Date: <strong>{date}</strong></span>
                    <span>Time Slot: <strong>{time}</strong></span>
                  </div>
                </div>

                {/* Form input details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Full Name field */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] uppercase font-black tracking-widest text-forest/60 block">
                        Full Name *
                      </label>
                      {nameTouched && userName.trim().length > 0 && (
                        <span className="text-[9px] text-emerald-600 font-bold flex items-center space-x-1">
                          <Check size={10} /> <span>Looks Great</span>
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="E.g., Nitish Kaushal"
                      value={userName}
                      onBlur={() => setNameTouched(true)}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-white rounded-lg px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15 font-semibold text-forest"
                    />
                    {nameTouched && !userName.trim() && (
                      <p className="text-[10px] text-red-600 font-medium mt-1 flex items-center space-x-1">
                        <AlertTriangle size={10} /> <span>Name is required for host checking.</span>
                      </p>
                    )}
                  </div>

                  {/* Mobile phone field */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] uppercase font-black tracking-widest text-forest/60 block">
                        Mobile Phone *
                      </label>
                      {phoneTouched && isPhoneValid(userPhone) && (
                        <span className="text-[9px] text-emerald-600 font-bold flex items-center space-x-1">
                          <Check size={11} /> <span>Valid Channel</span>
                        </span>
                      )}
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="E.g., +91 76580 96379"
                      value={userPhone}
                      onBlur={() => setPhoneTouched(true)}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full bg-white rounded-lg px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15 font-mono text-forest"
                    />
                    {phoneTouched && !isPhoneValid(userPhone) && (
                      <p className="text-[10px] text-amber-700 font-medium mt-1 flex items-center space-x-1">
                        <AlertTriangle size={10} /> <span>Please insert a valid 10-digit mobile number.</span>
                      </p>
                    )}
                  </div>

                  {/* Email address field */}
                  <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] uppercase font-black tracking-widest text-forest/60 block">
                        Email Address for Voucher Transmission *
                      </label>
                      {emailTouched && isEmailValid(userEmail) && (
                        <span className="text-[9px] text-emerald-600 font-bold flex items-center space-x-1">
                          <Check size={11} /> <span>Deliverable Coordinates</span>
                        </span>
                      )}
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="E.g., nitishkaushal17@gmail.com"
                      value={userEmail}
                      onBlur={() => setEmailTouched(true)}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full bg-white rounded-lg px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15 font-mono text-forest"
                    />
                    {emailTouched && !isEmailValid(userEmail) && (
                      <p className="text-[10px] text-red-600 font-medium mt-1 flex items-center space-x-1">
                        <AlertTriangle size={10} /> <span>A valid email is required to dispatch the secure voucher.</span>
                      </p>
                    )}
                  </div>

                  {/* Special requests field */}
                  <div className="md:col-span-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-forest/60 block mb-1">
                      Special Inquiries, Valet Parking, or Dietary Requests (Optional)
                    </label>
                    <textarea
                      rows={3.5}
                      placeholder="E.g., request cozy fireplace blanket seating, celebrate birthday celebration with custom candlelit, milk allergens, high-chair requirement..."
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      className="w-full bg-white rounded-lg px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15 font-light text-forest"
                    />
                  </div>
                </div>

                {/* Security confidence panel */}
                <div className="bg-emerald-500/10 p-4 rounded-xl flex items-start space-x-3 text-xs text-[#163B34] border border-emerald-500/15">
                  <ShieldCheck className="text-emerald-700 mt-0.5 shrink-0" size={18} />
                  <div className="leading-relaxed font-sans">
                    <strong>Secure Table Isolation Guaranteed</strong>
                    <p className="text-[11px] text-forest/80 mt-0.5">We keep table reserved up to 15 minutes past arrival bracket. Cancellations or time slot revisions can be completed by ringing our host desk directly.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="max-w-2xl mx-auto space-y-8 pt-2 block overflow-hidden text-center"
              >
                {/* Celebratory Ripple Header */}
                <div className="space-y-2">
                  <div className="inline-flex relative">
                    <div className="absolute inset-0 bg-gold/20 rounded-full animate-ping scale-150 duration-1000" />
                    <div className="bg-forest text-gold rounded-full p-4.5 relative shadow-md">
                      <CheckCircle size={36} className="text-gold" />
                    </div>
                  </div>
                  <h3 className="font-serif text-3xl font-extrabold text-forest mt-3">Your Sanctuary Spot is Confirmed!</h3>
                  <p className="text-xs sm:text-sm text-forest/70 max-w-md mx-auto">
                    Pleasure awaits. We have earmarked our signature spot under Chamba's scenic peaks for your arrival.
                  </p>
                </div>

                {/* Double Notched Ticket Voucher element (Linear/Airbnb aesthetic) */}
                <div className="bg-white border-2 border-dashed border-gold/45 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden text-left max-w-xl mx-auto">
                  
                  {/* Circle cutouts */}
                  <div className="absolute w-8 h-8 rounded-full bg-cream -left-4 top-1/2 -translate-y-1/2 border-r-2 border-dashed border-gold/20" />
                  <div className="absolute w-8 h-8 rounded-full bg-cream -right-4 top-1/2 -translate-y-1/2 border-l-2 border-dashed border-gold/20" />
                  
                  {/* Brand Header */}
                  <div className="text-center border-b border-forest/10 pb-5 mb-5">
                    <span className="font-serif text-xl tracking-[0.1em] font-black text-[#163B34]">CAFE BAGEECHA</span>
                    <p className="text-[9px] text-[#D4A373] tracking-[0.3em] font-extrabold uppercase mt-1">VERIFIED TABLE GUARANTEE • MULTI-ZONE RETREAT</p>
                  </div>

                  {/* Ticket Information Grid */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs font-sans text-forest/80">
                    <div>
                      <span className="text-[10px] text-forest/40 uppercase tracking-widest font-black block">Reservation Identity</span>
                      <strong className="text-sm font-mono bg-cream px-2.5 py-1 rounded border border-forest/5 text-forest block mt-1 tracking-wider text-center">{bookingCode}</strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-forest/40 uppercase tracking-widest font-black block">Allocated Dining Table</span>
                      <strong className="text-sm text-forest block mt-1">Table #{assignedTable} <span className="text-[10px] text-gold font-bold">({tableType === "garden_seating" ? "Garden Table" : "Sky Terrace"})</span></strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-forest/40 uppercase tracking-widest font-black block">Primary Guest Host</span>
                      <strong className="text-sm text-forest block mt-1 truncate font-semibold">{userName}</strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-forest/40 uppercase tracking-widest font-black block">Gathering Size</span>
                      <strong className="text-sm text-forest block mt-1">{guests} Reserved Seats</strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-forest/40 uppercase tracking-widest font-black block">Arrival Bracket</span>
                      <strong className="text-sm text-forest block mt-1 font-mono">{time}</strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-forest/40 uppercase tracking-widest font-black block">Target Date</span>
                      <strong className="text-sm text-forest block mt-1 font-mono font-semibold">{date}</strong>
                    </div>
                  </div>

                  {specialNotes && (
                    <div className="border-t border-forest/10 mt-5 pt-4 text-xs text-forest/75 italic">
                      <span className="font-bold text-forest block not-italic text-[9px] uppercase tracking-wider text-forest/40 mb-1">Custom Ambiance Specifications:</span>
                      "{specialNotes}"
                    </div>
                  )}

                  <div className="border-t border-forest/5 mt-5 pt-4.5 flex items-center space-x-2 text-[10px] text-forest/50">
                    <Map size={13} className="text-[#D4A373] shrink-0" />
                    <span>Panchvati, Sarol, Chamba, Himachal Pradesh. Show on smartphone during gate check.</span>
                  </div>
                </div>

                {/* Conversion Boost CTA Buttons */}
                <div className="flex flex-wrap gap-3 items-center justify-center max-w-xl mx-auto pt-3 shrink-0">
                  {/* Download Ticket (PDF Simulation) */}
                  <button
                    onClick={triggerDownloadMock}
                    disabled={isDownloading}
                    className="flex-1 min-w-[200px] bg-forest hover:bg-gold text-white hover:text-forest border-0 px-5 py-3.5 rounded-lg text-xs font-black uppercase tracking-[0.1em] transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                        <span>Generating Voucher...</span>
                      </>
                    ) : (
                      <>
                        <Download size={14} />
                        <span>Download Ticket Receipt</span>
                      </>
                    )}
                  </button>

                  {/* Add To Calendar */}
                  <button
                    onClick={generateGoogleCalendarLink}
                    className="flex-1 min-w-[200px] bg-white border border-forest/10 hover:border-gold hover:bg-gold/5 text-forest px-5 py-3.5 rounded-lg text-xs font-black uppercase tracking-[0.1em] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                  >
                    <CalendarPlus size={14} className="text-[#D4A373]" />
                    <span>Sync to Calendar</span>
                  </button>

                  {/* Support */}
                  <a
                    href="https://wa.me/917658096379?text=Hello%20Cafe%20Bageecha%2C%20I%2520have%20confirmed%20reservation%20Identity%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-3.5 rounded-lg text-xs font-black uppercase tracking-[0.1em] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                  >
                    <MessageSquare size={14} />
                    <span>Support via WhatsApp</span>
                  </a>

                  {/* Return to homepage */}
                  <button
                    onClick={handleReset}
                    className="flex-1 min-w-[200px] bg-cream-dim hover:bg-cream border border-forest/10 text-forest/70 hover:text-forest px-5 py-3.5 rounded-lg text-xs font-black uppercase tracking-[0.1em] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                  >
                    <Home size={14} />
                    <span>Return to Homepage</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Footer Ribbon Buttons */}
        {step !== 3 && (
          <div className="bg-cream-dim px-6 py-4.5 border-t border-forest/10 flex items-center justify-between shrink-0">
            {step === 2 ? (
              <button
                onClick={() => setStep(1)}
                className="flex items-center space-x-2 text-forest/70 hover:text-forest text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>Adjust Seating</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNextStep}
              className="bg-forest text-white hover:bg-gold hover:text-forest px-8 py-3.5 rounded-lg text-xs uppercase tracking-[0.15em] font-black transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-md"
            >
              <span>{step === 1 ? "Next: Add Coordinates" : "Confirm and Lock Reservation"}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
}
