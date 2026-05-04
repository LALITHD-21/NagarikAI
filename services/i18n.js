/* ===== Internationalization Service ===== */
const I18N = {
  en: {
    'nav.home': 'Home', 'nav.chat': 'Chat', 'nav.eligibility': 'Eligibility',
    'nav.timeline': 'Timeline', 'nav.quiz': 'Quiz',
    'home.subtitle': 'Your Smart Election Guide — Learn, Check & Vote with Confidence',
    'home.explainer': 'Election Explainer', 'home.explainerDesc': 'Learn how elections work step-by-step',
    'home.eligibility': 'Eligibility Check', 'home.eligibilityDesc': 'Find out if you can vote today',
    'home.registration': 'Registration Guide', 'home.registrationDesc': 'Step-by-step voter registration',
    'home.booth': 'Polling Booth Finder', 'home.boothDesc': 'Locate your nearest polling station',
    'home.timeline': 'Election Timeline', 'home.timelineDesc': 'Key dates and deadlines',
    'home.myths': 'Myth vs Fact', 'home.mythsDesc': 'Bust common election myths',
    'home.statVoters': 'Registered Voters', 'home.statBooths': 'Polling Stations', 'home.statTurnout': 'Avg Turnout',
    'chat.online': 'Online', 'chat.placeholder': 'Ask me anything about elections...',
    'chat.welcome': "Hi! 👋 I'm CivicPulse AI, your smart election guide. How can I help you today?",
    'eligibility.title': 'Check Your Eligibility', 'eligibility.ageLabel': 'How old are you?',
    'eligibility.citizenLabel': 'Are you an Indian citizen?',
    'eligibility.yes': 'Yes, Indian Citizen', 'eligibility.nri': 'NRI (Non-Resident Indian)', 'eligibility.no': 'No',
    'eligibility.stateLabel': 'Select your State/UT',
    'eligibility.next': 'Next →', 'eligibility.back': '← Back', 'eligibility.check': 'Check Eligibility ✓',
    'eligibility.eligible': "🎉 You're Eligible to Vote!",
    'eligibility.eligibleDesc': 'Great news! You meet all the requirements to vote in Indian elections.',
    'eligibility.notEligibleAge': '⚠️ Not Yet Eligible',
    'eligibility.notEligibleAgeDesc': 'You need to be at least 18 years old to vote. You can still learn about the process!',
    'eligibility.notEligibleCitizen': '❌ Not Eligible',
    'eligibility.notEligibleCitizenDesc': 'Only Indian citizens can vote in Indian elections.',
    'eligibility.nriEligible': '🌐 NRI Voter - Eligible!',
    'eligibility.nriDesc': 'As an NRI, you can vote! You need to register as an overseas elector.',
    'timeline.title': 'Election Timeline 2026', 'quiz.title': 'Test Your Knowledge',
    'explainer.title': 'How Elections Work', 'registration.title': 'Voter Registration Guide',
    'myths.title': 'Myth vs Fact', 'booth.title': 'Find Your Polling Booth',
    'booth.placeholder': 'Enter your area or PIN code...',
  },
  hi: {
    'nav.home': 'होम', 'nav.chat': 'चैट', 'nav.eligibility': 'पात्रता',
    'nav.timeline': 'समयरेखा', 'nav.quiz': 'क्विज़',
    'home.subtitle': 'आपका स्मार्ट चुनाव गाइड — सीखें, जांचें और विश्वास से वोट करें',
    'home.explainer': 'चुनाव प्रक्रिया', 'home.explainerDesc': 'चुनाव कैसे काम करता है, चरण-दर-चरण जानें',
    'home.eligibility': 'पात्रता जांच', 'home.eligibilityDesc': 'पता करें कि क्या आप आज वोट कर सकते हैं',
    'home.registration': 'पंजीकरण गाइड', 'home.registrationDesc': 'चरण-दर-चरण मतदाता पंजीकरण',
    'home.booth': 'मतदान केंद्र खोजें', 'home.boothDesc': 'निकटतम मतदान केंद्र खोजें',
    'home.timeline': 'चुनाव समयरेखा', 'home.timelineDesc': 'महत्वपूर्ण तिथियां',
    'home.myths': 'मिथक बनाम तथ्य', 'home.mythsDesc': 'चुनाव के मिथकों को तोड़ें',
    'home.statVoters': 'पंजीकृत मतदाता', 'home.statBooths': 'मतदान केंद्र', 'home.statTurnout': 'औसत मतदान',
    'chat.online': 'ऑनलाइन', 'chat.placeholder': 'चुनाव के बारे में कुछ भी पूछें...',
    'chat.welcome': 'नमस्ते! 👋 मैं सिविकपल्स AI हूं। मैं आपकी कैसे मदद कर सकता हूं?',
    'eligibility.title': 'पात्रता जांचें', 'eligibility.ageLabel': 'आपकी उम्र क्या है?',
    'eligibility.citizenLabel': 'क्या आप भारतीय नागरिक हैं?',
    'eligibility.yes': 'हां, भारतीय नागरिक', 'eligibility.nri': 'NRI (अनिवासी भारतीय)', 'eligibility.no': 'नहीं',
    'eligibility.stateLabel': 'अपना राज्य चुनें',
    'eligibility.next': 'अगला →', 'eligibility.back': '← पीछे', 'eligibility.check': 'पात्रता जांचें ✓',
    'eligibility.eligible': '🎉 आप वोट देने के पात्र हैं!',
    'eligibility.eligibleDesc': 'बधाई! आप भारतीय चुनावों में वोट देने की सभी आवश्यकताओं को पूरा करते हैं।',
    'eligibility.notEligibleAge': '⚠️ अभी पात्र नहीं',
    'eligibility.notEligibleAgeDesc': 'वोट देने के लिए आपकी उम्र कम से कम 18 वर्ष होनी चाहिए।',
    'eligibility.notEligibleCitizen': '❌ पात्र नहीं',
    'eligibility.notEligibleCitizenDesc': 'केवल भारतीय नागरिक ही भारतीय चुनावों में वोट कर सकते हैं।',
    'timeline.title': 'चुनाव समयरेखा 2026', 'quiz.title': 'अपना ज्ञान परखें',
    'explainer.title': 'चुनाव कैसे काम करता है', 'registration.title': 'मतदाता पंजीकरण गाइड',
    'myths.title': 'मिथक बनाम तथ्य', 'booth.title': 'अपना मतदान केंद्र खोजें',
    'booth.placeholder': 'अपना क्षेत्र या पिन कोड दर्ज करें...',
  },
  kn: {
    'nav.home': 'ಮನೆ', 'nav.chat': 'ಚಾಟ್', 'nav.eligibility': 'ಅರ್ಹತೆ',
    'nav.timeline': 'ಟೈಮ್‌ಲೈನ್', 'nav.quiz': 'ಕ್ವಿಜ್',
    'home.subtitle': 'ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಚುನಾವಣಾ ಮಾರ್ಗದರ್ಶಿ — ಕಲಿಯಿರಿ, ಪರಿಶೀಲಿಸಿ ಮತ್ತು ವಿಶ್ವಾಸದಿಂದ ಮತ ಹಾಕಿ',
    'home.explainer': 'ಚುನಾವಣಾ ವಿವರಣೆ', 'home.explainerDesc': 'ಚುನಾವಣೆಗಳು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತವೆ ಎಂದು ತಿಳಿಯಿರಿ',
    'home.eligibility': 'ಅರ್ಹತೆ ಪರಿಶೀಲನೆ', 'home.eligibilityDesc': 'ನೀವು ಮತ ಹಾಕಬಹುದೇ ಎಂದು ತಿಳಿಯಿರಿ',
    'home.registration': 'ನೋಂದಣಿ ಮಾರ್ಗದರ್ಶಿ', 'home.registrationDesc': 'ಹಂತ-ಹಂತವಾಗಿ ಮತದಾರ ನೋಂದಣಿ',
    'home.booth': 'ಮತದಾನ ಕೇಂದ್ರ ಹುಡುಕಿ', 'home.boothDesc': 'ಹತ್ತಿರದ ಮತದಾನ ಕೇಂದ್ರ ಹುಡುಕಿ',
    'home.timeline': 'ಚುನಾವಣಾ ಟೈಮ್‌ಲೈನ್', 'home.timelineDesc': 'ಪ್ರಮುಖ ದಿನಾಂಕಗಳು',
    'home.myths': 'ಮಿಥ್ vs ಫ್ಯಾಕ್ಟ್', 'home.mythsDesc': 'ಚುನಾವಣಾ ಮಿಥ್‌ಗಳನ್ನು ಒಡೆಯಿರಿ',
    'chat.online': 'ಆನ್‌ಲೈನ್', 'chat.placeholder': 'ಚುನಾವಣೆ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ...',
    'chat.welcome': 'ನಮಸ್ಕಾರ! 👋 ನಾನು ಸಿವಿಕ್‌ಪಲ್ಸ್ AI. ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    'eligibility.title': 'ನಿಮ್ಮ ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ', 'eligibility.ageLabel': 'ನಿಮ್ಮ ವಯಸ್ಸು ಎಷ್ಟು?',
    'eligibility.citizenLabel': 'ನೀವು ಭಾರತೀಯ ನಾಗರಿಕರೇ?',
    'eligibility.yes': 'ಹೌದು, ಭಾರತೀಯ ನಾಗರಿಕ', 'eligibility.nri': 'NRI', 'eligibility.no': 'ಇಲ್ಲ',
    'eligibility.next': 'ಮುಂದೆ →', 'eligibility.back': '← ಹಿಂದೆ', 'eligibility.check': 'ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ ✓',
    'timeline.title': 'ಚುನಾವಣಾ ಟೈಮ್‌ಲೈನ್ 2026', 'quiz.title': 'ನಿಮ್ಮ ಜ್ಞಾನ ಪರೀಕ್ಷಿಸಿ',
    'explainer.title': 'ಚುನಾವಣೆಗಳು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತವೆ',
    'myths.title': 'ಮಿಥ್ vs ಫ್ಯಾಕ್ಟ್', 'booth.title': 'ನಿಮ್ಮ ಮತದಾನ ಕೇಂದ್ರ ಹುಡುಕಿ',
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('civicpulse_lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[lang] && I18N[lang][key]) el.textContent = I18N[lang][key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (I18N[lang] && I18N[lang][key]) el.placeholder = I18N[lang][key];
  });
  document.documentElement.lang = lang;
}

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || (I18N.en && I18N.en[key]) || key;
}

function detectLanguage() {
  const saved = localStorage.getItem('civicpulse_lang');
  if (saved && I18N[saved]) return saved;
  const nav = navigator.language || '';
  if (nav.startsWith('hi')) return 'hi';
  if (nav.startsWith('kn')) return 'kn';
  return 'en';
}
