/* ===== CivicPulse AI — Main Application Controller ===== */
const App = {
  currentView: 'home',

  init() {
    // Language
    const lang = detectLanguage();
    setLanguage(lang);
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
      b.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        setLanguage(b.dataset.lang);
        this.refreshView();
      });
    });

    // Font Scaler
    let currentFontScale = 1;
    const applyFontScale = () => {
      document.documentElement.style.setProperty('--font-scale', currentFontScale);
    };
    document.getElementById('font-dec')?.addEventListener('click', () => {
      currentFontScale = Math.max(0.8, currentFontScale - 0.1);
      applyFontScale();
    });
    document.getElementById('font-inc')?.addEventListener('click', () => {
      currentFontScale = Math.min(1.4, currentFontScale + 0.1);
      applyFontScale();
    });

    // Navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => this.showView(btn.dataset.view));
    });

    // Feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('click', () => {
        const action = card.dataset.action;
        if (action === 'eligibility') this.showView('eligibility');
        else if (action === 'timeline') this.showView('timeline');
        else if (action === 'explainer') this.showView('explainer');
        else if (action === 'registration') this.showView('registration');
        else if (action === 'booth') this.showView('booth');
        else if (action === 'myths') this.showView('myths');
      });
    });

    // Eligibility flow
    this.initEligibility();

    // Profile
    this.initProfile();

    // Chat
    this.initChat();

    // Back buttons
    document.getElementById('explainer-back')?.addEventListener('click', () => this.showView('home'));
    document.getElementById('reg-back')?.addEventListener('click', () => this.showView('home'));
    document.getElementById('myths-back')?.addEventListener('click', () => this.showView('home'));
    document.getElementById('booth-back')?.addEventListener('click', () => this.showView('home'));

    // Particles
    initParticles();

    // Stagger card animations
    document.querySelectorAll('.feature-card').forEach((c, i) => {
      c.style.animationDelay = `${i * 0.07}s`;
      c.style.animation = 'fadeUp 0.5s ease backwards';
    });

    // 3D Card Tilt Effect
    document.querySelectorAll('.feature-card, .glass-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    // Magnetic buttons
    document.querySelectorAll('.primary-btn, .civic-badge, .nav-item').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
        btn.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });

    // Cursor glow logic
    const glow = document.getElementById('cursor-glow');
    if (glow) {
      document.addEventListener('mousemove', e => {
        glow.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      });
      document.addEventListener('mousedown', () => glow.classList.add('active'));
      document.addEventListener('mouseup', () => glow.classList.remove('active'));
    }

    // Start countdown
    this.initCountdown();
    // Load badges
    this.loadBadges();
    // Animate Stats
    this.animateStats();
  },

  showView(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const view = document.getElementById(`view-${id}`);
    if (view) {
      view.classList.add('active');
      this.currentView = id;
    }

    // Update nav
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.view === id);
    });

    // Lazy render
    if (id === 'timeline') TimelineService.render(document.getElementById('timeline-container'));
    if (id === 'quiz') { QuizService.init(); QuizService.render(document.getElementById('quiz-container')); }
    if (id === 'explainer') ExplainerService.render(document.getElementById('explainer-content'), false);
    if (id === 'registration') RegistrationService.render(document.getElementById('reg-content'));
    if (id === 'myths') MythsService.render(document.getElementById('myths-content'));
    if (id === 'booth') BoothService.render(document.getElementById('booth-content'));
    if (id === 'profile') this.loadProfile();
    if (id === 'chat') this.initChatWelcome();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  refreshView() {
    if (this.currentView === 'explainer') ExplainerService.render(document.getElementById('explainer-content'), false);
    if (this.currentView === 'registration') RegistrationService.render(document.getElementById('reg-content'));
    if (this.currentView === 'myths') MythsService.render(document.getElementById('myths-content'));
    if (this.currentView === 'booth') BoothService.render(document.getElementById('booth-content'));
  },

  /* ===== Gamification & Countdown ===== */
  initCountdown() {
    // Assuming next major election is May 2029
    const targetDate = new Date('May 15, 2029 08:00:00').getTime();
    
    const updateTime = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff <= 0) return;
      
      document.getElementById('cd-days').textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
      document.getElementById('cd-hours').textContent = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      document.getElementById('cd-mins').textContent = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      document.getElementById('cd-secs').textContent = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
    };
    updateTime();
    setInterval(updateTime, 1000);
  },

  loadBadges() {
    const badges = JSON.parse(localStorage.getItem('civic_badges')) || {};
    if (badges.eligible) document.getElementById('badge-eligible')?.classList.remove('locked');
    if (badges.quiz) document.getElementById('badge-quiz')?.classList.remove('locked');
    if (badges.myths) document.getElementById('badge-myths')?.classList.remove('locked');
    if (badges.chat) document.getElementById('badge-chat')?.classList.remove('locked');
  },

  unlockBadge(badgeId) {
    const badges = JSON.parse(localStorage.getItem('civic_badges')) || {};
    if (!badges[badgeId]) {
      badges[badgeId] = true;
      localStorage.setItem('civic_badges', JSON.stringify(badges));
      document.getElementById(`badge-${badgeId}`)?.classList.remove('locked');
      this.showToast(`🎉 New Badge Unlocked!`);
      if (typeof fireConfetti === 'function') fireConfetti();
    }
  },

  animateStats() {
    const stats = [
      { id: 'stat-voters', end: 96.8, suffix: 'Cr' },
      { id: 'stat-booths', end: 10.5, suffix: 'L' },
      { id: 'stat-turnout', end: 67.4, suffix: '%' }
    ];
    
    stats.forEach(stat => {
      const el = document.getElementById(stat.id);
      if (!el) return;
      let start = 0;
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = stat.end / steps;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= stat.end) {
          start = stat.end;
          clearInterval(timer);
        }
        el.textContent = start.toFixed(1) + stat.suffix;
      }, stepTime);
    });
  },

  /* ===== Eligibility ===== */
  eligStep: 1,
  initEligibility() {
    const ageInput = document.getElementById('elig-age');
    document.getElementById('age-dec')?.addEventListener('click', () => {
      const v = parseInt(ageInput.value) || 18;
      ageInput.value = Math.max(1, v - 1);
    });
    document.getElementById('age-inc')?.addEventListener('click', () => {
      const v = parseInt(ageInput.value) || 18;
      ageInput.value = Math.min(120, v + 1);
    });
    document.getElementById('elig-next-1')?.addEventListener('click', () => this.goEligStep(2));
    document.getElementById('elig-next-2')?.addEventListener('click', () => this.goEligStep(3));
    document.getElementById('elig-back-2')?.addEventListener('click', () => this.goEligStep(1));
    document.getElementById('elig-back-3')?.addEventListener('click', () => this.goEligStep(2));
    document.getElementById('elig-check')?.addEventListener('click', () => this.checkEligibility());
  },

  goEligStep(step) {
    this.eligStep = step;
    document.querySelectorAll('.elig-step').forEach(s => s.classList.toggle('active', parseInt(s.dataset.step) === step));
    const progress = document.getElementById('elig-progress');
    const text = document.getElementById('elig-step');
    if (progress) progress.style.width = `${(step / 3) * 100}%`;
    if (text) text.textContent = `Step ${step} of 3`;
    document.getElementById('elig-result')?.classList.add('hidden');
  },

  checkEligibility() {
    const age = validateAge(document.getElementById('elig-age')?.value);
    if (!age) { this.showToast('Please enter a valid age'); return; }
    const citizen = document.querySelector('input[name="citizen"]:checked')?.value || '';
    const state = document.getElementById('elig-state')?.value || '';
    const result = EligibilityService.check(age, citizen, state);
    const container = document.getElementById('elig-result');
    document.querySelectorAll('.elig-step').forEach(s => s.classList.remove('active'));
    EligibilityService.renderResult(result, container);
    this.unlockBadge('eligible');
  },

  /* ===== Profile ===== */
  initProfile() {
    const form = document.getElementById('profile-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const profile = {
          name: document.getElementById('profile-name').value.trim(),
          age: document.getElementById('profile-age').value.trim(),
          state: document.getElementById('profile-state').value,
          district: document.getElementById('profile-district').value.trim()
        };
        localStorage.setItem('civic_profile', JSON.stringify(profile));
        this.showToast('Profile saved successfully! 🎉');
        
        // Update eligibility default state/age if available
        if (profile.age) {
          const ageInput = document.getElementById('elig-age');
          if (ageInput) ageInput.value = profile.age;
        }
        if (profile.state) {
          const stateInput = document.getElementById('elig-state');
          if (stateInput) stateInput.value = profile.state;
        }
      });
    }
  },

  loadProfile() {
    const profile = JSON.parse(localStorage.getItem('civic_profile'));
    if (profile) {
      if (profile.name) {
        document.getElementById('profile-name').value = profile.name;
        const titleEl = document.querySelector('#view-profile .view-header h2');
        if (titleEl) titleEl.textContent = `Welcome, ${profile.name.split(' ')[0]} ✨`;
      }
      if (profile.age) document.getElementById('profile-age').value = profile.age;
      if (profile.state) document.getElementById('profile-state').value = profile.state;
      if (profile.district) document.getElementById('profile-district').value = profile.district;
    }
  },

  /* ===== Chat ===== */
  chatInitialized: false,
  ttsEnabled: false,
  initChat() {
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const voiceBtn = document.getElementById('chat-voice');
    const ttsBtn = document.getElementById('chat-tts-toggle');

    sendBtn?.addEventListener('click', () => this.sendChat());
    input?.addEventListener('keydown', e => { if (e.key === 'Enter') this.sendChat(); });
    voiceBtn?.addEventListener('click', () => this.startVoice());
    
    ttsBtn?.addEventListener('click', () => {
      this.ttsEnabled = !this.ttsEnabled;
      ttsBtn.classList.toggle('active', this.ttsEnabled);
      if (this.ttsEnabled) {
        ttsBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>';
      } else {
        ttsBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
        if (window.speechSynthesis) window.speechSynthesis.cancel();
      }
      this.showToast(this.ttsEnabled ? 'Voice responses enabled' : 'Voice responses disabled');
    });
  },

  initChatWelcome() {
    if (this.chatInitialized) return;
    this.chatInitialized = true;
    const container = document.getElementById('chat-messages');
    const welcomeMsg = typeof t === 'function' ? t('chat.welcome') : "Hi! I'm CivicPulse AI. Ask me anything about the Indian election process.";
    ChatbotService.addMessage(container, welcomeMsg, false);
    ChatbotService.renderSuggestions(document.getElementById('chat-suggestions'));
    this.speak(welcomeMsg);
    this.unlockBadge('chat');
  },

  sendChat() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    const container = document.getElementById('chat-messages');
    ChatbotService.addMessage(container, typeof sanitize === 'function' ? sanitize(msg) : msg, true);
    const typing = ChatbotService.showTyping(container);
    setTimeout(() => {
      ChatbotService.removeTyping();
      const response = ChatbotService.getResponse(msg);
      ChatbotService.addMessage(container, response, false);
      ChatbotService.renderSuggestions(document.getElementById('chat-suggestions'));
      this.speak(response);
    }, 600 + Math.random() * 400);
  },

  speak(text) {
    if (!this.ttsEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/([⭐📍✔️✅📋🗳️🏛️🏢🏘️🔒📊🔋👤📅⚖️💪🇮🇳📢])/g, '').replace(/\*/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const lang = document.querySelector('.lang-btn.active')?.dataset.lang || 'en';
    utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'kn' ? 'kn-IN' : 'en-IN';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  },

  handleSuggestion(text) {
    document.getElementById('chat-input').value = text;
    this.sendChat();
  },

  startVoice() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { this.showToast('Voice input not supported in this browser'); return; }
    const recognition = new SR();
    recognition.lang = currentLang === 'hi' ? 'hi-IN' : currentLang === 'kn' ? 'kn-IN' : 'en-IN';
    recognition.interimResults = false;
    const btn = document.getElementById('chat-voice');
    btn.classList.add('recording');
    recognition.start();
    recognition.onresult = e => {
      const text = e.results[0][0].transcript;
      document.getElementById('chat-input').value = text;
      btn.classList.remove('recording');
      this.sendChat();
    };
    recognition.onerror = () => { btn.classList.remove('recording'); this.showToast('Voice input failed. Try again.'); };
    recognition.onend = () => btn.classList.remove('recording');
  },

  showToast(msg) { showToast(msg); }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW registration failed:', err));
  }
  
  // Global interaction sounds
  document.body.addEventListener('click', e => {
    const target = e.target.closest('button, .feature-card, .radio-option, .suggestion-chip');
    if (target) {
      if (typeof playPopSound === 'function') playPopSound();
    }
  });
});
