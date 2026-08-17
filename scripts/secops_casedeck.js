/* scripts/secops_casedeck.js - Case Deck Split-Screen Overlay & In-Page Workflow Controller */

(function initSecOpsCaseDeck() {
  if (window.__secopsCaseDeckInjected) return;
  window.__secopsCaseDeckInjected = true;

  let selectedRowIndex = -1;

  // 1. Inject Styles
  const styleEl = document.createElement('style');
  styleEl.id = 'secops-casedeck-styles';
  styleEl.textContent = `
    #secops-casedeck-bar {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #09090b;
      border: 1px solid rgba(56, 189, 248, 0.4);
      border-radius: 10px;
      padding: 10px 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(56, 189, 248, 0.2);
      z-index: 999990;
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: 'Google Sans', 'Inter', system-ui, sans-serif;
      color: #ffffff;
      font-size: 13px;
    }

    .casedeck-badge {
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: 700;
      font-size: 11px;
    }

    .casedeck-btn {
      background: #18181b;
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 5px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      transition: all 0.15s ease;
    }

    .casedeck-btn:hover {
      background: #38bdf8;
      color: #000000;
      border-color: #38bdf8;
    }

    #secops-casedeck-panel {
      position: fixed;
      top: 60px;
      right: 0;
      width: 440px;
      height: calc(100vh - 60px);
      background: #09090b;
      border-left: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: -10px 0 40px rgba(0, 0, 0, 0.8);
      z-index: 999980;
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: 'Google Sans', 'Inter', system-ui, sans-serif;
      color: #ffffff;
    }

    #secops-casedeck-panel.open {
      transform: translateX(0);
    }

    .casedeck-header {
      padding: 16px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      background: #000000;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .casedeck-title {
      font-size: 15px;
      font-weight: 700;
      color: #38bdf8;
    }

    .casedeck-body {
      flex: 1;
      overflow-y: auto;
      padding: 18px;
    }

    .casedeck-card {
      background: #121215;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 14px;
      margin-bottom: 14px;
    }

    .casedeck-card-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: #a1a1aa;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
    }

    .casedeck-action-btn {
      width: 100%;
      padding: 10px 14px;
      background: #18181b;
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #ffffff;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      margin-bottom: 8px;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.15s ease;
      font-size: 13px;
    }

    .casedeck-action-btn:hover {
      background: #38bdf8;
      color: #000000;
    }

    tr.casedeck-selected-row {
      outline: 2px solid #38bdf8 !important;
      background-color: #18181b !important;
    }
  `;
  document.head.appendChild(styleEl);

  // 2. Inject Bottom Floating Status Bar
  const bar = document.createElement('div');
  bar.id = 'secops-casedeck-bar';
  bar.innerHTML = `
    <span class="casedeck-badge">⚡ CaseDeck Active</span>
    <span>Use <b>J</b> / <b>K</b> rows | <b>E</b> expand | <b>O</b> preview</span>
    <button class="casedeck-btn" id="casedeck-toggle-panel">Panel ➔</button>
  `;
  document.body.appendChild(bar);

  // 3. Inject Split-Screen Preview Panel
  const panel = document.createElement('div');
  panel.id = 'secops-casedeck-panel';
  panel.innerHTML = `
    <div class="casedeck-header">
      <span class="casedeck-title">📂 Case Quick Deck</span>
      <button class="casedeck-btn" id="casedeck-close-panel">✕ Close</button>
    </div>
    <div class="casedeck-body">
      <div class="casedeck-card">
        <div class="casedeck-card-title">Active Selection</div>
        <div id="casedeck-selected-info" style="font-weight:600; font-size:14px; color:#ffffff;">
          No row selected. Press <b>J</b> or <b>K</b> to navigate.
        </div>
      </div>

      <div class="casedeck-card">
        <div class="casedeck-card-title">In-Page Quick Workflows</div>
        <button class="casedeck-action-btn" id="casedeck-act-expand">
          <span>▶ Toggle Alert Expansion</span>
          <span class="casedeck-badge">Key [E]</span>
        </button>
        <button class="casedeck-action-btn" id="casedeck-act-checkbox">
          <span>☑ Toggle Case Select</span>
          <span class="casedeck-badge">Key [X]</span>
        </button>
        <button class="casedeck-action-btn" id="casedeck-act-open">
          <span>🔗 Open Case Overview Page</span>
          <span class="casedeck-badge">Key [Enter]</span>
        </button>
      </div>

      <div class="casedeck-card">
        <div class="casedeck-card-title">Bulk Actions Mirror</div>
        <button class="casedeck-action-btn" id="casedeck-act-bulk">
          <span>⚡ Trigger Bulk Actions Menu</span>
          <span class="casedeck-badge">Key [A]</span>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(panel);

  // 4. Panel Toggle Handlers
  const toggleBtn = document.getElementById('casedeck-toggle-panel');
  const closePanelBtn = document.getElementById('casedeck-close-panel');

  function togglePanel() {
    panel.classList.toggle('open');
  }

  toggleBtn.onclick = togglePanel;
  closePanelBtn.onclick = togglePanel;

  // 5. Data Grid Interaction Controller
  function getTableRows() {
    return Array.from(document.querySelectorAll('.p-datatable-tbody > tr:not(.p-datatable-row-expansion)'));
  }

  function highlightRow(index) {
    const rows = getTableRows();
    if (rows.length === 0) return;

    rows.forEach(r => r.classList.remove('casedeck-selected-row'));

    if (index < 0) index = 0;
    if (index >= rows.length) index = rows.length - 1;
    selectedRowIndex = index;

    const targetRow = rows[selectedRowIndex];
    targetRow.classList.add('casedeck-selected-row');
    targetRow.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

    // Update Info Box
    const caseIdEl = targetRow.querySelector('a[href*="/cases/"]');
    const caseId = caseIdEl ? caseIdEl.innerText.trim() : `Row #${selectedRowIndex + 1}`;
    const infoBox = document.getElementById('casedeck-selected-info');
    if (infoBox) {
      infoBox.innerHTML = `Case <b>${caseId}</b> selected (Row ${selectedRowIndex + 1} of ${rows.length})`;
    }
  }

  function toggleRowExpansion() {
    const rows = getTableRows();
    if (selectedRowIndex >= 0 && selectedRowIndex < rows.length) {
      const row = rows[selectedRowIndex];
      const expandBtn = row.querySelector('.row-expansion-button, button[class*="expansion"], .p-row-toggler');
      if (expandBtn) {
        expandBtn.click();
      }
    }
  }

  function openSelectedCase() {
    const rows = getTableRows();
    if (selectedRowIndex >= 0 && selectedRowIndex < rows.length) {
      const row = rows[selectedRowIndex];
      const link = row.querySelector('a[href*="/cases/"]');
      if (link) {
        window.location.href = link.getAttribute('href');
      }
    }
  }

  function toggleCheckbox() {
    const rows = getTableRows();
    if (selectedRowIndex >= 0 && selectedRowIndex < rows.length) {
      const row = rows[selectedRowIndex];
      const cb = row.querySelector('input[type="checkbox"], .p-checkbox-box');
      if (cb) cb.click();
    }
  }

  function triggerBulkActions() {
    const actionsBtn = document.querySelector('button.disabled-interactive, [class*="action"], sc-cases-list-header button');
    if (actionsBtn) actionsBtn.click();
  }

  // Bind Buttons inside Panel
  document.getElementById('casedeck-act-expand').onclick = toggleRowExpansion;
  document.getElementById('casedeck-act-checkbox').onclick = toggleCheckbox;
  document.getElementById('casedeck-act-open').onclick = openSelectedCase;
  document.getElementById('casedeck-act-bulk').onclick = triggerBulkActions;

  // 6. Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // Ignore if typing in an input or textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key.toLowerCase() === 'j') {
      highlightRow(selectedRowIndex + 1);
    } else if (e.key.toLowerCase() === 'k') {
      highlightRow(selectedRowIndex - 1);
    } else if (e.key.toLowerCase() === 'e') {
      toggleRowExpansion();
    } else if (e.key.toLowerCase() === 'o') {
      togglePanel();
    } else if (e.key.toLowerCase() === 'x') {
      toggleCheckbox();
    } else if (e.key === 'Enter') {
      openSelectedCase();
    } else if (e.key.toLowerCase() === 'a') {
      triggerBulkActions();
    }
  });

  // Auto-select first row
  setTimeout(() => highlightRow(0), 300);

  console.log('⚡ SecOps CaseDeck Keyboard & Workflow Controller active!');
})();
