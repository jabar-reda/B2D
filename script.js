// DOM element references
const inp = document.getElementById('inp');
const out = document.getElementById('out');
const badge = document.getElementById('modeBadge');
const hint = document.getElementById('hint');

// Current conversion mode: 'bin' (binary -> decimal) or 'dec' (decimal -> binary)
let mode = 'bin';

// Convert the current input value according to the active mode
function convert() {
  const v = inp.value.trim();
  if (!v) { out.textContent = ''; out.classList.remove('err'); return; }
  out.classList.remove('err');
  try {
    if (mode === 'bin') {
      // Binary input: validate it only contains 0 and 1, then parse to decimal
      if (!/^[01]+$/.test(v)) throw new Error('only 0 and 1 allowed');
      out.textContent = parseInt(v, 2).toLocaleString();
    } else {
      // Decimal input: parse as BigInt (handles arbitrarily large values) and convert to binary
      const n = BigInt(v);
      if (n < 0) throw new Error('positive numbers only');
      out.textContent = n.toString(2);
    }
  } catch(e) {
    out.textContent = e.message; out.classList.add('err');
  }
}

// Switch the conversion mode and update the UI labels
function setMode(m) {
  mode = m;
  badge.textContent = m === 'bin' ? 'BIN' : 'DEC';
  hint.innerHTML = m === 'bin' ? '&rarr; decimal' : '&rarr; binary';
  convert();
}

// Toggle between binary and decimal mode on badge click
badge.addEventListener('click', () => setMode(mode === 'bin' ? 'dec' : 'bin'));
// Re-run conversion on every keystroke
inp.addEventListener('input', convert);
