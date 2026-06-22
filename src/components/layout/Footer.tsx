// "use client";

// import React, { useState } from "react";
// import { ArrowUpRight, Phone, Mail } from "lucide-react";
// import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

// import LOGO_TEXT from "../../assets/logo_main.png";

// const quickLinks = [
//   { label: "Homepage",            href: "/"         },
//   { label: "About Us",           href: "/about"     },
//   { label: "Properties",         href: "/properties"},
//   { label: "Projects",           href: "/projects"  },
//   { label: "Invest with Vivar",  href: "/invest"    },
//   { label: "Insights",           href: "/insights"  },
//   { label: "Book a Consultation",href: "/contact"   },
// ];

// const locations = [
//   { label: "Ikoyi",               href: "/properties?loc=ikoyi"    },
//   { label: "Lekki",               href: "/properties?loc=lekki"    },
//   { label: "Victoria Island",     href: "/properties?loc=vi"       },
//   { label: "Abuja",               href: "/properties?loc=abuja"    },
//   { label: "Port Harcourt",       href: "/properties?loc=ph"       },
//   { label: "Diaspora Properties", href: "/properties?loc=diaspora" },
// ];

// const socials = [
//   { icon: FaInstagram, label: "Instagram", href: "https://instagram.com/vivar_realty" },
//   { icon: FaFacebook,  label: "Facebook",  href: "#" },
//   { icon: FaYoutube,   label: "YouTube",   href: "#" },
//   { icon: FaTiktok,    label: "TikTok",    href: "#" },
// ];

// export default function Footer() {
//   const [email, setEmail]         = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email) return;
//     setSubmitted(true);
//     setEmail("");
//   };

//   return (
//     <footer className="relative bg-white text-black overflow-hidden pt-20 md:pt-28 pb-6 border-t border-black/10">
//       <div className="relative z-10 max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 w-full">

//         {/* ── UPPER GRID ── */}
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-8 pb-16 items-start">

//           {/* Links */}
//           <div className="md:col-span-3 border-l border-black/10 pl-4 md:pl-5">
//             <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 mb-6 font-sans">
//               Links
//             </h4>
//             <ul className="flex flex-col gap-3.5">
//               {quickLinks.map((link) => (
//                 <li key={link.label}>
//                   <a href={link.href} className="text-[15px] text-black/80 hover:text-black font-serif font-light transition-all duration-200 block tracking-wide">
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Locations */}
//           <div className="md:col-span-3 border-l border-black/10 pl-4 md:pl-5">
//             <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 mb-6 font-sans">
//               Solutions
//             </h4>
//             <ul className="flex flex-col gap-3.5">
//               {locations.map((loc) => (
//                 <li key={loc.label}>
//                   <a href={loc.href} className="text-[15px] text-black/80 hover:text-black font-serif font-light transition-all duration-200 block tracking-wide">
//                     {loc.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact + Newsletter */}
//           <div className="md:col-span-3 border-l border-black/10 pl-4 md:pl-5">
//             <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 mb-6 font-sans">
//               Direct Contact
//             </h4>
//             <div className="flex flex-col gap-4">
//               <a href="tel:+2349062036699" className="flex items-center gap-3 text-black/80 hover:text-black transition-colors group">
//                 <Phone size={13} className="text-black/40 group-hover:text-black transition-colors shrink-0" />
//                 <span className="font-sans text-sm tracking-wide">+234 906 203 6699</span>
//               </a>
//               <a href="mailto:info@vivar.com.ng" className="flex items-center gap-3 text-black/80 hover:text-black transition-colors group">
//                 <Mail size={13} className="text-black/40 group-hover:text-black transition-colors shrink-0" />
//                 <span className="font-sans text-sm tracking-wide">info@vivar.com.ng</span>
//               </a>
//             </div>

//             <div className="mt-8 max-w-xs">
//               <form onSubmit={handleSubmit} className="flex items-center gap-2 border-b border-black/15 py-1.5 focus-within:border-black transition-colors">
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Subscribe to updates"
//                   className="w-full bg-transparent text-xs text-black placeholder:text-black/30 outline-none font-sans"
//                 />
//                 <button type="submit" aria-label="Subscribe" className="text-black/50 hover:text-black transition-colors">
//                   <ArrowUpRight size={14} />
//                 </button>
//               </form>
//               {submitted && (
//                 <p className="text-[10px] text-black mt-2 font-sans font-medium">Registered successfully.</p>
//               )}
//             </div>
//           </div>

//           {/* Say Hello */}
//           <div className="md:col-span-3 flex flex-col justify-between min-h-[180px] md:text-right md:items-end">
//             <div className="w-full">
//               <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 mb-4 font-sans">
//                 Say Hello
//               </h4>
//               <a
//                 href="mailto:info@vivar.com.ng"
//                 className="text-xl sm:text-2xl lg:text-[26px] font-serif font-light text-black tracking-wide border-b border-black/60 pb-1 hover:border-black transition-colors inline-block break-all"
//               >
//                 info@vivar.com.ng
//               </a>
//             </div>

//             <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-8 md:mt-0 text-[10px] tracking-wider text-black/40 uppercase font-sans md:justify-end">
//               <a href="/privacy" className="hover:text-black transition-colors">Privacy Policy</a>
//               <span className="text-black/10">•</span>
//               <a href="/terms" className="hover:text-black transition-colors">Terms &amp; Conditions</a>
//               <span className="text-black/10">•</span>
//               <span className="tabular-nums">© 2026</span>
//             </div>

//             <div className="flex items-center gap-3.5 mt-6 md:justify-end">
//               {socials.map(({ icon: Icon, label, href }) => (
//                 <a key={label} href={href} aria-label={label} className="text-black/40 hover:text-black transition-colors duration-300">
//                   <Icon size={15} />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── LOWER BRAND CANVAS ── */}
//         <div className="border-t border-black/10 pt-10 mt-6 select-none">
//           <img
//             src={LOGO_TEXT}
//             alt="Vivar Realty"
//             className="w-full h-auto object-contain object-left max-h-[140px] md:max-h-[180px] lg:max-h-[220px]"
//           />
//         </div>

//         {/* Bottom micro line */}
//         <div className="mt-6 text-[9px] tracking-widest text-black/20 uppercase font-sans">
//           Vivar Realty Limited · RC 771396
//         </div>

//       </div>
//     </footer>
//   );
// }

"use client";

import React, { useState } from "react";
import { ArrowUpRight, Phone, Mail, ArrowUp } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

import LOGO_TEXT from "../../assets/logo_main.png";

const quickLinks = [
  { label: "Homepage",           href: "/"         },
  { label: "About Us",           href: "/about"     },
  { label: "Properties",         href: "/properties"},
  { label: "Projects",           href: "/projects"  },
  { label: "Invest with Vivar",  href: "/invest"    },
  { label: "Insights",           href: "/insights"  },
  { label: "Book a Consultation",href: "/contact"   },
];

const locations = [
  { label: "Ikoyi",               href: "/properties?loc=ikoyi"    },
  { label: "Lekki",               href: "/properties?loc=lekki"    },
  { label: "Victoria Island",     href: "/properties?loc=vi"       },
  { label: "Abuja",               href: "/properties?loc=abuja"    },
  { label: "Port Harcourt",       href: "/properties?loc=ph"       },
  { label: "Diaspora Properties", href: "/properties?loc=diaspora" },
];

const socials = [
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com/vivar_realty" },
  { icon: FaFacebook,  label: "Facebook",  href: "#" },
  { icon: FaYoutube,   label: "YouTube",   href: "#" },
  { icon: FaTiktok,    label: "TikTok",    href: "#" },
];

export default function Footer() {
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-white text-black overflow-hidden pt-20 md:pt-28 pb-6 border-t border-black/10">
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 w-full">

        {/* ── UPPER GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-8 pb-16 items-start">

          {/* Links */}
          <div className="md:col-span-3 border-l border-black/10 pl-4 md:pl-5">
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 mb-6 font-sans">
              Links
            </h4>
            <ul className="flex flex-col gap-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[15px] text-black/80 hover:text-black font-serif font-light transition-all duration-200 block tracking-wide">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="md:col-span-3 border-l border-black/10 pl-4 md:pl-5">
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 mb-6 font-sans">
              Solutions
            </h4>
            <ul className="flex flex-col gap-3.5">
              {locations.map((loc) => (
                <li key={loc.label}>
                  <a href={loc.href} className="text-[15px] text-black/80 hover:text-black font-serif font-light transition-all duration-200 block tracking-wide">
                    {loc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="md:col-span-3 border-l border-black/10 pl-4 md:pl-5">
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 mb-6 font-sans">
              Direct Contact
            </h4>
            <div className="flex flex-col gap-4">
              <a href="tel:+2349062036699" className="flex items-center gap-3 text-black/80 hover:text-black transition-colors group">
                <Phone size={13} className="text-black/40 group-hover:text-black transition-colors shrink-0" />
                <span className="font-sans text-sm tracking-wide">+234 906 203 6699</span>
              </a>
              <a href="mailto:info@vivar.com.ng" className="flex items-center gap-3 text-black/80 hover:text-black transition-colors group">
                <Mail size={13} className="text-black/40 group-hover:text-black transition-colors shrink-0" />
                <span className="font-sans text-sm tracking-wide">info@vivar.com.ng</span>
              </a>
            </div>

            <div className="mt-8 max-w-xs">
              <form onSubmit={handleSubmit} className="flex items-center gap-2 border-b border-black/15 py-1.5 focus-within:border-black transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Subscribe to updates"
                  className="w-full bg-transparent text-xs text-black placeholder:text-black/30 outline-none font-sans"
                />
                <button type="submit" aria-label="Subscribe" className="text-black/50 hover:text-black transition-colors">
                  <ArrowUpRight size={14} />
                </button>
              </form>
              {submitted && (
                <p className="text-[10px] text-black mt-2 font-sans font-medium">Registered successfully.</p>
              )}
            </div>
          </div>

          {/* Say Hello & Actions Panel */}
          <div className="md:col-span-3 flex flex-col justify-between min-h-[180px] md:text-right md:items-end">
            <div className="w-full">
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 mb-4 font-sans">
                Say Hello
              </h4>
              <a
                href="mailto:info@vivar.com.ng"
                className="text-xl sm:text-2xl lg:text-[26px] font-serif font-light text-black tracking-wide border-b border-black/60 pb-1 hover:border-black transition-colors inline-block break-all"
              >
                info@vivar.com.ng
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-8 md:mt-0 text-[10px] tracking-wider text-black/40 uppercase font-sans md:justify-end">
              <a href="/privacy" className="hover:text-black transition-colors">Privacy Policy</a>
              <span className="text-black/10">•</span>
              <a href="/terms" className="hover:text-black transition-colors">Terms &amp; Conditions</a>
              <span className="text-black/10">•</span>
              <span className="tabular-nums">© 2026</span>
            </div>

            {/* Social Layout + Enhanced Forest Green Back to top button */}
            <div className="flex items-center justify-between md:justify-end gap-6 mt-6 w-full md:w-auto">
              <div className="flex items-center gap-3.5">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} aria-label={label} className="text-black/40 hover:text-black transition-colors duration-300">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
              
              {/* Bolder Primary Forest Green Back To Top Button */}
              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0E292F] hover:bg-[#1D3F48] text-white transition-all duration-300 shadow-md hover:shadow-xl active:scale-95"
              >
                <ArrowUp size={16} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        {/* ── LOWER BRAND CANVAS ── */}
        <div className="border-t border-black/10 pt-10 mt-6 select-none">
          <img
            src={LOGO_TEXT}
            alt="Vivar Realty"
            className="w-full h-auto object-contain object-left max-h-[140px] md:max-h-[180px] lg:max-h-[220px]"
          />
        </div>

        {/* Bottom micro line */}
        <div className="mt-6 text-[9px] tracking-widest text-black/20 uppercase font-sans">
          Vivar Realty Limited · RC 771396
        </div>

      </div>
    </footer>
  );
}