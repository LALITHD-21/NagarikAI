/* ===== Election Timeline Service ===== */
const TimelineService = {
  events: [
    { date: '2025-11-15', title: 'Electoral Roll Revision Begins', desc: 'Annual revision of voter lists across all states.', type: 'past' },
    { date: '2026-01-10', title: 'Final Electoral Roll Published', desc: 'Updated voter list made available to public.', type: 'past' },
    { date: '2026-03-01', title: 'Model Code of Conduct', desc: 'Code of conduct comes into effect for upcoming elections.', type: 'past' },
    { date: '2026-04-15', title: 'Nomination Filing Deadline', desc: 'Last date for candidates to file nominations.', type: 'past' },
    { date: '2026-05-10', title: 'Phase 1 Voting', desc: 'First phase of elections across multiple constituencies.', type: 'upcoming' },
    { date: '2026-05-17', title: 'Phase 2 Voting', desc: 'Second phase of elections.', type: 'upcoming' },
    { date: '2026-05-24', title: 'Phase 3 Voting', desc: 'Third and final phase of voting.', type: 'future' },
    { date: '2026-06-02', title: 'Vote Counting Day', desc: 'Counting of votes begins across all constituencies.', type: 'future' },
    { date: '2026-06-05', title: 'Results Declared', desc: 'Final election results announced by ECI.', type: 'future' },
  ],

  render(container) {
    container.innerHTML = this.events.map(ev => {
      const d = new Date(ev.date);
      const dateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      return `
        <div class="timeline-item ${ev.type}">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="timeline-date">${dateStr}</div>
            <div class="timeline-title">${ev.title}</div>
            <div class="timeline-desc">${ev.desc}</div>
            <span class="timeline-badge ${ev.type}">${ev.type === 'past' ? 'Completed' : ev.type === 'upcoming' ? 'Upcoming' : 'Scheduled'}</span>
            ${ev.type !== 'past' ? `<button class="cal-btn" onclick="TimelineService.addToCalendar('${ev.title}','${ev.date}','${ev.desc}')">📅 Add to Calendar</button>` : ''}
          </div>
        </div>`;
    }).join('');
  },

  addToCalendar(title, date, desc) {
    const d = new Date(date);
    const start = d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const end = new Date(d.getTime() + 3600000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(desc)}&sf=true`;
    window.open(url, '_blank', 'noopener');
    App.showToast('Opening Google Calendar...');
  }
};
