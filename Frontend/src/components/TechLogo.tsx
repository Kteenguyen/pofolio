"use client";

import React from "react";

interface TechLogoProps {
  name: string;
  className?: string;
  size?: number;
}

export default function TechLogo({ name, className = "", size = 16 }: TechLogoProps) {
  const norm = name.toLowerCase().trim();

  // 1. React / ReactJS
  if (norm.includes("react")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="-11.5 -10.23174 23 20.46348"
        fill="currentColor"
        className={`text-[#61DAFB] shrink-0 ${className}`}
      >
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // 2. Next.js
  if (norm.includes("next")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 180 180"
        fill="none"
        className={`text-white shrink-0 ${className}`}
      >
        <mask height="180" id="mask-next" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
          <circle cx="90" cy="90" fill="#000" r="90" />
        </mask>
        <g mask="url(#mask-next)">
          <circle cx="90" cy="90" data-framer-name="Base" fill="#000" r="90" stroke="#fff" strokeWidth="6" />
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_next)" />
          <rect fill="url(#paint1_linear_next)" height="72" width="12" x="115" y="54" />
        </g>
        <defs>
          <linearGradient id="paint0_linear_next" x1="109" x2="144.5" y1="116.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="paint1_linear_next" x1="121" x2="120.799" y1="54" y2="106.875" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // 3. TypeScript
  if (norm.includes("typescript") || norm === "ts") {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={`shrink-0 ${className}`}>
        <path fill="#3178C6" d="M1.5 63.85C1.5 29.41 29.42 1.5 63.85 1.5 98.3 1.5 126.2 29.41 126.2 63.85c0 34.45-27.9 62.35-62.35 62.35C29.42 126.2 1.5 98.3 1.5 63.85z" />
        <path fill="#FFF" d="M70.08 72.03c1.78 2.87 4.19 5.06 7.22 6.57 3.03 1.51 6.55 2.27 10.56 2.27 3.33 0 6.13-.53 8.39-1.59 2.26-1.06 3.99-2.52 5.19-4.38 1.2-1.86 1.8-4.04 1.8-6.54 0-2.45-.63-4.52-1.89-6.21-1.26-1.69-3.07-3.09-5.43-4.2-2.36-1.11-5.74-2.22-10.14-3.33-4.75-1.19-8.49-2.44-11.22-3.75-2.73-1.31-4.88-3.08-6.45-5.31-1.57-2.23-2.35-5.08-2.35-8.55 0-3.88 1.07-7.29 3.21-10.23 2.14-2.94 5.25-5.18 9.33-6.72 4.08-1.54 8.94-2.31 14.58-2.31 5.92 0 11.08 1.07 15.48 3.21 4.4 2.14 7.79 5.22 10.17 9.24l-11.14 7.22c-1.42-2.37-3.38-4.14-5.88-5.31-2.5-1.17-5.38-1.75-8.64-1.75-3.06 0-5.61.47-7.65 1.41-2.04.94-3.57 2.24-4.59 3.9-1.02 1.66-1.53 3.6-1.53 5.82 0 2.26.56 4.17 1.68 5.73 1.12 1.56 2.8 2.85 5.04 3.87 2.24 1.02 5.56 2.1 9.96 3.24 5.34 1.34 9.47 2.76 12.39 4.26 2.92 1.5 5.15 3.47 6.69 5.91 1.54 2.44 2.31 5.54 2.31 9.3 0 4.25-1.16 8.01-3.48 11.28-2.32 3.27-5.68 5.79-10.08 7.56-4.4 1.77-9.76 2.66-16.08 2.66-7.39 0-13.68-1.42-18.87-4.26-5.19-2.84-9.11-7.05-11.76-12.63l12.63-7.53zM15.44 38.64h45.24v12.24H39.88v52.68H26.8V50.88H15.44V38.64z" />
      </svg>
    );
  }

  // 4. JavaScript
  if (norm.includes("javascript") || norm === "js") {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={`shrink-0 ${className}`}>
        <path fill="#F7DF1E" d="M1.5 1.5h125v125H1.5z" />
        <path d="M29.5 106.8c3.6 2.2 7.7 3.5 12 3.5 6.6 0 10.8-3.3 10.8-11.8V49.7H38.7v48.6c0 4.1-1.8 5.5-4.8 5.5-2.2 0-3.8-.7-4.4-1.2l0 4.2zM70.5 105.5c4.7 2.8 11.1 4.8 18 4.8 14.8 0 24.3-7.4 24.3-21.7 0-12.9-8.4-18.1-18.5-22.6-6.6-2.9-10.6-5.4-10.6-10.1 0-4.1 3.5-7.2 9.2-7.2 4.9 0 9.1 1.6 12 3.3l3-9.5c-3.1-1.8-8-3.1-14.8-3.1-13.8 0-22.9 7.6-22.9 20.3 0 12.3 8.3 17.7 18.9 22.3 6.9 3 10.4 5.7 10.4 10.6 0 4.9-4.2 8-10.6 8-6 0-11.2-2.3-15-5.2l-3.4 10z" fill="#000" />
      </svg>
    );
  }

  // 5. Tailwind CSS
  if (norm.includes("tailwind")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`text-[#06B6D4] shrink-0 ${className}`}>
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#06B6D4" />
      </svg>
    );
  }

  // 6. Node.js
  if (norm.includes("node")) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`shrink-0 ${className}`}>
        <path d="M16 2.5L3.5 9.7V24.3L16 31.5L28.5 24.3V9.7L16 2.5Z" fill="#5FA04E" />
        <path d="M16 4.5L5.5 10.6V22.8L16 28.9L26.5 22.8V10.6L16 4.5Z" fill="#333333" />
        <path d="M16 8.5L22.5 12.2V19.7L16 23.4L9.5 19.7V12.2L16 8.5Z" fill="#5FA04E" />
      </svg>
    );
  }

  // 7. Express
  if (norm.includes("express")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-slate-300 shrink-0 ${className}`}>
        <path d="M4 4h16v16H4z" />
        <path d="M9 9h6v6H9z" />
        <path d="m15 9-6 6" />
      </svg>
    );
  }

  // 8. C# / ASP.NET / .NET
  if (norm.includes("asp.net") || norm.includes(".net") || norm.includes("c#")) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`shrink-0 ${className}`}>
        <rect width="32" height="32" rx="7" fill="#512BD4" />
        <path d="M8 22V10h4.5c2.5 0 4 1.5 4 3.8 0 2.2-1.5 3.7-4 3.7H10.5v4.5H8zm2.5-6.5h2c1.2 0 1.8-.6 1.8-1.7 0-1-.6-1.6-1.8-1.6h-2v3.3zM18.5 22V10H21v9.8h4.5V22h-7z" fill="#FFF" />
      </svg>
    );
  }

  // 9. Supabase
  if (norm.includes("supabase")) {
    return (
      <svg width={size} height={size} viewBox="0 0 109 113" fill="none" className={`shrink-0 ${className}`}>
        <path d="M63.7076 110.284C60.848 113.885 55.0243 111.933 54.9041 107.337L52.8839 30.0841L99.7854 30.0841C106.634 30.0841 110.457 37.9546 106.195 43.3225L63.7076 110.284Z" fill="#3ECF8E" />
        <path d="M45.317 2.07593C48.1766 -1.52554 54.0003 0.42657 54.1205 5.02271L55.4526 82.2759H9.23908C2.39054 82.2759 -1.43261 74.4054 2.82944 69.0375L45.317 2.07593Z" fill="#249361" />
      </svg>
    );
  }

  // 10. Redis
  if (norm.includes("redis")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`}>
        <path d="M2.5 7L12 2L21.5 7V17L12 22L2.5 17V7Z" fill="#DC382D" />
        <path d="M12 2L21.5 7L12 12L2.5 7L12 2Z" fill="#FF4438" />
        <path d="M12 12V22L21.5 17V7L12 12Z" fill="#B7281E" />
        <circle cx="12" cy="7" r="1.5" fill="#FFF" />
      </svg>
    );
  }

  // 11. MongoDB
  if (norm.includes("mongo")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`}>
        <path d="M12 2C12 2 6 7.5 6 13C6 16.5 8.5 20.5 11.5 21.8V22C11.5 22 11.6 22 12 22C12.4 22 12.5 22 12.5 22V21.8C15.5 20.5 18 16.5 18 13C18 7.5 12 2 12 2Z" fill="#47A248" />
        <path d="M12 2V22C12.4 22 12.5 22 12.5 22V21.8C15.5 20.5 18 16.5 18 13C18 7.5 12 2 12 2Z" fill="#499D4A" />
        <path d="M12 6.5C12 6.5 12.1 11.8 12.1 17.5C12.1 17.7 12 17.9 12 17.9C12 17.9 11.9 17.7 11.9 17.5C11.9 11.8 12 6.5 12 6.5Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 12. MS SQL Server
  if (norm.includes("sql") || norm.includes("database") || norm.includes("csdl")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-[#CC292B] shrink-0 ${className}`}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }

  // 13. WordPress
  if (norm.includes("wordpress") || norm === "wp") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`}>
        <circle cx="12" cy="12" r="10" fill="#21759B" />
        <path d="M12 3.1A8.9 8.9 0 0 0 3.1 12c0 3.8 2.4 7.1 5.8 8.3L5.4 10.6c-.6-1.5.1-1.7.9-1.7h.3L9.7 18c.8.3 1.5.4 2.3.4s1.5-.1 2.3-.4l3.1-9.1h.3c.8 0 1.5.2.9 1.7l-3.5 9.7c3.4-1.2 5.8-4.5 5.8-8.3A8.9 8.9 0 0 0 12 3.1zm-1.8 15.6L7.4 11.2l2.8 7.5zm3.6 0l2.8-7.5-2.8 7.5z" fill="#FFF" />
      </svg>
    );
  }

  // 14. Three.js
  if (norm.includes("three")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`text-white shrink-0 ${className}`}>
        <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z" />
        <path d="M12 11l-3 6h6l-3-6z" />
      </svg>
    );
  }

  // 15. Framer Motion
  if (norm.includes("framer") || norm.includes("motion") || norm.includes("lenis")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`}>
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#0055FF" />
      </svg>
    );
  }

  // 16. Docker
  if (norm.includes("docker")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#2496ED" className={`shrink-0 ${className}`}>
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.186V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.186V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.186V9.006a.185.185 0 00-.186-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185" />
        <path d="M23.952 11.517c-.38-.63-1.077-.96-1.92-1.03-.434-.035-.852.023-1.246.17-.468-.78-1.218-1.256-2.18-1.256a3.18 3.18 0 00-.812.107c-.12-.897-.66-1.572-1.518-1.89-.57-.212-1.2-.244-1.815-.094v3.664h7.94c.55 0 .97.33 1.15.827.17.47.03 1-.36 1.34l-1.34 1.15c-.45.38-.72.95-.72 1.55v.06c0 1.25-1.01 2.26-2.26 2.26H6.18c-1.33 0-2.58-.6-3.41-1.63l-.7-.88c-.37-.47-.93-.75-1.53-.75H.11c-.07.39-.11.79-.11 1.2 0 4.14 3.36 7.5 7.5 7.5h8.5c4.14 0 7.5-3.36 7.5-7.5 0-1.82-.65-3.48-1.74-4.8z" />
      </svg>
    );
  }

  // 17. Linux / Ubuntu / VPS
  if (norm.includes("linux") || norm.includes("ubuntu") || norm.includes("vps")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`}>
        <circle cx="12" cy="12" r="10" fill="#E95420" />
        <circle cx="12" cy="5.5" r="1.8" fill="#FFF" />
        <circle cx="6.4" cy="15.2" r="1.8" fill="#FFF" />
        <circle cx="17.6" cy="15.2" r="1.8" fill="#FFF" />
      </svg>
    );
  }

  // 18. Jira / UAT
  if (norm.includes("jira") || norm.includes("uat") || norm.includes("test")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`}>
        <path d="M11.53 2c0 5.26-4.26 9.53-9.53 9.53V2h9.53z" fill="#0052CC" />
        <path d="M12 2c0 5.26 4.26 9.53 9.53 9.53V2H12z" fill="#2684FF" />
        <path d="M12 11.53c0 5.26 4.26 9.53 9.53 9.53v-9.53H12z" fill="#0052CC" />
      </svg>
    );
  }

  // 19. BA / Nghiệp Vụ / System Design
  if (norm.includes("ba") || norm.includes("nghiệp vụ") || norm.includes("uml")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-sky-400 shrink-0 ${className}`}>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    );
  }

  // 20. AI Agents / Automation
  if (norm.includes("ai") || norm.includes("agent") || norm.includes("bot")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-emerald-400 shrink-0 ${className}`}>
        <path d="M12 2a4 4 0 0 1 4 4v1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z" />
        <path d="M8 11V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1a4 4 0 0 0 4-4" />
        <path d="M12 17v5" />
        <path d="M8 22h8" />
      </svg>
    );
  }

  // Default fallback icon
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-slate-400 shrink-0 ${className}`}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
