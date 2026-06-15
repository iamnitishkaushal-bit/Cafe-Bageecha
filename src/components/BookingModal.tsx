import { useState } from "react";
import { X, Calendar, Clock, Users, Map, CheckCircle, Info, ArrowRight, ArrowLeft } from "lucide-react";
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
  const [time, setTime] = useState<string>("13:00");
  const [tableType, setTableType] = useState<TableType>("garden_seating");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [specialNotes, setSpecialNotes] = useState<string>("");
  const [bookingCode, setBookingCode] = useState<string>("");
  const [assignedTable, setAssignedTable] = useState<number>(0);

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

  const handleNextStep = () => {
    if (step === 1) {
      if (!date) {
        alert("Please choose a valid day to experience Cafe Bageecha.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!userName.trim() || !userPhone.trim() || !userEmail.trim()) {
        alert("Please complete all primary fields to protect your reservation.");
        return;
      }
      // Generate randomized premium booking details
      const code = `GBC-${Math.floor(1000 + Math.random() * 9000)}-${date.replace(/-/g, "").substring(4, 8).toUpperCase()}`;
      const randomTable = Math.floor(1 + Math.random() * 18);
      setBookingCode(code);
      setAssignedTable(randomTable);

      // Save to localStorage for true full-stack persistence simulation
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
    setTime("13:00");
    setTableType("garden_seating");
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setSpecialNotes("");
    onClose();
  };

  const timeSlots = [
    "09:30 AM", "11:00 AM", "12:30 PM", "01:30 PM", "03:00 PM",
    "04:30 PM", "06:00 PM", "07:30 PM", "09:00 PM"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-forest/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-cream w-full max-w-4xl h-[90vh] md:h-auto md:max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 border border-gold/20">
        
        {/* Header */}
        <div className="bg-forest px-6 py-5 flex items-center justify-between text-white border-b border-white/10 shrink-0">
          <div>
            <span className="font-serif text-2xl font-semibold tracking-wide">
              {step === 3 ? "Reservation Confirmed!" : "Secure a Garden Seating"}
            </span>
            <p className="text-white/60 text-xs tracking-wider uppercase mt-0.5">
              {step === 1 && "Step 1: Preference & Ambiance Select"}
              {step === 2 && "Step 2: Guest Details & Customization"}
              {step === 3 && "Verified Alpine Restaurant Voucher"}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {step === 1 && (
            <div className="space-y-6">
              {/* Date, Time, Guests Selector Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-white p-5 rounded-xl border border-forest/5 shadow-xs">
                <div>
                  <label className="text-xs uppercase font-bold tracking-widest text-[#163B34]/60 block mb-2">
                    Party Size
                  </label>
                  <div className="relative flex items-center">
                    <Users className="absolute left-3 text-gold" size={16} />
                    <select 
                      value={guests} 
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full bg-cream rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold border border-forest/10"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase font-bold tracking-widest text-[#163B34]/60 block mb-2">
                    Choose Date
                  </label>
                  <div className="relative flex items-center">
                    <Calendar className="absolute left-3 text-gold" size={16} />
                    <input 
                      type="date"
                      value={date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-cream rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold border border-forest/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase font-bold tracking-widest text-[#163B34]/60 block mb-2">
                    Arrival Slot
                  </label>
                  <div className="relative flex items-center">
                    <Clock className="absolute left-3 text-gold" size={16} />
                    <select 
                      value={time} 
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-cream rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold border border-forest/10"
                    >
                      {timeSlots.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Seating Area Selection */}
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#163B34]/60 block mb-3">
                  Select Seating Ambiance Area
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {seatingAreas.map((area) => (
                    <div 
                      key={area.id}
                      onClick={() => setTableType(area.id as TableType)}
                      className={`group border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col md:flex-row bg-white hover:shadow-md ${
                        tableType === area.id 
                          ? "border-gold ring-2 ring-gold/20 shadow-sm" 
                          : "border-forest/10"
                      }`}
                    >
                      <div className="w-full md:w-32 h-28 shrink-0 relative overflow-hidden">
                        <img 
                          alt={area.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          src={area.image}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 md:from-transparent to-transparent" />
                      </div>
                      <div className="p-4 flex flex-col justify-center">
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-base font-bold text-forest">{area.name}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            tableType === area.id ? "border-gold bg-gold" : "border-forest/20"
                          }`}>
                            {tableType === area.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                        <span className="text-[10px] uppercase font-semibold text-gold tracking-widest mt-0.5">{area.headline}</span>
                        <p className="text-xs text-forest/75 mt-1 leading-relaxed line-clamp-2">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Preferences Summary Header */}
              <div className="bg-white/80 p-4 border border-forest/5 rounded-xl flex items-center justify-between text-xs text-forest/80 shrink-0">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-forest">Ambiance:</span>
                  <span className="bg-gold/15 text-forest font-semibold px-2.5 py-0.5 rounded-full capitalize">
                    {tableType.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>Guests: <strong>{guests}</strong></span>
                  <span>Date: <strong>{date}</strong></span>
                  <span>Time: <strong>{time}</strong></span>
                </div>
              </div>

              {/* Guest Information form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs uppercase font-bold tracking-widest text-[#163B34]/60 block mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Nitish Kaushal"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold tracking-widest text-[#163B34]/60 block mb-2">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="E.g., +91 98765-43210"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full bg-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs uppercase font-bold tracking-widest text-[#163B34]/60 block mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="E.g., you@example.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full bg-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs uppercase font-bold tracking-widest text-[#163B34]/60 block mb-2">
                    Special Inquiries & Diets (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Note down any food allergies, requests for extra blankets, celebration tables or specific sunset views."
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full bg-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold border border-forest/15"
                  />
                </div>
              </div>

              {/* Informative advice strip */}
              <div className="bg-gold/10 p-4 rounded-xl flex items-start space-x-3 text-xs text-forest/80">
                <Info className="text-gold mt-0.5 shrink-0" size={16} />
                <p className="leading-relaxed">
                  We hold reserved spots for up to <strong>15 minutes</strong> beyond your booked arrival hour. Please telephone us directly if you expect mountain delays. Fresh mountain air welcomes any cancellation requests as soon as your plans shift.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-xl mx-auto space-y-6 pt-2 block overflow-hidden">
              <div className="text-center">
                <div className="inline-block bg-forest text-gold rounded-full p-3 mb-4 shadow-md">
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-serif text-3xl font-bold text-forest">Reservation Confirmed!</h3>
                <p className="text-sm text-forest/75 mt-1">We are ready to treat you under our lush alpine canopies.</p>
              </div>

              {/* Voucher Ticket Layout */}
              <div className="bg-white border-2 border-dashed border-gold/40 rounded-2xl p-6 shadow-md relative overflow-hidden">
                {/* Decorative Side Notches */}
                <div className="absolute w-6 h-6 rounded-full bg-cream -left-3 top-1/2 -translate-y-1/2 border-r border-[#D4A373]/20" />
                <div className="absolute w-6 h-6 rounded-full bg-cream -right-3 top-1/2 -translate-y-1/2 border-l border-[#D4A373]/20" />
                
                {/* Brand Banner */}
                <div className="text-center border-b border-forest/10 pb-4 mb-4">
                  <span className="font-serif text-lg tracking-wider font-extrabold text-[#163B34]">CAFE BAGEECHA</span>
                  <p className="text-[9px] text-[#D4A373] tracking-[0.2em] font-bold uppercase mt-0.5">CHAMBA, HIMACHAL PRADESH, INDIA</p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs text-forest/80">
                  <div>
                    <span className="text-[10px] text-forest/50 font-bold uppercase tracking-wider block">Reservation Code</span>
                    <strong className="text-forest text-sm tracking-wide font-mono bg-cream px-2 py-0.5 rounded-sm inline-block">{bookingCode}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-forest/50 font-bold uppercase tracking-wider block">Assigned Table</span>
                    <strong className="text-forest text-base">Table #{assignedTable} <span className="text-[10px] text-gold font-normal">({tableType === "garden_seating" ? "Garden" : tableType === "glasshouse" ? "Glasshouse" : "Balcony"})</span></strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-forest/50 font-bold uppercase tracking-wider block">Primary Guest</span>
                    <strong className="text-forest text-sm block truncate">{userName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-forest/50 font-bold uppercase tracking-wider block">Party Size</span>
                    <strong className="text-forest text-sm">{guests} Guests</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-forest/50 font-bold uppercase tracking-wider block">Day & Date</span>
                    <strong className="text-forest text-sm">{date}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-forest/50 font-bold uppercase tracking-wider block">Arrival Slot</span>
                    <strong className="text-forest text-sm">{time}</strong>
                  </div>
                </div>

                {specialNotes && (
                  <div className="border-t border-forest/10 mt-4 pt-3 text-xs text-forest/75 italic">
                    <span className="font-bold text-forest block not-italic text-[10px] text-forest/50 uppercase tracking-widest mb-0.5">Special Desires:</span>
                    "{specialNotes}"
                  </div>
                )}
                
                <div className="border-t border-forest/5 mt-4 pt-3.5 flex items-center space-x-2 text-[10px] text-forest/60">
                  <Map size={12} className="text-gold shrink-0" />
                  <span>Located off Chamba Valley Highway. Show this screen upon entry.</span>
                </div>
              </div>

              {/* Reset layout helper */}
              <div className="text-center">
                <button
                  onClick={handleReset}
                  className="bg-forest text-white font-bold px-8 py-3.5 rounded-lg text-xs uppercase tracking-[0.15em] transition-all hover:bg-forest/95 shadow-md cursor-pointer"
                >
                  Confirm and Close
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        {step !== 3 && (
          <div className="bg-cream px-6 py-4 border-t border-forest/10 flex items-center justify-between shrink-0">
            {step === 2 ? (
              <button
                onClick={() => setStep(1)}
                className="flex items-center space-x-2 text-forest/80 hover:text-forest text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>Change Seating</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNextStep}
              className="bg-forest text-white px-8 py-3 rounded-lg text-xs uppercase tracking-[0.15em] font-bold duration-300 hover:opacity-90 flex items-center space-x-2 cursor-pointer shadow-md inline-block"
            >
              <span>{step === 1 ? "Next: Add Details" : "Finalize Booking"}</span>
              <ArrowRight size={14} className="text-gold" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
