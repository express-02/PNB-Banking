// ============================================
// PNB — Firebase Config (US Project rebranded)
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyAueqbCcGN_LKDTd6YnPkPcWSIufFqsqwM",
  authDomain: "fedex-4bdba.firebaseapp.com",
  projectId: "fedex-4bdba",
  storageBucket: "fedex-4bdba.firebasestorage.app",
  messagingSenderId: "770647474446",
  appId: "1:770647474446:web:8a3a4c595b2286e7ab575f"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Admin email remains the same for this project
const STB_ADMIN_EMAIL = 'avaboremiracle@gmail.com';

// ---------------------------------------------
// Helpers shared by all pages
// ---------------------------------------------

// Money formatter: 1234.5 -> ₱1,234.50
function stbMoney(n) {
  return '₱' + Number(n || 0).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Date formatter for Firestore timestamps
function stbDate(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString('en-PH', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit'
  });
}

// 10-digit account number (matches existing US logic)
function stbGenAccountNumber() {
  let s = '';
  for (let i = 0; i < 10; i++) s += Math.floor(Math.random() * 10);
  return s;
}

// Routing number
function stbGenRoutingNumber() {
  let s = '';
  for (let i = 0; i < 9; i++) s += Math.floor(Math.random() * 10);
  return s;
}

// Transfer reference
function stbGenReference() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const r = Math.floor(1000 + Math.random() * 9000);
  return `PNB-${y}${m}${day}-${r}`;
}

// PIN hash
function stbHashPin(pin) {
  return btoa('stb$' + pin + '$2026');
}

// Toast
function stbToast(msg, type) {
  let el = document.getElementById('stb-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'stb-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = 'stb-toast show' + (type ? ' ' + type : '');
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.className = 'stb-toast'; }, 2800);
}
