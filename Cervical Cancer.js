document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Simple page switcher 
  function showPage(id) {
    sections.forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    navLinks.forEach(link => link.classList.toggle('active', link.dataset.page === id));
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showPage(link.dataset.page);
    });
  });

  showPage('about'); 

  // Risk-assessment form 
  document.getElementById('predict-form').addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.target);

    try {
      const res = await fetch('/predict', { method: 'POST', body: fd });
      const data = await res.json();
      document.getElementById('result').innerText =
        `Estimated risk level: ${data.risk}. Please consult a healthcare provider for follow-up.`;
    } catch (err) {
      document.getElementById('result').innerText =
        'Unable to complete estimate. Try again later or ask your clinician.';
    }
  });
});