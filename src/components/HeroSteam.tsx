import React, { useState, useEffect, useRef } from "react";

interface HeroSteamProps {
  reducedMotion?: boolean;
}

export default function HeroSteam({ reducedMotion = false }: HeroSteamProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check for mobile optimization
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track parent hero mouse moves for premium interactive steam reactivity
  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl || isMobile || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      // Calculate normalized positions relative to the center [-0.5 to 0.5]
      const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

      setMousePos({
        x: Number(relativeX.toFixed(3)),
        y: Number(relativeY.toFixed(3))
      });
    };

    const handleMouseLeave = () => {
      // Return gently to center when cursor leaves
      setMousePos({ x: 0, y: 0 });
    };

    heroEl.addEventListener("mousemove", handleMouseMove);
    heroEl.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      heroEl.removeEventListener("mousemove", handleMouseMove);
      heroEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile, reducedMotion]);

  // Subtle CSS custom property variables based on mouse location and parallax rules
  const steamTranslateStyle = {
    "--mx": mousePos.x,
    "--my": mousePos.y,
    transform: reducedMotion 
      ? "none" 
      : "translate3d(calc(var(--mx) * -22px), calc(var(--my) * -18px), 0)",
    transition: "transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1)"
  } as React.CSSProperties;

  // Render fewer layers on mobile for maximum battery and hardware efficiency
  const steamLayers = isMobile 
    ? [
        { id: "s1", duration: 10, delay: 0, scale: 0.95, opacity: 0.18, d: "M 100 380 C 110 320, 80 260, 100 200 C 120 140, 90 80, 100 20" },
        { id: "s2", duration: 13, delay: 4, scale: 1.10, opacity: 0.14, d: "M 100 380 C 90 310, 110 240, 95 180 C 80 120, 110 60, 90 20" }
      ]
    : [
        { id: "s1", duration: 11, delay: 0, scale: 0.9, opacity: 0.20, d: "M 100 380 C 112 330, 82 270, 102 210 C 122 150, 92 90, 102 20" },
        { id: "s2", duration: 14, delay: 3, scale: 1.1, opacity: 0.16, d: "M 98 380 C 88 315, 108 245, 96 185 C 82 125, 108 65, 92 20" },
        { id: "s3", duration: 12, delay: 6, scale: 1.0, opacity: 0.18, d: "M 102 380 C 106 325, 94 265, 104 205 C 114 145, 86 85, 100 20" },
        { id: "s4", duration: 16, delay: 1.5, scale: 1.2, opacity: 0.12, d: "M 96 380 C 84 320, 114 250, 102 190 C 88 130, 106 70, 98 20" }
      ];

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
    >
      {/* Scope Style Definition for the smooth micro-animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes steamFloatRise {
          0% {
            transform: translateY(220px) scale(0.65);
            opacity: 0;
          }
          15% {
            opacity: var(--max-opacity, 0.18);
          }
          45% {
            opacity: calc(var(--max-opacity, 0.18) * 0.8);
          }
          100% {
            transform: translateY(-260px) scale(1.6);
            opacity: 0;
          }
        }

        @keyframes steamSwayDrift {
          0%, 100% {
            transform: translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateX(-12px) rotate(-1.8deg);
          }
          66% {
            transform: translateX(12px) rotate(1.8deg);
          }
        }

        /* Fallback if prefers-reduced-motion is selected */
        @media (prefers-reduced-motion: reduce) {
          .steam-animated-path {
            animation: none !important;
            opacity: 0.05 !important;
            transform: translateY(40px) scale(1) !important;
          }
          .steam-sway-container {
            animation: none !important;
          }
        }
      `}} />

      {/* Target area above the actual coffee cup in the source background picture */}
      {/* On desktop, the cup is localized on the right half. On mobile, it's centered in the bottom half. */}
      <div 
        style={steamTranslateStyle}
        className="absolute bottom-[20%] right-[12%] sm:right-[18%] md:right-[26%] lg:right-[22%] xl:right-[24%] w-48 sm:w-64 md:w-80 h-[360px] md:h-[480px] flex justify-center items-end"
      >
        <div className="relative w-full h-full">
          {/* Overlapping premium steam layers */}
          {!reducedMotion && steamLayers.map((layer, index) => {
            const swayDuration = layer.duration * 0.7;
            const swayDelay = layer.delay * 0.45;

            return (
              <div
                key={layer.id}
                className="steam-sway-container absolute inset-0"
                style={{
                  animation: `steamSwayDrift ${swayDuration}s ease-in-out infinite alternate`,
                  animationDelay: `${swayDelay}s`,
                }}
              >
                <svg
                  viewBox="0 0 200 400"
                  className="w-full h-full absolute bottom-[-40px]"
                  style={{
                    animation: `steamFloatRise ${layer.duration}s linear infinite`,
                    animationDelay: `${layer.delay}s`,
                    filter: `blur(${isMobile ? "12px" : "15px"})`,
                    "--max-opacity": layer.opacity,
                  } as React.CSSProperties}
                >
                  <path
                    d={layer.d}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.95)"
                    strokeWidth={isMobile ? "10" : "14"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
