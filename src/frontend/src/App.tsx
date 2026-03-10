import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Camera,
  CheckCircle,
  ChevronDown,
  Clock,
  Diamond,
  Film,
  Heart,
  Loader2,
  MapPin,
  Menu,
  Phone,
  Star,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

const queryClient = new QueryClient();

const WHATSAPP_URL = "https://wa.me/917419820519";
const PHONE_URL = "tel:+917419820519";
const PHONE_DISPLAY = "+91 7419820519";

function useScrollAnimation() {
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    for (const el of elements) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

function GoldDivider() {
  return (
    <span
      className="mx-3 inline-flex items-center"
      style={{ color: "oklch(0.76 0.12 80)" }}
    >
      <Diamond size={8} fill="currentColor" />
    </span>
  );
}

/** Reusable section label with expanding lines */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-5 mb-5">
      <div
        className="h-px animate-line-expand"
        style={{ width: "60px", backgroundColor: "oklch(0.76 0.12 80 / 0.7)" }}
      />
      <span
        className="text-xs tracking-[0.28em] uppercase"
        style={{ color: "oklch(0.76 0.12 80)", fontFamily: "General Sans" }}
      >
        {label}
      </span>
      <div
        className="h-px animate-line-expand"
        style={{ width: "60px", backgroundColor: "oklch(0.76 0.12 80 / 0.7)" }}
      />
    </div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    "Portfolio",
    "About",
    "Packages",
    "Testimonials",
    "Contact",
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(8,6,4,0.96)" : "rgba(8,6,4,0.4)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
        borderBottom: scrolled
          ? "1px solid oklch(0.76 0.12 80 / 0.18)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#top"
            className="font-display text-lg font-semibold tracking-wide"
            style={{ color: "oklch(0.76 0.12 80)" }}
          >
            Dheeraj Bundiwal
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                data-ocid="nav.link"
                className="relative text-xs tracking-[0.14em] uppercase text-white/60 hover:text-white transition-colors duration-200 group"
                style={{ fontFamily: "General Sans" }}
              >
                {link}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: "oklch(0.76 0.12 80)" }}
                />
              </a>
            ))}
            <a
              href="#contact"
              data-ocid="nav.primary_button"
              className="text-xs tracking-[0.12em] uppercase px-5 py-2.5 font-medium transition-all duration-300 hover:brightness-110"
              style={{
                color: "oklch(0.08 0 0)",
                backgroundColor: "oklch(0.76 0.12 80)",
                letterSpacing: "0.1em",
              }}
            >
              Book Now
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: "rgba(8,6,4,0.98)",
            borderColor: "oklch(0.76 0.12 80 / 0.15)",
          }}
        >
          <div className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                data-ocid="nav.link"
                onClick={() => setOpen(false)}
                className="text-sm tracking-widest uppercase text-white/60 hover:text-white py-2 transition-colors"
                style={{ letterSpacing: "0.12em", fontFamily: "General Sans" }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="top"
      className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden"
    >
      {/* Ken Burns background */}
      <div
        className="absolute inset-0 animate-ken-burns"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-wedding.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          transformOrigin: "center center",
        }}
      />

      {/* Cinematic multi-layer gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "linear-gradient(to bottom, rgba(4,3,2,0.72) 0%, rgba(4,3,2,0.18) 40%, rgba(4,3,2,0.28) 65%, rgba(4,3,2,0.88) 100%)",
          ].join(", "),
        }}
      />
      {/* Warm golden vignette from bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% 110%, oklch(0.62 0.12 72 / 0.18) 0%, transparent 70%)",
        }}
      />
      {/* Left atmospheric shadow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(4,3,2,0.45) 0%, transparent 50%)",
        }}
      />

      {/* Decorative corner ornaments */}
      <div
        className="absolute top-24 left-8 hidden lg:block"
        style={{ opacity: 0.35 }}
      >
        <div
          className="w-12 h-12 border-l border-t"
          style={{ borderColor: "oklch(0.76 0.12 80)" }}
        />
      </div>
      <div
        className="absolute top-24 right-8 hidden lg:block"
        style={{ opacity: 0.35 }}
      >
        <div
          className="w-12 h-12 border-r border-t"
          style={{ borderColor: "oklch(0.76 0.12 80)" }}
        />
      </div>
      <div
        className="absolute bottom-24 left-8 hidden lg:block"
        style={{ opacity: 0.35 }}
      >
        <div
          className="w-12 h-12 border-l border-b"
          style={{ borderColor: "oklch(0.76 0.12 80)" }}
        />
      </div>
      <div
        className="absolute bottom-24 right-8 hidden lg:block"
        style={{ opacity: 0.35 }}
      >
        <div
          className="w-12 h-12 border-r border-b"
          style={{ borderColor: "oklch(0.76 0.12 80)" }}
        />
      </div>

      {/* Thin horizontal gold accent lines */}
      <div
        className="absolute left-8 right-8 hidden lg:block"
        style={{
          top: "calc(50% - 180px)",
          height: "1px",
          background:
            "linear-gradient(to right, transparent 0%, oklch(0.76 0.12 80 / 0.25) 20%, oklch(0.76 0.12 80 / 0.25) 80%, transparent 100%)",
        }}
      />
      <div
        className="absolute left-8 right-8 hidden lg:block"
        style={{
          top: "calc(50% + 170px)",
          height: "1px",
          background:
            "linear-gradient(to right, transparent 0%, oklch(0.76 0.12 80 / 0.25) 20%, oklch(0.76 0.12 80 / 0.25) 80%, transparent 100%)",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Pre-headline label */}
        <p
          className="text-xs tracking-[0.38em] uppercase mb-8"
          style={{
            color: "oklch(0.76 0.12 80)",
            fontFamily: "General Sans",
            opacity: 0,
            animation:
              "fade-in-up 1s cubic-bezier(0.22,1,0.36,1) 0.3s forwards",
          }}
        >
          Premium Wedding Photography&nbsp;&nbsp;·&nbsp;&nbsp;Haryana
        </p>

        {/* Main headline — dramatic weight contrast */}
        <h1
          style={{
            opacity: 0,
            animation:
              "fade-in-up 1.1s cubic-bezier(0.22,1,0.36,1) 0.55s forwards",
            textShadow: "0 4px 40px rgba(0,0,0,0.6)",
          }}
        >
          <span
            className="block font-display font-semibold text-white leading-none tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.8rem, 7.5vw, 7rem)" }}
          >
            Capturing Love
          </span>
          <span
            className="block font-display font-light italic leading-none tracking-[-0.01em]"
            style={{
              fontSize: "clamp(2.8rem, 7.5vw, 7rem)",
              color: "oklch(0.90 0.10 88)",
            }}
          >
            Stories That Last
          </span>
          <span
            className="block font-display font-semibold text-white leading-none tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.8rem, 7.5vw, 7rem)" }}
          >
            Forever
          </span>
        </h1>

        {/* Thin gold ornamental line */}
        <div
          className="mx-auto my-8"
          style={{
            height: "1px",
            width: "80px",
            background:
              "linear-gradient(to right, transparent, oklch(0.76 0.12 80), transparent)",
            opacity: 0,
            animation: "fade-in 1s ease-out 1.1s forwards",
          }}
        />

        <p
          className="text-sm md:text-base tracking-[0.22em] uppercase mb-12 text-white/75"
          style={{
            fontFamily: "General Sans",
            opacity: 0,
            animation:
              "fade-in-up 1s cubic-bezier(0.22,1,0.36,1) 0.85s forwards",
          }}
        >
          Weddings · Pre-Wedding · Cinematic Films · Haryana &amp; Delhi NCR
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{
            opacity: 0,
            animation:
              "fade-in-up 1s cubic-bezier(0.22,1,0.36,1) 1.05s forwards",
          }}
        >
          <a
            href="#contact"
            data-ocid="hero.primary_button"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs tracking-[0.18em] uppercase font-semibold transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5"
            style={{
              backgroundColor: "oklch(0.76 0.12 80)",
              color: "oklch(0.08 0 0)",
              fontFamily: "General Sans",
            }}
          >
            Check Wedding Date Availability
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.secondary_button"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/12"
            style={{
              fontFamily: "General Sans",
              border: "1px solid rgba(255,255,255,0.55)",
              color: "white",
              backdropFilter: "blur(4px)",
              backgroundColor: "rgba(255,255,255,0.05)",
            }}
          >
            <SiWhatsapp size={16} className="text-green-400" />
            Book Consultation on WhatsApp
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: 0,
          animation: "fade-in 1.2s ease-out 1.6s forwards",
        }}
      >
        <span
          className="text-xs tracking-[0.22em] uppercase text-white/35"
          style={{ fontFamily: "General Sans" }}
        >
          Scroll
        </span>
        <ChevronDown
          size={18}
          className="text-white/35 animate-scroll-bounce"
        />
      </div>
    </section>
  );
}

function ServicesStrip() {
  const services = [
    "Wedding Photography",
    "Pre Wedding Shoot",
    "Candid Photography",
    "Cinematic Films",
    "Bridal Portraits",
    "Destination Weddings",
  ];
  return (
    <div
      className="py-5 border-y overflow-hidden"
      style={{
        backgroundColor: "oklch(0.08 0.003 60)",
        borderColor: "oklch(0.76 0.12 80 / 0.22)",
      }}
    >
      <div className="flex flex-wrap items-center justify-center gap-0 px-4">
        {services.map((service, i) => (
          <span key={service} className="flex items-center">
            <span
              className="text-xs tracking-[0.22em] uppercase px-4 py-1 text-white/55"
              style={{ fontFamily: "General Sans" }}
            >
              {service}
            </span>
            {i < services.length - 1 && <GoldDivider />}
          </span>
        ))}
      </div>
    </div>
  );
}

const portfolioImages = [
  {
    src: "/assets/generated/hero-wedding.dim_1920x1080.jpg",
    label: "Wedding",
    cat: "wedding",
    tall: false,
  },
  {
    src: "/assets/generated/pre-wedding.dim_800x1000.jpg",
    label: "Pre-Wedding",
    cat: "prewedding",
    tall: true,
  },
  {
    src: "/assets/generated/candid-wedding.dim_800x600.jpg",
    label: "Candid",
    cat: "candid",
    tall: false,
  },
  {
    src: "/assets/generated/bridal-portrait.dim_800x1000.jpg",
    label: "Bridal Portrait",
    cat: "wedding",
    tall: true,
  },
  {
    src: "/assets/generated/destination-wedding.dim_800x600.jpg",
    label: "Destination",
    cat: "wedding",
    tall: false,
  },
  {
    src: "/assets/generated/pre-wedding.dim_800x1000.jpg",
    label: "Pre-Wedding",
    cat: "prewedding",
    tall: true,
  },
  {
    src: "/assets/generated/candid-wedding.dim_800x600.jpg",
    label: "Candid",
    cat: "candid",
    tall: false,
  },
  {
    src: "/assets/generated/hero-wedding.dim_1920x1080.jpg",
    label: "Wedding",
    cat: "wedding",
    tall: false,
  },
  {
    src: "/assets/generated/bridal-portrait.dim_800x1000.jpg",
    label: "Bridal",
    cat: "wedding",
    tall: true,
  },
];

function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = portfolioImages.filter(
    (img) => activeTab === "all" || img.cat === activeTab,
  );

  return (
    <section
      id="portfolio"
      className="py-28 px-4"
      style={{ backgroundColor: "oklch(0.10 0.002 60)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <SectionLabel label="Portfolio" />
          <h2
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            A Glimpse of{" "}
            <span className="italic" style={{ color: "oklch(0.88 0.10 85)" }}>
              Our Stories
            </span>
          </h2>
        </div>

        <div className="flex justify-center mb-10 animate-on-scroll">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList
              className="border gap-1 p-1 bg-transparent"
              style={{ borderColor: "oklch(0.76 0.12 80 / 0.28)" }}
            >
              {[
                { v: "all", l: "All" },
                { v: "wedding", l: "Wedding" },
                { v: "prewedding", l: "Pre-Wedding" },
                { v: "candid", l: "Candid" },
              ].map(({ v, l }) => (
                <TabsTrigger
                  key={v}
                  value={v}
                  data-ocid="portfolio.tab"
                  className="text-xs tracking-widest uppercase px-4 py-2 transition-all"
                  style={{
                    fontFamily: "General Sans",
                    color:
                      activeTab === v ? "oklch(0.10 0 0)" : "oklch(0.60 0 0)",
                    backgroundColor:
                      activeTab === v ? "oklch(0.76 0.12 80)" : "transparent",
                  }}
                >
                  {l}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          {filtered.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              data-ocid={`portfolio.item.${i + 1}`}
              className="group relative overflow-hidden break-inside-avoid cursor-pointer"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-106"
                style={{ display: "block" }}
              />
              {/* Gold shimmer line on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: "oklch(0.76 0.12 80)" }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5"
                style={{
                  background:
                    "linear-gradient(to top, rgba(4,3,2,0.85) 0%, rgba(201,168,76,0.08) 100%)",
                }}
              >
                <span
                  className="text-xs tracking-[0.22em] uppercase text-white/90"
                  style={{ fontFamily: "General Sans" }}
                >
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const stats = [
    { label: "Weddings Captured", value: "500+" },
    { label: "Years Experience", value: "12+" },
    { label: "Service Area", value: "Haryana & NCR" },
    { label: "Style", value: "Cinematic" },
  ];

  return (
    <section
      id="about"
      className="py-28 px-4"
      style={{ backgroundColor: "oklch(0.08 0.003 60)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="animate-on-scroll relative">
            <img
              src="/assets/generated/photographer-portrait.dim_600x700.jpg"
              alt="Dheeraj Bundiwal - Wedding Photographer"
              className="w-full object-cover"
              style={{ maxHeight: "600px" }}
            />
            {/* Gold offset frame */}
            <div
              className="absolute -bottom-5 -right-5 w-2/3 h-2/3 border pointer-events-none"
              style={{ borderColor: "oklch(0.76 0.12 80 / 0.45)" }}
            />
            {/* Small gold accent top-left */}
            <div
              className="absolute -top-5 -left-5 w-10 h-10 border-l-2 border-t-2 pointer-events-none"
              style={{ borderColor: "oklch(0.76 0.12 80)" }}
            />
          </div>

          <div className="animate-on-scroll animate-on-scroll-delay-2">
            <div
              className="h-0.5 w-14 mb-6"
              style={{ backgroundColor: "oklch(0.76 0.12 80)" }}
            />
            <p
              className="text-xs tracking-[0.28em] uppercase mb-3"
              style={{
                color: "oklch(0.76 0.12 80)",
                fontFamily: "General Sans",
              }}
            >
              About the Photographer
            </p>
            <h2
              className="font-display font-light text-white mb-6"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)" }}
            >
              Meet{" "}
              <span className="italic" style={{ color: "oklch(0.90 0.10 88)" }}>
                Dheeraj Bundiwal
              </span>
            </h2>
            <p
              className="text-white/72 leading-[1.9] mb-8 text-base"
              style={{ fontFamily: "General Sans" }}
            >
              With over a decade of experience capturing the most intimate
              wedding moments across Haryana and Delhi NCR, Dheeraj Bundiwal has
              become synonymous with luxury wedding photography. Based in
              Dhirana, Bhiwani, his cinematic approach transforms fleeting
              emotions into timeless visual stories. Every frame is crafted with
              the precision of an artist and the sensitivity of someone who
              truly understands love.
            </p>

            {/* Stats — elevated design */}
            <div
              className="grid grid-cols-2 gap-px border"
              style={{ borderColor: "oklch(0.76 0.12 80 / 0.2)" }}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="px-5 py-4"
                  style={{
                    backgroundColor:
                      i % 2 === 0
                        ? "oklch(0.12 0.005 60)"
                        : "oklch(0.11 0.003 60)",
                    borderRight:
                      i % 2 === 0
                        ? "1px solid oklch(0.76 0.12 80 / 0.15)"
                        : "none",
                    borderBottom:
                      i < 2 ? "1px solid oklch(0.76 0.12 80 / 0.15)" : "none",
                  }}
                >
                  <p
                    className="font-display font-semibold text-2xl mb-0.5"
                    style={{ color: "oklch(0.76 0.12 80)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs tracking-[0.12em] uppercase text-white/45"
                    style={{ fontFamily: "General Sans" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PackagesSection() {
  const packages = [
    {
      name: "Silver",
      badge: "Perfect Start",
      highlight: false,
      features: [
        "1-Day Wedding Coverage",
        "2 Professional Photographers",
        "500+ Edited Photos",
        "Online Gallery Access",
        "USB Delivery",
        "Basic Wedding Album",
      ],
    },
    {
      name: "Gold",
      badge: "Most Chosen",
      highlight: true,
      features: [
        "2-Day Coverage (Mehendi + Wedding)",
        "3 Professional Photographers",
        "800+ Edited Photos",
        "Cinematic Highlight Video (3–5 min)",
        "Premium Wedding Album",
        "Online Gallery & Same-Day Preview",
      ],
    },
    {
      name: "Luxury",
      badge: "Ultimate Experience",
      highlight: false,
      features: [
        "3-Day Coverage (Mehendi + Sangeet + Wedding)",
        "4 Professional Photographers",
        "1200+ Edited Photos",
        "Full Wedding Film (15+ min)",
        "Pre-Wedding Shoot Included",
        "Premium Album + Drone Shots + Luxury Box",
      ],
    },
  ];

  return (
    <section
      id="packages"
      className="py-28 px-4"
      style={{
        backgroundColor: "oklch(0.10 0.002 60)",
        backgroundImage:
          "radial-gradient(ellipse 60% 45% at 50% 100%, oklch(0.62 0.12 72 / 0.07) 0%, transparent 70%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <SectionLabel label="Packages" />
          <h2
            className="font-display font-light text-white mb-3"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Our Wedding{" "}
            <span className="italic" style={{ color: "oklch(0.88 0.10 85)" }}>
              Packages
            </span>
          </h2>
          <p
            className="text-white/55 mt-3"
            style={{ fontFamily: "General Sans" }}
          >
            Every love story deserves to be told beautifully
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-0">
          {packages.map((pkg, i) => (
            <div
              key={pkg.name}
              data-ocid={`packages.item.${i + 1}`}
              className="relative flex flex-col hover-lift animate-on-scroll"
              style={{
                animationDelay: `${i * 0.12}s`,
                border: pkg.highlight
                  ? "1px solid oklch(0.76 0.12 80)"
                  : "1px solid oklch(0.22 0.005 60)",
                backgroundColor: pkg.highlight
                  ? "oklch(0.135 0.012 68)"
                  : "oklch(0.12 0.005 60)",
                marginTop: pkg.highlight ? "-12px" : "0",
                marginBottom: pkg.highlight ? "-12px" : "0",
                zIndex: pkg.highlight ? 10 : 1,
                ...(pkg.highlight
                  ? {
                      boxShadow: [
                        "0 0 0 1px oklch(0.76 0.12 80 / 0.7)",
                        "0 0 50px oklch(0.76 0.12 80 / 0.10)",
                        "0 0 100px oklch(0.76 0.12 80 / 0.05)",
                        "inset 0 1px 0 oklch(0.90 0.10 88 / 0.12)",
                      ].join(", "),
                    }
                  : {}),
              }}
            >
              {/* Top accent for highlight */}
              {pkg.highlight && (
                <div
                  className="h-0.5 w-full"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, oklch(0.76 0.12 80), transparent)",
                  }}
                />
              )}

              {/* Badge */}
              {pkg.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1"
                  style={{
                    backgroundColor: pkg.highlight
                      ? "oklch(0.76 0.12 80)"
                      : "oklch(0.18 0.005 60)",
                    color: pkg.highlight
                      ? "oklch(0.08 0 0)"
                      : "oklch(0.76 0.12 80)",
                    border: pkg.highlight
                      ? "none"
                      : "1px solid oklch(0.76 0.12 80 / 0.4)",
                  }}
                >
                  <span
                    className="text-xs tracking-widest uppercase font-semibold"
                    style={{ fontFamily: "General Sans" }}
                  >
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="p-8 lg:p-10 flex flex-col flex-1">
                <h3
                  className="font-display font-light text-3xl mb-0.5"
                  style={{
                    color: pkg.highlight ? "oklch(0.82 0.12 82)" : "white",
                  }}
                >
                  {pkg.name}
                </h3>
                <p
                  className="text-xs tracking-[0.2em] uppercase mb-8 text-white/35"
                  style={{ fontFamily: "General Sans" }}
                >
                  Package
                </p>

                <ul className="space-y-3.5 flex-1 mb-10">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle
                        size={14}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: "oklch(0.76 0.12 80)" }}
                      />
                      <span
                        className="text-sm text-white/70 leading-snug"
                        style={{ fontFamily: "General Sans" }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="block text-center py-3.5 text-xs tracking-[0.18em] uppercase font-semibold transition-all duration-300 hover:brightness-110"
                  style={{
                    fontFamily: "General Sans",
                    backgroundColor: pkg.highlight
                      ? "oklch(0.76 0.12 80)"
                      : "transparent",
                    color: pkg.highlight
                      ? "oklch(0.08 0 0)"
                      : "oklch(0.76 0.12 80)",
                    border: pkg.highlight
                      ? "none"
                      : "1px solid oklch(0.76 0.12 80 / 0.5)",
                  }}
                >
                  Enquire Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      text: "Dheeraj captured our wedding with such emotion and creativity. Every photo tells our story perfectly. Highly recommend!",
      couple: "Priya & Rahul",
      location: "Bhiwani",
      initials: "PR",
    },
    {
      text: "Our pre-wedding shoot was magical. Dheeraj made us feel so comfortable and the photos are beyond stunning!",
      couple: "Neha & Amit",
      location: "Rohtak",
      initials: "NA",
    },
    {
      text: "The cinematic wedding film he created for us is something we will cherish forever. Pure artistry at its finest.",
      couple: "Kavita & Vikram",
      location: "Delhi NCR",
      initials: "KV",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-28 px-4 relative overflow-hidden"
      style={{
        backgroundColor: "oklch(0.08 0.003 60)",
        backgroundImage:
          "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.62 0.12 72 / 0.05) 0%, transparent 70%)",
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-on-scroll">
          <SectionLabel label="Testimonials" />
          <h2
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Love Stories{" "}
            <span className="italic" style={{ color: "oklch(0.88 0.10 85)" }}>
              We&apos;ve Captured
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.couple}
              data-ocid={`testimonials.item.${i + 1}`}
              className="relative p-8 pt-10 animate-on-scroll hover-lift"
              style={{
                animationDelay: `${i * 0.15}s`,
                backgroundColor: "oklch(0.12 0.005 60)",
                border: "1px solid oklch(0.22 0.005 60)",
              }}
            >
              {/* Large decorative quotation mark */}
              <div
                className="absolute top-5 left-7 font-display font-bold leading-none select-none pointer-events-none"
                style={{
                  fontSize: "6rem",
                  color: "oklch(0.76 0.12 80 / 0.12)",
                  lineHeight: 1,
                }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5 relative z-10">
                {["s1", "s2", "s3", "s4", "s5"].map((sk) => (
                  <Star
                    key={sk}
                    size={13}
                    fill="currentColor"
                    style={{ color: "oklch(0.76 0.12 80)" }}
                  />
                ))}
              </div>

              <p className="text-white/75 leading-relaxed mb-8 font-serif2 italic text-base relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 relative z-10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-display font-semibold text-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.12 72) 0%, oklch(0.82 0.12 82) 100%)",
                    color: "oklch(0.08 0 0)",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    className="text-white text-sm font-medium"
                    style={{ fontFamily: "General Sans" }}
                  >
                    {t.couple}
                  </p>
                  <p
                    className="text-xs text-white/40"
                    style={{ fontFamily: "General Sans" }}
                  >
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  const features = [
    {
      icon: Camera,
      title: "Professional Equipment",
      desc: "Latest Sony & Canon mirrorless cameras with premium prime lenses for tack-sharp imagery.",
    },
    {
      icon: Film,
      title: "Cinematic Editing",
      desc: "Hollywood-inspired color grading and storytelling edits that elevate every moment.",
    },
    {
      icon: Heart,
      title: "Wedding Specialists",
      desc: "12+ years exclusively in wedding photography — we understand every ritual and emotion.",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      desc: "Preview gallery within 7 days. Full high-resolution gallery delivered within 30 days.",
    },
  ];

  return (
    <section
      className="py-28 px-4"
      style={{ backgroundColor: "oklch(0.10 0.002 60)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <SectionLabel label="Our Promise" />
          <h2
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Why Couples{" "}
            <span className="italic" style={{ color: "oklch(0.88 0.10 85)" }}>
              Choose Us
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="text-center animate-on-scroll group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="w-14 h-14 mx-auto mb-5 flex items-center justify-center border transition-all duration-300 group-hover:border-opacity-100"
                style={{
                  borderColor: "oklch(0.76 0.12 80 / 0.4)",
                  backgroundColor: "oklch(0.76 0.12 80 / 0.05)",
                }}
              >
                <f.icon size={22} style={{ color: "oklch(0.76 0.12 80)" }} />
              </div>
              <h3 className="font-display font-medium text-xl text-white mb-3">
                {f.title}
              </h3>
              <p
                className="text-sm text-white/58 leading-relaxed"
                style={{ fontFamily: "General Sans" }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { actor } = useActor();
  const [formData, setFormData] = useState({
    coupleNames: "",
    weddingDate: "",
    phoneNumber: "",
    serviceType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const dateMs = new Date(formData.weddingDate).getTime();
      const dateNs = BigInt(dateMs) * 1_000_000n;
      await actor.submitInquiry(
        formData.coupleNames,
        dateNs,
        formData.phoneNumber,
        formData.serviceType as any,
        formData.message,
      );
    },
    onSuccess: () => {
      setSubmitted(true);
      toast.success(
        "Inquiry submitted! We'll confirm availability within 24 hours.",
      );
    },
    onError: () => {
      toast.error("Something went wrong. Please WhatsApp us directly.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <section
      id="contact"
      className="py-28 px-4"
      style={{ backgroundColor: "oklch(0.08 0.003 60)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14 animate-on-scroll">
          <SectionLabel label="Get in Touch" />
          <h2
            className="font-display font-light text-white mb-3"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Check Your Wedding Date{" "}
            <span className="italic" style={{ color: "oklch(0.88 0.10 85)" }}>
              Availability
            </span>
          </h2>
          <p className="text-white/55" style={{ fontFamily: "General Sans" }}>
            Fill in your details and we&apos;ll confirm availability within 24
            hours
          </p>
        </div>

        {submitted ? (
          <div
            data-ocid="contact.success_state"
            className="text-center py-16 animate-on-scroll"
            style={{
              border: "1px solid oklch(0.76 0.12 80 / 0.45)",
              backgroundColor: "oklch(0.12 0.005 60)",
            }}
          >
            <CheckCircle
              size={40}
              className="mx-auto mb-4"
              style={{ color: "oklch(0.76 0.12 80)" }}
            />
            <h3 className="font-display text-2xl font-light text-white mb-3">
              Thank You!
            </h3>
            <p className="text-white/60" style={{ fontFamily: "General Sans" }}>
              Your inquiry has been received. We&apos;ll reach out within 24
              hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 animate-on-scroll"
            style={{
              padding: "2.5rem",
              border: "1px solid oklch(0.22 0.005 60)",
              backgroundColor: "oklch(0.11 0.005 60)",
            }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label
                  className="text-xs tracking-[0.15em] uppercase text-white/50"
                  style={{ fontFamily: "General Sans" }}
                >
                  Couple Names
                </Label>
                <Input
                  data-ocid="contact.input"
                  value={formData.coupleNames}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, coupleNames: e.target.value }))
                  }
                  placeholder="e.g. Priya & Rahul"
                  required
                  className="bg-transparent border text-white placeholder:text-white/20 focus-visible:ring-0 rounded-none h-11"
                  style={{
                    borderColor: "oklch(0.28 0.005 60)",
                    outlineColor: "oklch(0.76 0.12 80)",
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label
                  className="text-xs tracking-[0.15em] uppercase text-white/50"
                  style={{ fontFamily: "General Sans" }}
                >
                  Wedding Date
                </Label>
                <Input
                  type="date"
                  value={formData.weddingDate}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, weddingDate: e.target.value }))
                  }
                  required
                  className="bg-transparent border text-white placeholder:text-white/20 rounded-none h-11"
                  style={{ borderColor: "oklch(0.28 0.005 60)" }}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label
                  className="text-xs tracking-[0.15em] uppercase text-white/50"
                  style={{ fontFamily: "General Sans" }}
                >
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, phoneNumber: e.target.value }))
                  }
                  placeholder="+91 XXXXX XXXXX"
                  required
                  className="bg-transparent border text-white placeholder:text-white/20 rounded-none h-11"
                  style={{ borderColor: "oklch(0.28 0.005 60)" }}
                />
              </div>
              <div className="space-y-2">
                <Label
                  className="text-xs tracking-[0.15em] uppercase text-white/50"
                  style={{ fontFamily: "General Sans" }}
                >
                  Service Type
                </Label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, serviceType: v }))
                  }
                  required
                >
                  <SelectTrigger
                    className="bg-transparent border text-white rounded-none h-11"
                    style={{ borderColor: "oklch(0.28 0.005 60)" }}
                  >
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: "oklch(0.14 0.005 60)",
                      borderColor: "oklch(0.28 0.005 60)",
                    }}
                  >
                    <SelectItem value="weddingPhotography">
                      Wedding Photography
                    </SelectItem>
                    <SelectItem value="preWeddingShoot">
                      Pre Wedding Shoot
                    </SelectItem>
                    <SelectItem value="candidPhotography">
                      Candid Photography
                    </SelectItem>
                    <SelectItem value="cinematicFilm">
                      Cinematic Film
                    </SelectItem>
                    <SelectItem value="bridalPortrait">
                      Bridal Portrait
                    </SelectItem>
                    <SelectItem value="destinationWedding">
                      Destination Wedding
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                className="text-xs tracking-[0.15em] uppercase text-white/50"
                style={{ fontFamily: "General Sans" }}
              >
                Special Requirements
              </Label>
              <Textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="Tell us about your wedding vision, venue, or any special requests..."
                rows={4}
                className="bg-transparent border text-white placeholder:text-white/20 rounded-none resize-none"
                style={{ borderColor: "oklch(0.28 0.005 60)" }}
              />
            </div>

            <button
              type="submit"
              data-ocid="contact.submit_button"
              disabled={mutation.isPending}
              className="w-full py-4 text-xs tracking-[0.18em] uppercase font-semibold transition-all duration-300 hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{
                fontFamily: "General Sans",
                backgroundColor: "oklch(0.76 0.12 80)",
                color: "oklch(0.08 0 0)",
              }}
            >
              {mutation.isPending && (
                <Loader2 size={16} className="animate-spin" />
              )}
              {mutation.isPending
                ? "Submitting..."
                : "Check Availability & Book Now"}
            </button>
          </form>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-on-scroll">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.primary_button"
            className="flex-1 flex items-center justify-center gap-2 py-4 text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-300 hover:brightness-110"
            style={{
              fontFamily: "General Sans",
              backgroundColor: "#25D366",
              color: "white",
            }}
          >
            <SiWhatsapp size={18} />
            Chat on WhatsApp
          </a>
          <a
            href={PHONE_URL}
            data-ocid="contact.secondary_button"
            className="flex-1 flex items-center justify-center gap-2 py-4 text-xs tracking-[0.14em] uppercase font-semibold border transition-all duration-300 hover:bg-white/5"
            style={{
              fontFamily: "General Sans",
              borderColor: "oklch(0.76 0.12 80 / 0.6)",
              color: "oklch(0.76 0.12 80)",
            }}
          >
            <Phone size={16} />
            Call Now: {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-16 px-4"
      style={{
        backgroundColor: "oklch(0.06 0.003 60)",
        borderTop: "1px solid oklch(0.76 0.12 80 / 0.12)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3
              className="font-display text-xl font-semibold mb-2"
              style={{ color: "oklch(0.76 0.12 80)" }}
            >
              Dheeraj Bundiwal
            </h3>
            <p className="font-display text-sm font-light text-white/35 italic mb-5">
              Capturing Love Stories That Last Forever
            </p>
            <div className="flex gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border transition-colors hover:border-green-400"
                style={{ borderColor: "oklch(0.28 0 0)" }}
              >
                <SiWhatsapp size={16} className="text-green-400" />
              </a>
              <a
                href={PHONE_URL}
                className="w-9 h-9 flex items-center justify-center border transition-colors"
                style={{
                  borderColor: "oklch(0.28 0 0)",
                  color: "oklch(0.76 0.12 80)",
                }}
              >
                <Phone size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase text-white/45 mb-4"
              style={{ fontFamily: "General Sans" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                "Portfolio",
                "About",
                "Packages",
                "Testimonials",
                "Contact",
              ].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-sm text-white/40 hover:text-white transition-colors"
                    style={{ fontFamily: "General Sans" }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase text-white/45 mb-4"
              style={{ fontFamily: "General Sans" }}
            >
              Services
            </h4>
            <ul className="space-y-2">
              {[
                "Wedding Photography",
                "Pre Wedding Shoot",
                "Candid Photography",
                "Cinematic Films",
                "Bridal Portraits",
                "Destination Weddings",
              ].map((s) => (
                <li key={s}>
                  <span
                    className="text-sm text-white/38"
                    style={{ fontFamily: "General Sans" }}
                  >
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase text-white/45 mb-4"
              style={{ fontFamily: "General Sans" }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin
                  size={14}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "oklch(0.76 0.12 80)" }}
                />
                <span
                  className="text-sm text-white/40"
                  style={{ fontFamily: "General Sans" }}
                >
                  Dhirana, Bhiwani, Haryana, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} style={{ color: "oklch(0.76 0.12 80)" }} />
                <a
                  href={PHONE_URL}
                  className="text-sm text-white/40 hover:text-white transition-colors"
                  style={{ fontFamily: "General Sans" }}
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
            <div
              className="mt-4 text-xs text-white/20"
              style={{ fontFamily: "General Sans" }}
            >
              Service Area: Bhiwani, Rohtak, Hisar, Delhi NCR
            </div>
          </div>
        </div>

        <div
          className="pt-8 border-t"
          style={{ borderColor: "oklch(0.76 0.12 80 / 0.08)" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-xs text-white/28"
              style={{ fontFamily: "General Sans" }}
            >
              &copy; {year} Dheeraj Bundiwal Wedding Photography. All rights
              reserved.
            </p>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/20 hover:text-white/40 transition-colors"
              style={{ fontFamily: "General Sans" }}
            >
              Built with ♥ using caffeine.ai
            </a>
          </div>
          <p
            className="text-xs text-white/12 mt-4 text-center"
            style={{ fontFamily: "General Sans" }}
          >
            Wedding Photographer Bhiwani | Best Wedding Photographer Haryana |
            Pre Wedding Shoot Haryana | Candid Wedding Photography Haryana
          </p>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.primary_button"
      className="fixed bottom-8 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Chat on WhatsApp"
    >
      <span
        className="absolute inset-0 rounded-full animate-pulse-slow"
        style={{ backgroundColor: "rgba(37,211,102,0.32)" }}
      />
      <SiWhatsapp size={26} color="white" className="relative z-10" />
    </a>
  );
}

function MobileBottomBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden"
      style={{
        backgroundColor: "oklch(0.08 0 0)",
        borderTop: "1px solid oklch(0.76 0.12 80 / 0.2)",
      }}
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-4 text-xs tracking-widest uppercase font-medium"
        style={{
          backgroundColor: "#25D366",
          color: "white",
          fontFamily: "General Sans",
        }}
      >
        <SiWhatsapp size={16} />
        WhatsApp Us
      </a>
      <a
        href={PHONE_URL}
        className="flex-1 flex items-center justify-center gap-2 py-4 text-xs tracking-widest uppercase font-medium"
        style={{
          backgroundColor: "oklch(0.76 0.12 80)",
          color: "oklch(0.08 0 0)",
          fontFamily: "General Sans",
        }}
      >
        <Phone size={15} />
        Call Now
      </a>
    </div>
  );
}

function SEOHead() {
  useEffect(() => {
    document.title =
      "Dheeraj Bundiwal Wedding Photography | Best Wedding Photographer Haryana";
    const setMeta = (name: string, content: string, prop = false) => {
      let el = document.querySelector(
        `meta[${prop ? "property" : "name"}="${name}"]`,
      ) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(prop ? "property" : "name", name);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta(
      "description",
      "Dheeraj Bundiwal — Premium Wedding Photographer in Bhiwani, Haryana. Wedding Photography, Pre Wedding Shoot, Candid Photography, Cinematic Films. Serving Bhiwani, Rohtak, Hisar, Delhi NCR.",
    );
    setMeta(
      "keywords",
      "Wedding Photographer Bhiwani, Best Wedding Photographer Haryana, Pre Wedding Shoot Haryana, Candid Wedding Photography Haryana, Wedding Photography Rohtak, Wedding Photographer Hisar, Delhi NCR Wedding Photographer",
    );
    setMeta(
      "og:title",
      "Dheeraj Bundiwal Wedding Photography | Best Wedding Photographer Haryana",
      true,
    );
    setMeta(
      "og:description",
      "Premium wedding photography capturing your love story forever. Based in Bhiwani, Haryana, serving Delhi NCR.",
      true,
    );
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");

    let script = document.getElementById("jsonld-schema") as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = "jsonld-schema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Dheeraj Bundiwal Wedding Photography",
      image: "/assets/generated/hero-wedding.dim_1920x1080.jpg",
      telephone: "+91 7419820519",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Dhirana",
        addressLocality: "Bhiwani",
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
      areaServed: ["Bhiwani", "Rohtak", "Hisar", "Delhi NCR"],
      serviceType: "Wedding Photography",
    });
  }, []);
  return null;
}

function App() {
  useScrollAnimation();

  return (
    <QueryClientProvider client={queryClient}>
      <SEOHead />
      <div
        className="min-h-screen grain-texture"
        style={{ backgroundColor: "oklch(0.10 0.002 60)" }}
      >
        <Navigation />
        <main>
          <HeroSection />
          <ServicesStrip />
          <PortfolioSection />
          <AboutSection />
          <PackagesSection />
          <TestimonialsSection />
          <WhyChooseSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <MobileBottomBar />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
