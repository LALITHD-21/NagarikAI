/* ===== Voter Eligibility Engine ===== */
const EligibilityService = {
  /**
   * Check voter eligibility
   * @param {number} age - User's age
   * @param {string} citizenship - 'yes' | 'nri' | 'no'
   * @param {string} state - Selected state/UT
   * @returns {{eligible: boolean, type: string, message: string, description: string, steps: string[]}}
   */
  check(age, citizenship, state) {
    // Validate inputs
    if (!age || age < 1 || age > 150) {
      return { eligible: false, type: 'invalid', message: '⚠️ Invalid Age', description: 'Please enter a valid age between 1 and 150.', steps: [] };
    }
    if (!citizenship) {
      return { eligible: false, type: 'invalid', message: '⚠️ Missing Information', description: 'Please select your citizenship status.', steps: [] };
    }

    // Age check
    if (age < 18) {
      const yearsLeft = 18 - age;
      return {
        eligible: false, type: 'underage',
        message: t('eligibility.notEligibleAge'),
        description: `${t('eligibility.notEligibleAgeDesc')} You'll be eligible in ${yearsLeft} year${yearsLeft > 1 ? 's' : ''}.`,
        steps: [
          'Learn about the election process now',
          'Encourage eligible family members to vote',
          'Pre-register when you turn 17 (in some states)',
          `Mark your calendar for ${new Date().getFullYear() + yearsLeft}`
        ]
      };
    }

    // Citizenship check
    if (citizenship === 'no') {
      return {
        eligible: false, type: 'non-citizen',
        message: t('eligibility.notEligibleCitizen'),
        description: t('eligibility.notEligibleCitizenDesc'),
        steps: [
          'Only Indian citizens can vote in Indian elections',
          'If you have acquired citizenship, update your documents',
          'Contact the local Election Commission office for queries'
        ]
      };
    }

    // NRI check
    if (citizenship === 'nri') {
      return {
        eligible: true, type: 'nri',
        message: t('eligibility.nriEligible') || '🌐 NRI Voter - Eligible!',
        description: t('eligibility.nriDesc') || 'As an NRI, you can vote! Register as an overseas elector.',
        steps: [
          'Fill Form 6A on the ECI website',
          'Provide passport copy and address proof',
          'You must be present in your constituency to vote',
          'No proxy or postal voting available for NRIs yet',
          `Your constituency: ${state || 'Not selected'}`
        ]
      };
    }

    // Eligible!
    return {
      eligible: true, type: 'eligible',
      message: t('eligibility.eligible'),
      description: t('eligibility.eligibleDesc'),
      steps: [
        'Check if you are already registered on voters.eci.gov.in',
        'If not registered, fill Form 6 online or offline',
        'Documents: ID proof + Address proof + Passport photo',
        `Your state: ${state || 'Not selected'}`,
        'Visit your nearest ERO office if needed',
        'Your voter ID (EPIC) will be delivered after verification'
      ]
    };
  },

  /** Render result into the DOM */
  renderResult(result, container) {
    const isEligible = result.eligible;
    container.innerHTML = `
      <div class="result-card ${isEligible ? 'eligible' : 'not-eligible'}">
        <div class="result-icon">${isEligible ? '✅' : '❌'}</div>
        <h3>${result.message}</h3>
        <p>${result.description}</p>
        <div class="result-actions">
          ${result.steps.map(s => `<div class="reg-step"><p>• ${s}</p></div>`).join('')}
          ${isEligible ? '<button class="primary-btn" onclick="App.showView(\'registration\')">Register Now →</button>' : ''}
          <button class="secondary-btn" onclick="App.showView('home')">Back to Home</button>
        </div>
      </div>
    `;
    container.classList.remove('hidden');
  }
};
