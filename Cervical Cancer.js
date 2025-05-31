
function show(sectionId) {
  document.getElementById('login-section').classList.add('hidden');
  document.getElementById('signup-section').classList.add('hidden');
  document.getElementById('prediction-section').classList.add('hidden');
  document.getElementById(sectionId).classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  // Toggle links
  document.getElementById('show-signup').addEventListener('click', (e) => {
    e.preventDefault();
    show('signup-section');
  });
  document.getElementById('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    show('login-section');
  });

  // ------- SIGN UP -------
  document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = {
      username: fd.get('new_username'),
      email: fd.get('email'),
      password: fd.get('new_password'),
    };
    try {
      const res = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        alert('Account created. Please log in.');
        e.target.reset();
        show('login-section');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error during signup');
    }
  });

  // ------- LOGIN -------
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = {
      username: fd.get('username'),
      password: fd.get('password'),
    };
    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        e.target.reset();
        show('prediction-section');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error during login');
    }
  });

  // ------- PREDICTION -------
  document.getElementById('predict-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      const res = await fetch('/predict', { method: 'POST', body: fd });
      const data = await res.json();
      document.getElementById('result').innerText = `Your risk level is: ${data.risk}`;
    } catch (err) {
      console.error(err);
      alert('Prediction request failed');
    }
  });

  // ------- LOGOUT -------
  document.getElementById('logout-btn').addEventListener('click', () => {
    show('login-section');
  });
});
