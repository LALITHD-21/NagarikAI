<div align="center">

# 🗳️ CivicPulse AI
### *India's Smartest Civic Education Platform*

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Google_Cloud_Run-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://civicpulse.run.app)
[![Version](https://img.shields.io/badge/Version-2.0.0-6366F1?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)
[![Size](https://img.shields.io/badge/Bundle_Size-<10MB-F59E0B?style=for-the-badge)](#performance)
[![Accessibility](https://img.shields.io/badge/WCAG-2.1_AA-06B6D4?style=for-the-badge)](#accessibility)
[![Security](https://img.shields.io/badge/XSS-Protected-EF4444?style=for-the-badge)](#security)

<br/>

> **CivicPulse AI** is a premium, context-aware civic assistant that helps every Indian citizen understand, participate in, and engage with the democratic process — from checking eligibility to finding their polling booth on a live Google Map.

<br/>

```
┌─────────────────────────────────────────────────────────────────┐
│   💬 Smart AI Chat  ·  🗳️ Eligibility  ·  📍 Booth Finder      │
│   📅 Timeline  ·  🧠 Quiz  ·  💡 Myths  ·  🌐 Multilingual     │
└─────────────────────────────────────────────────────────────────┘
```

</div>

---

## 📑 Table of Contents

| # | Section |
|---|---------|
| 1 | [✨ Key Features](#-key-features) |
| 2 | [🎨 UI/UX Design System](#-uiux-design-system) |
| 3 | [🏗️ Architecture](#️-architecture) |
| 4 | [📁 Project Structure](#-project-structure) |
| 5 | [🧠 Smart Assistant Logic](#-smart-assistant-logic) |
| 6 | [🌍 Google Services Integration](#-google-services-integration) |
| 7 | [🔐 Security Implementation](#-security-implementation) |
| 8 | [♿ Accessibility](#-accessibility) |
| 9 | [🧪 Testing Suite](#-testing-suite) |
| 10 | [🚀 Setup & Deployment](#-setup--deployment) |
| 11 | [🐳 Docker & Cloud Run](#-docker--cloud-run) |
| 12 | [⚡ Performance](#-performance) |
| 13 | [🗺️ Roadmap](#️-roadmap) |

---

## ✨ Key Features

### 🤖 Smart AI Chatbot
Context-aware conversational assistant that remembers your profile (name, age, state) and gives **personalised responses**.

- 📌 Decision-tree logic — ordered keyword matching from specific → general
- 👤 Profile-aware — greets you by name, answers eligibility based on your saved age
- 💬 Typing stream animation — bot responses render character-by-character
- 🛡️ XSS-safe — user inputs sanitized before rendering, bot uses safe markdown subset
- 🔊 11 knowledge domains: elections, voting, registration, EVM, NOTA, Model Code, documents, booth, ECI, why vote, NRI

### ✅ Voter Eligibility Engine
Multi-criteria wizard that returns a **personalised eligibility verdict** with actionable next steps.

| Input | Logic | Output |
|-------|-------|--------|
| Age < 18 | Underage | Years until eligible + guidance |
| Citizenship = No | Non-citizen | Legal information |
| Citizenship = NRI | Overseas elector | Form 6A steps |
| Age ≥ 18, Citizen = Yes | Eligible | Registration steps + badges |
| Invalid age (0, >150, null) | Invalid | Clear error message |

### 📍 Polling Booth Finder (Google Maps)
Real-time booth search with **embedded Google Maps iframe** — no API key required.

- 🔍 Text search by area or PIN code
- 📡 GPS geolocation — opens Google Maps with `polling booth near [lat,lon]`
- 🗺️ Live iframe embed appears inline after search
- 📅 Google Calendar deep-link to add election day reminder

### 📅 Election Timeline
Interactive visual timeline with:
- Past / Upcoming / Future event statuses
- Chronologically ordered and validated
- Google Calendar integration for each event

### 🧠 Interactive Quiz
- 5 randomly shuffled questions per session
- 4 options per question with explanations
- Score tracking + confetti animation on completion
- Unlocks gamification badges

### 💡 Myth vs Fact Debunker
6 common election myths debunked with verified facts. Tap-to-reveal card interaction.

### 🌐 Multilingual Support
Full UI translation in **English**, **Hindi (हिंदी)**, and **Kannada (ಕನ್ನಡ)** with runtime language switching.

### 👤 User Profile
- Name, Age, State, District — persisted to `localStorage`
- Auto-syncs Age → Eligibility Checker, State → Chatbot responses
- Personalized header greeting

---

## 🎨 UI/UX Design System

### Design Philosophy
> *"Every interaction should feel alive. Every pixel should feel intentional."*

CivicPulse uses a **premium glassmorphism dark theme** built entirely with custom CSS — no Tailwind, no Bootstrap.

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#6366F1` | Indigo — buttons, active states |
| `--primary-light` | `#818CF8` | Labels, highlights |
| `--accent` | `#8B5CF6` | Violet — gradients |
| `--cyan` | `#06B6D4` | Teal — accents, nav bar |
| `--pink` | `#EC4899` | Aurora glow |
| `--bg` | `#07071A` | Deep space background |
| `--success` | `#10B981` | Eligibility pass |
| `--danger` | `#EF4444` | Errors, not eligible |

### Visual Effects

| Effect | Implementation |
|--------|----------------|
| **Aurora Background** | Dual radial-gradient + `aurora-shift` keyframe animation |
| **Glassmorphism Cards** | `backdrop-filter: blur(12px)` + semi-transparent borders |
| **3D Card Tilt** | JS `mousemove` → `perspective(1000px) rotateX/Y` |
| **Particle System** | Canvas API — 80 floating particles with velocity and fade |
| **Cursor Glow** | Pseudo-element that tracks `mousemove` with CSS `translate` |
| **Magnetic Buttons** | JS `mousemove` on buttons → `translate(x,y)` pull effect |
| **Nav Pill Indicator** | Gradient top-border slides to active tab |
| **Confetti Burst** | 80 DOM elements + `requestAnimationFrame` physics |
| **UI Sounds** | Web Audio API — pop + success chord tones |
| **Typing Stream** | Character-by-character bot response with HTML tag awareness |

### Typography
- **Font:** `Inter` (Google Fonts) — 400 / 500 / 600 / 700 / 800
- **Monospace:** `JetBrains Mono` (test runner)
- **Scale:** 11px → 13px → 14px → 16px → 1.1rem → 2rem → 2.8rem

### Responsive Layout
- Mobile-first with bottom navigation bar
- Desktop: nav centres and caps at `500px`, grid expands to 3 columns
- Safe-area insets for notch devices (`env(safe-area-inset-bottom)`)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     index.html                          │
│  (SEO meta, ARIA landmarks, script load order)          │
└──────────────┬──────────────────────────────────────────┘
               │ loads
┌──────────────▼──────────────────────────────────────────┐
│                      app.js                             │
│  App controller — router, lifecycle, gamification       │
│  showView() → lazy-renders each service on demand       │
└──┬──────┬──────┬──────┬──────┬──────┬──────┬───────────┘
   │      │      │      │      │      │      │
services/  …    …      …      …      …      │  utils/
i18n.js         │      │      │      │      │  helpers.js
eligibility.js  │      │      │      │      │  particles.js
timeline.js     │      │      │      │
chatbot.js ─────┘      │      │
quiz.js                │      │
explainer.js ──────────┘      │
  ├─ ExplainerService          │
  ├─ RegistrationService       │
  ├─ MythsService              │
  └─ BoothService ─────────────┘
         (Google Maps embed + Calendar)
```

### Design Patterns

| Pattern | Where Used |
|---------|-----------|
| **Module Object Pattern** | All services (`EligibilityService`, `ChatbotService`, …) |
| **Lazy Rendering** | Views only render DOM when navigated to |
| **Observer (IntersectionObserver)** | Entrance animations on scroll |
| **Token Bucket Rate Limiting** | `rateLimit()` in helpers.js |
| **Rolling Context Window** | Chatbot keeps last 6 conversation turns |
| **localStorage Persistence** | Profile, badges, language preference |

---

## 📁 Project Structure

```
civicpulse-ai/
│
├── 📄 index.html              # Entry point — semantic HTML5, SEO meta, ARIA
├── 🎨 index.css               # Full design system (750+ lines, zero frameworks)
├── ⚡ app.js                  # Main controller — routing, lifecycle, gamification
├── 📋 manifest.json           # PWA manifest — installable, offline-ready
├── 🔧 sw.js                   # Service Worker — cache-first offline support
│
├── services/                  # Domain logic — each file is a pure JS module
│   ├── i18n.js                # I18N engine — EN / HI / KN + t() function
│   ├── eligibility.js         # Eligibility logic + DOM renderer
│   ├── timeline.js            # Election events (date-sorted, status-tagged)
│   ├── chatbot.js             # Context-aware AI chatbot + knowledge base
│   ├── quiz.js                # Shuffle, score, render quiz engine
│   ├── explainer.js           # Explainer + Registration + Myths + BoothService
│   └── booth.js               # (stub — combined into explainer.js)
│
├── utils/
│   ├── helpers.js             # sanitize(), validateAge(), rateLimit(), sounds
│   └── particles.js           # Canvas particle background animation
│
├── tests/
│   ├── tests.js               # 60+ assertions across 12 test suites
│   └── test-runner.html       # Visual browser test runner UI
│
├── 🐳 Dockerfile              # nginx:alpine — production container
├── ⚙️ nginx.conf              # Security headers, gzip, SPA fallback, /health
├── 🚫 .dockerignore           # Excludes .git, node_modules from build context
└── 📖 README.md               # This file
```

---

## 🧠 Smart Assistant Logic

The chatbot uses a **3-layer decision system**:

```
Layer 1: Profile Context Loading
  └─ On chat open → ChatbotService.loadContext() reads localStorage
       └─ Stores: name, age, state, district

Layer 2: Greeting Personalisation
  └─ "hi" → "Namaste, Rahul!" (if name saved)
  └─ age-aware eligibility answers

Layer 3: Keyword Decision Tree (ordered by specificity)
  Model Code of Conduct
    └─ ECI / Election Commission
         └─ NOTA
              └─ EVM
                   └─ Booth / Polling Station  ← injects saved state
                        └─ Eligibility         ← injects saved age
                             └─ Registration
                                  └─ Why Vote
                                       └─ Elections (general)
                                            └─ Gratitude
                                                 └─ Help menu
                                                      └─ Fallback
```

### Knowledge Domains

| Domain | Key Topics |
|--------|-----------|
| Elections | Lok Sabha, Vidhan Sabha, Local Body, Rajya Sabha |
| Voting | 6-step process, booth entry, EVM, VVPAT |
| Registration | Form 6, Form 6A (NRI), ERO, NVSP, documents |
| EVM | Standalone, no network, VVPAT paper trail |
| NOTA | Supreme Court 2013, counting rules |
| Model Code | Announcement, restrictions, violations |
| Documents | 12 accepted IDs at polling booth |
| Booth Finder | SMS 1950, voters.eci.gov.in, helpline |
| ECI | Structure, powers, history since 1950 |
| Why Vote | Impact statistics, civic duty arguments |

---

## 🌍 Google Services Integration

| Service | How It's Used | Where |
|---------|--------------|-------|
| **Google Fonts** | `Inter` loaded via CDN — premium typography | `index.html` |
| **Google Maps Embed** | Live iframe map of polling booths after search | Booth Finder |
| **Google Maps URL** | GPS-based polling booth search + directions links | Booth Finder |
| **Google Calendar** | Deep-link to pre-filled election day reminder event | Booth Finder |
| **Web Speech API** | Voice input for chatbot (Chrome/Edge) | Chat view |

### Google Maps Embed (No API Key Required)
```javascript
// Maps iframe embed URL pattern used
const q = encodeURIComponent(`polling booth near ${userQuery}`);
const src = `https://maps.google.com/maps?q=${q}&output=embed&z=14`;
// → Renders live searchable map inline
```

### Google Calendar Reminder Link
```javascript
// Pre-filled event deep-link
const link =
  `https://calendar.google.com/calendar/render?action=TEMPLATE` +
  `&text=India Election Day — Go Vote!` +
  `&dates=20290515/20290515` +
  `&details=Go vote at your local polling booth!`;
```

---

## 🔐 Security Implementation

### Defense-in-Depth Approach

```
Browser Layer        → Content Security Policy header
Transport Layer      → HSTS (max-age=31536000)
Input Layer          → sanitize() — textContent trick (no DOM parser)
Rate Limiting        → Token bucket per action key
Output Layer         → renderSafeMarkdown() for bot only
Link Safety          → rel="noopener noreferrer" on all external links
Hidden Files         → nginx blocks all /. paths (deny all)
```

### Content Security Policy
```nginx
Content-Security-Policy:
  default-src 'self';
  script-src  'self' 'unsafe-inline' https://maps.googleapis.com;
  style-src   'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src    'self' https://fonts.gstatic.com;
  img-src     'self' data: https://*.googleapis.com https://*.gstatic.com;
  connect-src 'self' https://*.googleapis.com;
  frame-src   'none';
  object-src  'none';
```

### Input Validation Functions

```javascript
sanitize(str)          // HTML-escapes user input — prevents XSS
validateAge(val)       // Integer in [1–150] or null
validateText(val, max) // Trims, slices, rejects whitespace-only
rateLimit(key, n, ms)  // Token bucket — e.g. max 10 chat msgs/10s
```

### Security Headers (nginx)

| Header | Value |
|--------|-------|
| `X-Frame-Options` | `SAMEORIGIN` |
| `X-Content-Type-Options` | `nosniff` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `geolocation=(self), microphone=(self)` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |

---

## ♿ Accessibility

CivicPulse targets **WCAG 2.1 Level AA** compliance.

### Implementation Details

| Requirement | Implementation |
|-------------|---------------|
| **Semantic HTML** | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` throughout |
| **ARIA Labels** | Every button, input, and interactive element labelled |
| **ARIA Live Regions** | `aria-live="polite"` on chatbot typing indicator |
| **Focus Management** | `trapFocus()` utility for modal-like views |
| **Keyboard Navigation** | Full Tab/Shift-Tab + Enter support everywhere |
| **Focus Visible** | Custom `2px solid var(--primary-light)` outline |
| **Touch Targets** | Minimum `44×44px` on all interactive elements |
| **Reduced Motion** | `@media (prefers-reduced-motion: reduce)` disables all animations |
| **High Contrast** | `@media (forced-colors: active)` applies border fallbacks |
| **Font Scaling** | `+` / `–` buttons scale `--font-scale` from `0.8×` to `1.4×` |
| **Color Contrast** | All text meets 4.5:1 minimum contrast ratio on dark background |
| **Screen Reader** | `role="article"` on every chat message, `aria-label` on all icons |

---

## 🧪 Testing Suite

### Test Coverage

```
tests/tests.js  — 60+ assertions across 12 suites
tests/test-runner.html — Visual browser UI for running tests
```

### Test Suites

| Suite | Tests | What's Validated |
|-------|-------|-----------------|
| `EligibilityService — Age` | 8 | Boundaries: 0, 17, 18, 150, 151, null, negative |
| `EligibilityService — Citizenship` | 6 | Citizen, non-citizen, NRI, empty state/citizenship |
| `EligibilityService — Result Shape` | 5 | steps[], message, description, step count |
| `ChatbotService — Knowledge Base` | 4 | KB structure, response type, empty input, XSS |
| `ChatbotService — Response Quality` | 5 | Keyword matching for 5 core domains |
| `Timeline — Data Integrity` | 4 | Array, length, parseable dates, sorted |
| `Quiz — Structure` | 9 | 5 questions, reset, 4 opts, answer range, explanation |
| `i18n — Completeness` | 5 | EN/HI/KN exist, ≥10 keys, t() lookup, fallback |
| `Security — sanitize()` | 5 | Script tag, img tag, plain text, empty, null, non-string |
| `Security — validateAge()` | 6 | Valid, negative, zero, over-max, non-numeric, null |
| `Security — validateText()` | 6 | Valid, trim, empty, spaces, null, truncation |
| `Security — rateLimit()` | 2 | Caps at N calls, blocks N+1 |

### Running Tests

**Option A — Visual Test Runner (Recommended):**
```bash
# Open in browser:
tests/test-runner.html
# Click "▶ Run All Tests"
# See suite-by-suite pass/fail breakdown with progress bar
```

**Option B — Browser Console:**
```javascript
// In index.html browser console:
const s = document.createElement('script');
s.src = 'tests/tests.js';
document.head.appendChild(s);
// → Output printed to console with ✅ / ❌ markers
```

### Test Runner UI Features
- ✅ Suite-level pass/fail badges
- 📊 Visual progress bar (% pass rate)
- 🔽 Collapsible per-suite detail
- 📋 Toggle raw console log output
- 🎨 Dark glassmorphism styling (matches main app)

---

## 🚀 Setup & Deployment

### Prerequisites
- Any modern browser (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
- No Node.js, no build step, no package manager required

### Local Development

```bash
# 1. Clone
git clone https://github.com/your-username/civicpulse-ai.git
cd civicpulse-ai

# 2. Open directly (simplest)
start index.html           # Windows
open index.html            # macOS
xdg-open index.html        # Linux

# 3. Or serve with any static server
npx serve .                # Node-based
python -m http.server 8000 # Python
```

### Environment Notes
- No `.env` file needed — no private API keys used
- Google Maps embed and Calendar links use public URL patterns
- Voice input uses the browser's built-in Web Speech API

---

## 🐳 Docker & Cloud Run

### Build & Run Locally

```bash
# Build image
docker build -t civicpulse-ai .

# Run container
docker run -p 8080:8080 civicpulse-ai

# Open
open http://localhost:8080
```

### Dockerfile

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

### Deploy to Google Cloud Run

```bash
# 1. Authenticate
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# 2. Build & push to Artifact Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/civicpulse-ai

# 3. Deploy to Cloud Run
gcloud run deploy civicpulse-ai \
  --image gcr.io/YOUR_PROJECT_ID/civicpulse-ai \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 256Mi \
  --min-instances 0 \
  --max-instances 5
```

### Health Check
```bash
curl https://your-service-url/health
# → {"status":"ok","service":"civicpulse"}
```

### nginx Configuration Highlights

```nginx
# Gzip compression
gzip on; gzip_comp_level 6; gzip_types text/css application/javascript ...

# Long-term cache for assets
location ~* \.(js|css|png|svg|woff2?)$ { expires 1y; add_header Cache-Control "public, immutable"; }

# Service Worker — no cache
location = /sw.js { add_header Cache-Control "no-store, no-cache, must-revalidate"; }

# SPA fallback
location / { try_files $uri $uri/ /index.html; }

# Security — block hidden files
location ~ /\. { deny all; }
```

---

## ⚡ Performance

| Metric | Value |
|--------|-------|
| **Bundle Size** | < 10 MB total |
| **JS** | ~35 KB (6 service files + app.js, no frameworks) |
| **CSS** | ~29 KB (design system, animations, all components) |
| **HTML** | ~21 KB (full SPA markup) |
| **Dependencies** | Google Fonts only (optional, falls back to system fonts) |
| **First Paint** | < 1s on 4G |
| **Time to Interactive** | < 1.5s on 4G |
| **Offline Support** | ✅ via Service Worker + cache-first strategy |

### Optimization Techniques

- **Lazy rendering** — views only render DOM when navigated to (no upfront parse cost)
- **IntersectionObserver** — entrance animations triggered only on viewport entry
- **Canvas particles** — `requestAnimationFrame` with velocity-based culling
- **Debounced inputs** — `debounce()` utility prevents excessive re-renders
- **Gzip** — nginx compresses all text assets at level 6
- **Immutable caching** — `Cache-Control: public, immutable` for hashed assets
- **`loading="lazy"`** — Google Maps iframe deferred until visible

---

## 🗺️ Roadmap

| Status | Feature |
|--------|---------|
| ✅ Done | Smart context-aware chatbot |
| ✅ Done | Voter eligibility checker |
| ✅ Done | Google Maps booth finder |
| ✅ Done | Google Calendar reminder |
| ✅ Done | Multilingual (EN/HI/KN) |
| ✅ Done | PWA + offline support |
| ✅ Done | Visual test runner |
| ✅ Done | CSP + security headers |
| ✅ Done | Reduced motion / high contrast |
| ✅ Done | Docker + Cloud Run deploy |
| 🔜 Planned | Real ECI API integration |
| 🔜 Planned | Tamil & Telugu language support |
| 🔜 Planned | Gemini AI chatbot upgrade |
| 🔜 Planned | Push notifications for election alerts |
| 🔜 Planned | Firebase Auth for profile sync |

---

## 👥 Contributing

```bash
# 1. Fork → Clone
git clone https://github.com/your-username/civicpulse-ai.git

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes, run tests
# Open tests/test-runner.html → "Run All Tests" → all must pass

# 4. Commit with conventional commits
git commit -m "feat: add Tamil language support"

# 5. Push and open PR
git push origin feature/your-feature-name
```

**Commit Convention:**
| Prefix | Use |
|--------|-----|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | README / documentation |
| `style:` | CSS / UI changes |
| `test:` | Adding/updating tests |
| `refactor:` | Code cleanup |
| `chore:` | Build config, deps |

---

## 📄 License

```
MIT License

Copyright (c) 2026 CivicPulse AI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software to use, copy, modify, merge, publish, distribute, and/or
sublicense subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
```

---

## 🙏 Acknowledgements

| Resource | Purpose |
|----------|---------|
| [Election Commission of India](https://eci.gov.in) | Official election data & voter service links |
| [voters.eci.gov.in](https://voters.eci.gov.in) | Voter registration portal |
| [Google Fonts — Inter](https://fonts.google.com/specimen/Inter) | Premium UI typography |
| [Google Maps Embed API](https://developers.google.com/maps/documentation/embed) | Polling booth map |
| [Google Calendar](https://calendar.google.com) | Election reminder integration |
| [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) | Voice chatbot input |
| [MDN Web Docs](https://developer.mozilla.org) | Web platform reference |

---

<div align="center">

**Built with ❤️ for Indian Democracy**

*"The vote is the most powerful nonviolent tool we have." — John Lewis*

<br/>

[![Made with Vanilla JS](https://img.shields.io/badge/Made_with-Vanilla_JS-F7DF1E?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Styled with CSS](https://img.shields.io/badge/Styled_with-Custom_CSS-1572B6?style=flat-square&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Deployed on Cloud Run](https://img.shields.io/badge/Deployed_on-Cloud_Run-4285F4?style=flat-square&logo=google-cloud)](https://cloud.google.com/run)
[![No Frameworks](https://img.shields.io/badge/Zero-Frameworks-10B981?style=flat-square)](#)

</div>
