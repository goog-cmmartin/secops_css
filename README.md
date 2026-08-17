# Google SecOps Theme & Style Guide Framework

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Theme](https://img.shields.io/badge/Theme-Dark%20%26%20Light-blueviolet.svg)](STYLE_GUIDE.md)
[![Design System](https://img.shields.io/badge/Design%20System-Google%20Uno-green.svg)](STYLE_GUIDE.md)

A production-ready design system, CSS token library, and style guide for **Google SecOps** (Chronicle SIEM & SOAR).

---

## 🌟 Highlights

- 🎨 **Verified Dual Themes**: Full support for Dark Mode (`.smp-theme-dark` / `#161625`) and Light Mode (`.smp-theme-light` / `#ffffff`).
- 🛡️ **SOC-Optimized Severity Palette**: High-contrast, accessible semantic tokens for Critical, High, Medium, Low, and Info security alerts.
- 📐 **Modular CSS & Design Tokens**: 100% vanilla CSS custom properties compatible with Google Cloud Uno design system (`--uno-sys-color--*`, `--uno-ref-palette--*`).
- 📊 **High-Density Data Components**: High-fidelity styles for UDM Search query bars, Monaco editors, event tables, Gemini AI summary cards, and aggregation drawers.
- 🚀 **Interactive Showcase**: Ready-to-deploy GitHub Pages style guide and component explorer in `docs/index.html`.

---

## 📁 Repository Structure

```tree
SecOpsCSS/
├── dist/
│   ├── tokens.css              # Core design tokens for Dark & Light modes
│   └── secops-theme.css        # Bundled component styles (tables, buttons, badges)
├── docs/
│   ├── index.html              # Interactive style guide & live console simulation
│   └── custom_secops_ux_architecture_blueprint.md
├── secops-theme/               # Modular stylesheet sources
│   ├── 01-tokens.css
│   ├── 02-base.css
│   ├── 03-shell.css
│   ├── 04-components.css
│   ├── 05-search-tables.css
│   ├── 06-monaco.css
│   └── 07-casedeck-overlay.css
├── scripts/
│   └── dom_extractor.js        # Browser console DOM extraction utility
├── STYLE_GUIDE.md              # In-depth style guide and color token specifications
├── package.json
└── README.md
```

---

## 🎨 Color Palette Quick Reference

### Dark Mode (`[data-theme="dark"]` / `.smp-theme-dark`)
- **Canvas / App Background**: `#161625` (`rgb(22, 22, 37)`)
- **Surface Container**: `#1f283e`
- **Surface High**: `#27324d`
- **Primary Text**: `#c3d2e8`
- **Primary CTA (Blue)**: `#1a73e8`
- **Critical Alert**: `#ff5a50`
- **High Alert**: `#fa7b17`
- **Medium Alert**: `#fcc934`
- **Low / Info**: `#24c1e0`
- **Success / Clean**: `#54ab98`

### Light Mode (`[data-theme="light"]` / `.smp-theme-light`)
- **Canvas / App Background**: `#ffffff`
- **Surface Container**: `#ffffff`
- **Surface High**: `#f1f3f4`
- **Primary Text**: `#202124`
- **Primary CTA (Blue)**: `#1a73e8`
- **Critical Alert**: `#d93025`
- **High Alert**: `#e37400`
- **Medium Alert**: `#b06000`
- **Low / Info**: `#007b83`
- **Success / Clean**: `#137333`

For detailed hex values, WCAG contrast ratios, and component usage, see [STYLE_GUIDE.md](STYLE_GUIDE.md).

---

## 🚀 Quick Start

### 1. Installation via NPM
```bash
npm install @google-secops/theme
```

### 2. Include in HTML
```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Google+Sans+Mono:wght@400;500;600&display=swap" rel="stylesheet">

<!-- SecOps Theme Stylesheets -->
<link rel="stylesheet" href="dist/tokens.css">
<link rel="stylesheet" href="dist/secops-theme.css">
```

### 3. Apply Theme to Root
```html
<!-- Dark Theme -->
<html lang="en" data-theme="dark" class="smp-theme-dark">
  ...
</html>

<!-- Light Theme -->
<html lang="en" data-theme="light" class="smp-theme-light">
  ...
</html>
```

---

## 💻 Live Preview & GitHub Pages

To explore the interactive component showcase and token palette locally:

```bash
# Serve docs directory
npx serve docs
```

Or open `docs/index.html` directly in your browser.

---

## 📄 License

Apache License 2.0. See [LICENSE](LICENSE) for details.
