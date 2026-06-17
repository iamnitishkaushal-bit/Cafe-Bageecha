import React, { useState, useEffect, useRef } from "react";
import { 
  Compass, 
  MapPin, 
  ArrowRight, 
  Coffee, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Phone,
  Sparkles,
  Heart,
  Globe,
  Award,
  ChevronRight,
  Info,
  Users,
  Download,
  CalendarPlus,
  MessageSquare,
  Home,
  ShieldCheck,
  Check,
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  HelpCircle,
  Camera,
  Car
} from "lucide-react";
import Navbar from "./components/Navbar";
import BookingModal from "./components/BookingModal";
import MenuSection from "./components/MenuSection";
import GallerySection from "./components/GallerySection";
import EventsSection from "./components/EventsSection";
import GuestReviews from "./components/GuestReviews";
import ContactSection from "./components/ContactSection";
import ItemPreviewModal from "./components/ItemPreviewModal";
import { MenuItem } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { MENU_ITEMS, GALLERY_PHOTOS, INITIAL_REVIEWS } from "./data";
import HeroSteam from "./components/HeroSteam";

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname || "/";
  });

  const [reducedMotion, setReducedMotion] = useState(false);
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });

  // Access preferences check for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768 || reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroMouse({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setHeroMouse({ x: 0, y: 0 });
  };

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<MenuItem | null>(null);

  // Sync virtual routes with browser backward / forward actions
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, "", path);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleAddPreviewItemDirect = (itemId: string) => {
    const customEvent = new CustomEvent("add-to-cart-direct", { detail: itemId });
    window.dispatchEvent(customEvent);
  };

  // Dedicated Reservation Page Embedded Form State
  const [resStep, setResStep] = useState<1 | 2 | 3>(1);
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("01:30 PM");
  const [tableType, setTableType] = useState<string>("garden_seating");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [specialNotes, setSpecialNotes] = useState<string>("");
  const [bookingCode, setBookingCode] = useState<string>("");
  const [assignedTable, setAssignedTable] = useState<number>(0);

  // Real-time validation touched values
  const [resNameTouched, setResNameTouched] = useState(false);
  const [resEmailTouched, setResEmailTouched] = useState(false);
  const [resPhoneTouched, setResPhoneTouched] = useState(false);
  const [isResDownloading, setIsResDownloading] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const seatingAreas = [
    {
      id: "garden_seating",
      name: "Open Garden Seating",
      headline: "Arched Floral Sanctuary",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7LuOFCG5vbvJIEMIpGeeRsywKa78bYxmwfp_gJzPuNfdbObKWZ1PIYvTOxqY7hIj4kyB3Y1BeQ8YTEPyFLM6yBz3VupEAOTw1GMucsDCipcmgr_uTOcsapUm6RADsieLWBYqvImOoIEC-jYjz0JQO4bOeireg9KdI6CFgsVwkUaRBuKjL8AJFUabKo054AjWl_tacqzu1Si6GaGuftw_gjvum3sMsNpMY3QzPxMlzzoKoXz32ufx__iAm_ztbbDjaYk2QXmmAVm7k"
    },
    {
      id: "cozy_benches",
      name: "Cozy Garden Benches",
      headline: "Fireplace Sitting",
      image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "glasshouse",
      name: "Glasshouse Oasis",
      headline: "Indoor Plant Sanctuary",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "mountain_view_balcony",
      name: "Mountain View Balcony",
      headline: "Summit Viewing Ridge",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJjy7n9DJx66A64l3sLB3KM0PTPyXWKlknnDXoEVCx-5ausrfsKlUR9mkf-1BVJNVdFsievcdaNeZIOJvXwqGC43TuQDay9pvQBksNpZ9D4OPNsSA92Sh4h4KxfsasOz8PlgIP_KXTIwkfha0NsSUjzUvUJ9wEg4UW-kuNB8OXlEuz_WcdxgAE5k9h61iBt-PEp7PHtey8kjvbO5g7J_U1CVmwvQKlhHJXofwRMNXRInQYUSlGE973BvuASKEPRCx4UDlD8RNfNYK6"
    }
  ];

  const resEmailValid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const resPhoneValid = (p: string) => p.replace(/\D/g, "").length >= 10;

  const handleNextStep = () => {
    if (resStep === 1) {
      if (!date) {
        alert("Please select a calendar date to align our kitchen ledger resources.");
        return;
      }
      setResStep(2);
    } else if (resStep === 2) {
      setResNameTouched(true);
      setResEmailTouched(true);
      setResPhoneTouched(true);

      if (!userName.trim()) {
        alert("Please supply your full name so our host can welcome you.");
        return;
      }
      if (!resEmailValid(userEmail)) {
        alert("Please double check your email address coordinate for verified transmission.");
        return;
      }
      if (!resPhoneValid(userPhone)) {
        alert("A robust 10-digit telephone coordinate guarantees table notifications reach you.");
        return;
      }

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

      setResStep(3);
    }
  };

  const handleReset = () => {
    setResStep(1);
    setGuests(2);
    setDate("");
    setTime("01:30 PM");
    setTableType("garden_seating");
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setSpecialNotes("");
    setResNameTouched(false);
    setResEmailTouched(false);
    setResPhoneTouched(false);
  };

  const triggerResDownloadMock = () => {
    setIsResDownloading(true);
    setTimeout(() => {
      setIsResDownloading(false);
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
      link.download = `bageecha_booking_${bookingCode}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1200);
  };

  // Signature selected items to display on the home menu teaser
  const featuredMenuItems = MENU_ITEMS.filter(item => 
    item.id === "brew_1" || item.id === "mtn_1" || item.id === "sweet_1"
  );

  return (
    <div className="relative min-h-screen bg-cream text-forest overflow-x-hidden selection:bg-gold/20 select-none">
      
      {/* Dynamic Header */}
      <Navbar 
        currentPath={currentPath}
        onNavigate={navigate}
      />

      {/* Main page router */}
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {currentPath === "/" && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* CORE HERO SECTION */}
              <section 
                id="hero"
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={handleHeroMouseLeave}
                className="relative h-[80vh] min-h-[580px] lg:h-[80vh] lg:max-h-[80vh] flex flex-col md:block overflow-hidden bg-[#0a1e1a]"
              >
                {/* 1. Landscape Background Container - Pinned as high-quality cinematic frame */}
                <div 
                  className="absolute inset-0 w-full h-full overflow-hidden z-10"
                  style={{
                    transform: reducedMotion ? 'none' : `translate3d(${heroMouse.x * -8}px, ${heroMouse.y * -6}px, 0)`,
                    transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
                  }}
                >
                  <img 
                    alt="Chamba Chowgan and Raja Mahal Landscape" 
                    className="absolute inset-0 w-full h-full object-cover object-[50%_35%] select-none pointer-events-none"
                    src="https://www.image2url.com/r2/default/files/1781528292842-f003e5d1-681a-4545-8d0a-1a23a18a428c.png"
                    style={{
                      transform: reducedMotion ? 'scale(1.03)' : `scale(1.03) translate3d(${heroMouse.x * -2}px, ${heroMouse.y * -2}px, 0)`,
                      transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
                    }}
                  />
                  {/* Left-side dark gradient overlay ONLY for text readability - keeps middle and right bright and rich */}
                  <div 
                    className="absolute inset-0 hidden md:block pointer-events-none z-10"
                    style={{
                      background: 'linear-gradient(to right, rgba(4,20,15,0.85) 0%, rgba(4,20,15,0.25) 50%, rgba(4,20,15,0) 100%)'
                    }}
                  />
                  <div 
                    className="absolute inset-0 md:hidden pointer-events-none z-10"
                    style={{
                      background: 'linear-gradient(to top, rgba(4,20,15,0.95) 0%, rgba(4,20,15,0.3) 70%, rgba(4,20,15,0) 100%)'
                    }}
                  />
                </div>

                {/* 2. Content Layer - Clean, searchable, true accessibility aligned with the global container grid */}
                <div className="relative z-20 max-w-[1440px] mx-auto px-6 xl:px-[80px] w-full min-h-[75vh] lg:min-h-[85vh] lg:h-[85vh] flex flex-col justify-center pt-[120px] md:pt-0 pb-12 md:pb-0 order-1 md:order-none bg-[#0a1e1a] md:bg-transparent">
                  <div className="w-full md:max-w-[40%] flex flex-col items-start text-left select-none max-w-[600px] relative z-30">
                    
                    {/* Location Badge */}
                    <div className="inline-flex items-center space-x-2 bg-white/[0.04] px-4 py-1.5 rounded-full border border-white/10 mb-6 shadow-sm">
                      <MapPin size={13} className="text-gold shrink-0" />
                      <span className="text-[10px] text-white/85 tracking-[0.2em] font-medium uppercase font-sans">
                        Chamba, Himachal Pradesh
                      </span>
                    </div>

                    {/* Headline - Max Width 600px & precise luxury serif typographic hierarchy */}
                    <h1 id="hero-headline" className="font-serif text-[46px] text-white leading-[1.1] tracking-tight font-light transition-all duration-300 max-w-[600px]">
                      Escape Into <span className="italic text-gold font-normal">Nature</span> <br />
                      <span className="font-normal text-white">at Cafe Bageecha</span>
                    </h1>

                    {/* Subheading - Gap 24px and Max width 520px for comfortable line length */}
                    <p className="text-sm md:text-base text-white/70 leading-relaxed font-light max-w-[520px] mt-6">
                      Chamba ki pahadi hawa, fresh coffee aur nature ke beech yaadgaar moments. Experience the serenity of the Himalayas within our blooming garden arches.
                    </p>

                    {/* CTA Button Group - Gap 32px above, Gap 16px between buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto shrink-0 mt-8">
                      <button 
                        onClick={() => navigate("/menu")}
                        className="bg-gold hover:bg-white text-[#0a1e1a] font-bold px-8 py-4.5 rounded-sm text-xs uppercase tracking-[0.2em] shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-center"
                      >
                        Explore Menu
                      </button>
                      <button 
                        onClick={() => navigate("/reservations")}
                        className="border border-white/20 text-white/90 hover:bg-white/10 hover:border-white font-bold px-8 py-4.5 rounded-sm text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer text-center"
                      >
                        Visit Bageecha
                      </button>
                    </div>

                  </div>
                </div>
              </section>

              {/* ABOUT PREVIEW */}
              <section className="py-24 bg-cream relative">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[48%_52%] gap-12 lg:gap-16 items-center">
                  {/* Left Side: Text Content - 48% */}
                  <div className="text-left space-y-6">
                    <div className="inline-block border-b-2 border-gold pb-1.5 uppercase tracking-[0.25em] text-[10px] font-black text-forest/50">
                      Our Heritage Teaser
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-forest leading-tight">
                      A Sanctuary Among The Clouds
                    </h2>
                    <p className="text-sm md:text-base leading-relaxed text-forest/75 font-light">
                      Enclosed inside majestic cedar timber framing and blooming mountain roses, Cafe Bageecha isn't just a place to dine—it is a restoration. Every corner honors local Chamba stone carvings, pristine high-altitude spring water, and wilderness traditions.
                    </p>
                    <div className="pt-2">
                      <button 
                        onClick={() => navigate("/about")}
                        className="bg-forest text-white hover:bg-gold hover:text-forest px-8 py-4 rounded-sm text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md flex items-center space-x-2 group cursor-pointer"
                      >
                        <span>Our Full Story</span>
                        <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Right Side: Image - 52% */}
                  <div className="w-full flex justify-center items-center">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                      }}
                      className="relative rounded-[24px] overflow-hidden select-none w-full max-w-sm md:max-w-[420px] cursor-pointer aspect-[3/4]"
                      style={{
                        boxShadow: '0 25px 80px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(0,0,0,0.05)',
                      }}
                    >
                      <img 
                        alt="Chamba slow living and reading culture at Cafe Bageecha" 
                        className="w-full h-full object-cover object-[center_35%] rounded-[24px] block" 
                        src="https://www.image2url.com/r2/default/images/1781548640686-252d3afe-d1bf-43b1-b325-0ccd816255e4.png"
                        loading="lazy"
                      />
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* FEATURED MENU PREVIEW */}
              <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold">The Culinary Peak</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-forest">Signature House Formulations</h2>
                    <p className="text-xs sm:text-sm text-forest/60 max-w-[500px] mx-auto font-light">A brief taste of native Chamba specialities and boutique coffee brews.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredMenuItems.map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => setPreviewItem(item)}
                        className="group bg-cream border border-forest/5 rounded-xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 flex flex-col text-left"
                      >
                        <div className="h-48 overflow-hidden relative">
                          <img 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            src={item.image} 
                            alt={item.name} 
                          />
                          <div className="absolute top-3 left-3 bg-forest text-gold text-[9px] uppercase tracking-widest font-black px-2 py-0.5 rounded-sm shadow-xs">
                            {item.tags[0].replace(/_/g, " ")}
                          </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-baseline">
                              <span className="font-serif text-lg font-bold text-forest">{item.name}</span>
                              <span className="text-gold font-bold text-sm tracking-wide">₹{item.price}</span>
                            </div>
                            <span className="text-[10px] font-bold text-gold/80 block tracking-widest uppercase font-mono">{item.hindiName}</span>
                            <p className="text-xs text-forest/70 leading-relaxed font-light line-clamp-2">{item.description}</p>
                          </div>
                          <span className="text-[9px] uppercase tracking-widest font-bold text-forest/50 group-hover:text-gold transition-colors inline-flex items-center space-x-1">
                            <span>Examine Details</span>
                            <ChevronRight size={10} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={() => navigate("/menu")}
                      className="border-2 border-forest hover:bg-forest hover:text-white text-forest font-bold px-10 py-4.5 rounded-xs text-xs uppercase tracking-widest transition-colors duration-300 cursor-pointer"
                    >
                      The Complete Bill of Fare
                    </button>
                  </div>
                </div>
              </section>

              {/* GALLERY PREVIEW */}
              <section className="py-24 bg-cream relative">
                <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold">The Sanctuary Gaze</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-forest">Captured Garden Splendors</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {GALLERY_PHOTOS.slice(0, 3).map((photo) => (
                      <div 
                        key={photo.id}
                        onClick={() => navigate("/gallery")}
                        className="group rounded-xl overflow-hidden cursor-pointer shadow-xs border border-forest/5 relative aspect-square"
                      >
                        <img 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          src={photo.url} 
                          alt={photo.title} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-bold">{photo.tag}</span>
                          <p className="text-xs text-white/90 font-light mt-1 leading-normal">{photo.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => navigate("/gallery")}
                      className="bg-forest text-gold hover:bg-white hover:text-forest px-8 py-4 rounded-sm text-xs uppercase tracking-widest font-bold transition-all shadow-md cursor-pointer"
                    >
                      Browse All Captures
                    </button>
                  </div>
                </div>
              </section>

              {/* TESTIMONIAL PREVIEW */}
              <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                  <GuestReviews />
                </div>
              </section>

              {/* RETREAT RESERVATION CTA */}
              <section className="relative py-28 overflow-hidden bg-forest text-white">
                <div className="absolute inset-0 opacity-15 bg-cover bg-center mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200')" }} />
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 select-none">
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight">
                    Treat Yourself To Authentic <br />
                    <span className="italic text-gold font-serif">Himalayan Sanctuary Comforts</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-white/70 max-w-[550px] mx-auto leading-relaxed">
                    Reserve a signature wood campfire bench, glass conservatory spot, or panoramic balcony overlooking Chamba valleys. We await your journey.
                  </p>
                  <div>
                    <button 
                      onClick={() => navigate("/reservations")}
                      className="bg-gold hover:bg-white text-forest font-bold px-10 py-5 rounded-sm text-xs uppercase tracking-[0.25em] shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    >
                      Book a Private Table
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {currentPath === "/about" && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="pt-32 pb-24 space-y-24"
              style={{ backgroundColor: '#F7F4EE' }}
            >
              {// Hero Header
              }
              <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold">THE VISIONARY SANCTUARY</span>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-forest">Heritage & Nature's Whisper</h1>
                <div className="w-16 h-0.5 bg-gold mx-auto mt-2" />
              </div>

              {// Split main details
              }
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-center">
                <div className="text-left space-y-6">
                  <div className="inline-block border-b-2 border-gold pb-1 text-[10px] font-sans font-bold uppercase tracking-widest text-[#163B34]/60">
                    OUR HUMBLE RECORD
                  </div>
                  <h2 className="font-serif text-3xl font-light text-forest leading-tight">
                    Preserving the Majestic Art <br />
                    of Mountain Savoring
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed text-forest/80 font-light">
                    Founded Off Chamba Cliff Valleys, Cafe Bageecha was designed as a living sculpture. Embodying our founders' passion for both top-tier organic extraction and alpine architectural integrity, we brought together local timber artisans and floral horticulturists to construct a refuge where stress dissolves.
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-forest/80 font-light">
                    We collect pure wild mountain honey from high altitude meadows, woodfire sourdough on thick hand-crafted clay shields, and brew premium coffee sourced from local smallholders who share our spiritual respect for Mother Soil.
                  </p>
                </div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-forest/10 hover:shadow-gold/15 transition-all duration-500 bg-white p-2.5 aspect-[4/3] w-full"
                >
                  <img 
                    alt="Cafe Bageecha's story collage: quiet reading corner, vibrant dining room, outdoor scenery, and signature mountain cafe entrance" 
                    className="w-full h-full object-cover rounded-xl select-none" 
                    src="https://www.image2url.com/r2/default/images/1781535256049-d42f5e6a-5c81-422c-a50d-cfb0bd774ee3.png"
                    loading="lazy"
                  />
                </motion.div>
              </div>

              {// Core Brand Pillars
              }
              <div className="max-w-7xl mx-auto px-6 bg-white py-16 rounded-2xl border border-forest/5 shadow-xs">
                <div className="text-center space-y-4 mb-12">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-gold">OUR CORNERSTONES</span>
                  <h3 className="font-serif text-2xl font-bold text-forest">Standard Pillars of the Retreat</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  <div className="space-y-3 p-4">
                    <Award className="text-gold" size={28} />
                    <h4 className="font-serif text-lg font-bold text-forest">Authentic Himalayan Culture</h4>
                    <p className="text-xs text-forest/75 leading-relaxed font-light">From native Rajma Red Rice to authentic wheat yeast Siddu cooked with warm wood ash steam, we safeguard native mountain gastronomy secrets.</p>
                  </div>
                  <div className="space-y-3 p-4">
                    <Sparkles className="text-gold" size={28} />
                    <h4 className="font-serif text-lg font-bold text-forest">Organic Sourcing Ethics</h4>
                    <p className="text-xs text-forest/75 leading-relaxed font-light">No artificial colors, no store-bought syrups. Everything is brewed with handpicked local flowers, hand-rolled teas, and native mountain berries.</p>
                  </div>
                  <div className="space-y-3 p-4">
                    <Heart className="text-gold" size={28} />
                    <h4 className="font-serif text-lg font-bold text-forest">Breathable Garden Architecture</h4>
                    <p className="text-xs text-forest/75 leading-relaxed font-light">A slow, non-crowded atmosphere. Tables are laid at generous spatial limits, giving guests premium peace of mind under blooming floral roofs.</p>
                  </div>
                </div>
              </div>

              {/* FREQUENTLY ASKED QUESTIONS SECTION */}
              <div className="max-w-4xl mx-auto px-6 space-y-12">
                <div className="text-center space-y-4">
                  <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-gold">GUEST INFORMATION LEDGER</span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-forest">Frequently Answered Truths</h3>
                  <p className="text-xs sm:text-sm text-forest/70 max-w-[520px] mx-auto font-light">
                    Empowering confidence, clarity, and effortless comfort to optimize your upcoming reservation at our mountain sanctuary.
                  </p>
                </div>

                <div className="space-y-4 max-w-3xl mx-auto">
                  {[
                    {
                      question: "How do you accommodate dietary restrictions and severe allergies?",
                      answer: "All our signature recipes highlight clean, unheated local materials. We tag gluten-free, dairy-free, sugar-free, or entirely vegan items carefully on our culinary menus. Our garden kitchen operates separate prep areas to safely eliminate cross-contamination hazards. Kindly notify our host team of severe allergies during booking or on arrival so the ledger can be flagged immediately.",
                      category: "Dietary",
                      icon: Heart
                    },
                    {
                      question: "Is there private parking and valet service on the mountain cliffside?",
                      answer: "Yes, we provide complimentary secure private parking spaces right adjacent to our entrance gates on the Panchvati cliff ridge. Full professional valet service is available during all operating hours to seamlessly take care of your vehicle while you walk down to the sanctuaries. Main paths are built with safe natural stone inclines to be fully wheelchair-accessible.",
                      category: "Access",
                      icon: Car
                    },
                    {
                      question: "What is your photography, drone and privacy policy?",
                      answer: "We warmly support standard guest snapshots, smartphone shots, or personal memory capture across our floral structures. However, to guarantee the absolute private comfort and peace of our guests, commercial production equipment or aerial drone flights require a special pre-clearance permit from guest relations.",
                      category: "Media",
                      icon: Camera
                    },
                    {
                      question: "Do you accept walk-ins, and how long are reserved tables held?",
                      answer: "Advance reservations are highly recommended for peak lunch and sunset hours, especially for prime spots like the mountain terrace. We reserve a percentage of our open-air garden benched zones for walk-ins on a rolling basis. Reserved spots are held for 15 minutes. If traffic along the Himalayan highway is delayed, simply message our desk on WhatsApp.",
                      category: "Booking",
                      icon: Calendar
                    },
                    {
                      question: "Are dogs and other companion companion pets welcome?",
                      answer: "Absolutely! We love welcoming small companion pets to accompany you in our outdoor garden layout and cozy benches. We provide clean, cooling bowls of mountain mineral spring water on request. We kindly ask that pets remain on leashes and respect nearby guest sanctuary zones.",
                      category: "Pets",
                      icon: Compass
                    }
                  ].map((faq, index) => {
                    const Icon = faq.icon;
                    const isOpen = activeFaq === index;
                    return (
                      <div 
                        key={index} 
                        className="bg-white rounded-xl border border-forest/10 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
                      >
                        <button
                          onClick={() => setActiveFaq(isOpen ? null : index)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors cursor-pointer select-none"
                        >
                          <div className="flex items-center space-x-4 pr-4">
                            <div className={`p-2 rounded-lg transition-colors duration-300 ${isOpen ? 'bg-gold/15 text-forest' : 'bg-cream text-gold'}`}>
                              <Icon size={16} />
                            </div>
                            <span className="font-serif text-sm sm:text-base font-bold text-forest hover:text-gold transition-colors block">
                              {faq.question}
                            </span>
                          </div>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-gold shrink-0 bg-cream p-1 rounded-full"
                          >
                            <ChevronDown size={14} />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                            >
                              <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-forest/75 leading-relaxed font-light border-t border-forest/5 bg-cream-dim flex items-start space-x-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0 animate-pulse" />
                                <p>{faq.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Reduction of Support Load Box */}
                <div className="bg-forest text-white p-6 sm:p-8 rounded-xl max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:justify-between text-left gap-4">
                  <div className="space-y-1">
                    <h4 className="font-serif text-base sm:text-lg font-bold">Have individual inquiries or requests?</h4>
                    <p className="text-white/60 text-xs font-light max-w-md">Our hosts are ready to customize flowers, arrange special mountain transfers, or welcome large group retreats.</p>
                  </div>
                  <div className="flex gap-2.5 shrink-0 w-full sm:w-auto">
                    <a
                      href="https://wa.me/917658096379?text=Hello%20Cafe%20Bageecha%20desk%21%20I%20have%20an%20inquiry%20about"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none text-center bg-white hover:bg-gold text-forest font-bold px-5 py-3 rounded-lg text-xs uppercase tracking-wider transition-all"
                    >
                      WhatsApp Desk
                    </a>
                    <button 
                      onClick={() => navigate("/reservations")}
                      className="flex-1 sm:flex-none text-center bg-gold hover:bg-white text-forest font-bold px-5 py-3 rounded-lg text-xs uppercase tracking-wider transition-all"
                    >
                      Book Table
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentPath === "/menu" && (
            <motion.div
              key="menu-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="pt-32 pb-24"
            >
              <div className="max-w-7xl mx-auto px-6 text-center space-y-3 mb-10">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold">The Kitchen board</span>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-forest">Alpine Culinary Ledger</h1>
                <p className="text-xs sm:text-sm text-forest/60 max-w-md mx-auto font-light">Handmade stone-ground teas, organic Pahadi bites, and fresh house pastries.</p>
              </div>
              <MenuSection 
                onOpenBooking={() => navigate("/reservations")} 
                onPreviewItem={setPreviewItem} 
              />
            </motion.div>
          )}

          {currentPath === "/gallery" && (
            <motion.div
              key="gallery-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="pt-32 pb-24"
            >
              <div className="max-w-7xl mx-auto px-6 text-center space-y-3 mb-10">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold">Visual Chronicles</span>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-forest">Sanctuary Visual Gallery</h1>
                <p className="text-xs sm:text-sm text-forest/60 max-w-md mx-auto font-light">A slow, visual tour of our plant-lined timber rooms, mist terraces, and artisanal pastries.</p>
              </div>
              <GallerySection />
            </motion.div>
          )}

          {currentPath === "/events" && (
            <motion.div
              key="events-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="pt-32 pb-24"
            >
              <div className="max-w-7xl mx-auto px-6 text-center space-y-3 mb-10">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold">Retreat assemblies</span>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-forest">Gatherings & Musical Assemblies</h1>
                <p className="text-xs sm:text-sm text-forest/60 max-w-md mx-auto font-light">Bonfire acoustic acts, barista coffee masterclasses, and local art panels.</p>
              </div>
              <EventsSection />
            </motion.div>
          )}

          {currentPath === "/reservations" && (
            <motion.div
              key="reservations-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="pt-32 pb-24 bg-cream"
            >
              <div className="max-w-7xl mx-auto px-6 text-center space-y-3 mb-12">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold">THE RECEPTIVE HEARTH</span>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-forest">Secure An Oasis Spot</h1>
                <p className="text-xs sm:text-sm text-forest/60 max-w-md mx-auto font-light font-sans">Savor premium mountain views with zero wait times. Reserve in advance below.</p>
              </div>

              {/* Elite Integrated Reservation Layout */}
              <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
                
                {/* Left informational column */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="bg-[#11322C] text-white p-8 rounded-2xl border border-white/5 space-y-6">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-gold">THE ARRIVAL MANUAL</span>
                    <h3 className="font-serif text-2xl font-light">Plan Your Alpine Visit</h3>
                    <p className="text-xs text-white/70 leading-relaxed font-light">
                      We reserve table assignments meticulously. If you are experiencing delays along the mountain highway, please call our lounge manager immediately at the coordinator deck. 
                    </p>

                    <div className="h-[1px] bg-white/10" />

                    <div className="space-y-4 text-xs font-sans text-white/80">
                      <div className="flex items-center space-x-3">
                        <MapPin size={16} className="text-gold shrink-0" />
                        <span>Panchvati, Sarol, Chamba, Himachal Pradesh</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone size={16} className="text-gold shrink-0" />
                        <span>Coordinator Mobile: +91 76580 96379</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock size={16} className="text-gold shrink-0" />
                        <span>Timely Welcome: 09:00 AM - 10:00 PM Daily</span>
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic quote block */}
                  <div className="p-6 border-l-2 border-gold font-serif italic text-sm text-forest/80 bg-white/40 rounded-r-lg">
                    "Under Chamba's mountain peaks, deep forest coffee brews best with slow, peaceful garden breaths."
                  </div>
                </div>

                {/* Right Interactive Table reservation wizard */}
                <div id="integrated-reservation-form" className="lg:col-span-7 bg-white rounded-2xl border border-forest/10 shadow-xl overflow-hidden flex flex-col">
                  {/* Form Header */}
                  <div className="bg-forest px-6 py-5 text-white flex justify-between items-center text-left">
                    <div>
                      <span className="font-serif text-xl font-semibold tracking-wide">
                        {resStep === 3 ? "Reservation Confirmed!" : "Dining Option Request"}
                      </span>
                      <p className="text-white/60 text-[9px] uppercase tracking-wider mt-0.5 font-mono">
                        {resStep === 1 && "Phase 1: Seating Ambiance Select"}
                        {resStep === 2 && "Phase 2: Guest Coordinates & Desires"}
                        {resStep === 3 && "Verified mountain vouchers issued"}
                      </p>
                    </div>
                    {resStep !== 3 && (
                      <button 
                        onClick={handleReset}
                        className="text-xs uppercase tracking-widest text-gold font-bold hover:text-white transition-colors cursor-pointer"
                      >
                        Reset Form
                      </button>
                    )}
                  </div>

                  {/* Progressive indicator bar */}
                  <div className="bg-cream-dim border-b border-forest/10 px-6 py-2.5 flex items-center justify-between text-[11px] font-mono shrink-0">
                    <div className="flex items-center space-x-4 w-full">
                      <div className="flex items-center space-x-1">
                        <div className={`w-4- h-4 rounded-full flex items-center justify-center p-0.5 text-[9px] font-bold ${
                          resStep >= 1 ? "bg-forest text-gold" : "bg-forest/10 text-forest/40"
                        }`}>
                          {resStep > 1 ? <Check size={8} className="stroke-[3]" /> : "1"}
                        </div>
                        <span className={resStep === 1 ? "text-forest font-bold" : "text-forest/40"}>Ambiance</span>
                      </div>
                      <div className="h-[1px] w-8 bg-forest/10" />
                      <div className="flex items-center space-x-1">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center p-0.5 text-[9px] font-bold ${
                          resStep >= 2 ? "bg-forest text-gold" : "bg-forest/10 text-forest/40"
                        }`}>
                          {resStep > 2 ? <Check size={8} className="stroke-[3]" /> : "2"}
                        </div>
                        <span className={resStep === 2 ? "text-forest font-bold" : "text-forest/40"}>Details</span>
                      </div>
                      <div className="h-[1px] w-8 bg-forest/10" />
                      <div className="flex items-center space-x-1">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center p-0.5 text-[9px] font-bold ${
                          resStep === 3 ? "bg-forest text-gold" : "bg-forest/10 text-forest/40"
                        }`}>
                          {resStep === 3 ? <Check size={8} className="stroke-[3]" /> : "3"}
                        </div>
                        <span className={resStep === 3 ? "text-forest font-bold" : "text-forest/40"}>Pass</span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center space-x-1 text-emerald-700">
                      <ShieldCheck size={12} />
                      <span className="text-[10px] uppercase font-bold tracking-wider">Spot Protected</span>
                    </div>
                  </div>

                  {/* Form Content body */}
                  <div className="p-6 md:p-8 space-y-6">
                    {resStep === 1 && (
                      <div className="space-y-6">
                        {/* Selector items */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="text-[10px] uppercase font-bold tracking-wider text-forest/60 block mb-1.5">Party Size</label>
                            <div className="relative flex items-center">
                              <Users className="absolute left-3 text-gold" size={14} />
                              <select 
                                value={guests}
                                onChange={(e) => setGuests(parseInt(e.target.value))}
                                className="w-full bg-cream rounded-lg pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/10 font-bold text-forest"
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16].map(n => (
                                  <option key={n} value={n}>{n} {n === 1 ? "Guest Seating" : `Guests (${n} Seats)`}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold tracking-wider text-forest/60 block mb-1.5">Date of Visit</label>
                            <div className="relative flex items-center">
                              <Calendar className="absolute left-3 text-gold" size={14} />
                              <input 
                                type="date"
                                required
                                value={date}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-cream rounded-lg pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/10 font-bold text-forest"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold tracking-wider text-forest/60 block mb-1.5 font-sans">Arrival Slot</label>
                            <div className="relative flex items-center">
                              <Clock className="absolute left-3 text-gold" size={14} />
                              <select 
                                value={time} 
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full bg-cream rounded-lg pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold border border-forest/10 font-bold text-forest"
                              >
                                {["09:30 AM", "11:00 AM", "12:30 PM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM", "07:30 PM", "09:00 PM"].map(t => (
                                  <option key={t} value={t}>{t}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Ambiance items */}
                        <div className="space-y-3">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-forest/60 block mb-1">Select Seating Ambiance Zone</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {seatingAreas.map((area) => (
                              <div 
                                key={area.id}
                                onClick={() => setTableType(area.id)}
                                className={`flex items-center space-x-3.5 p-3 rounded-xl border cursor-pointer transition-all ${
                                  tableType === area.id 
                                    ? "border-gold bg-[#11322C]/5 ring-1 ring-gold/10"
                                    : "border-forest/10 hover:border-forest/20"
                                }`}
                              >
                                <img src={area.image} className="w-12 h-12 object-cover rounded-md" alt={area.name} />
                                <div className="text-left flex-1 min-w-0">
                                  <h4 className="font-serif text-sm font-bold text-forest truncate">{area.name}</h4>
                                  <span className="text-[9px] uppercase tracking-wider text-gold font-bold truncate block">{area.headline}</span>
                                </div>
                                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                  tableType === area.id ? "border-gold bg-gold" : "border-forest/20"
                                }`}>
                                  {tableType === area.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {resStep === 2 && (
                      <div className="space-y-5">
                        <div className="bg-cream/50 p-3.5 rounded-lg text-xs flex justify-between items-center text-forest/80 font-medium">
                          <span>Zone: <strong className="capitalize">{tableType.replace(/_/g, " ")}</strong></span>
                          <span>Party: <strong>{guests} Guests</strong></span>
                          <span>Slot: <strong>{date} ({time})</strong></span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label className="text-[10px] uppercase font-bold tracking-wider text-forest/65 block">Your Name *</label>
                              {resNameTouched && userName.trim().length > 0 && (
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
                              onBlur={() => setResNameTouched(true)}
                              onChange={(e) => setUserName(e.target.value)}
                              className="w-full bg-cream rounded-lg px-3 py-2.5 text-xs focus:ring-1 focus:ring-gold focus:outline-none border border-forest/10 font-semibold"
                            />
                            {resNameTouched && !userName.trim() && (
                              <p className="text-[10px] text-red-600 font-medium mt-1 flex items-center space-x-1">
                                <AlertTriangle size={10} /> <span>Host requires a welcome name.</span>
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label className="text-[10px] uppercase font-bold tracking-wider text-forest/65 block">Phone Number *</label>
                              {resPhoneTouched && resPhoneValid(userPhone) && (
                                <span className="text-[9px] text-emerald-600 font-bold flex items-center space-x-1">
                                  <Check size={10} /> <span>Valid Channel</span>
                                </span>
                              )}
                            </div>
                            <input 
                              type="tel" 
                              required 
                              placeholder="E.g., +91 76580 96379" 
                              value={userPhone} 
                              onBlur={() => setResPhoneTouched(true)}
                              onChange={(e) => setUserPhone(e.target.value)}
                              className="w-full bg-cream rounded-lg px-3 py-2.5 text-xs focus:ring-1 focus:ring-gold focus:outline-none border border-forest/10 font-mono"
                            />
                            {resPhoneTouched && !resPhoneValid(userPhone) && (
                              <p className="text-[10px] text-amber-700 font-medium mt-1 flex items-center space-x-1">
                                <AlertTriangle size={10} /> <span>Please insert a valid 10-digit mobile number.</span>
                              </p>
                            )}
                          </div>

                          <div className="md:col-span-2">
                            <div className="flex justify-between items-center mb-1">
                              <label className="text-[10px] uppercase font-bold tracking-wider text-forest/65 block">Email Address *</label>
                              {resEmailTouched && resEmailValid(userEmail) && (
                                <span className="text-[9px] text-emerald-600 font-bold flex items-center space-x-1">
                                  <Check size={10} /> <span>Deliverable</span>
                                </span>
                              )}
                            </div>
                            <input 
                              type="email" 
                              required 
                              placeholder="E.g., nitishkaushal17@gmail.com" 
                              value={userEmail} 
                              onBlur={() => setResEmailTouched(true)}
                              onChange={(e) => setUserEmail(e.target.value)}
                              className="w-full bg-cream rounded-lg px-3 py-2.5 text-xs focus:ring-1 focus:ring-gold focus:outline-none border border-forest/10 font-mono"
                            />
                            {resEmailTouched && !resEmailValid(userEmail) && (
                              <p className="text-[10px] text-red-600 font-medium mt-1 flex items-center space-x-1">
                                <AlertTriangle size={10} /> <span>A valid email is required to dispatch the secure voucher.</span>
                              </p>
                            )}
                          </div>

                          <div className="md:col-span-2">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-forest/65 block mb-1">Dietary Exclusions / Occasion Remarks</label>
                            <textarea 
                              rows={2.5} 
                              placeholder="Any food sensitivities, honey exclusions, high chairs or flower setup options." 
                              value={specialNotes} 
                              onChange={(e) => setSpecialNotes(e.target.value)}
                              className="w-full bg-cream rounded-lg px-3 py-2.5 text-xs focus:ring-1 focus:ring-gold focus:outline-none border border-forest/10 font-light"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {resStep === 3 && (
                      <div className="space-y-6 pt-2 text-center">
                        <div className="space-y-1">
                          <div className="inline-flex relative">
                            <div className="absolute inset-0 bg-gold/20 rounded-full animate-ping scale-125 duration-1000" />
                            <div className="bg-forest text-gold rounded-full p-4 relative shadow-sm">
                              <CheckCircle size={28} className="text-gold" />
                            </div>
                          </div>
                          <h3 className="font-serif text-2xl font-bold text-forest mt-3">Spot Secured Meticulously!</h3>
                          <p className="text-xs text-forest/70 max-w-sm mx-auto font-light">Your mountain ledger spot is safely documented. We look forward to meeting you.</p>
                        </div>

                        {/* Double Notched Ticket Voucher design */}
                        <div className="bg-white border-2 border-dashed border-gold/45 rounded-2xl p-5 shadow-md relative overflow-hidden text-left max-w-sm mx-auto">
                          
                          {/* Circle cutouts */}
                          <div className="absolute w-6 h-6 rounded-full bg-cream -left-3 top-1/2 -translate-y-1/2 border-r-2 border-dashed border-gold/20" />
                          <div className="absolute w-6 h-6 rounded-full bg-cream -right-3 top-1/2 -translate-y-1/2 border-l-2 border-dashed border-gold/20" />
                          
                          {/* Brand Header */}
                          <div className="text-center border-b border-forest/10 pb-4 mb-4">
                            <span className="font-serif text-base tracking-[0.08em] font-black text-forest">CAFE BAGEECHA</span>
                            <p className="text-[8px] text-[#D4A373] tracking-widest font-extrabold uppercase mt-0.5">VERIFIED TABLE GUARANTEE</p>
                          </div>

                          <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 text-[11px] text-forest/85 font-sans">
                            <div>
                              <span className="text-[8px] text-forest/40 uppercase tracking-widest font-black block">Reservation Identity</span>
                              <strong className="text-xs font-mono bg-cream px-1.5 py-0.5 rounded border border-forest/5 text-forest block mt-0.5 mt-1 tracking-wider text-center">{bookingCode}</strong>
                            </div>

                            <div>
                              <span className="text-[8px] text-forest/40 uppercase tracking-widest font-black block">Allocated Table</span>
                              <strong className="text-xs text-forest block mt-1">Table #{assignedTable}</strong>
                            </div>

                            <div>
                              <span className="text-[8px] text-forest/40 uppercase tracking-widest font-black block">Primary Guest Host</span>
                              <strong className="text-xs text-forest block mt-1 truncate font-semibold">{userName}</strong>
                            </div>

                            <div>
                              <span className="text-[8px] text-forest/40 uppercase tracking-widest font-black block">Seating Ambiance</span>
                              <strong className="text-xs text-forest block mt-1 capitalize">{tableType.replace(/_/g, " ")}</strong>
                            </div>

                            <div>
                              <span className="text-[8px] text-forest/40 uppercase tracking-widest font-black block">Arrival Bracket</span>
                              <strong className="text-xs text-forest block mt-1 font-mono font-bold text-forest">{time}</strong>
                            </div>

                            <div>
                              <span className="text-[8px] text-forest/40 uppercase tracking-widest font-black block">Target Date</span>
                              <strong className="text-xs text-forest block mt-1 font-mono">{date}</strong>
                            </div>
                          </div>
                        </div>

                        {/* Redefined action buttons */}
                        <div className="flex flex-col gap-2.5 max-w-sm mx-auto pt-3 shrink-0">
                          <button
                            onClick={triggerResDownloadMock}
                            disabled={isResDownloading}
                            className="w-full bg-forest hover:bg-gold text-white hover:text-forest px-4 py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer disabled:opacity-50"
                          >
                            {isResDownloading ? (
                              <>
                                <div className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                                <span>Generating Receipt...</span>
                              </>
                            ) : (
                              <>
                                <Download size={13} />
                                <span>Download Voucher Pass</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => {
                              const formattedDate = date.replace(/-/g, "");
                              const startHour = time.includes("PM") && !time.startsWith("12")
                                ? parseInt(time.split(":")[0]) + 12 
                                : parseInt(time.split(":")[0]);
                              const formattedStart = `${formattedDate}T${startHour.toString().padStart(2, "0")}3000`;
                              const formattedEnd = `${formattedDate}T${(startHour + 2).toString().padStart(2, "0")}3000`;
                              const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cafe+Bageecha+Reservation&dates=${formattedStart}/${formattedEnd}&details=Your+premium+table+ #${assignedTable} is secured under booking code: +${bookingCode}&location=Cafe+Bageecha,+Panchvati,+Sarol,+Chamba,+Himachal+Pradesh`;
                              window.open(gCalUrl, "_blank");
                            }}
                            className="w-full bg-white border border-forest/15 hover:bg-gold/5 text-forest px-4 py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                          >
                            <CalendarPlus size={13} className="text-[#D4A373]" />
                            <span>Add to Google Calendar</span>
                          </button>

                          <a
                            href="https://wa.me/917658096379"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                          >
                            <MessageSquare size={13} />
                            <span>Support Chat on WhatsApp</span>
                          </a>

                          <button
                            onClick={handleReset}
                            className="w-full text-forest/50 hover:text-forest text-[11px] font-bold uppercase tracking-wider mt-1 transition-colors"
                          >
                            New Table Booking Request
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Form Footer Action */}
                  {resStep !== 3 && (
                    <div className="bg-cream/40 px-6 py-4 border-t border-forest/10 flex justify-between items-center shrink-0">
                      {resStep === 2 ? (
                        <button 
                          onClick={() => setResStep(1)}
                          className="text-xs uppercase tracking-widest text-[#163B34]/75 hover:text-[#163B34] font-bold flex items-center space-x-1 cursor-pointer"
                        >
                          <ArrowLeft size={14} />
                          <span>Seating</span>
                        </button>
                      ) : (
                        <div />
                      )}
                      <button 
                        onClick={handleNextStep}
                        className="bg-forest hover:bg-gold text-white hover:text-forest flex items-center space-x-2 font-black px-7 py-3 rounded-md text-xs uppercase tracking-widest cursor-pointer shadow-md"
                      >
                        <span>{resStep === 1 ? "Next: Add Coordinates" : "Confirm My Table"}</span>
                        <ArrowRight size={14} className="text-gold" />
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          )}

          {currentPath === "/contact" && (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="pt-32 pb-24 bg-cream"
            >
              <div className="max-w-7xl mx-auto px-6 text-center space-y-3 mb-10">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold">VISIT US IN CHAMBA</span>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-forest">Inquiry Desk & Coordinates</h1>
                <p className="text-xs sm:text-sm text-forest/60 max-w-md mx-auto font-light font-sans">Get custom driving directions, operating ledger sheets, and banquet reservations.</p>
              </div>
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0A1E1A] text-white pt-20 pb-12 border-t border-white/5 select-none text-left">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
          
          {/* Brand brief */}
          <div className="space-y-6 text-left">
            <div className="flex items-center space-x-3 text-left">
              <div className="bg-white/10 p-2.5 rounded-full border border-white/10 shrink-0">
                <img 
                  alt="Cafe Bageecha Logo" 
                  className="h-10 w-auto object-contain brightness-0 invert"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5R_p9z2J75wasW2-gBF1xSIchnllZYfoTdmdQyhHBpqSldkD1CIk0kRATSFAeOIFjcSGAUEab3TyYEM9D0m6jLv-XiPAIgmfCtfmdDuW0PQYs2dpRBRJ7D4BGR5XyIAuN4U2DBmN8waefYZka6fz1hXT3yRG-bivoSAK_tmVeM8pqaq7xhMd_0zZJajRSFGurCaT59AYW8odGXnnZO0YfnX1UhsZVL_x5tsMQCVBSHauPkKopbNGR_yA-xgaDDEEure0Jq6ZhaSbF"
                />
              </div>
              <div className="leading-none text-left">
                <span className="font-serif text-base tracking-wider font-extrabold text-white block">CAFE BAGEECHA</span>
                <span className="text-[9px] uppercase font-bold tracking-[0.15em] text-gold mt-1.5 block">CAFE • RETREAT • CHAMBA</span>
              </div>
            </div>
            
            <p className="text-white/65 text-xs leading-relaxed font-sans font-medium text-left">
              Cafe • Garden • Nature Experience <br />
              Chamba ki pahadi hawa, fresh coffee aur nature ke beech yaadgaar moments. We wait to welcome you off the cliffs!
            </p>

            <div className="flex space-x-3.5 pt-2">
              <a 
                href="#" 
                className="w-10 h-10 border border-white/15 rounded-full flex items-center justify-center text-xs font-bold hover:bg-gold hover:text-forest hover:border-gold transition-all shadow-sm"
                aria-label="Facebook Profile Link"
              >
                FB
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-white/15 rounded-full flex items-center justify-center text-xs font-bold hover:bg-gold hover:text-forest hover:border-gold transition-all shadow-sm"
                aria-label="Instagram Profile Link"
              >
                IG
              </a>
              <a 
                href="https://wa.me/917658096379?text=Hello%20Cafe%20Bageecha%2C%20I%20would%20like%20to%20know%20more%20about%20your%20cafe." 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/15 rounded-full flex items-center justify-center text-xs font-bold hover:bg-gold hover:text-forest hover:border-gold transition-all shadow-sm"
                aria-label="WhatsApp Hook Link"
              >
                WA
              </a>
            </div>
          </div>

          {/* Quick links sitemap */}
          <div className="text-left">
            <span className="text-gold font-bold uppercase tracking-widest text-xs block mb-6">Quick Sitemap</span>
            <ul className="space-y-4 text-xs text-white/70 font-semibold uppercase tracking-wider">
              <li><button onClick={() => navigate("/")} className="hover:text-gold cursor-pointer transition-colors block text-left">Lounge Entrance</button></li>
              <li><button onClick={() => navigate("/about")} className="hover:text-gold cursor-pointer transition-colors block text-left">Our Heritage Story</button></li>
              <li><button onClick={() => navigate("/menu")} className="hover:text-gold cursor-pointer transition-colors block text-left">The Food Board</button></li>
              <li><button onClick={() => navigate("/gallery")} className="hover:text-gold cursor-pointer transition-colors block text-left">Sanctuary Gallery</button></li>
              <li><button onClick={() => navigate("/events")} className="hover:text-gold cursor-pointer transition-colors block text-left">Assemblies</button></li>
              <li><button onClick={() => navigate("/reservations")} className="hover:text-gold cursor-pointer transition-colors block text-left">Secure A Table Spot</button></li>
              <li><button onClick={() => navigate("/contact")} className="hover:text-gold cursor-pointer transition-colors block text-left">Inquiry Desks</button></li>
            </ul>
          </div>

          {/* Visit coordinates summary */}
          <div className="text-left space-y-4">
            <span className="text-gold font-bold uppercase tracking-widest text-xs block mb-2">Visit Coordinates</span>
            <ul className="space-y-4 text-xs text-white/70 font-sans leading-relaxed text-left">
              <li className="flex items-start space-x-3.5 text-left">
                <MapPin size={15} className="text-gold shrink-0 mt-0.5" />
                <span>Cafe Bageecha, <br />Panchvati, Sarol, Chamba,<br />Himachal Pradesh, India</span>
              </li>
              <li className="flex items-center space-x-3.5 text-left">
                <Phone size={14} className="text-gold shrink-0" />
                <span>+91 76580 96379</span>
              </li>
              <li className="flex items-center space-x-3.5 text-left">
                <Clock size={14} className="text-gold shrink-0" />
                <span>Daily Open: 09:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Brand stamp visual decoration */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-center items-center text-center space-y-3 shrink-0">
            <Sparkles className="text-gold animate-pulse" size={24} />
            <span className="font-serif text-sm font-bold text-white leading-normal">Himalayan Sanctuary</span>
            <p className="text-[10px] text-white/60">
              Clean spring waters combined with fresh cool air are waiting. Secure a slot!
            </p>
            <button
              onClick={() => navigate("/reservations")}
              className="bg-gold hover:bg-white text-forest font-bold w-full py-2.5 rounded-sm text-[10px] uppercase tracking-widest cursor-pointer transition-colors"
            >
              Secure Table Spot
            </button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-10 text-center text-[10px] text-white/20 uppercase tracking-[0.25em] font-sans">
          © 2026 GARDEN BAGEECHA CAFÉ. ALL RIGHTS RESERVED. TRADEMARKS OF ALPINE SANCTUARY LTD.
        </div>
      </footer>

      {/* FLOATING BOOKING OVERLAY PORTAL BUTTON */}
      <AnimatePresence>
        {currentPath !== "/reservations" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-24 md:right-28 z-40 hidden md:block"
          >
            <button
              onClick={() => navigate("/reservations")}
              className="bg-[#11322C] hover:bg-gold hover:text-forest text-white font-bold px-7 py-4 rounded-full text-xs uppercase tracking-widest shadow-2xl transition-all duration-300 flex items-center space-x-2 border border-gold/20 scale-100 hover:scale-105 cursor-pointer active:scale-95 animate-bounce"
            >
              <Calendar size={14} className="text-gold" />
              <span>Book Table Spot</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING WHATSAPP BUTTON */}
      <motion.a
        href="https://wa.me/917658096379?text=Hello%20Cafe%20Bageecha%2C%20I%20would%20like%20to%20know%20more%20about%20your%20cafe."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -4, 0]
        }}
        transition={{
          opacity: { duration: 0.5 },
          scale: { duration: 0.5 },
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        whileHover={{ 
          scale: 1.08,
          boxShadow: "0 10px 25px rgba(37, 211, 102, 0.4)"
        }}
        className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 w-[52px] h-[52px] md:w-14 md:h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 cursor-pointer"
      >
        <svg className="w-6 h-6 md:w-7 md:h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.1 1.4 4.8 1.4 5.4 0 9.8-4.4 9.8-9.8s-4.4-9.8-9.8-9.8c-5.4 0-9.8 4.4-9.8 9.8 0 1.9.5 3.7 1.5 5.3l-1.0 3.6 3.7-1.0zM17.5 14.8c-.3-.2-1.7-.8-2.0-.9-.3-.1-.5-.2-.7.1-.2.3-.8 1.0-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.8-.7-1.4-1.7-1.6-2.0-.2-.3-.0-.5.1-.6s.3-.3.4-.5c.2-.2.2-.3.3-.5.1-.2.0-.4-.0-.5-.1-.2-.7-1.6-.9-2.2-.3-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.6 5.7 5.1.8.3 1.5.6 2.0.7.8.3 1.6.2 2.2.1.7-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.1-1.3s-.3-.2-.6-.3z" />
        </svg>
      </motion.a>

      {/* CORE MODAL WIZARDS */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />

      <ItemPreviewModal 
        item={previewItem} 
        onClose={() => setPreviewItem(null)} 
        onAddToBasket={handleAddPreviewItemDirect}
      />

    </div>
  );
}
