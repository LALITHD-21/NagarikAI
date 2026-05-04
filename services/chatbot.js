/* ===== Chatbot Service ===== */
const ChatbotService = {
  context: [],
  
  knowledgeBase: {
    'election': 'Elections are the process by which citizens choose their representatives. In India, we have 3 main types:\n\n🏛️ **Lok Sabha** (Parliamentary) - Every 5 years, 543 seats\n🏢 **Vidhan Sabha** (State Assembly) - State-level elections\n🏘️ **Local Body** - Panchayat & Municipal elections\n\nEvery citizen aged 18+ can vote!',
    'voting': 'Voting in India is simple:\n\n1️⃣ Check your name on the voter list\n2️⃣ Visit your assigned polling booth on election day\n3️⃣ Carry your voter ID (EPIC) or approved ID\n4️⃣ Get your finger inked\n5️⃣ Press the button on the EVM for your candidate\n6️⃣ Verify on VVPAT slip\n\nVoting hours are typically 7 AM to 6 PM.',
    'register': 'To register as a voter:\n\n📋 **Online:** Visit voters.eci.gov.in → Fill Form 6\n📋 **Offline:** Visit your nearest ERO office\n\n**Documents needed:**\n• Age proof (birth certificate, school certificate)\n• Address proof (Aadhaar, utility bill)\n• Passport-size photo\n\nProcessing takes about 15-30 days.',
    'evm': 'The EVM (Electronic Voting Machine) is a portable device used for voting in India.\n\n🔒 **Security:** Standalone device, not connected to any network\n📊 **VVPAT:** A paper trail verifies your vote\n🔋 **Battery operated:** Works without electricity\n✅ **One press = One vote:** Cannot vote twice\n\nEVMs have been used since 1999.',
    'nota': 'NOTA (None of the Above) is an option on the EVM.\n\n• Added in 2013 after Supreme Court order\n• Allows you to reject all candidates\n• NOTA votes are counted but don\'t affect results\n• Even if NOTA gets most votes, the candidate with next highest votes wins',
    'eligibility': 'To be eligible to vote in India:\n\n✅ Must be an Indian citizen\n✅ Must be 18 years or older on Jan 1 of the qualifying year\n✅ Must be a resident of the constituency\n✅ Must not be disqualified under any law\n\n🌐 NRIs can also vote (must be present in constituency).',
    'booth': 'To find your polling booth:\n\n1️⃣ Visit voters.eci.gov.in\n2️⃣ Enter your EPIC number or details\n3️⃣ Your polling station will be shown\n\nOr SMS: EPIC <your_number> to 1950\n\nOn election day, look for the ECI signage near your local school or community center.',
    'eci': 'The Election Commission of India (ECI) is an autonomous constitutional body responsible for administering elections.\n\n👤 Led by the Chief Election Commissioner\n📅 Announces election dates and schedules\n📋 Manages voter registration\n⚖️ Enforces the Model Code of Conduct\n🗳️ Ensures free and fair elections',
    'why vote': 'Why should you vote?\n\n🗳️ **Your voice matters** - Every vote counts\n🏛️ **Shape policy** - Elect leaders who represent your views\n📢 **Hold accountability** - Vote out non-performing leaders\n🇮🇳 **Democratic duty** - Strengthen India\'s democracy\n💪 **Empower change** - Be part of the solution\n\nRemember: If you don\'t vote, someone else decides for you!',
  },

  suggestions: [
    'How do elections work?', 'Check my eligibility',
    'How to register?', 'What is EVM?',
    'Why should I vote?', 'Find polling booth',
    'What is NOTA?', 'About ECI'
  ],

  getResponse(input) {
    const q = input.toLowerCase().trim();
    
    // Match against knowledge base
    for (const [key, answer] of Object.entries(this.knowledgeBase)) {
      if (q.includes(key)) return answer;
    }

    // Pattern matching
    if (q.match(/hi|hello|hey|namaste/)) return t('chat.welcome');
    if (q.match(/age|18|eligible|can i vote/)) return this.knowledgeBase['eligibility'];
    if (q.match(/how.*vote|voting process|how.*election/)) return this.knowledgeBase['voting'];
    if (q.match(/register|sign up|form 6|enrollment/)) return this.knowledgeBase['register'];
    if (q.match(/where.*vote|polling|booth|station/)) return this.knowledgeBase['booth'];
    if (q.match(/what.*election|type.*election|kind/)) return this.knowledgeBase['election'];
    if (q.match(/evm|machine|electronic/)) return this.knowledgeBase['evm'];
    if (q.match(/nota|none.*above|reject/)) return this.knowledgeBase['nota'];
    if (q.match(/commission|eci/)) return this.knowledgeBase['eci'];
    if (q.match(/why.*vote|important|matter/)) return this.knowledgeBase['why vote'];
    if (q.match(/thank|thanks|ok|great/)) return "You're welcome! 😊 Feel free to ask anything else about elections. Democracy works best when citizens are informed!";
    if (q.match(/help/)) return "I can help you with:\n\n🗳️ Election process explained\n✅ Voter eligibility check\n📝 Registration guide\n📍 Polling booth finder\n📅 Election timeline\n💡 Myths vs Facts\n\nWhat would you like to know?";
    
    return "I'm not sure about that specific question, but I can help with:\n\n• How elections work\n• Voter eligibility\n• Registration process\n• Finding your polling booth\n• Election timeline\n\nTry asking about any of these topics! 🗳️";
  },

  addMessage(container, text, isUser) {
    const div = document.createElement('div');
    div.className = `msg ${isUser ? 'user' : 'bot'}`;
    container.appendChild(div);

    const htmlContent = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    if (isUser) {
      div.innerHTML = htmlContent;
      container.scrollTop = container.scrollHeight;
    } else {
      let i = 0;
      div.innerHTML = '';
      const interval = setInterval(() => {
        if (htmlContent[i] === '<') {
          const endIdx = htmlContent.indexOf('>', i);
          if (endIdx !== -1) {
            div.innerHTML += htmlContent.slice(i, endIdx + 1);
            i = endIdx + 1;
          } else {
            div.innerHTML += htmlContent[i];
            i++;
          }
        } else {
          div.innerHTML += htmlContent[i];
          i++;
        }
        container.scrollTop = container.scrollHeight;
        if (i >= htmlContent.length) {
          clearInterval(interval);
        }
      }, 15); // Fast typing speed
    }
  },

  showTyping(container) {
    const div = document.createElement('div');
    div.className = 'msg bot msg-typing';
    div.id = 'typing-indicator';
    div.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
  },

  removeTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  },

  renderSuggestions(container, suggestions) {
    let selected = suggestions || [...this.suggestions].sort(() => 0.5 - Math.random()).slice(0, 4);
    container.innerHTML = selected.map((s, i) =>
      `<button class="suggestion-chip" style="animation: fadeUp 0.4s ease backwards ${i * 0.1}s" onclick="App.handleSuggestion('${s.replace(/'/g, "\\'")}')">${s}</button>`
    ).join('');
  }
};
