/* ===== CivicPulse AI — Smart Chatbot Service ===== */
'use strict';

const ChatbotService = {
  // ── Conversation context ────────────────────────────────────────────────
  context: [],          // rolling window of last 6 turns
  userProfile: null,    // loaded from localStorage

  /** Pull saved profile to personalize responses */
  loadContext() {
    try {
      this.userProfile = JSON.parse(localStorage.getItem('civic_profile')) || null;
    } catch (_) { this.userProfile = null; }
  },

  // ── Knowledge base ──────────────────────────────────────────────────────
  knowledgeBase: {
    election:
      'Elections are how citizens choose their representatives.\n\n' +
      '🏛️ **Lok Sabha** — Every 5 yrs, 543 seats (national)\n' +
      '🏢 **Vidhan Sabha** — State-level assemblies\n' +
      '🏘️ **Local Body** — Panchayat & Municipal\n\n' +
      'Every Indian citizen aged 18+ can vote. Next Lok Sabha election: 2029.',

    voting:
      'Voting is simple — just 6 steps:\n\n' +
      '1️⃣ Verify your name on voters.eci.gov.in\n' +
      '2️⃣ Visit your assigned polling booth (7 AM – 6 PM)\n' +
      '3️⃣ Carry voter ID (EPIC) or any approved ID\n' +
      '4️⃣ Get your finger inked\n' +
      '5️⃣ Press the EVM button for your candidate\n' +
      '6️⃣ Verify on VVPAT slip\n\n' +
      '💡 Tip: SMS "EPIC <number>" to **1950** to get your booth details.',

    register:
      'To register as a voter:\n\n' +
      '**Online** → voters.eci.gov.in → Form 6\n' +
      '**Offline** → Nearest ERO office\n\n' +
      '📄 Documents needed:\n' +
      '• Age proof (Aadhaar / school cert)\n' +
      '• Address proof (utility bill / Aadhaar)\n' +
      '• Passport-size photo\n\n' +
      '⏱️ Processing takes ~15–30 days. Deadline is usually 30 days before election.',

    evm:
      '**EVM (Electronic Voting Machine)** — India\'s secure voting device.\n\n' +
      '🔒 Standalone — no internet, no network connection\n' +
      '📋 VVPAT — paper trail lets you verify your vote\n' +
      '🔋 Battery operated — works without electricity\n' +
      '✅ One press = one vote — cannot vote twice\n\n' +
      'Used since 1999 across India.',

    nota:
      '**NOTA (None of the Above)** was added in 2013 after a Supreme Court ruling.\n\n' +
      '• Lets you reject all candidates on the ballot\n' +
      '• NOTA votes are counted and published officially\n' +
      '• Even if NOTA wins, the candidate with next-highest votes wins\n' +
      '• Sends a strong message to political parties',

    eligibility:
      'To vote in India, you must:\n\n' +
      '✅ Be an **Indian citizen** (or NRI with Form 6A)\n' +
      '✅ Be **18 years or older** on Jan 1 of the qualifying year\n' +
      '✅ Be a **resident** of the constituency\n' +
      '✅ Not be disqualified under any law\n\n' +
      '→ Use the **Eligibility Checker** tab to get your personalised result!',

    booth:
      'Find your polling booth:\n\n' +
      '🌐 **Online:** voters.eci.gov.in → Search by EPIC / name\n' +
      '📱 **SMS:** EPIC <number> → **1950**\n' +
      '📞 **Helpline:** 1800-111-950 (toll-free)\n\n' +
      '→ Tap the **Booth Finder** tab for an interactive map search.',

    eci:
      '**Election Commission of India (ECI)** — autonomous constitutional body.\n\n' +
      '👤 Headed by the Chief Election Commissioner\n' +
      '📅 Announces election dates & Model Code of Conduct\n' +
      '📋 Manages voter registration & EVMs\n' +
      '⚖️ Ensures free and fair elections since 1950\n\n' +
      '🌐 Website: eci.gov.in',

    'why vote':
      'Why vote? Because **every single vote shapes India\'s future.**\n\n' +
      '🗳️ Close elections are won by thin margins — your vote counts\n' +
      '🏛️ You elect leaders who decide budgets, laws, and your future\n' +
      '📢 Non-voters empower others to decide for them\n' +
      '🌟 Highest turnout districts get better development priority\n\n' +
      '"The vote is the most powerful nonviolent tool we have." — John Lewis',

    model_code:
      '**Model Code of Conduct (MCC)** kicks in once elections are announced.\n\n' +
      '• No new govt schemes can be announced\n' +
      '• Parties cannot use govt resources for campaigning\n' +
      '• Polling day is a paid holiday\n' +
      '• Voter bribery is a criminal offence\n\n' +
      'Violations can be reported to 1800-111-950.',

    documents:
      'Accepted photo IDs at polling booths (any one):\n\n' +
      '🪪 Voter ID (EPIC card)\n' +
      '🆔 Aadhaar Card\n' +
      '🏦 Bank / Post Office passbook with photo\n' +
      '🚗 Driving License\n' +
      '📘 Passport\n' +
      '📋 MNREGA Job Card\n\n' +
      'Even if your name isn\'t on the VVPAT, the ink mark proves you voted.',
  },

  suggestions: [
    'How do elections work?', 'Am I eligible to vote?',
    'How to register?',       'What is NOTA?',
    'Find my polling booth',  'What is EVM?',
    'Why should I vote?',     'What is Model Code of Conduct?',
  ],

  // ── Decision-tree response engine ────────────────────────────────────────
  getResponse(input) {
    if (typeof input !== 'string' || !input.trim()) {
      return 'Please type a question and I\'ll help you! 🗳️';
    }

    const q = input.toLowerCase().trim();

    // ── Greetings ─────────────────────────────────────────────────────────
    if (/^(hi|hello|hey|namaste|namaskar|hola|howdy)/.test(q)) {
      const name = this.userProfile?.name ? `, ${this.userProfile.name.split(' ')[0]}` : '';
      return `Namaste${name}! 🙏 I'm CivicPulse AI — your smart election guide.\n\nI can help you with:\n🗳️ How elections work\n✅ Voter eligibility\n📝 Registration steps\n📍 Finding your booth\n💡 Myths vs Facts\n\nWhat would you like to know?`;
    }

    // ── Personalised context: user has a state saved ──────────────────────
    const state = this.userProfile?.state;

    // ── Keyword matching (ordered by specificity) ─────────────────────────
    if (/model code|mcc|conduct/.test(q))          return this.knowledgeBase['model_code'];
    if (/document|id proof|what.*bring|id.*booth/.test(q)) return this.knowledgeBase['documents'];
    if (/nota|none.*above|reject.*candidate/.test(q)) return this.knowledgeBase['nota'];
    if (/evm|electronic.*machine|voting machine/.test(q)) return this.knowledgeBase['evm'];
    if (/eci|election commission/.test(q))          return this.knowledgeBase['eci'];
    if (/why.*vote|importance|matter|should i/.test(q)) return this.knowledgeBase['why vote'];
    if (/register|enroll|sign up|form 6|epic card/.test(q)) return this.knowledgeBase['register'];
    if (/booth|station|polling|where.*vote/.test(q)) {
      const base = this.knowledgeBase['booth'];
      return state ? `${base}\n\n📍 Your state: **${state}** — use the Booth Finder tab for a map search!` : base;
    }
    if (/eligib|can i vote|qualify|age.*vote/.test(q)) {
      const age = this.userProfile?.age;
      if (age) {
        const ageNum = parseInt(age, 10);
        if (ageNum >= 18) return `Based on your profile (age ${ageNum}), you **are eligible** to vote! ✅\n\n${this.knowledgeBase['eligibility']}`;
        return `Based on your profile (age ${ageNum}), you are **not yet eligible** — you need to be 18. You\'ll be eligible in ${18 - ageNum} year(s)! 📅\n\nIn the meantime, explore the Election Explainer to learn how it all works.`;
      }
      return this.knowledgeBase['eligibility'];
    }
    if (/how.*vote|voting process|step.*vote/.test(q)) return this.knowledgeBase['voting'];
    if (/type.*election|kind.*election|lok sabha|vidhan|local body/.test(q)) return this.knowledgeBase['election'];
    if (/election|how.*work/.test(q))                return this.knowledgeBase['election'];

    // ── Gratitude ─────────────────────────────────────────────────────────
    if (/thank|thanks|great|awesome|helpful/.test(q)) {
      return 'You\'re welcome! 😊 Democracy works best when citizens are informed. Any other questions? 🗳️';
    }

    // ── Help menu ──────────────────────────────────────────────────────────
    if (/help|menu|what can you|options/.test(q)) {
      return 'Here\'s what I can help with:\n\n🗳️ **Elections** — types & process\n✅ **Eligibility** — can you vote?\n📝 **Registration** — how to register\n📍 **Polling Booth** — find yours\n🪪 **Documents** — what to carry\n⚖️ **Model Code of Conduct**\n🔴 **NOTA** — what it means\n💡 **Myths vs Facts** — debunking\n\nJust ask naturally!';
    }

    // ── Fallback ──────────────────────────────────────────────────────────
    this._pushContext(q, null);
    return 'I\'m not sure about that — but I\'m great at election topics! Try asking:\n\n• "How do I register to vote?"\n• "What ID do I need at the booth?"\n• "What is NOTA?"\n• "Am I eligible to vote?"\n\nOr tap a suggestion below. 👇';
  },

  _pushContext(q, ans) {
    this.context.push({ q, ans, ts: Date.now() });
    if (this.context.length > 6) this.context.shift();
  },

  // ── DOM helpers ──────────────────────────────────────────────────────────
  addMessage(container, text, isUser) {
    const div = document.createElement('div');
    div.className = `msg ${isUser ? 'user' : 'bot'}`;
    div.setAttribute('role', 'article');
    div.setAttribute('aria-label', isUser ? 'Your message' : 'CivicPulse AI response');
    container.appendChild(div);

    // Sanitize then allow safe markdown subset for bot messages
    const safe = isUser ? sanitize(text) : renderSafeMarkdown(text);

    if (isUser) {
      div.innerHTML = safe;
      container.scrollTop = container.scrollHeight;
      return;
    }

    // Typing stream for bot
    let i = 0;
    div.innerHTML = '';
    const chars = [...safe]; // spread handles multi-byte chars
    const interval = setInterval(() => {
      // consume HTML tags as atomic units
      if (chars[i] === '<') {
        let tag = '';
        while (i < chars.length && chars[i] !== '>') { tag += chars[i]; i++; }
        tag += '>'; i++;
        div.innerHTML += tag;
      } else {
        div.innerHTML += chars[i] || '';
        i++;
      }
      container.scrollTop = container.scrollHeight;
      if (i >= chars.length) clearInterval(interval);
    }, 12);
  },

  showTyping(container) {
    const div = document.createElement('div');
    div.className = 'msg bot msg-typing';
    div.id = 'typing-indicator';
    div.setAttribute('aria-label', 'CivicPulse AI is typing');
    div.setAttribute('aria-live', 'polite');
    div.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
  },

  removeTyping() {
    document.getElementById('typing-indicator')?.remove();
  },

  renderSuggestions(container, suggestions) {
    const chips = suggestions || [...this.suggestions].sort(() => 0.5 - Math.random()).slice(0, 4);
    container.innerHTML = chips.map((s, i) =>
      `<button class="suggestion-chip" style="animation-delay:${i * 0.08}s"
         onclick="App.handleSuggestion(${JSON.stringify(s)})"
         aria-label="Suggest: ${sanitize(s)}">${sanitize(s)}</button>`
    ).join('');
  },
};
