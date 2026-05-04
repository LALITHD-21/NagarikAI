/* ===== CivicPulse AI — Utility Helpers (Security Enhanced) ===== */
'use strict';

// ── XSS-safe HTML Sanitizer ──────────────────────────────────────────────────
/**
 * Escape user input for safe DOM injection.
 * Uses textContent trick — works without DOM parser.
 * @param {string} str
 * @returns {string} HTML-escaped string
 */
function sanitize(str) {
  if (typeof str !== 'string') return '';
  const el = document.createElement('div');
  el.textContent = str;
  return el.innerHTML;
}

/**
 * Sanitize and allow a limited safe markdown subset (bold/italic/line-breaks).
 * Used only for bot responses — NOT for user input.
 * @param {string} str
 * @returns {string}
 */
function renderSafeMarkdown(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

// ── Input Validators ──────────────────────────────────────────────────────────
/**
 * Validate age — must be integer in [1, 150].
 * @param {string|number} val
 * @returns {number|null}
 */
function validateAge(val) {
  const n = parseInt(String(val), 10);
  if (isNaN(n) || n < 1 || n > 150) return null;
  return n;
}

/**
 * Validate a non-empty string field; trims whitespace.
 * @param {string} val
 * @param {number} [maxLen=200]
 * @returns {string|null}
 */
function validateText(val, maxLen = 200) {
  if (typeof val !== 'string') return null;
  const trimmed = val.trim().slice(0, maxLen);
  return trimmed.length > 0 ? trimmed : null;
}

// ── Rate Limiter (client-side, abuse prevention) ───────────────────────────────
const _rateLimits = {};
/**
 * Simple token-bucket rate limiter.
 * @param {string} key   - Unique action key (e.g. 'chat')
 * @param {number} limit - Max calls allowed in window
 * @param {number} ms    - Window duration in milliseconds
 * @returns {boolean} true if allowed, false if rate limited
 */
function rateLimit(key, limit = 10, ms = 10000) {
  const now = Date.now();
  if (!_rateLimits[key]) _rateLimits[key] = { count: 0, reset: now + ms };
  if (now > _rateLimits[key].reset) {
    _rateLimits[key] = { count: 0, reset: now + ms };
  }
  if (_rateLimits[key].count >= limit) return false;
  _rateLimits[key].count++;
  return true;
}

// ── Debounce ─────────────────────────────────────────────────────────────────
/**
 * Debounce a function call.
 * @param {Function} fn
 * @param {number} ms
 */
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

// ── Toast Notification ────────────────────────────────────────────────────────
function showToast(msg, type = 'info', duration = 3200) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  // sanitize the message before injecting
  toast.textContent = String(msg).slice(0, 120);
  toast.dataset.type = type; // 'info' | 'success' | 'error'
  toast.classList.remove('hidden');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.add('hidden'), duration);
}

// ── Focus Trap ────────────────────────────────────────────────────────────────
function trapFocus(element) {
  const sel = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const focusable = [...element.querySelectorAll(sel)];
  if (!focusable.length) return;
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  element.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

// ── Confetti Burst ────────────────────────────────────────────────────────────
function fireConfetti() {
  const colors = ['#6366F1', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    const size = 6 + Math.random() * 8;
    Object.assign(el.style, {
      position: 'fixed', left: '50%', top: '40%',
      width: size + 'px', height: size + 'px',
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      zIndex: '9999', pointerEvents: 'none',
    });
    frag.appendChild(el);
    const angle = Math.random() * Math.PI * 2;
    const v = 10 + Math.random() * 18;
    const vx = Math.cos(angle) * v, vy = Math.sin(angle) * v;
    let t = 0;
    const tick = () => {
      t += 0.12;
      el.style.transform = `translate(calc(-50% + ${vx*t}px), calc(-50% + ${vy*t + 6*t*t}px)) rotate(${t*60}deg)`;
      el.style.opacity = String(Math.max(0, 1 - t / 12));
      if (t < 12) requestAnimationFrame(tick); else el.remove();
    };
    requestAnimationFrame(tick);
  }
  document.body.appendChild(frag);
}

// ── Web Audio — UI Sounds ──────────────────────────────────────────────────────
let _audioCtx = null;
function _getCtx() {
  if (!_audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    _audioCtx = new AC();
  }
  if (_audioCtx.state === 'suspended') _audioCtx.resume();
  return _audioCtx;
}

function playPopSound() {
  const ctx = _getCtx(); if (!ctx) return;
  const osc = ctx.createOscillator(), g = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(520, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12);
  g.gain.setValueAtTime(0.25, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
  osc.connect(g); g.connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.13);
}

function playSuccessSound() {
  const ctx = _getCtx(); if (!ctx) return;
  [523.25, 659.25, 783.99].forEach((freq, i) => {
    const osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const t0 = ctx.currentTime + i * 0.12;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.2, t0 + 0.04);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.3);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t0); osc.stop(t0 + 0.32);
  });
}

// ── Performance: Intersection Observer for lazy animations ────────────────────
function observeEntrance(selector, className = 'is-visible') {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add(className); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}
