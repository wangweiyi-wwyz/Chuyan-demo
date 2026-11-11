const demoLoginDialog = document.querySelector('#demoLogin');
const demoLoginForm = demoLoginDialog.querySelector('form');
const demoLoginError = demoLoginDialog.querySelector('[role="alert"]');
const demoLoginKey = 'chuyan-demo-login-v1';
const demoCredentials = { account: 'chuyan', password: 'ChuyanDemo2026', invite: 'CHUYAN' };
const demoLogoutButton = document.createElement('button');
demoLogoutButton.type = 'button';
demoLogoutButton.className = 'secondary';
demoLogoutButton.textContent = '退出登录';
document.querySelector('.header-right').append(demoLogoutButton);

function readDemoSession(storage) {
  try { return window[storage].getItem(demoLoginKey) === 'active'; }
  catch { return false; }
}

function writeDemoSession(storage, active) {
  try {
    if (active) window[storage].setItem(demoLoginKey, 'active');
    else window[storage].removeItem(demoLoginKey);
  } catch { /* Login still works for the current page when storage is blocked. */ }
}

function openDemoLogin() {
  document.body.classList.add('demo-login-required');
  if (!demoLoginDialog.open) demoLoginDialog.showModal();
  demoLoginForm.elements.account.focus();
}

function enterDemo() {
  document.body.classList.remove('demo-login-required');
  if (demoLoginDialog.open) demoLoginDialog.close();
}

demoLoginDialog.addEventListener('cancel', event => event.preventDefault());
demoLoginDialog.querySelector('[data-fill-demo]').addEventListener('click', () => {
  for (const [key, value] of Object.entries(demoCredentials)) demoLoginForm.elements[key].value = value;
  demoLoginError.textContent = '';
});
demoLoginForm.addEventListener('submit', event => {
  event.preventDefault();
  const fields = demoLoginForm.elements;
  if (!Object.entries(demoCredentials).every(([key, value]) => fields[key].value.trim() === value)) {
    demoLoginError.textContent = '演示账号、密码或邀请码有误。请使用演示资料。';
    return;
  }
  writeDemoSession('sessionStorage', true);
  writeDemoSession('localStorage', fields.remember.checked);
  demoLoginForm.reset();
  demoLoginError.textContent = '';
  enterDemo();
  demoLogoutButton.focus();
});
demoLogoutButton.addEventListener('click', () => {
  writeDemoSession('sessionStorage', false);
  writeDemoSession('localStorage', false);
  openDemoLogin();
});
if (readDemoSession('localStorage') || readDemoSession('sessionStorage')) enterDemo();
else openDemoLogin();
