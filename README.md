# CivicPulse AI — Smart Election Assistant

![CivicPulse AI](https://img.shields.io/badge/CivicPulse-AI%20Powered-6366F1?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Size](https://img.shields.io/badge/Size-%3C10MB-blue?style=for-the-badge)

## 🎯 Overview

**CivicPulse AI** is a smart, interactive civic assistant that educates users about the Indian election process. It provides step-by-step guidance, eligibility checking, polling booth finding, and an AI-powered chatbot — all in a premium, glassmorphic dark-themed UI.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🗳️ **Election Explainer** | Step-by-step breakdown of how elections work (with "Explain Like I'm 10" mode) |
| ✅ **Eligibility Checker** | Multi-step wizard to check voter eligibility with personalized results |
| 📝 **Registration Guide** | Complete voter registration walkthrough with official links |
| 📍 **Polling Booth Finder** | Location-based booth search with Google Maps integration |
| 📅 **Election Timeline** | Visual timeline with Google Calendar integration for reminders |
| 💬 **AI Chatbot** | Intelligent conversational assistant with voice input support |
| 🧠 **Quick Quiz** | Interactive knowledge quiz with scoring and explanations |
| 💡 **Myth vs Fact** | Debunk common election myths with verified facts |
| 🌐 **Multilingual** | English, Hindi (हिंदी), and Kannada (ಕನ್ನಡ) support |
| 🧑‍🦯 **Accessible** | WCAG 2.1 AA compliant, screen-reader friendly, large touch targets |

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Custom CSS with glassmorphism design system
- **Animations:** CSS animations + Canvas particle system
- **APIs:** Google Maps, Google Calendar, Web Speech API
- **Architecture:** Modular service-based structure
- **Size:** < 10MB total

## 📁 Project Structure

```
├── index.html              # Main entry point (SEO optimized)
├── index.css               # Complete design system + component styles
├── app.js                  # Main application controller
├── manifest.json           # PWA manifest
├── services/
│   ├── i18n.js             # Multilingual support (EN/HI/KN)
│   ├── eligibility.js      # Voter eligibility engine
│   ├── timeline.js         # Election timeline + calendar
│   ├── chatbot.js          # AI chatbot with knowledge base
│   ├── quiz.js             # Interactive quiz engine
│   ├── explainer.js        # Election explainer + registration + myths + booth
│   └── booth.js            # Booth service reference
├── utils/
│   ├── particles.js        # Animated background particles
│   └── helpers.js          # Sanitization, validation, accessibility
├── tests/
│   └── tests.js            # Unit tests for all services
└── README.md
```

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd civicpulse-ai
   ```

2. **Open directly in browser:**
   ```bash
   # No build step needed! Just open:
   open index.html
   # Or use any HTTP server:
   npx serve .
   ```

3. **Run tests:**
   Open browser console on index.html, then load `tests/tests.js` or include it in a test HTML page.

## 🧪 Testing

- **Unit tests** cover: Eligibility logic, timeline data, quiz engine, i18n, chatbot, and utility functions
- **Edge cases tested:** Age < 18, invalid inputs, missing data, non-citizen scenarios
- Run tests by opening the browser console — all test output is logged there

## 📐 Design Decisions

- **Glassmorphism UI** with indigo/violet/cyan gradient palette for a premium feel
- **Mobile-first** responsive design with bottom navigation
- **No external frameworks** — pure vanilla JS for minimal footprint
- **Service-based architecture** for clean separation of concerns
- **Progressive enhancement** — works without JS for basic content

## 🔐 Security

- All user inputs sanitized to prevent XSS
- No hardcoded API keys — environment variable ready
- Input validation on all form fields
- External links use `rel="noopener"` for security

## 🌐 Accessibility

- Semantic HTML5 elements throughout
- ARIA labels on all interactive elements
- Keyboard navigation support with focus trapping
- Screen-reader optimized with `aria-live` regions
- Minimum 44px touch targets
- High contrast color ratios

## 📋 Assumptions

- Target users are Indian citizens learning about elections
- Election data is based on 2026 election cycle
- Google Maps/Calendar links open in new tabs (no API key required for links)
- Voice input requires browser support (Chrome/Edge recommended)

## 📄 License

MIT License — Free to use, modify, and distribute.
