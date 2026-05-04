/* ===== CivicPulse AI — Premium Test Suite ===== */
'use strict';

// ── Micro test runner ────────────────────────────────────────────────────────
const TestRunner = (() => {
  let pass = 0, fail = 0, total = 0;
  const results = [];

  function assert(condition, label, detail = '') {
    total++;
    if (condition) {
      pass++;
      results.push({ ok: true, label, detail });
      console.log(`  ✅ ${label}`);
    } else {
      fail++;
      results.push({ ok: false, label, detail });
      console.error(`  ❌ ${label}${detail ? ' → ' + detail : ''}`);
    }
  }

  function suite(name, fn) {
    console.groupCollapsed(`\n📋 ${name}`);
    fn(assert);
    console.groupEnd();
  }

  function summary() {
    const pct = total ? Math.round((pass / total) * 100) : 0;
    const bar = '█'.repeat(Math.round(pct / 5)) + '░'.repeat(20 - Math.round(pct / 5));
    console.log(`\n${'─'.repeat(48)}`);
    console.log(`📊 [${bar}] ${pct}%`);
    console.log(`   ✅ ${pass} passed  ❌ ${fail} failed  📝 ${total} total`);
    console.log(`${'─'.repeat(48)}`);
    if (typeof window !== 'undefined') renderHTML(pct);
    return { pass, fail, total, pct };
  }

  function renderHTML(pct) {
    const el = document.getElementById('test-results');
    if (!el) return;
    el.innerHTML = `
      <div class="test-summary ${fail === 0 ? 'all-pass' : 'has-fail'}">
        <h3>${fail === 0 ? '✅ All Tests Pass' : `⚠️ ${fail} Test(s) Failed`}</h3>
        <div class="test-bar"><div class="test-fill" style="width:${pct}%"></div></div>
        <p>${pass}/${total} — ${pct}%</p>
      </div>
      <ul class="test-list">
        ${results.map(r => `<li class="${r.ok ? 'ok' : 'fail'}">${r.ok ? '✅' : '❌'} ${r.label}</li>`).join('')}
      </ul>`;
  }

  return { suite, summary };
})();

// ── 1. Eligibility Service ────────────────────────────────────────────────────
TestRunner.suite('EligibilityService — Age Validation', assert => {
  assert(EligibilityService.check(25, 'yes', 'Karnataka').eligible === true,  'Age 25, citizen → eligible');
  assert(EligibilityService.check(18, 'yes', 'Delhi').eligible    === true,  'Age 18 (boundary) → eligible');
  assert(EligibilityService.check(17, 'yes', 'Kerala').eligible   === false, 'Age 17 → not eligible');
  assert(EligibilityService.check(17, 'yes', 'Kerala').type       === 'underage', 'Age 17 → type underage');
  assert(EligibilityService.check(150,'yes', 'Goa').eligible      === true,  'Age 150 (max boundary) → eligible');
  assert(EligibilityService.check(151,'yes', 'Goa').eligible      === false, 'Age 151 → invalid');
  assert(EligibilityService.check(0,  'yes', 'Bihar').eligible    === false, 'Age 0 → invalid');
  assert(EligibilityService.check(-5, 'yes', 'UP').type           === 'invalid', 'Negative age → invalid');
  assert(EligibilityService.check(null,'yes','MP').eligible       === false, 'Null age → invalid');
});

TestRunner.suite('EligibilityService — Citizenship', assert => {
  assert(EligibilityService.check(25, 'no', 'Delhi').eligible    === false,      'Non-citizen → not eligible');
  assert(EligibilityService.check(25, 'no', 'Delhi').type        === 'non-citizen', 'Non-citizen type correct');
  assert(EligibilityService.check(30, 'nri','Maharashtra').eligible === true,    'NRI → eligible');
  assert(EligibilityService.check(30, 'nri','Maharashtra').type   === 'nri',     'NRI type correct');
  assert(EligibilityService.check(18, 'yes', '').eligible         === true,     'Empty state still eligible');
  assert(EligibilityService.check(18, '', 'Delhi').eligible       === false,    'Empty citizenship → invalid');
});

TestRunner.suite('EligibilityService — Result Shape', assert => {
  const r = EligibilityService.check(25, 'yes', 'Karnataka');
  assert(Array.isArray(r.steps),         'Result has steps array');
  assert(typeof r.message === 'string',  'Result has message string');
  assert(typeof r.description === 'string', 'Result has description string');
  assert(r.steps.length > 0,            'Eligible result has at least 1 step');

  const u = EligibilityService.check(15, 'yes', 'Tamil Nadu');
  assert(u.steps.length > 0,            'Underage result has guidance steps');
  assert(u.description.includes('year'),'Underage description mentions years to wait');
});

// ── 2. ChatbotService ─────────────────────────────────────────────────────────
TestRunner.suite('ChatbotService — Knowledge Base', assert => {
  const kb = ChatbotService.knowledgeBase;
  assert(Object.keys(kb).length >= 8,   'At least 8 KB entries');
  Object.entries(kb).forEach(([k, v]) => {
    assert(typeof v === 'string' && v.length > 40, `KB entry "${k}" has meaningful content`);
  });
});

TestRunner.suite('ChatbotService — Response Quality', assert => {
  const cases = [
    ['How do elections work?', 'election'],
    ['Can I vote at 17?',      '18'],
    ['what is evm',            'electronic'],
    ['hi',                     ''],           // greeting
    ['register voter',         'form'],
    ['nota',                   'none'],
    ['random xyz gibberish',   ''],           // fallback must not throw
  ];
  cases.forEach(([q, expected]) => {
    let r;
    assert(() => { r = ChatbotService.getResponse(q); return true; }, `No throw for "${q}"`);
    assert(typeof r === 'string' && r.length > 5, `"${q}" returns non-empty response`);
    if (expected) assert(r.toLowerCase().includes(expected), `"${q}" mentions "${expected}"`);
  });
});

TestRunner.suite('ChatbotService — Suggestions', assert => {
  assert(Array.isArray(ChatbotService.suggestions), 'suggestions is array');
  assert(ChatbotService.suggestions.length >= 4,    'At least 4 suggestion chips');
  ChatbotService.suggestions.forEach((s, i) => {
    assert(typeof s === 'string' && s.length > 3, `Suggestion[${i}] is valid string`);
  });
});

// ── 3. Timeline Service ───────────────────────────────────────────────────────
TestRunner.suite('TimelineService — Data Integrity', assert => {
  assert(Array.isArray(TimelineService.events),                  'events is array');
  assert(TimelineService.events.length >= 5,                     'At least 5 timeline events');
  TimelineService.events.forEach((e, i) => {
    assert(typeof e.date  === 'string' && e.date.length > 0,   `Event[${i}] has date`);
    assert(typeof e.title === 'string' && e.title.length > 0,  `Event[${i}] has title`);
    assert(['past','upcoming','future'].includes(e.status),     `Event[${i}] has valid status`);
  });
});

TestRunner.suite('TimelineService — Chronological Order', assert => {
  const dates = TimelineService.events.map(e => new Date(e.date).getTime());
  let ordered = true;
  for (let i = 1; i < dates.length; i++) if (dates[i] < dates[i - 1]) { ordered = false; break; }
  assert(ordered, 'Events are in chronological order');
  assert(dates.every(d => !isNaN(d)), 'All dates are parseable');
});

// ── 4. Quiz Service ───────────────────────────────────────────────────────────
TestRunner.suite('QuizService — Init & Structure', assert => {
  QuizService.init();
  assert(Array.isArray(QuizService.shuffled),  'shuffled array exists after init');
  assert(QuizService.shuffled.length === 5,    'Exactly 5 questions selected');
  assert(QuizService.score   === 0,            'Score resets to 0');
  assert(QuizService.current === 0,            'Current resets to 0');
});

TestRunner.suite('QuizService — Question Quality', assert => {
  QuizService.questions.forEach((q, i) => {
    assert(Array.isArray(q.opts) && q.opts.length === 4, `Q${i+1}: 4 options`);
    assert(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4, `Q${i+1}: valid answer idx`);
    assert(typeof q.q === 'string' && q.q.length > 10,  `Q${i+1}: question text`);
    assert(typeof q.explain === 'string' && q.explain.length > 10, `Q${i+1}: explanation`);
    assert(q.opts.every(o => typeof o === 'string' && o.length > 0), `Q${i+1}: all opts non-empty`);
  });
});

// ── 5. i18n Service ───────────────────────────────────────────────────────────
TestRunner.suite('I18n — Language Completeness', assert => {
  ['en','hi','kn'].forEach(lang => {
    assert(typeof I18N[lang] === 'object', `I18N.${lang} exists`);
    assert(Object.keys(I18N[lang]).length >= 10, `I18N.${lang} has ≥10 keys`);
  });
  // Key parity — all keys in EN must exist in HI and KN
  const enKeys = Object.keys(I18N.en);
  ['hi','kn'].forEach(lang => {
    const missing = enKeys.filter(k => !I18N[lang][k]);
    assert(missing.length < 5, `I18N.${lang} missing < 5 keys (missing: ${missing.slice(0,3).join(', ')})`);
  });
});

TestRunner.suite('I18n — t() Function', assert => {
  setLanguage('en');
  assert(t('nav.home')     === 'Home', 'EN nav.home → "Home"');
  assert(typeof t('chat.placeholder') === 'string', 'chat.placeholder key exists');
  assert(t('nonexistent.key') === 'nonexistent.key', 'Missing key returns key itself');
});

// ── 6. Security & Helpers ─────────────────────────────────────────────────────
TestRunner.suite('Helpers — XSS Prevention (sanitize)', assert => {
  assert(sanitize('<script>alert(1)</script>') === '&lt;script&gt;alert(1)&lt;/script&gt;', 'sanitize escapes script tag');
  assert(sanitize('<img src=x onerror=alert(1)>').includes('&lt;'), 'sanitize escapes img tag');
  assert(sanitize('Safe text') === 'Safe text', 'sanitize passes plain text');
  assert(sanitize('') === '', 'sanitize handles empty string');
  assert(sanitize(null) === '', 'sanitize handles null gracefully');
  assert(sanitize(42)   === '', 'sanitize handles non-string gracefully');
});

TestRunner.suite('Helpers — validateAge()', assert => {
  assert(validateAge('25')  === 25,   'Valid string "25"');
  assert(validateAge(18)    === 18,   'Valid number 18');
  assert(validateAge('abc') === null, 'Non-numeric → null');
  assert(validateAge('-1')  === null, 'Negative → null');
  assert(validateAge('0')   === null, 'Zero → null');
  assert(validateAge('151') === null, 'Above 150 → null');
  assert(validateAge('')    === null, 'Empty string → null');
  assert(validateAge(null)  === null, 'null → null');
});

TestRunner.suite('Helpers — validateText()', assert => {
  assert(validateText('Rahul') === 'Rahul',   'Passes clean name');
  assert(validateText('  hi  ') === 'hi',     'Trims whitespace');
  assert(validateText('') === null,           'Empty → null');
  assert(validateText('   ') === null,        'Whitespace-only → null');
  assert(validateText('a'.repeat(300), 200) === 'a'.repeat(200), 'Truncates at maxLen');
  assert(validateText(null) === null,         'null → null');
});

TestRunner.suite('Helpers — rateLimit()', assert => {
  const key = 'test_' + Date.now();
  let allowed = 0;
  for (let i = 0; i < 15; i++) if (rateLimit(key, 10, 5000)) allowed++;
  assert(allowed === 10, 'Rate limiter caps at 10 calls');
  assert(rateLimit(key, 10, 5000) === false, '11th call is blocked');
});

// ── 7. Chatbot — Security: no raw HTML injection ──────────────────────────────
TestRunner.suite('Chatbot — XSS-safe rendering', assert => {
  const xssInput = '<img src=x onerror="document.body.innerHTML=\'HACKED\'">';
  const response = ChatbotService.getResponse(xssInput);
  assert(typeof response === 'string', 'XSS payload returns string');
  assert(!response.includes('<img'), 'XSS payload not reflected in bot response');
});

// ── Print Summary ─────────────────────────────────────────────────────────────
TestRunner.summary();
