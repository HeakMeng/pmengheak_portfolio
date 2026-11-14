# 3D Retro / Conference Lanyard Portfolio Design Specification
**Target Directory:** `portfolio-3d-retro` (Do NOT modify `./portfolio` or backup folders)  
**Profile Target:** Pheng Mengheak — Backend Software Engineer (Java, Spring Boot, Microservices, Distributed Systems)

---

## 1. Design Philosophy & Visual Language

This portfolio adapts the playful, tactile, 3D toy/conference showcase aesthetic from the reference image, tailored strictly for a high-performing backend developer.

### Color Palette & Styles
- **Page Canvas:** `bg-[#f4f6fa]` with a subtle dot mesh background:
  `background-image: radial-gradient(#cbd5e1 1.2px, transparent 1.2px); background-size: 24px 24px;`
- **Main Shell Containers:**
  - `rounded-[2.5rem] bg-white border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.07)]`
- **Primary Brand Colors:**
  - Electric Retro Blue: `#2563eb` / `#1d4ed8` (Monitor bezel, lanyard strap, accent buttons)
  - Dark Screen Slate: `#0f172a` / `#020617` (Terminal screen)
  - Badge Gradient: `from-rose-500 to-red-600` or `from-blue-600 to-indigo-700` (Glossy conference ID card)
  - Sticky Note Yellow: `#fef08a` / `#facc15` with `#854d0e` text (Terminal stickers)
  - Terminal Green: `#22c55e` (Status indicators and OK signals)

---

## 2. Hero Section: 3D Chunky Terminal Monitor

Build a CSS/Tailwind 3D retro computer chassis at the top of the page:
1. **Bezel & Housing:**
   - Rounded 3D chunky frame: `bg-[#2563eb] rounded-3xl p-6 sm:p-8 shadow-[inset_0_-8px_0_rgba(0,0,0,0.25),0_20px_40px_rgba(37,99,235,0.25)] relative`.
   - Floating keycap badges around the monitor:
     - Top left: `Ctrl` 3D yellow/white keycap (`rounded-xl shadow-[0_6px_0_#d97706]`).
     - Top right: `Git` / `Java` squircle badge.
     - Yellow sticky note on monitor corner: `"Backend Specialist"`.
2. **CRT / Screen Display:**
   - Inset CRT glass: `bg-slate-950 rounded-2xl border-4 border-[#1d4ed8] p-6 text-center text-white relative overflow-hidden`.
   - Scanline effect overlay (subtle horizontal repeating line gradient).
   - Prominent bold title: **"PORTFOLIO // 2026"** or **"PHENG MENGHEAK"**.
   - Subtitle: `Backend Engineer • Microservices & Distributed Systems`.
3. **Paper Output Slot (Receipt / Telemetry Strip):**
   - At the bottom of the monitor bezel, a horizontal slot ejects a white receipt paper strip hanging downwards:
     - `STATUS: 200 OK`
     - `STACK: Java 21 | Spring Boot 3.x | PostgreSQL | Docker`
     - `SYSTEM: Active Trainee @ KSHRD (3 tracks) | SETEC MIS`
     - `UPTIME: 99.9%`

---

## 3. Main Body: Two-Column Responsive Layout

Inside the main rounded card container (`max-w-5xl mx-auto p-6 sm:p-10`), lay out two asymmetric columns:

### LEFT COLUMN (5 Cols on Desktop): Developer Identity & Skills

1. **"Behind the Architecture" (Bio Section):**
   - Heading: `Behind the Architecture` (bold, clean typography).
   - Text extracted from current portfolio: Focus on Java, Spring Boot microservices, secure RESTful APIs, relational databases, clean architecture, and distributed systems.

2. **"Let's Connect" (Contact & Channels):**
   - Location: `Phnom Penh, Cambodia (UTC+7)` with map pin icon.
   - Email: `pmengheak168@gmail.com` with clickable `mailto:`.
   - Telegram: `@pmengheak` (`https://t.me/pmengheak`).
   - GitHub: `github.com/HeakMeng`.
   - Résumé: Download button linking directly to `/pmengheak.pdf`.

3. **"Education & Training" Timeline:**
   - **Korea Software HRD Center (KSHRD):** Trainee (2026 – Present, 3 tracks) with HRD logo.
   - **SETEC Institute:** Bachelor's Degree in MIS (2024 – Present) with SETEC logo.
   - **Paññāsāstra University of Cambodia (PUC):** Diploma in English (2023 – 2025) with PUC logo.

4. **"Core Technical Skills":**
   - Pill-shaped badges with soft outlines and hover lift:
     `Java 21`, `Spring Boot`, `Microservices`, `PostgreSQL`, `Docker`, `Keycloak / OAuth2`, `Redis`, `REST APIs`, `FastAPI`, `Ollama`, `Git`, `Linux / Bash`.

5. **"Tech Stack & Software":**
   - Grid of squircle 3D icon tiles (matching the Maya/Substance tiles in the reference):
     - Use the icons from `public/`: Java, Spring, Docker, PostgreSQL, Linux, Git, Ollama, FastAPI.
     - Styling: `rounded-2xl p-3 bg-slate-50 border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform`.

---

### RIGHT COLUMN (7 Cols on Desktop): Interactive ID Lanyard & Projects

1. **Interactive Conference Lanyard ID Badge (Hero Centerpiece):**
   - **Lanyard Strap:** Royal blue fabric ribbon looping from top center, printed with:
     `BACKEND ENGINEER • DEV-2026 • PHENG MENGHEAK •`.
   - **Metal Clasp:** Polished gray/metallic clip connecting strap to badge slot.
   - **Glossy ID Card (`framer-motion` interactive card):**
     - Background: Vibrant red-orange gradient (`bg-gradient-to-br from-rose-500 to-red-600`) or deep modern blue.
     - Content:
       - Profile Photo: `heak-cutout.png` or `heak-portrait.jpg` clipped in a clean photo container.
       - Full Name: **PHENG MENGHEAK**.
       - Badge ID: `ID: DEV-2026-KH`.
       - Role Tag: `BACKEND / MICROSERVICES`.
       - QR Code graphic linking to Telegram or GitHub.
       - Accents: Small tech stickers (paw/star/terminal sticker).
     - **Interaction:** Floating effect with tilt on mouse hover (`whileHover={{ rotate: [-1, 2, -1], y: -6 }}`).

2. **"Experience" (Timeline Feed):**
   - **05/2025 – 12/2025: Proseth Solutions**
     - Role: *IT & Systems Intern*
     - Highlights: Infrastructure support, system administration, database maintenance, networking, and environment troubleshooting.

3. **"Featured Projects":**
   - Chronological project cards with tags and architecture summaries:
     - **SnapPOS:** Point of Sale platform with inventory management, transaction flow, and structured database models.
     - **Cortex Platform:** Collaborative developer knowledge platform with secure authentication, API gateway, and microservices design.
     - **GameHub:** Interactive web and game backend with catalog indexing and session services.
   - Display screenshots from `public/` (Cortex, GameHub, SnapPOS) in rounded preview frames.

4. **"Achievements & Certifications" (Bottom Horizontal Bar):**
   - Clean horizontal timeline matching the reference layout:
     - `2023–2025: PUC English Diploma`
     - `2024–Present: SETEC MIS Honors Track`
     - `2026: KSHRD Full-Stack Trainee Scholarship`

---

## 4. Animation & Interaction Specifications
- Use `framer-motion` for smooth staggered entry:
  - Header monitor slides down slightly on load (`initial={{ y: -20, opacity: 0 }}`).
  - Left and right cards stagger fade-in (`initial={{ opacity: 0, y: 20 }}`).
  - Lanyard card floats continuously (`animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}`).
- Tactile button clicks: `active:scale-95 transition-transform`.
- Zero broken images: Fall back cleanly to SVG icons if any image path fails.

---

## 5. Verification Checklist
- Run `npm run build` inside `portfolio-3d-retro` to confirm zero TypeScript or CSS errors.
- Verify `./portfolio` and `./portfolio-backup-2026-11-11` remain completely unchanged.