# Walkthrough: Google SecOps Case Management MVP Web App

We have successfully built and verified a modern, zero-dependency, locally-hosted **Google SecOps Case Management Web Application MVP** running live at `http://127.0.0.1:8080`!

This custom application demonstrates how the entire Google SecOps `/cases` experience can be re-created with **one unified, clean CSS variable layer** that styles every single component consistently without legacy Angular CSS overhead.

---

## Key Features & Accommodations

### 1. Single Universal Base CSS Layer (`app/theme.css`)
- **Zero Legacy Override Overhead**: Uses **one universal 15-token CSS variable scale** (`--secops-bg-base`, `--secops-bg-surface-1`, `--secops-brand-primary`, `--secops-text-primary`, etc.) governing all components (Header, Sidebar, Grid, Cards, Modals, Expanders) consistently.
- **1-Click Theme Switcher**: Features a live header dropdown allowing instant switching between:
  - **True OLED Black (`#000000`)**
  - **Standard SecOps Dark**
  - **Cyberpunk Dark Accent**

### 2. Live SecOps Case Data Engine (`app/app.js`)
- Sourced directly from your live Google SecOps tenant via API queries.
- Displays real cases (e.g. Next.js vulnerability validation by Wiz, Emerging Threats GTI replays, AWS SES config changes, ATI rule matches, and Multi-Stage PROMPTFLUX alerts).

### 3. Complete `/cases` Workflow Features
- **App Shell & Collapsible Navigation**: Integrated Header with user avatar (`CM`), notification badges (`74`), and sidebar navigation.
- **Expandable Row Findings**: Clicking the chevron (`▶`) on any case row instantly reveals its nested alert findings table (`NAME`, `TYPE`, `RULE`, `PRIORITY`, `SEVERITY`, `RISK SCORE`) without triggering page reloads.
- **Real-Time Filter Bar**: Search input filters case IDs, names, assignees, stages, or tags instantly.
- **Bulk Action Controls**: Selection checkboxes enable the `Actions` dropdown for bulk case management.

---

## Source Code Artifacts

- **Local App Directory**: [app/](file:///home/admin_1823127835827_altostrat_co/Documents/Project/SecOpsCSS/app)
- **Universal CSS System**: [app/theme.css](file:///home/admin_1823127835827_altostrat_co/Documents/Project/SecOpsCSS/app/theme.css)
- **React Application & Components**: [app/app.js](file:///home/admin_1823127835827_altostrat_co/Documents/Project/SecOpsCSS/app/app.js)
- **HTML Entry Point**: [app/index.html](file:///home/admin_1823127835827_altostrat_co/Documents/Project/SecOpsCSS/app/index.html)
