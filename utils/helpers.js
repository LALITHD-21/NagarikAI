/* ===== Utility Helpers ===== */

/** Sanitize HTML to prevent XSS */
function sanitize(str) {
  const el = document.createElement('div');
  el.textContent = str;
  return el.innerHTML;
}

/** Debounce function */
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/** Input validation */
function validateAge(val) {
  const n = parseInt(val, 10);
  return !isNaN(n) && n >= 1 && n <= 150 ? n : null;
}

/** Show toast notification */
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.add('hidden'), duration);
}

/** Accessibility: trap focus in modals */
function trapFocus(element) {
  const focusable = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  element.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
    }
  });
}

/** Gamification: Confetti */
function fireConfetti() {
  const colors = ['#6366F1', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.left = '50%';
    el.style.top = '50%';
    el.style.width = Math.random() > 0.5 ? '8px' : '12px';
    el.style.height = el.style.width;
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    el.style.zIndex = '9999';
    el.style.pointerEvents = 'none';
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 8 + Math.random() * 20;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    document.body.appendChild(el);
    
    let time = 0;
    const animate = () => {
      time += 0.15;
      const x = vx * time;
      const y = vy * time + 0.5 * 12 * time * time; // gravity
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${time*50}deg)`;
      el.style.opacity = 1 - (time / 15);
      
      if (time < 15) requestAnimationFrame(animate);
      else el.remove();
    };
    requestAnimationFrame(animate);
  }
}

/** Audio: Subtle synthetic pop sound */
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playPopSound() {
  if (!audioCtx) {
    if (!AudioContext) return;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}
