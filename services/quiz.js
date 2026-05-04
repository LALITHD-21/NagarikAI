/* ===== Quiz Service ===== */
const QuizService = {
  questions: [
    { q: 'What is the minimum voting age in India?', opts: ['16 years', '18 years', '21 years', '25 years'], answer: 1, explain: 'The 61st Amendment Act of 1988 reduced the voting age from 21 to 18 years.' },
    { q: 'Which body conducts elections in India?', opts: ['Supreme Court', 'Parliament', 'Election Commission of India', 'President'], answer: 2, explain: 'The Election Commission of India (ECI) is an autonomous constitutional body under Article 324.' },
    { q: 'What does EVM stand for?', opts: ['Electronic Vote Machine', 'Electronic Voting Machine', 'Election Voting Method', 'Electronic Voter Mechanism'], answer: 1, explain: 'EVM stands for Electronic Voting Machine, used in India since 1999.' },
    { q: 'How many seats are in the Lok Sabha?', opts: ['245', '543', '500', '435'], answer: 1, explain: 'The Lok Sabha has 543 elected seats. 2 seats can be nominated by the President for Anglo-Indians.' },
    { q: 'What is NOTA?', opts: ['A political party', 'None Of The Above option', 'A voting machine', 'A registration form'], answer: 1, explain: 'NOTA allows voters to reject all candidates. It was introduced in 2013 after a Supreme Court ruling.' },
    { q: 'Which form is used for new voter registration?', opts: ['Form 1', 'Form 6', 'Form 8', 'Form 10'], answer: 1, explain: 'Form 6 is used for new voter registration. Form 6A is for overseas (NRI) voters.' },
    { q: 'What is the VVPAT?', opts: ['Voter Verification Paper Audit Trail', 'Very Valid Paper Authentication Tool', 'Voter Verified Paper Audit Trail', 'Virtual Voting Paper Trail'], answer: 2, explain: 'VVPAT (Voter Verified Paper Audit Trail) provides a paper receipt to verify the vote cast on the EVM.' },
    { q: 'Who appoints the Chief Election Commissioner?', opts: ['Prime Minister', 'President of India', 'Parliament', 'Supreme Court'], answer: 1, explain: 'The Chief Election Commissioner is appointed by the President of India.' },
  ],
  current: 0,
  score: 0,
  answered: [],

  init() {
    this.current = 0;
    this.score = 0;
    this.answered = [];
    this.shuffled = [...this.questions].sort(() => Math.random() - 0.5).slice(0, 5);
  },

  render(container) {
    if (this.current >= this.shuffled.length) {
      this.renderComplete(container);
      return;
    }
    const q = this.shuffled[this.current];
    const qNum = this.current + 1;
    container.innerHTML = `
      <div class="quiz-card">
        <div class="progress-bar" role="progressbar"><div class="progress-fill" style="width:${(qNum / this.shuffled.length) * 100}%"></div></div>
        <p style="font-size:12px;color:var(--text-dim);margin:8px 0 16px;">Question ${qNum} of ${this.shuffled.length}</p>
        <div class="quiz-q">${q.q}</div>
        <div class="quiz-opts">
          ${q.opts.map((o, i) => `<button class="quiz-opt" data-idx="${i}" onclick="QuizService.answer(${i})">${o}</button>`).join('')}
        </div>
        <div class="quiz-explanation" id="quiz-explain">${q.explain}</div>
        <div class="quiz-nav" id="quiz-nav" style="display:none;">
          <button class="primary-btn" onclick="QuizService.next()">
            ${this.current < this.shuffled.length - 1 ? 'Next Question →' : 'See Results →'}
          </button>
        </div>
      </div>`;
    document.getElementById('score-val').textContent = this.score;
  },

  answer(idx) {
    if (this.answered.includes(this.current)) return;
    this.answered.push(this.current);
    const q = this.shuffled[this.current];
    const btns = document.querySelectorAll('.quiz-opt');
    btns.forEach((b, i) => {
      b.disabled = true;
      if (i === q.answer) b.classList.add('correct');
      if (i === idx && idx !== q.answer) b.classList.add('wrong');
    });
    if (idx === q.answer) this.score++;
    document.getElementById('score-val').textContent = this.score;
    document.getElementById('quiz-explain').style.display = 'block';
    document.getElementById('quiz-nav').style.display = 'block';
  },

  next() {
    this.current++;
    this.render(document.getElementById('quiz-container'));
  },

  renderComplete(container) {
    const pct = Math.round((this.score / this.shuffled.length) * 100);
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : pct >= 40 ? '📚' : '💪';
    container.innerHTML = `
      <div class="result-card eligible" style="border-color: var(--primary);">
        <div class="result-icon">${emoji}</div>
        <h3>Quiz Complete!</h3>
        <p>You scored <strong>${this.score}/${this.shuffled.length}</strong> (${pct}%)</p>
        <p style="margin-top:8px;">${pct >= 80 ? 'Excellent! You know your elections well!' : pct >= 60 ? 'Good job! Keep learning about democracy.' : 'Keep exploring! Every vote matters when you understand the process.'}</p>
        <div class="result-actions" style="margin-top:20px;">
          <button class="primary-btn" onclick="QuizService.init();QuizService.render(document.getElementById('quiz-container'))">Try Again 🔄</button>
          <button class="secondary-btn" onclick="App.showView('home')">Back to Home</button>
        </div>
      </div>`;
      
    if (typeof App !== 'undefined' && App.unlockBadge) {
      App.unlockBadge('quiz');
    }
  }
};
