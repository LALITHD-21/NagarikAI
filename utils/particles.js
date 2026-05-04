/* ===== Particle Background ===== */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let mouseX = -1000;
  let mouseY = -1000;
  let clickRipples = [];

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  window.addEventListener('mouseout', () => {
    mouseX = -1000;
    mouseY = -1000;
  });
  window.addEventListener('click', e => {
    clickRipples.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.8 });
  });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.r = Math.random() * 2 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.4 + 0.1;
      // Indigo/violet/cyan palette
      const colors = ['99,102,241', '139,92,246', '6,182,212'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
      
      // Repel from mouse slightly
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * 1.5;
        this.y -= Math.sin(angle) * 1.5;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  const count = Math.min(100, Math.floor((w * h) / 10000));
  for (let i = 0; i < count; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      // Connect to mouse
      const mdx = particles[i].x - mouseX;
      const mdy = particles[i].y - mouseY;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(6,182,212,${0.15 * (1 - mDist / 120)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    
    // Draw Click Ripples
    for (let i = clickRipples.length - 1; i >= 0; i--) {
      let r = clickRipples[i];
      r.r += 3;
      r.alpha -= 0.02;
      if (r.alpha <= 0) {
        clickRipples.splice(i, 1);
        continue;
      }
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(6,182,212,${r.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.r * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(99,102,241,${r.alpha * 0.8})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    requestAnimationFrame(animate);
  }
  animate();
}
