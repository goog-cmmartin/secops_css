# Google SecOps CSS Architecture & Theme Implementation Guide

## Executive Summary

Google SecOps (Chronicle SIEM & SOAR) presents a rich, multi-layered frontend architecture. Rather than relying on legacy monolithic CSS bundles, modern Google SecOps relies on a dual-design-system hierarchy composed of **Google Uno Design System Tokens** (`--uno-*`) and **Material Chronicle** (`--mc-*`) custom properties, paired with custom HTML web components (`sc-*`, `smp-*`, `uno-*`, `p-table`).

This document provides a comprehensive report of active CSS custom properties, component tag mappings, design tokens, and implementation guidelines for developers building Google SecOps theme-compatible applications or user extensions.

---

## 1. UI Architecture & Design System Layers

The Google SecOps UI consists of five primary component layers:

| Layer | Framework / Library | Primary Tags / Prefixes | Role in Theme |
| :--- | :--- | :--- | :--- |
| **Uno Design System** | Modern Google SecOps | `uno-*`, `smp-*`, `--uno-*` | Core tokens, cards, tabs, and layout headers. |
| **Material Chronicle** | Angular Material | `mat-*`, `mdc-*`, `--mc-*` | Inputs, form controls, alerts, and feedback colors. |
| **Chronicle SIEM & SOAR** | Custom Web Components | `sc-*` | Shell header, sidebar, case views, Gemini AI cards. |
| **PrimeNG Data Grids** | PrimeNG Tables | `p-table`, `.p-datatable` | Log search result grids, stats tables, case lists. |
| **Monaco Code Editor** | VS Code Editor Engine | `.monaco-editor` | YARA-L rule editor and UDM search query box. |

---

## 2. Core Design Tokens Reference

Google SecOps exposes **5,197 active CSS variables** on `:root`. The most critical tokens for theme compatibility are organized below by category:

### 2.1 Uno Design System Tokens (`--uno-*`)

```css
:root {
  /* Reference Palette Tokens */
  --uno-ref-color--neutral-0: #0d0f18;      /* Base Dark Background */
  --uno-ref-color--neutral-100: #161825;    /* Surface Level 1 */
  --uno-ref-color--neutral-200: #1f2238;    /* Surface Level 2 */
  --uno-ref-color--neutral-300: #2a2e4a;    /* Surface Level 3 */

  /* Component Container Background Tokens */
  --uno-comp-header--container-background-color: var(--uno-ref-color--neutral-0);
  --uno-comp-side-panel--container-background-color: var(--uno-ref-color--neutral-0);
  --uno-comp-card--background-color: var(--uno-ref-color--neutral-100);
}
```

### 2.2 Material Chronicle Feedback & Status Tokens (`--mc-*`)

```css
:root {
  --mc-feedback-critical-color: #f87171;    /* High / Critical Severity */
  --mc-feedback-warning-color: #fbbf24;     /* Medium Severity */
  --mc-feedback-success-color: #34d399;     /* Low / Informational / Passed */
  --mc-input-text-disabled-color: #64748b;  /* Muted Form Controls */
}
```

---

## 3. Active Custom Tag Mapping & Selector Catalog

When styling or building SecOps-compatible components, target the following custom HTML tag names and classes:

### 3.1 App Shell & Navigation

```css
/* Application Top Header */
sc-navigation-header,
.sc-navigation-header,
smp-layout-header {
  background: var(--secops-bg-base) !important;
  border-bottom: 1px solid var(--secops-border-subtle) !important;
}

/* Sidebar Drawer & Navigation Links */
sc-navigation-sidebar,
.sc-navigation-sidebar,
.sc-navigation-sidebar .sidebar {
  background-color: var(--secops-bg-base) !important;
  border-right: 1px solid var(--secops-border-subtle) !important;
}

/* Selected Active Menu Item */
.sc-navigation-sidebar .section-header.selected {
  background-color: var(--secops-bg-surface-2) !important;
  color: var(--secops-brand-primary) !important;
  border-left: 3px solid var(--secops-brand-primary) !important;
}
```

### 3.2 Cards, Containers & Badges

```css
/* Workdesk, Case & SOAR Cards */
homepage-case-item,
smp-card,
uno-card,
.box,
.case-reasons,
.summary,
.next-steps {
  background: var(--secops-bg-surface-1) !important;
  border: 1px solid var(--secops-border-subtle) !important;
  border-radius: 12px !important;
}

/* Priority Indicators & Severity Badges */
priority-indicator,
smp-badge,
uno-status-chip,
uno-info-chip {
  border-radius: 6px !important;
  font-weight: 600 !important;
}
```

### 3.3 Case Management & SOAR Investigation Views

```css
/* Main Case Overview Page */
sc-case-page,
sc-cases-page,
sc-case-detailed-view,
sc-case-overview-layout {
  background-color: var(--secops-bg-base) !important;
}

/* Cases List Header Toolbar */
sc-cases-list-header,
.sc-cases-list-header {
  background-color: var(--secops-bg-surface-1) !important;
  border-bottom: 1px solid var(--secops-border-subtle) !important;
}

/* Gemini AI Investigation Cards */
sc-agentic-investigation,
sc-case-summary-investigation-banner {
  background: var(--secops-bg-surface-1) !important;
  border: 1px solid var(--secops-border-highlight) !important;
}
```

### 3.4 Data Tables & Aggregation Sidebars

```css
/* PrimeNG & Log Results Data Grids */
p-table,
.p-datatable,
sc-data-table,
sc-log-results-table {
  background-color: var(--secops-bg-surface-1) !important;
  color: var(--secops-text-primary) !important;
}

/* Table Header Row */
.p-datatable .p-datatable-thead > tr > th,
.header-text-row {
  background-color: var(--secops-bg-surface-2) !important;
  color: var(--secops-text-secondary) !important;
}

/* Log Fields Aggregation Sidebar */
mc-fields-aggregations,
mc-sidebar,
mc-aggregated-field-list-item {
  background-color: var(--secops-bg-base) !important;
  border-right: 1px solid var(--secops-border-subtle) !important;
}
```

### 3.5 Monaco Code Editor (UDM / YARA-L)

```css
/* Editor Container & Line Number Margin */
.monaco-editor,
.monaco-editor-background {
  background-color: var(--secops-bg-base) !important;
}

.monaco-editor .margin {
  background-color: var(--secops-bg-surface-1) !important;
  border-right: 1px solid var(--secops-border-subtle) !important;
}
```

---

## 4. Theme Compatibility Developer Guidelines

If you are building an external dashboard, web application, or browser extension that needs to be **SecOps-Theme Compatible**:

### Rule 1: Adopt the Standard Token Taxonomy
Define your application's colors using the standard `--secops-*` custom property taxonomy. This guarantees instant theme switching between standard Dark, OLED Black, or Light modes.

```css
:root {
  --secops-brand-primary: #38bdf8;
  --secops-brand-accent: #a855f7;
  
  --secops-bg-base: #0d0f18;
  --secops-bg-surface-1: #161825;
  --secops-bg-surface-2: #1f2238;

  --secops-text-primary: #f8fafc;
  --secops-text-secondary: #94a3b8;

  --secops-border-subtle: rgba(255, 255, 255, 0.08);
}
```

### Rule 2: Override Internal Component Classes (`!important`)
Because Angular component stylesheets are injected dynamically by JavaScript, always include `!important` on top-level container rules (`.box`, `.sidebar`, `sc-cases-list-header`) to prevent hardcoded component defaults from leaking through.

### Rule 3: Use Dynamic Container Resets
Ensure generic intermediate wrapper elements use `transparent` backgrounds so they naturally fall through to the root background:

```css
.main-content,
.view-container,
.widget-container,
[class*="container"] {
  background-color: transparent !important;
}
```

---

## 5. Modular Theme Architecture Files

The complete SecOps theme implementation is organized modularly in `SecOpsCSS/`:

```
SecOpsCSS/
├── secops-theme/
│   ├── 01-tokens.css        # Base Dark design tokens
│   ├── 01-tokens-oled.css   # True OLED Black design tokens
│   ├── 02-base.css          # Resets, typography, scrollbars
│   ├── 03-shell.css         # Navigation header & sidebar
│   ├── 04-components.css    # Workdesk cards & badges
│   ├── 04-cases-soar-oled.css # SOAR Cases & Gemini AI views
│   ├── 05-search-tables.css # PrimeNG tables & aggregations
│   └── 06-monaco.css        # Monaco editor syntax styles
└── dist/
    ├── secops-theme.css         # Combined standard theme
    ├── secops-theme.user.css    # Stylus UserCSS extension (v1.1.0)
    ├── secops-theme-oled.css    # Combined OLED theme
    └── secops-theme-oled.user.css # Stylus OLED extension (v2.1.0)
```
