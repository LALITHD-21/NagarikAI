/* ===== Unit Tests for CivicPulse AI ===== */

// Simple test runner
let _pass = 0, _fail = 0;
function assert(cond, msg) {
  if (cond) { _pass++; console.log(`  ✅ PASS: ${msg}`); }
  else { _fail++; console.error(`  ❌ FAIL: ${msg}`); }
}
function suite(name, fn) { console.log(`\n📋 ${name}`); fn(); }

// ===== Eligibility Tests =====
suite('Eligibility - Age Validation', () => {
  let r;
  r = EligibilityService.check(25, 'yes', 'Karnataka');
  assert(r.eligible === true, 'Age 25, citizen → eligible');

  r = EligibilityService.check(18, 'yes', 'Delhi');
  assert(r.eligible === true, 'Age 18, citizen → eligible');

  r = EligibilityService.check(17, 'yes', 'Kerala');
  assert(r.eligible === false, 'Age 17 → not eligible');
  assert(r.type === 'underage', 'Age 17 → type underage');

  r = EligibilityService.check(1, 'yes', 'Goa');
  assert(r.eligible === false, 'Age 1 → not eligible');

  r = EligibilityService.check(0, 'yes', 'Bihar');
  assert(r.eligible === false || r.type === 'invalid', 'Age 0 → invalid');

  r = EligibilityService.check(-5, 'yes', 'UP');
  assert(r.type === 'invalid', 'Negative age → invalid');

  r = EligibilityService.check(200, 'yes', 'MP');
  assert(r.type === 'invalid', 'Age 200 → invalid');
});

suite('Eligibility - Citizenship', () => {
  let r;
  r = EligibilityService.check(25, 'no', 'Delhi');
  assert(r.eligible === false, 'Non-citizen → not eligible');
  assert(r.type === 'non-citizen', 'Non-citizen type correct');

  r = EligibilityService.check(30, 'nri', 'Maharashtra');
  assert(r.eligible === true, 'NRI → eligible');
  assert(r.type === 'nri', 'NRI type correct');
});

suite('Eligibility - Edge Cases', () => {
  let r;
  r = EligibilityService.check(null, 'yes', 'Delhi');
  assert(r.eligible === false, 'Null age → invalid');

  r = EligibilityService.check(25, '', 'Delhi');
  assert(r.eligible === false, 'Empty citizenship → invalid');

  r = EligibilityService.check(18, 'yes', '');
  assert(r.eligible === true, 'Empty state still eligible');
});

// ===== Timeline Tests =====
suite('Timeline Service', () => {
  assert(TimelineService.events.length > 0, 'Timeline has events');
  assert(TimelineService.events.every(e => e.date && e.title), 'All events have date and title');
  
  const dates = TimelineService.events.map(e => new Date(e.date).getTime());
  let sorted = true;
  for (let i = 1; i < dates.length; i++) {
    if (dates[i] < dates[i-1]) { sorted = false; break; }
  }
  assert(sorted, 'Events are in chronological order');
});

// ===== Quiz Tests =====
suite('Quiz Service', () => {
  QuizService.init();
  assert(QuizService.shuffled.length === 5, 'Quiz generates 5 questions');
  assert(QuizService.score === 0, 'Score starts at 0');
  assert(QuizService.current === 0, 'Starts at question 0');
  
  QuizService.questions.forEach((q, i) => {
    assert(q.opts.length === 4, `Q${i+1} has 4 options`);
    assert(q.answer >= 0 && q.answer < 4, `Q${i+1} has valid answer index`);
    assert(q.explain.length > 0, `Q${i+1} has explanation`);
  });
});

// ===== i18n Tests =====
suite('Internationalization', () => {
  assert(typeof I18N.en === 'object', 'English translations exist');
  assert(typeof I18N.hi === 'object', 'Hindi translations exist');
  assert(typeof I18N.kn === 'object', 'Kannada translations exist');
  assert(t('nav.home') === 'Home', 'Default English translation works');
});

// ===== Chatbot Tests =====
suite('Chatbot Knowledge Base', () => {
  let r;
  r = ChatbotService.getResponse('How do elections work?');
  assert(r.length > 50, 'Elections query returns detailed response');

  r = ChatbotService.getResponse('Can I vote at 17?');
  assert(r.includes('18'), 'Age query mentions 18');

  r = ChatbotService.getResponse('what is evm');
  assert(r.toLowerCase().includes('electronic'), 'EVM query returns relevant info');

  r = ChatbotService.getResponse('random gibberish xyz123');
  assert(r.length > 0, 'Unknown query returns fallback');
});

// ===== Helpers Tests =====
suite('Utility Functions', () => {
  assert(sanitize('<script>alert(1)</script>') === '&lt;script&gt;alert(1)&lt;/script&gt;', 'Sanitize prevents XSS');
  assert(validateAge('25') === 25, 'validateAge valid');
  assert(validateAge('abc') === null, 'validateAge invalid string');
  assert(validateAge('-1') === null, 'validateAge negative');
  assert(validateAge('200') === null, 'validateAge too high');
});

// Summary
console.log(`\n${'='.repeat(40)}`);
console.log(`📊 Results: ${_pass} passed, ${_fail} failed, ${_pass + _fail} total`);
console.log(`${'='.repeat(40)}`);
