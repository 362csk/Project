// Minimal client-side logic for the demo Login Dashboard
document.addEventListener('DOMContentLoaded', ()=>{
  const loginForm = document.getElementById('login-form');
  const errorEl = document.getElementById('error');
  const dashboard = document.getElementById('dashboard');
  const app = document.getElementById('app');
  const greeting = document.getElementById('greeting');
  const userEmail = document.getElementById('user-email');
  const signout = document.getElementById('signout');

  const MOCK_EMAIL = 'user@example.com';
  const MOCK_PW = 'password';

  function showError(msg){ errorEl.textContent = msg }
  function clearError(){ errorEl.textContent = '' }

  function showDashboard(user){
    document.querySelector('.form-panel').hidden = true;
    dashboard.hidden = false;
    greeting.textContent = `Hello, ${user.name || 'User'}`;
    userEmail.textContent = user.email || '—';
  }

  function hideDashboard(){
    document.querySelector('.form-panel').hidden = false;
    dashboard.hidden = true;
  }

  // Check already logged-in
  const stored = localStorage.getItem('mockAuth');
  if(stored){
    try{
      const user = JSON.parse(stored);
      showDashboard(user);
    }catch(e){ localStorage.removeItem('mockAuth') }
  }

  loginForm.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    clearError();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if(!email || !password){ showError('Please enter email and password.'); return }
    if(password.length < 6){ showError('Password must be at least 6 characters.'); return }

    // Mock auth: accept fixed credentials
    if(email.toLowerCase() === MOCK_EMAIL && password === MOCK_PW){
      const user = { email: MOCK_EMAIL, name: 'Demo User' };
      localStorage.setItem('mockAuth', JSON.stringify(user));
      showDashboard(user);
    }else{
      showError('Invalid email or password.');
    }
  });

  signout.addEventListener('click', ()=>{
    localStorage.removeItem('mockAuth');
    hideDashboard();
    document.getElementById('login-form').reset();
  });

  // Social buttons behave as placeholders
  document.getElementById('github').addEventListener('click', ()=> alert('Social login is a demo placeholder.'))
  document.getElementById('google').addEventListener('click', ()=> alert('Social login is a demo placeholder.'))
});
