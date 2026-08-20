/# B2D

A minimal, dark-themed binary &harr; decimal converter. Type in one base and instantly get the other — no dependencies, no build step, just HTML, CSS and JavaScript.

## Features

- **Binary &rarr; Decimal**: validate input as `0`/`1` only, output with locale-formatted thousands separators
- **Decimal &rarr; Binary**: arbitrary precision via `BigInt`, positive integers only
- **Instant conversion** on every keystroke
- **Mode toggle** by clicking the `BIN` / `DEC` badge
- **Error feedback** for invalid input (non-binary characters, negative numbers)
- **Copy-friendly output** — the result is selectable with a single click

## Usage

Open `index.html` in any modern browser. No server or dependencies required.

1. Enter a value in the input field
2. Click the `BIN` / `DEC` badge to switch the conversion direction
3. The result appears below as you type

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
