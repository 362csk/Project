document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  const errorEl = document.getElementById('error');
  const successEl = document.getElementById('success');

  function showError(msg) {
    errorEl.textContent = msg;
    successEl.textContent = '';
  }
  function showSuccess(msg) {
    successEl.textContent = msg;
    errorEl.textContent = '';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.textContent = '';
    successEl.textContent = '';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!name || !email || !password) {
      showError('All fields are required.');
      return;
    }
    if (password.length < 6) {
      showError('Password must be at least 6 characters.');
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (data.status === 'success') {
        showSuccess('Registration successful — redirecting to login...');
        setTimeout(() => { window.location.href = 'practice.html'; }, 1200);
      } else {
        showError(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error(err);
      showError('Server error. Make sure Flask is running.');
    }
  });
});
