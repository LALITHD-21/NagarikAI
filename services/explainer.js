/* ===== Election Explainer + Registration + Myths + Booth Services ===== */

const ExplainerService = {
  steps: [
    { icon: '🏛️', title: 'What is an Election?', text: 'An election is a formal process where citizens choose their representatives by voting. In a democracy like India, elections are the foundation of governance.', simple: 'An election is like picking a class monitor — everyone gets to vote for who they want to be the leader!' },
    { icon: '📋', title: 'Types of Elections in India', text: '<ul><li><strong>Lok Sabha (General):</strong> Choose MPs for Parliament — 543 seats, every 5 years</li><li><strong>Vidhan Sabha (State):</strong> Choose MLAs for state legislature</li><li><strong>Local Body:</strong> Panchayat, Municipal Corporation, Zilla Parishad</li><li><strong>Rajya Sabha:</strong> Indirectly elected by state MLAs</li></ul>', simple: 'India has elections for the whole country (Lok Sabha), for each state (Vidhan Sabha), and for your local town or village!' },
    { icon: '🗳️', title: 'How Voting Works', text: '<ul><li>Visit your assigned polling booth with valid ID</li><li>Your name is verified on the voter list</li><li>You receive indelible ink on your finger</li><li>Enter the voting compartment</li><li>Press the button next to your chosen candidate on the EVM</li><li>Verify on the VVPAT paper slip</li><li>Your vote is recorded securely!</li></ul>', simple: 'You go to a special place (polling booth), show your ID, and press a button on a machine for the person you want to win. Easy!' },
    { icon: '🔒', title: 'How is Voting Secure?', text: '<ul><li>EVMs are standalone — not connected to any network</li><li>VVPAT provides paper verification</li><li>Sealed and stored under guard</li><li>Mock polls conducted before voting</li><li>Multiple security layers at booths</li></ul>', simple: 'The voting machine is super safe! It\'s not connected to the internet, and there\'s a paper receipt to double-check your vote.' },
    { icon: '📊', title: 'Counting & Results', text: 'After all phases of voting are complete, counting day is announced. EVMs are opened under strict supervision with multiple rounds of counting. The candidate with the most votes wins the seat. Results are updated in real-time on the ECI website.', simple: 'After everyone votes, they open the machines and count who got the most votes. The winner becomes the leader!' },
  ],

  render(container, simpleMode) {
    container.innerHTML = `
      <label class="eli10-toggle">
        <input type="checkbox" id="simple-mode" ${simpleMode ? 'checked' : ''} onchange="ExplainerService.render(document.getElementById('explainer-content'), this.checked)">
        🧒 Explain Like I'm 10
      </label>
      ${this.steps.map((s, i) => `
        <div class="explainer-step" style="animation-delay:${i * 0.08}s">
          <div class="step-num">${i + 1}</div>
          <h3>${s.icon} ${s.title}</h3>
          <div>${simpleMode ? `<p>${s.simple}</p>` : s.text}</div>
        </div>
      `).join('')}`;
  }
};

const RegistrationService = {
  render(container) {
    container.innerHTML = `
      <div class="reg-step"><h3>📋 Step 1: Check Existing Registration</h3><p>Visit <a href="https://voters.eci.gov.in" target="_blank" rel="noopener" class="reg-link">voters.eci.gov.in</a> and search by your name or EPIC number to check if you're already registered.</p></div>
      <div class="reg-step"><h3>📄 Step 2: Gather Documents</h3><ul><li>Age proof: Birth certificate, school leaving certificate, or passport</li><li>Address proof: Aadhaar card, utility bill, bank passbook, or rent agreement</li><li>Recent passport-size photograph</li><li>Filled Form 6 (for new registration)</li></ul></div>
      <div class="reg-step"><h3>💻 Step 3: Apply Online</h3><p>Visit the <a href="https://voters.eci.gov.in/register" target="_blank" rel="noopener" class="reg-link">National Voter Service Portal →</a></p><p>Or download the <strong>Voter Helpline App</strong> from Play Store / App Store.</p></div>
      <div class="reg-step"><h3>🏢 Step 4: Offline Application</h3><p>Visit your nearest <strong>ERO (Electoral Registration Officer)</strong> office with filled Form 6 and documents. You can find your ERO on the ECI website.</p></div>
      <div class="reg-step"><h3>✅ Step 5: Verification & EPIC Card</h3><p>After submission, a BLO (Booth Level Officer) will visit for verification. Your Voter ID (EPIC) card will be issued within 15-30 days after successful verification.</p></div>
      <div class="reg-step"><h3>🌐 For NRI Voters</h3><p>Fill <strong>Form 6A</strong> instead. You must provide your passport details. Note: You must be physically present in your constituency to vote.</p><a href="https://www.eci.gov.in" target="_blank" rel="noopener" class="reg-link">Visit ECI Website →</a></div>`;
  }
};

const MythsService = {
  data: [
    { myth: 'My single vote doesn\'t make a difference.', fact: 'Many elections in India have been decided by just a few votes! In 2019, a candidate won by just 1 vote in a local election. Every vote truly counts.', },
    { myth: 'EVMs can be hacked remotely.', fact: 'EVMs are standalone devices with no internet, WiFi, or Bluetooth connectivity. They use one-time programmable chips and undergo rigorous testing. The VVPAT system provides additional verification.', },
    { myth: 'If I don\'t vote, it doesn\'t affect anything.', fact: 'Low voter turnout means a smaller group decides for everyone. Your non-vote gives more power to others. Voting ensures your community\'s voice is heard.', },
    { myth: 'NOTA vote goes to the leading candidate.', fact: 'NOTA votes are counted separately and do NOT transfer to any candidate. Even if NOTA gets the highest votes, the candidate with the next highest count wins.', },
    { myth: 'You need a Voter ID card to vote.', fact: 'While the EPIC card is preferred, you can use 12 other approved IDs including Aadhaar, passport, driving license, PAN card, etc.', },
    { myth: 'Postal voting is available for everyone.', fact: 'Postal ballots are only available for specific categories: service voters (military), people on election duty, preventive detention cases, and senior citizens/PwD voters (recent provision).', },
  ],

  render(container) {
    container.innerHTML = this.data.map((m, i) => `
      <div class="myth-card" onclick="this.classList.toggle('open'); if(typeof App !== 'undefined') App.unlockBadge('myths')" tabindex="0" role="button" aria-expanded="false">
        <div class="myth-label myth">❌ MYTH</div>
        <div class="myth-text">${m.myth}</div>
        <div class="myth-label fact">✅ FACT</div>
        <div class="myth-explain">${m.fact}</div>
      </div>
    `).join('');
  }
};

const BoothService = {
  sampleBooths: [
    { name: 'Government Primary School, Ward 5', addr: 'MG Road, Near City Bus Stand', distance: '0.8 km', pin: 'MG Road polling booth India' },
    { name: 'Community Hall, Sector 12', addr: 'Behind Post Office, Main Street', distance: '1.2 km', pin: 'Community Hall Sector 12 polling booth' },
    { name: 'Municipal School No. 3', addr: 'Gandhi Nagar, 2nd Cross', distance: '1.5 km', pin: 'Municipal School Gandhi Nagar polling booth' },
  ],

  /**
   * Embed a real Google Maps search for polling booths near a query.
   * Uses the public Maps embed URL (no API key required for iframe embed).
   * @param {string} query
   * @returns {string} iframe HTML
   */
  _mapEmbed(query) {
    const q = encodeURIComponent(`polling booth near ${query}`);
    return `<div class="map-embed-wrapper" role="region" aria-label="Google Maps polling booth search">
      <iframe
        title="Polling booths near ${sanitize(query)}"
        width="100%" height="260" style="border:0;border-radius:12px;"
        loading="lazy" referrerpolicy="no-referrer-when-downgrade"
        src="https://maps.google.com/maps?q=${q}&output=embed&z=14"
        allowfullscreen aria-label="Map of polling booths">
      </iframe>
      <a class="reg-link" href="https://maps.google.com/maps?q=${q}" target="_blank" rel="noopener noreferrer">
        🗺️ Open full map in Google Maps →
      </a>
    </div>`;
  },

  /** Google Calendar "Add Reminder" deep link for election day */
  _calendarLink(eventName = 'India Election Day — Go Vote!', date = '20290515') {
    const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    return `${base}&text=${encodeURIComponent(eventName)}&dates=${date}/${date}&details=${encodeURIComponent('Go vote at your local polling booth! Check voters.eci.gov.in for your booth details.')}&location=${encodeURIComponent('Your Polling Booth')}`;
  },

  render(container) {
    container.innerHTML = `
      <div class="booth-search">
        <input type="text" id="booth-query" placeholder="Enter your area or PIN code..."
          aria-label="Search polling booth by area or PIN code"
          onkeydown="if(event.key==='Enter') BoothService.search()">
        <button class="primary-btn" style="flex:0;padding:12px 20px;"
          onclick="BoothService.search()" aria-label="Search booths">🔍 Search</button>
      </div>
      <button class="secondary-btn" style="width:100%;margin-bottom:16px;"
        onclick="BoothService.useLocation()" aria-label="Use my GPS location">📍 Use My Location</button>
      <a href="${this._calendarLink()}" target="_blank" rel="noopener noreferrer"
        class="secondary-btn" style="display:block;width:100%;text-align:center;margin-bottom:16px;text-decoration:none;">
        📅 Add Election Reminder to Google Calendar
      </a>
      <div id="booth-results" class="booth-results-container">
        <div class="empty-state">
           <div class="empty-icon">🗺️</div>
           <p>Enter your location above to find the nearest polling stations.</p>
        </div>
      </div>
      <div class="reg-step" style="margin-top:24px;">
        <h3>🔗 Official Resources</h3>
        <p>For exact booth information:</p>
        <a href="https://voters.eci.gov.in" target="_blank" rel="noopener" class="reg-link">Search on voters.eci.gov.in →</a>
        <p style="margin-top:8px;">SMS: <strong>EPIC &lt;your_number&gt;</strong> to <strong>1950</strong></p>
      </div>`;
  },

  search() {
    const q = document.getElementById('booth-query')?.value.trim();
    if (!q) { App.showToast('Please enter an area or PIN code'); return; }
    // Sanitize before use in DOM
    const safeQ = validateText(q, 100) || q.slice(0, 100);
    const resultsContainer = document.getElementById('booth-results');
    resultsContainer.innerHTML = `
      <div class="radar-loader" role="status" aria-label="Searching for booths">
        <div class="radar-circle"></div>
        <div class="radar-circle delay"></div>
        <div class="radar-text">Scanning for booths near "${sanitize(safeQ)}"...</div>
      </div>`;

    setTimeout(() => {
      resultsContainer.innerHTML =
        this.sampleBooths.map((b, i) => `
          <div class="booth-card" style="animation: fadeUp 0.4s ease ${i * 0.1}s backwards">
            <h3>🏫 ${sanitize(b.name)}</h3>
            <p>${sanitize(b.addr)}</p>
            <p style="color:var(--primary-light);font-weight:600;">📏 ${sanitize(b.distance)} away</p>
            <a href="https://maps.google.com/maps?q=${encodeURIComponent(b.name + ' ' + b.addr)}"
               target="_blank" rel="noopener noreferrer" class="map-link">📍 Get Directions →</a>
          </div>`
        ).join('') +
        this._mapEmbed(safeQ);
    }, 1600);
  },

  useLocation() {
    if (!navigator.geolocation) { App.showToast('Geolocation not supported'); return; }
    
    const resultsContainer = document.getElementById('booth-results');
    resultsContainer.innerHTML = `
      <div class="radar-loader">
        <div class="radar-circle"></div>
        <div class="radar-circle delay"></div>
        <div class="radar-text">Pinpointing your GPS location...</div>
      </div>
    `;

    navigator.geolocation.getCurrentPosition(
      pos => {
        setTimeout(() => {
          const { latitude, longitude } = pos.coords;
          window.open(`https://maps.google.com/?q=polling+booth&ll=${latitude},${longitude}`, '_blank', 'noopener');
          this.search(); // show fake results as well
        }, 1200);
      },
      () => {
        App.showToast('Location access denied. Please search manually.');
        resultsContainer.innerHTML = `<div class="empty-state"><p>Location access denied.</p></div>`;
      }
    );
  }
};
