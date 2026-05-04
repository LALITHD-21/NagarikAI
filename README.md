<div align="center">

<img src="https://raw.githubusercontent.com/LALITHD-21/NagarikAI/master/logo.png" width="120" height="120" alt="NagarikAI Logo" style="border-radius:22px"/>

# नागरिक AI · NagarikAI

### *India's Smartest AI-Powered Civic Intelligence Platform*

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Cloud_Run-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](#deployment)
[![GitHub Stars](https://img.shields.io/github/stars/LALITHD-21/NagarikAI?style=for-the-badge&color=6366F1&logo=github)](https://github.com/LALITHD-21/NagarikAI/stargazers)
[![Version](https://img.shields.io/badge/Version-2.0.0_Premium-8B5CF6?style=for-the-badge)](CHANGELOG.md)
[![License](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-Offline_Ready-F59E0B?style=for-the-badge&logo=pwa)](manifest.json)
[![WCAG](https://img.shields.io/badge/WCAG-2.1_AA-06B6D4?style=for-the-badge)](README.md#accessibility)
[![Security](https://img.shields.io/badge/CSP-Hardened-EF4444?style=for-the-badge)](#security)
[![Bundle](https://img.shields.io/badge/Bundle-<10MB-10B981?style=for-the-badge)](#performance)

<br/>

> **"Empowering every Indian citizen to understand, participate in, and own their democratic process — powered by AI."**

<br/>

```
╔═══════════════════════════════════════════════════════════════╗
║  💬 AI Chat  ·  ✅ Eligibility  ·  📍 Booth Finder (Maps)   ║
║  📅 Timeline  ·  🧠 Quiz  ·  💡 Myths  ·  🌐 EN/HI/KN       ║
╚═══════════════════════════════════════════════════════════════╝
```

</div>

---

## 🌟 What is NagarikAI?

**NagarikAI** (नागरिक = *Citizen* in Hindi/Sanskrit) is a **premium civic intelligence platform** built for every Indian voter. It transforms complex election procedures into simple, interactive, and beautiful experiences — all offline-capable, zero-install, no login required.

Whether you are a **first-time voter**, a **returning citizen**, or an **NRI overseas elector** — NagarikAI guides you through the entire democratic journey in seconds.

---

## 📑 Table of Contents

| # | Section |
|---|---------|
| 1 | [✨ Feature Showcase](#-feature-showcase) |
| 2 | [🎨 Design System](#-design-system) |
| 3 | [🏗️ Architecture](#️-architecture) |
| 4 | [📁 File Structure](#-file-structure) |
| 5 | [🧠 AI Logic Engine](#-ai-logic-engine) |
| 6 | [🌍 Google Services](#-google-services) |
| 7 | [🔐 Security](#-security) |
| 8 | [♿ Accessibility](#-accessibility) |
| 9 | [🧪 Testing](#-testing) |
| 10 | [🚀 Deployment](#-deployment) |
| 11 | [⚡ Performance](#-performance) |
| 12 | [🗺️ Roadmap](#️-roadmap) |
| 13 | [🤝 Contributing](#-contributing) |

---

## ✨ Feature Showcase

### 🤖 Context-Aware AI Chatbot

The chatbot is the heart of NagarikAI. It uses a **3-layer intelligence system**:

```
┌─────────────────────────────────────────┐
│  LAYER 1 — Profile Context              │
│  Reads: name, age, state from profile   │
│  → Greets by name, personalises answers │
├─────────────────────────────────────────┤
│  LAYER 2 — Decision Tree (11 domains)  │
│  Keyword matching: MCC → ECI → NOTA    │
│  → EVM → Booths → Eligibility → ...    │
├─────────────────────────────────────────┤
│  LAYER 3 — Streaming Renderer           │
│  Character-by-character typewriter      │
│  XSS-safe: sanitize() on all input     │
└─────────────────────────────────────────┘
```

**11 Knowledge Domains covered:**

| Domain | Key Topics |
|--------|-----------|
| 🗳️ Elections | Lok Sabha, Vidhan Sabha, Local Body types |
| 📋 Voting | 6-step process, EVM operation, VVPAT |
| 📝 Registration | Form 6, Form 6A (NRI), NVSP portal |
| 💻 EVM | Standalone unit, no network, paper trail |
| 🔴 NOTA | Supreme Court 2013, counting rules |
| 📜 Model Code | Timeline, restrictions, EC powers |
| 🪪 Documents | 12 accepted photo IDs at booth |
| 📍 Booth Finder | SMS 1950, voters.eci.gov.in |
| 🏛️ ECI | History, powers, Chief Election Commissioner |
| 🌟 Why Vote | Impact stats, civic duty |
| 🌏 NRI Voting | Overseas Electors, Form 6A guide |

---

### ✅ Voter Eligibility Engine

Smart multi-criteria checker with instant personalised verdicts:

| Scenario | Age | Citizenship | Verdict |
|----------|-----|-------------|---------|
| First-time voter | 18+ | Indian | ✅ Eligible + registration steps |
| Underage | < 18 | Any | ⏳ X years until eligible |
| NRI | 18+ | NRI | 🌏 Form 6A overseas elector |
| Non-citizen | Any | No | ❌ Not eligible + explanation |
| Invalid age | 0 / >150 | — | ⚠️ Please enter valid age |

---

### 📍 Booth Finder — Powered by Google Maps

Real-time polling booth search with live embedded map — **no API key needed**:

```javascript
// Text search → embedded map
const q = encodeURIComponent(`polling booth near ${userQuery}`);
const src = `https://maps.google.com/maps?q=${q}&output=embed&z=14`;

// GPS → opens Google Maps directions
navigator.geolocation.getCurrentPosition(pos =>
  window.open(`https://maps.google.com/?q=polling+booth+near+${pos.coords.latitude},${pos.coords.longitude}`)
);
```

**Features:**
- 🔍 Text-based search by area or PIN code
- 📡 One-tap GPS location detection
- 🗺️ Live Google Maps iframe embedded inline
- 📅 Google Calendar reminder deep-link
- 🔗 Direct links to voters.eci.gov.in

---

### 📅 Interactive Election Timeline

- Chronologically sorted election events
- Status badges: **Past** / **Upcoming** / **Future**
- Google Calendar integration per event
- Animated entry with scroll-triggered reveal

---

### 🧠 Gamified Civic Quiz

- 5 randomly shuffled questions per session
- 4 options with explanations after each answer
- Real-time score tracker
- 🎊 Confetti burst animation on perfect score
- Unlocks achievement badges

---

### 💡 Myth Buster

6 common election myths debunked with verified facts:
- Tap-to-reveal card flip interaction
- Sources cited from official ECI data
- Shareable myth cards

---

### 🌐 Multilingual — EN / हिंदी / ಕನ್ನಡ

- Full UI translation at runtime — no page reload
- Language preference saved to `localStorage`
- Covers all 60+ UI strings
- `t('key')` helper with EN fallback

---

### 👤 Smart User Profile

- Fields: Name, Age, State, District
- Persists to `localStorage` — survives browser close
- Instantly syncs Age → Eligibility Checker
- Syncs State → Chatbot personalisation
- Personalized greeting in app header

---

## 🎨 Design System

### Philosophy
> *"Every pixel intentional. Every interaction alive."*

Pure vanilla CSS — zero Tailwind, zero Bootstrap, zero dependencies.

### Color Tokens

```css
--bg:            #07071A  /* Deep space dark */
--surface:       #0F0F2D  /* Card surfaces */
--primary:       #6366F1  /* Electric indigo */
--primary-light: #818CF8  /* Soft indigo */
--accent:        #8B5CF6  /* Violet */
--cyan:          #06B6D4  /* Teal glow */
--pink:          #EC4899  /* Aurora bloom */
--success:       #10B981  /* Eligible green */
--danger:        #EF4444  /* Error red */
--warning:       #F59E0B  /* Caution amber */
--text:          #F1F5F9  /* Primary text */
--text-dim:      #94A3B8  /* Secondary text */
```

### Visual Effects Catalogue

| Effect | Technology |
|--------|-----------|
| **Aurora Background** | Dual radial-gradient + `@keyframes aurora-shift` |
| **Glassmorphism Cards** | `backdrop-filter: blur(12px)` + translucent border |
| **Logo Glow** | Triple box-shadow: ring + bloom + halo |
| **3D Card Tilt** | `mousemove` → `perspective(1000px) rotateX/Y` |
| **Particle Canvas** | 80 floating particles via Canvas API + `requestAnimationFrame` |
| **Cursor Glow** | Pseudo-element tracking `mousemove` in CSS |
| **Magnetic Buttons** | JS `mousemove` → CSS `translate(x,y)` pull |
| **Nav Pill** | Gradient top-border slides to active tab |
| **Confetti Burst** | 80 DOM nodes + physics simulation |
| **Typing Stream** | Char-by-char bot render with HTML tag awareness |
| **UI Sounds** | Web Audio API — pop tone + success chord |
| **Float Animation** | Sinusoidal `translateY` on logo |

### Typography

| Role | Font | Weight |
|------|------|--------|
| UI / Body | Inter (Google Fonts) | 400, 500, 600, 700, 800 |
| Code / Tests | JetBrains Mono | 400, 600 |
| Scale | 11px → 13px → 15px → 2rem → 2.8rem | — |

---

## 🏗️ Architecture

```
index.html  (Semantic HTML5, ARIA, SEO meta, OG tags)
    │
    ├── index.css        Pure CSS design system — 840+ lines, zero deps
    │
    ├── app.js           Main SPA controller
    │   ├── showView()   Lazy renderer — only builds DOM on navigation
    │   ├── loadProfile  Syncs localStorage → all services
    │   ├── gamification Badge unlock logic
    │   └── particles    Canvas animation init
    │
    ├── services/
    │   ├── i18n.js      Translation engine — t(key, lang)
    │   ├── eligibility.js  Age + citizenship decision tree
    │   ├── timeline.js  Date-sorted election events
    │   ├── chatbot.js   Context-aware AI — 11 domains, XSS-safe
    │   ├── quiz.js      Shuffle + score + confetti engine
    │   └── explainer.js Explainer + Registration + Myths + BoothService
    │                    (Google Maps embed + Calendar link)
    │
    ├── utils/
    │   ├── helpers.js   sanitize(), validateAge(), rateLimit(), debounce()
    │   └── particles.js Canvas particle system
    │
    └── tests/
        ├── tests.js         60+ assertions, 12 suites
        └── test-runner.html Visual browser test runner UI
```

**Design Patterns Used:**

| Pattern | Location |
|---------|---------|
| Module Object | All `services/*.js` |
| Lazy Rendering | `app.js → showView()` |
| Observer | `IntersectionObserver` for scroll animations |
| Token Bucket | `rateLimit()` in helpers.js |
| Rolling Context Window | Chatbot keeps last 6 turns |
| Singleton | Each service = one object, one instance |

---

## 📁 File Structure

```
nagarik-ai/
│
├── 🖼️  logo.png              ← NagarikAI brand logo (AI-generated, 512×512)
├── 📄  index.html            ← App shell — semantic HTML5, ARIA, OG meta
├── 🎨  index.css             ← Full design system (840+ lines, zero frameworks)
├── ⚡  app.js                ← SPA controller — routing, lifecycle, gamification
├── 📋  manifest.json         ← PWA manifest — NagarikAI, offline-installable
├── 🔧  sw.js                 ← Service Worker — cache-first offline strategy
│
├── services/
│   ├── i18n.js              ← EN / हिंदी / ಕನ್ನಡ translation engine
│   ├── eligibility.js       ← Voter eligibility decision engine + DOM renderer
│   ├── timeline.js          ← Election events — sorted, status-tagged
│   ├── chatbot.js           ← Context-aware AI chatbot + 11-domain knowledge base
│   ├── quiz.js              ← Quiz: shuffle, score, confetti, badges
│   └── explainer.js         ← Explainer + Registration + Myths + BoothService
│
├── utils/
│   ├── helpers.js           ← sanitize(), validateAge(), validateText(), rateLimit()
│   └── particles.js         ← Canvas particle background animation
│
├── tests/
│   ├── tests.js             ← 60+ assertions across 12 test suites
│   └── test-runner.html     ← Visual browser-based test runner with progress UI
│
├── 🐳  Dockerfile           ← nginx:alpine production container
├── ⚙️  nginx.conf           ← Security headers, CSP, gzip, SPA fallback, /health
├── 🚫  .dockerignore        ← Excludes .git, node_modules from build
└── 📖  README.md            ← This file
```

---

## 🧠 AI Logic Engine

### Decision Tree Flow

```
User Message
    │
    ▼
sanitize(input) ─── XSS blocked
    │
    ▼
loadContext() ── name, age, state from localStorage
    │
    ▼
Keyword Match (ordered most-specific → most-general)
    │
    ├── "mcc" / "model code"    → Model Code of Conduct response
    ├── "eci" / "commission"    → Election Commission of India
    ├── "nota"                  → NOTA explanation (Supreme Court 2013)
    ├── "evm"                   → EVM tech + VVPAT
    ├── "booth" / "polling"     → Booth info + saved state context
    ├── "eligib" / "eligible"   → Age check using saved profile age
    ├── "regist" / "voter id"   → Registration steps + Form 6 links
    ├── "why vote" / "import"   → Why voting matters stats
    ├── "election" / "vote"     → General election explainer
    ├── "thank" / "great"       → Gratitude response
    ├── "help" / "what can"     → Full help menu
    └── (fallback)              → Friendly nudge + help offer
    │
    ▼
Stream response character-by-character
(HTML tags buffered and rendered safely)
```

---

## 🌍 Google Services

| Service | Integration | Location |
|---------|------------|---------|
| **Google Fonts — Inter** | CDN link in `<head>` | `index.html` |
| **Google Maps Embed** | Live iframe after booth search | Booth Finder view |
| **Google Maps URL** | GPS coordinates → maps.google.com | Booth Finder GPS |
| **Google Calendar** | Deep-link with pre-filled event title + date | Booth Finder |
| **Web Speech API** | Voice input for chatbot (Chrome/Edge) | Chat view |

### Maps Embed Pattern
```html
<!-- No API key required -->
<iframe
  src="https://maps.google.com/maps?q=polling+booth+near+{query}&output=embed&z=14"
  width="100%" height="260" loading="lazy"
  title="Polling booths near your location">
</iframe>
```

### Calendar Reminder Pattern
```
https://calendar.google.com/calendar/render
  ?action=TEMPLATE
  &text=🗳️ India Election Day — Go Vote!
  &dates=20290515/20290515
  &details=Go vote at your local polling booth!
```

---

## 🔐 Security

### Defense in Depth

```
1. Browser   → Content-Security-Policy (nginx header)
2. Transport → HSTS max-age=31536000
3. Input     → sanitize() — textContent trick, no innerHTML
4. Rate      → rateLimit() — token bucket per action
5. Output    → renderSafeMarkdown() — bot only, controlled subset
6. Links     → rel="noopener noreferrer" on all external anchors
7. Files     → nginx: deny all /. paths (hidden files)
```

### Full CSP Header
```
Content-Security-Policy:
  default-src 'self';
  script-src  'self' 'unsafe-inline' https://maps.googleapis.com;
  style-src   'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src    'self' https://fonts.gstatic.com;
  img-src     'self' data: https://*.googleapis.com https://*.gstatic.com;
  connect-src 'self' https://*.googleapis.com;
  frame-src   https://maps.google.com https://www.google.com;
  object-src  'none';
```

### Security Headers
| Header | Value |
|--------|-------|
| `X-Frame-Options` | `SAMEORIGIN` |
| `X-Content-Type-Options` | `nosniff` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `geolocation=(self), microphone=(self)` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |

### Utility API
```javascript
sanitize(str)            // Escapes HTML via textContent trick
validateAge(val)         // Integer 1–150 only, else null
validateText(val, max)   // Trim, slice, reject whitespace-only
rateLimit(key, n, ms)    // Blocks call if > n invocations in ms window
```

---

## ♿ Accessibility

**Target: WCAG 2.1 Level AA**

| Requirement | Implementation |
|-------------|---------------|
| Semantic HTML | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` |
| ARIA Labels | Every button, input, icon labelled |
| ARIA Live Regions | `aria-live="polite"` on chatbot typing indicator |
| Focus Management | Tab / Shift-Tab / Enter fully supported |
| Focus Visible | `2px solid var(--primary-light)` custom outline |
| Touch Targets | Minimum 44×44px on all interactive elements |
| Reduced Motion | `@media (prefers-reduced-motion)` disables all animation |
| High Contrast | `@media (forced-colors: active)` border fallbacks |
| Font Scaling | A+ / A− buttons scale `--font-scale` 0.8× → 1.4× |
| Color Contrast | All text ≥ 4.5:1 contrast ratio on dark background |
| Screen Reader | `role="article"` on chat messages, descriptive `aria-label` |
| Language | `lang="en"` on `<html>`, updated on language switch |

---

## 🧪 Testing

### Test Coverage Summary

```
tests/tests.js ─── 60+ assertions ─── 12 suites ─── 100% pass
```

| Suite | Assertions | What's Tested |
|-------|-----------|---------------|
| EligibilityService — Age | 8 | Boundaries: 0, 17, 18, 150, 151, null, negative |
| EligibilityService — Citizenship | 6 | Citizen, non-citizen, NRI, empty inputs |
| EligibilityService — Result Shape | 5 | steps[], message, description, step count |
| ChatbotService — Knowledge Base | 4 | KB structure, response type, empty, XSS input |
| ChatbotService — Response Quality | 5 | Keyword match for 5 core domains |
| Timeline — Data Integrity | 4 | Array, ≥3 items, parseable dates, sorted |
| Quiz — Structure | 9 | 5 questions, reset, 4 options, answer range |
| i18n — Completeness | 5 | EN/HI/KN keys, ≥10 keys, t() lookup, fallback |
| Security — sanitize() | 5 | `<script>`, `<img onerror>`, plain text, null |
| Security — validateAge() | 6 | Valid, negative, zero, >150, non-numeric, null |
| Security — validateText() | 6 | Valid, trim, empty, spaces, null, truncation |
| Security — rateLimit() | 2 | Caps at N, blocks N+1 |

### Running Tests

**Visual Browser UI (recommended):**
```
Open: tests/test-runner.html
Click: ▶ Run All Tests
View: Suite-by-suite pass/fail with progress bar
```

**Browser Console:**
```javascript
const s = document.createElement('script');
s.src = '../tests/tests.js';
document.head.appendChild(s);
// ✅ / ❌ printed to console
```

---

## 🚀 Deployment

### Local Development
```bash
git clone https://github.com/LALITHD-21/NagarikAI.git
cd NagarikAI

# Open directly (no build step needed)
start index.html          # Windows
open index.html           # macOS
```

### Docker — Local Container
```bash
# Build
docker build -t nagarikai .

# Run
docker run -p 8080:8080 nagarikai

# Visit
open http://localhost:8080

# Health check
curl http://localhost:8080/health
# → {"status":"ok","service":"nagarikai"}
```

### Google Cloud Run — Production
```bash
# 1. Authenticate
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# 2. Build & push
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/nagarikai

# 3. Deploy
gcloud run deploy nagarikai \
  --image gcr.io/YOUR_PROJECT_ID/nagarikai \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 256Mi \
  --min-instances 0 \
  --max-instances 10
```

### Dockerfile
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

---

## ⚡ Performance

| Metric | Value |
|--------|-------|
| Total Bundle Size | **< 10 MB** |
| JavaScript | ~35 KB (6 service files + controller) |
| CSS | ~29 KB (full design system) |
| HTML | ~22 KB (SPA shell) |
| Logo | ~180 KB (PNG, AI-generated) |
| External Dependencies | Google Fonts only (optional) |
| First Contentful Paint | **< 1.0s** on 4G |
| Time to Interactive | **< 1.5s** on 4G |
| Offline Support | ✅ Service Worker cache-first |

### Optimization Techniques
- **Lazy rendering** — DOM built only on navigation, not upfront
- **IntersectionObserver** — animations only fire on viewport entry
- **Canvas culling** — particles removed when off-screen
- **`debounce()`** — prevents excessive re-renders on input
- **nginx gzip** — level 6 compression on all text assets
- **Immutable caching** — `Cache-Control: public, immutable` for static assets
- **`loading="lazy"`** — Maps iframe deferred until visible

---

## 🗺️ Roadmap

| Status | Feature |
|--------|---------|
| ✅ | Context-aware AI chatbot (11 domains) |
| ✅ | Voter eligibility checker |
| ✅ | Google Maps booth finder (no API key) |
| ✅ | Google Calendar election reminder |
| ✅ | Multilingual: English, Hindi, Kannada |
| ✅ | PWA — installable, offline-ready |
| ✅ | Visual test runner (60+ assertions) |
| ✅ | CSP + HSTS + security headers |
| ✅ | WCAG 2.1 AA accessibility |
| ✅ | Docker + Cloud Run production deploy |
| ✅ | NagarikAI logo + premium rebrand |
| 🔜 | Gemini API live integration |
| 🔜 | Firebase Auth — cross-device profile sync |
| 🔜 | Tamil, Telugu, Malayalam support |
| 🔜 | Push notifications for election alerts |
| 🔜 | Real ECI voter roll API integration |
| 🔜 | Admin dashboard for election event management |

---

## 🤝 Contributing

```bash
# 1. Fork & Clone
git clone https://github.com/LALITHD-21/NagarikAI.git

# 2. Create feature branch
git checkout -b feat/your-feature-name

# 3. Make changes → Run tests
# Open tests/test-runner.html → all must pass ✅

# 4. Commit (conventional commits)
git commit -m "feat: add Tamil language support"

# 5. Push & open PR
git push origin feat/your-feature-name
```

**Commit Convention:**

| Prefix | Use Case |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | README / documentation |
| `style:` | CSS / UI changes |
| `test:` | Adding or updating tests |
| `refactor:` | Code restructuring |
| `chore:` | Build config, tooling |
| `brand:` | Logo / name / visual identity |

---

## 📄 License

```
MIT License — Copyright (c) 2026 NagarikAI / LALITHD-21

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies, subject to inclusion of the above copyright notice.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
```

---

## 🙏 Acknowledgements

| Resource | Purpose |
|----------|---------|
| [Election Commission of India](https://eci.gov.in) | Official election data |
| [voters.eci.gov.in](https://voters.eci.gov.in) | Voter registration portal |
| [Google Fonts — Inter](https://fonts.google.com/specimen/Inter) | Premium typography |
| [Google Maps Embed](https://developers.google.com/maps/documentation/embed) | Booth map |
| [Google Calendar](https://calendar.google.com) | Election reminder |
| [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) | Voice input |
| [Constitution of India](https://legislative.gov.in/constitution-of-india) | Civic data source |

---

<div align="center">

<img src="https://raw.githubusercontent.com/LALITHD-21/NagarikAI/master/logo.png" width="60" height="60" alt="NagarikAI" style="border-radius:14px; margin-bottom:8px"/>

### नागरिक AI · Built for Every Indian Voter

*"The vote is the most powerful nonviolent tool we have."* — John Lewis

<br/>

[![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-Zero_Frameworks-F7DF1E?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Custom CSS](https://img.shields.io/badge/Custom_CSS-840+_Lines-1572B6?style=flat-square&logo=css3)](index.css)
[![Cloud Run](https://img.shields.io/badge/Google_Cloud_Run-Deployed-4285F4?style=flat-square&logo=google-cloud)](https://cloud.google.com/run)
[![No Frameworks](https://img.shields.io/badge/No_Frameworks-Pure_Web-10B981?style=flat-square)](#)

<br/>

**[⭐ Star this repo](https://github.com/LALITHD-21/NagarikAI) · [🐛 Report Bug](https://github.com/LALITHD-21/NagarikAI/issues) · [💡 Request Feature](https://github.com/LALITHD-21/NagarikAI/issues)**

</div>
