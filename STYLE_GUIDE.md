# Google SecOps Design System & Style Guide

A comprehensive, production-grade style guide and design token reference for Google SecOps (Chronicle SIEM & SOAR). Derived directly from and verified against the live Google SecOps console.

---

## 1. Overview & Principles

Google SecOps interfaces are engineered for security analysts and SOC engineers who need high-density data visualization, rapid visual triage of threat signals, and low optical fatigue during extended incident response sessions.

### Design Principles:
1. **Low Visual Fatigue**: Dark mode relies on deep navy tones (`#161625` / `#1b2134`) rather than harsh pure black (`#000000`) to minimize eye strain and preserve color differentiation across severe alerts.
2. **High-Contrast Semantic Severity**: Warning, Critical, Medium, and Info states utilize calibrated accessible hues that remain instantly distinguishable under both Dark and Light color schemes.
3. **Information Density with Clear Hierarchy**: Strict 4px/8px modular grid spacing with subtle 1px dividers (`#2a3650` in dark, `#dadce0` in light) to segment high-volume tabular event logs.
4. **Monospace Precision**: Code, UDM event fields, query expressions, and IOC values use high-legibility monospace fonts with dedicated syntax tokens.

---

## 2. Color Palettes & Tokens

### 2.1 Surface & Background Hierarchy

The elevation system uses tonal luminance shifts rather than heavy drop-shadows to establish depth.

| Layer / Elevation | Token Name | Dark Mode | Light Mode | Usage |
|---|---|---|---|---|
| **Canvas / Background** | `--secops-bg-canvas` | `#161625` | `#ffffff` | Primary viewport background |
| **Surface Low** | `--secops-surface-low` | `#1b2134` | `#f8f9fa` | Top navigation bar, sub-headers |
| **Surface Container** | `--secops-surface-container` | `#1f283e` | `#ffffff` | Cards, side panels, table background |
| **Surface High** | `--secops-surface-high` | `#27324d` | `#f1f3f4` | Table headers, active tab highlights |
| **Surface Highest / Hover** | `--secops-surface-highest` | `#2f3d5c` | `#e8eaed` | Row hover states, dropdown hover |
| **Editor / Canvas Code** | `--secops-editor-bg` | `#101420` | `#f8f9fa` | Monaco query editor canvas |
| **Modal / Dialog Overlay** | `--secops-surface-modal` | `#1b2134` | `#ffffff` | Floating popovers and modal sheets |

```css
/* CSS Token Definition */
[data-theme="dark"], .smp-theme-dark {
  --secops-bg-canvas: #161625;
  --secops-surface-low: #1b2134;
  --secops-surface-container: #1f283e;
  --secops-surface-high: #27324d;
  --secops-surface-highest: #2f3d5c;
  --secops-editor-bg: #101420;
  --secops-surface-modal: #1b2134;
}

[data-theme="light"], .smp-theme-light {
  --secops-bg-canvas: #ffffff;
  --secops-surface-low: #f8f9fa;
  --secops-surface-container: #ffffff;
  --secops-surface-high: #f1f3f4;
  --secops-surface-highest: #e8eaed;
  --secops-editor-bg: #f8f9fa;
  --secops-surface-modal: #ffffff;
}
```

---

### 2.2 Typography & Text Colors

| Role | Token Name | Dark Mode | Light Mode | Description |
|---|---|---|---|---|
| **Primary Text** | `--secops-text-primary` | `#c3d2e8` | `#202124` | Primary body, cell data, titles |
| **Primary Text Bold/Head** | `--secops-text-heading` | `#e8eaed` | `#1f1f1f` | Section headers, metric numbers |
| **Secondary Text** | `--secops-text-secondary` | `#9aa0a6` | `#5f6368` | Timestamps, metadata, labels |
| **Muted / Disabled Text** | `--secops-text-disabled` | `#5f6368` | `#80868b` | Inactive buttons, empty state notes |
| **Link / Accent Text** | `--secops-text-accent` | `#8ab4f8` | `#1a73e8` | Actionable links, pill highlights |
| **Code / Monospace Text** | `--secops-text-code` | `#a8c7fa` | `#0b57d0` | UDM field names, regex patterns |

---

### 2.3 Borders & Dividers

| Role | Token Name | Dark Mode | Light Mode |
|---|---|---|---|
| **Subtle Divider** | `--secops-border-subtle` | `#222d42` | `#f1f3f4` |
| **Standard Border** | `--secops-border-default` | `#2a3650` | `#dadce0` |
| **Active / Focus Border** | `--secops-border-focus` | `#8ab4f8` | `#1a73e8` |
| **Hover Border** | `--secops-border-hover` | `#3d4d6e` | `#bdc1c6` |

---

### 2.4 Semantic Threat & Severity Colors

Crucial for SecOps triage workflows:

| Severity Level | Dark Mode Token | Dark Hex | Light Mode Token | Light Hex | Badge Preview |
|---|---|---|---|---|---|
| **Critical** | `--secops-status-critical` | `#ff5a50` | `--secops-status-critical-light` | `#d93025` | <span style="background:#4a1e1e;color:#ff5a50;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:bold;">CRITICAL</span> |
| **High** | `--secops-status-high` | `#fa7b17` | `--secops-status-high-light` | `#e37400` | <span style="background:#4a321a;color:#fa7b17;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:bold;">HIGH</span> |
| **Medium** | `--secops-status-medium` | `#fcc934` | `--secops-status-medium-light` | `#b06000` | <span style="background:#443b18;color:#fcc934;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:bold;">MEDIUM</span> |
| **Low / Info** | `--secops-status-low` | `#24c1e0` | `--secops-status-low-light` | `#007b83` | <span style="background:#183c44;color:#24c1e0;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:bold;">LOW</span> |
| **Success / Clean** | `--secops-status-success` | `#54ab98` | `--secops-status-success-light` | `#137333` | <span style="background:#1b3d36;color:#54ab98;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:bold;">RESOLVED</span> |
| **Event Type Tag** | `--secops-chip-event` | `#be35ff` | `--secops-chip-event-light` | `#8430ce` | <span style="background:#3b1d4a;color:#d272ff;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:bold;">DHCP</span> |

---

### 2.5 Brand, Interactive & Gemini AI Tokens

| State | Dark Mode | Light Mode | Description |
|---|---|---|---|
| **Primary CTA (Blue)** | `#1a73e8` | `#1a73e8` | "Run Search", "Execute Action" |
| **Primary Hover** | `#1b66c9` | `#1765cc` | Hover state for blue buttons |
| **Primary Active / Pressed** | `#185abc` | `#1557b0` | Active state |
| **Gemini AI Sparkle Accent** | `#8ab4f8` / `#c3d2e8` | `#1a73e8` | Gemini summary indicators |
| **Gemini Gradient Stop 1** | `#1f283e` | `#e8f0fe` | AI summary card backdrop start |
| **Gemini Gradient Stop 2** | `#28334e` | `#f8fafd` | AI summary card backdrop end |

---

## 3. Typography Scale & Font Stack

### Font Families:
- **UI & Display**: `"Google Sans", "Source Sans Pro", "Noto Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Monospace / UDM / Code**: `"Google Sans Mono", "Roboto Mono", "Fira Code", monospace`

### Scale:

| Level | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| **Display / Page Header** | `22px` (`1.375rem`) | `28px` | 600 (Semibold) | View titles (e.g., "SIEM Search") |
| **Section Header** | `16px` (`1.0rem`) | `22px` | 600 (Semibold) | Card titles, group names |
| **Body Default** | `14px` (`0.875rem`) | `20px` | 400 (Regular) | Table cells, labels, summaries |
| **Body Semibold** | `14px` (`0.875rem`) | `20px` | 600 (Semibold) | Active tabs, button text |
| **Caption / Metadata** | `12px` (`0.75rem`) | `16px` | 400 (Regular) | Timestamps, secondary tags |
| **Micro / Badge** | `10px` (`0.625rem`) | `12px` | 700 (Bold) | Severity pill counters, alert tags |

---

## 4. Key Component Specifications

### 4.1 UDM Event Search Table
- **Header Row**: Height `40px`, background `--secops-surface-low`, text uppercase `11px`, letter-spacing `0.6px`, color `--secops-text-secondary`.
- **Data Rows**: Height `44px` (compact), alternating subtle row striping or 1px bottom border `--secops-border-subtle`.
- **Hover State**: Row background transforms to `--secops-surface-highest` with smooth `100ms ease` transition.
- **Timestamp Column**: Monospace 12px, tabular numbers, `--secops-text-primary`.

### 4.2 Severity Badges & Status Chips
- **Geometry**: Border radius `4px`, padding `2px 8px`, border `1px solid transparent`.
- **Dark Mode Fill**: Dark tinted alpha container with bright foreground text (e.g., `rgba(255, 90, 80, 0.15)` bg with `#ff5a50` text for Critical).
- **Light Mode Fill**: Light pastel container with high-contrast text (e.g., `rgba(217, 48, 37, 0.12)` bg with `#d93025` text for Critical).

### 4.3 Gemini AI Summary Card
- **Border**: `1px solid rgba(138, 180, 248, 0.35)` with subtle glowing accent.
- **Background**: Subtle gradient from `--secops-surface-container` to `--secops-surface-high`.
- **Icon**: Diamond star / sparkle glyph (`✦`) in Google Blue `#8ab4f8`.

### 4.4 Monaco UDM Editor Frame
- **Background**: Deep obsidian navy `#101420` (Dark) or Crisp Off-White `#f8f9fa` (Light).
- **Line Numbers**: `#5f6368` (Dark), `#9aa0a6` (Light).
- **Field Highlighting**: Keywords `#8ab4f8`, Operators `#ec7295`, Strings `#81c995`.

---

## 5. Implementation & Usage

### 5.1 Quick Import
```html
<!-- Include Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Google+Sans+Mono:wght@400;500;600&display=swap" rel="stylesheet">

<!-- Include SecOps Theme -->
<link rel="stylesheet" href="dist/tokens.css">
<link rel="stylesheet" href="dist/secops-theme.css">
```

### 5.2 Activating Themes
```html
<!-- Dark Mode (Default) -->
<html lang="en" data-theme="dark" class="smp-theme-dark">
  ...
</html>

<!-- Light Mode -->
<html lang="en" data-theme="light" class="smp-theme-light">
  ...
</html>
```
