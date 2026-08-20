# B2D

A minimal, dark-themed binary &harr; decimal converter. Type in one base and instantly get the other — no dependencies, no build step, just HTML, CSS and JavaScript.

**Try it live:** <https://jabar-reda.github.io/B2D/>

## Features

- **Binary &rarr; Decimal**: arbitrary precision via `BigInt`, output with locale-formatted thousands separators
- **Decimal &rarr; Binary**: arbitrary precision via `BigInt`, positive integers only
- **Flexible parsing**: accepts `0b` / `0x` prefixes and ignores spaces, commas and underscores (`1 0001`, `1_000`)
- **Instant conversion** on every keystroke, with a live bit-count readout in the hint
- **Mode toggle** by clicking the `BIN` / `DEC` badge, or with the `B` / `D` keys
- **Copy on click** — output copies to the clipboard (with a `copied` flash); `Enter` also works
- **Error feedback** with a physical shake for invalid input (non-binary characters, negative numbers)
- **Hidden details**: the tab title mirrors the live result; digits use tabular numerals so they never jitter; reduced-motion is respected

## Usage

Open `index.html` in any modern browser. No server or dependencies required.

1. Enter a value in the input field
2. Click the `BIN` / `DEC` badge (or press `B` / `D`) to switch the conversion direction
3. The result appears below as you type — click it to copy

## Project Structure

```
B2D/
├── index.html   # Markup and structure
├── style.css    # All styling (dark theme)
├── script.js    # Conversion logic (binary <-> decimal)
├── LICENSE      # MIT license
└── README.md    # This file
```

## Example

| Mode   | Input       | Output        |
|--------|-------------|---------------|
| BIN    | `1010`      | `10`          |
| BIN    | `11111111`  | `255`         |
| DEC    | `255`       | `11111111`    |
| DEC    | `123456789` | `111010110111100110100010101` |

## License

[MIT](LICENSE)
