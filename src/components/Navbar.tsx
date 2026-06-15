import { useState, useEffect } from "react";
import { Menu, X, Phone, Calendar, Clock, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Navbar({ currentPath, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "/", label: "Home" },
    { id: "/about", label: "About Us" },
    { id: "/menu", label: "Menu" },
    { id: "/gallery", label: "Gallery" },
    { id: "/events", label: "Events" },
    { id: "/reservations", label: "Reservations" },
    { id: "/contact", label: "Contact" },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <nav
        id="navbar-container"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-24 flex items-center border-b ${
          isScrolled
            ? "bg-forest/95 backdrop-blur-xl shadow-xl border-white/5"
            : "bg-black/30 backdrop-blur-xs border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          {/* Logo Brand */}
          <button
            onClick={() => handleLinkClick("/")}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="bg-cream/10 p-2.5 rounded-full transition-transform group-hover:rotate-12 duration-500 border border-white/10">
              <img
                id="navbar-logo-img"
                alt="Cafe Bageecha Logo"
                className="h-10 w-auto object-contain brightness-0 invert"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5R_p9z2J75wasW2-gBF1xSIchnllZYfoTdmdQyhHBpqSldkD1CIk0kRATSFAeOIFjcSGAUEab3TyYEM9D0m6jLv-XiPAIgmfCtfmdDuW0PQYs2dpRBRJ7D4BGR5XyIAuN4U2DBmN8waefYZka6fz1hXT3yRG-bivoSAK_tmVeM8pqaq7xhMd_0zZJajRSFGurCaT59AYW8odGXnnZO0YfnX1UhsZVL_x5tsMQCVBSHauPkKopbNGR_yA-xgaDDEEure0Jq6ZhaSbF"
              />
            </div>
            <div className="text-left">
              <span className="font-serif text-lg tracking-wider font-bold text-white block">
                CAFE BAGEECHA
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold block">
                CAFE • RETREAT • CHAMBA
              </span>
            </div>
          </button>

          {/* Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8 font-sans font-semibold tracking-widest text-xs uppercase">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-all duration-300 relative py-2 cursor-pointer ${
                  currentPath === link.id
                    ? "text-gold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                {currentPath === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Action Button CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              id="navbar-book-btn"
              onClick={() => handleLinkClick("/reservations")}
              className="bg-gold hover:bg-white text-forest font-bold px-7 py-3 rounded-xs text-xs uppercase tracking-[0.15em] transition-all duration-300 shadow-md transform hover:-translate-y-0.5 cursor-pointer"
            >
              Book a Table
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center">
            <button
              id="navbar-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-24 bg-forest/98 z-40 border-b border-white/10 shadow-2xl block lg:hidden"
          >
            <div className="px-6 py-8 space-y-6 flex flex-col justify-center items-center">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-base font-sans font-bold tracking-widest uppercase cursor-pointer ${
                    currentPath === link.id ? "text-gold text-lg" : "text-white/80"
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="w-full h-[1px] bg-white/10 my-4" />

              <div className="text-center space-y-4 w-full">
                <button
                  id="mobile-book-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate("/reservations");
                  }}
                  className="w-full bg-gold hover:bg-white text-forest font-bold py-3.5 rounded-sm text-xs uppercase tracking-[0.2em] transition-all cursor-pointer"
                >
                  Book a Table
                </button>

                <div className="flex justify-center space-x-6 text-white/60 text-xs pt-4">
                  <span className="flex items-center space-x-1">
                    <Phone size={12} className="text-gold" />
                    <span>+91 98765 43210</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock size={12} className="text-gold" />
                    <span>9:00 AM - 10:00 PM</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
