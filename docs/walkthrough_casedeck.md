# Walkthrough: Path B Trial Run - `SecOps CaseDeck` on `/cases`

We have successfully built and verified the **Path B Trial Run (`SecOps CaseDeck`)** live on `https://preview-americas-sdl.backstory.chronicle.security/cases`.

This trial run demonstrates how an overlay deck can mirror, streamline, and accelerate all in-page interactions on Google SecOps without modifying backend services.

---

## Key Accommodations & Accomplishments

### 1. In-Page Interaction Mapping Completed
- **Expandable In-Page Links**: Bound `button.row-expansion-button` to the `E` key and custom panel trigger, allowing analysts to toggle nested alert findings (`NAME`, `TYPE`, `RULE`, `SEVERITY`, `RISK SCORE`) without triggering full page reloads.
- **Case Navigation Links**: Bound case links (`/cases/<id>`) to the `Enter` key and panel buttons.
- **Bulk Action Modals & Selection**: Bound multi-select checkboxes (`p-checkbox-box`) to the `X` key and `Actions` menu trigger to the `A` key.

### 2. Keyboard-Driven Workflow (`j`/`k`/`e`/`x`/`o`/`Enter`/`a`)
- **`J` / `K`**: Navigate active case row selection up and down with instant cyan highlight.
- **`E`**: Toggle inline row alert expansion.
- **`O`**: Toggle right-hand split-screen **Case Quick Deck** preview panel.
- **`X`**: Toggle row selection checkbox for multi-case bulk operations.
- **`Enter`**: Open case overview page.
- **`A`**: Trigger SecOps bulk actions menu.

### 3. Integrated True OLED Black Styling
- Injected `#000000` base overlay styles with glassmorphic borders (`rgba(56, 189, 248, 0.4)`), matching our custom OLED design tokens.

---

## Source Code Artifacts

- **Keyboard & Workflow Controller Script**: [scripts/secops_casedeck.js](file:///home/admin_1823127835827_altostrat_co/Documents/Project/SecOpsCSS/scripts/secops_casedeck.js)
- **Overlay CSS Stylesheet**: [secops-theme/07-casedeck-overlay.css](file:///home/admin_1823127835827_altostrat_co/Documents/Project/SecOpsCSS/secops-theme/07-casedeck-overlay.css)
