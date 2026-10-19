// DOM element references
const inp = document.getElementById('inp');
const out = document.getElementById('out');
const badge = document.getElementById('modeBadge');
const hint = document.getElementById('hint');

const TITLE = 'B2D · binary/decimal';
const COPY_FLASH_MS = 1200;

// Arrow label for each mode, reused in the hint and for the copied flash
const modeArrow = { bin: '&rarr; decimal', dec: '&rarr; binary' };

// Current conversion mode: 'bin' (binary -> decimal) or 'dec' (decimal -> binary)
let mode = 'bin';
// Last valid result in raw form, used for tab title + clipboard copy
let lastResult = '';
let hintTimer;

// Single predicate: adding a future mode only changes what actually differs
const isBinaryMode = () => mode === 'bin';

// Shared hint text: direction arrow plus the bit count
const formatBitHint = bitCount =>
  `${modeArrow[mode]} &middot; ${bitCount} bit${bitCount === 1 ? '' : 's'}`;

// Strip invisible separators so numbers paste cleanly from anywhere ("1 0001", "1_000")
const strip = v => v.replace(/[\s_,]/g, '');

// Render a new result with a one-time pulse, avoiding redundant DOM writes
function setOut(text) {
  if (out.textContent === text) return;
  out.textContent = text;
  out.classList.remove('flash');
  void out.offsetWidth; // restart the animation
  out.classList.add('flash');
}

// Convert the current input value according to the active mode
function convert() {
  const v = strip(inp.value);
  out.classList.remove('err');
  if (!v) {
    out.textContent = '';
    lastResult = '';
    hint.innerHTML = modeArrow[mode];
    document.title = TITLE;
    return;
  }
  try {
    let bits;
    if (mode === 'bin') {
      // Binary input: allow an optional 0b prefix, validate 0/1 only, parse with BigInt for arbitrary width
      let s = /^0[bB]/.test(v) ? v.slice(2) : v;
      if (!/^[01]+$/.test(s)) throw new Error('only 0 and 1');
      bits = s.length;
      lastResult = BigInt('0b' + s).toString();
      setOut(BigInt(lastResult).toLocaleString());
    } else {
      // Decimal input: accept plain decimal, plus 0b/0x prefixes; parse as BigInt for precision
      let n;
      if (/^0[bB][01]+$/.test(v)) n = BigInt('0b' + v.slice(2));
      else if (/^0[xX][0-9a-fA-F]+$/.test(v)) n = BigInt(v);
      else {
        if (!/^\d+$/.test(v)) throw new Error('positive integers only');
        n = BigInt(v);
      }
      const bin = n.toString(2);
      bits = bin.length;
      lastResult = bin;
      setOut(bin);
    }
    hint.innerHTML = formatBitHint(bits);
    // Hidden touch: the tab title mirrors the live result
    document.title = `${lastResult} — B2D`;
  } catch (e) {
    out.textContent = e.message;
    out.classList.add('err');
    lastResult = '';
    hint.innerHTML = modeArrow[mode];
    document.title = TITLE;
  }
}

// Switch the conversion mode and update the UI labels
function setMode(m) {
  mode = m;
  const binary = isBinaryMode();
  badge.textContent = binary ? 'BIN' : 'DEC';
  badge.setAttribute('aria-pressed', binary);
  badge.classList.toggle('active', binary);
  hint.innerHTML = modeArrow[m];
  convert();
  badge.classList.remove('pop');
  void badge.offsetWidth;
  badge.classList.add('pop');
}

// Copy the last valid result to the clipboard with a transient hint flash
function copyResult() {
  if (!lastResult) return;
  const done = () => {
    hint.innerHTML = 'copied';
    hint.dataset.copied = '';
    clearTimeout(hintTimer);
    hintTimer = setTimeout(() => { hint.innerHTML = modeArrow[mode]; delete hint.dataset.copied; }, COPY_FLASH_MS);
  };
  const fallback = () => { out.focus(); out.select(); done(); };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(lastResult).then(done).catch(fallback);
  } else {
    fallback();
  }
}

// Copy on output click
out.addEventListener('click', copyResult);
// Toggle the mode from the badge (native <button> handles Enter / Space)
badge.addEventListener('click', () => setMode(isBinaryMode() ? 'dec' : 'bin'));
// Global shortcuts, only when not typing and not triggering browser chords
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const typing = e.target === inp;
  // The badge's native Enter / Space toggle handles itself; other shortcuts still work while it is focused
  if (e.target === badge && (e.key === 'Enter' || e.key === ' ')) return;
  if (howDlg.open) return;
  if (!typing && (e.key === 'b' || e.key === 'B')) setMode('bin');
  else if (!typing && (e.key === 'd' || e.key === 'D')) setMode('dec');
  else if (!typing && (e.key === '?' || e.key === 'H' || e.key === 'h')) openHow();
  else if (!typing && e.key === 'Enter') copyResult();
});
// Re-run conversion on every keystroke
inp.addEventListener('input', convert);

// ----- Tutorial modal (native <dialog>: focus trap, Esc, and focus restore for free) -----
const howBtn = document.getElementById('how');
const howDlg = document.getElementById('howdlg');
const howX = document.getElementById('howX');
const howGotit = document.getElementById('howGotit');

function openHow() {
  if (typeof howDlg.showModal === 'function') {
    try { howDlg.showModal(); return; } catch (_) { /* fall through to open() */ }
  }
  howDlg.setAttribute('open', '');
}
const closeHow = () => { if (howDlg.open) howDlg.close(); };

howBtn.addEventListener('click', openHow);
howX.addEventListener('click', closeHow);
howGotit.addEventListener('click', closeHow);
// Click on the backdrop dismisses the dialog
howDlg.addEventListener('click', e => { if (e.target === howDlg) closeHow(); });
// Hidden courtesy: deep-link to the tutorial with index.html#tutorial
if (location.hash === '#tutorial') openHow();