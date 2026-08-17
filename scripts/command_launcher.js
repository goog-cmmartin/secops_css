/* scripts/command_launcher.js - Interactive Command Launcher for Google SecOps */

(function initSecOpsCommandLauncher() {
  // Remove any existing launcher instance
  const existingOverlay = document.getElementById('secops-cmd-overlay');
  if (existingOverlay) existingOverlay.remove();

  const existingStyle = document.getElementById('secops-command-launcher-styles');
  if (existingStyle) existingStyle.remove();

  // 1. Inject Styles
  const styleEl = document.createElement('style');
  styleEl.id = 'secops-command-launcher-styles';
  styleEl.textContent = `
    #secops-cmd-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      z-index: 9999999;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 100px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.15s ease-in-out;
    }

    #secops-cmd-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }

    #secops-cmd-modal {
      width: 600px;
      max-width: 90vw;
      background: #09090b;
      border: 1px solid rgba(56, 189, 248, 0.4);
      border-radius: 12px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(56, 189, 248, 0.2);
      overflow: hidden;
      font-family: 'Google Sans', 'Inter', system-ui, sans-serif;
      color: #ffffff;
      transform: translateY(-20px);
      transition: transform 0.15s ease-out;
    }

    #secops-cmd-overlay.active #secops-cmd-modal {
      transform: translateY(0);
    }

    .secops-cmd-input-container {
      display: flex;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      background: #000000;
    }

    .secops-cmd-icon {
      color: #38bdf8;
      font-size: 20px;
      margin-right: 12px;
    }

    #secops-cmd-input {
      width: 100%;
      background: transparent;
      border: none;
      outline: none;
      color: #ffffff;
      font-size: 16px;
      font-weight: 500;
    }

    .secops-cmd-results {
      max-height: 360px;
      overflow-y: auto;
      padding: 8px;
    }

    .secops-cmd-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-radius: 8px;
      cursor: pointer;
      color: #a1a1aa;
      transition: all 0.15s ease;
      margin-bottom: 4px;
    }

    .secops-cmd-item:hover, .secops-cmd-item.selected {
      background: #18181b;
      color: #ffffff;
      border-left: 3px solid #38bdf8;
    }

    .secops-cmd-label {
      font-weight: 600;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .secops-cmd-badge {
      font-size: 11px;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid rgba(56, 189, 248, 0.3);
    }

    .secops-cmd-footer {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      background: #000000;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 12px;
      color: #71717a;
    }

    .secops-cmd-close-btn {
      cursor: pointer;
      color: #a1a1aa;
      font-size: 14px;
      font-weight: bold;
    }

    .secops-cmd-close-btn:hover {
      color: #ffffff;
    }
  `;
  document.head.appendChild(styleEl);

  // 2. Create Modal Structure
  const overlay = document.createElement('div');
  overlay.id = 'secops-cmd-overlay';
  overlay.innerHTML = `
    <div id="secops-cmd-modal">
      <div class="secops-cmd-input-container">
        <span class="secops-cmd-icon">⚡</span>
        <input id="secops-cmd-input" type="text" placeholder="Type a command or jump to page... (e.g. 'cases', 'search')" autofocus />
        <span class="secops-cmd-close-btn" id="secops-cmd-close">✕</span>
      </div>
      <div class="secops-cmd-results" id="secops-cmd-results">
        <div class="secops-cmd-item" data-url="/cases">
          <div class="secops-cmd-label">📁 Cases & SOAR List</div>
          <span class="secops-cmd-badge">Navigate → /cases</span>
        </div>
        <div class="secops-cmd-item" data-url="/sp-search">
          <div class="secops-cmd-label">🔍 SIEM Search & Query</div>
          <span class="secops-cmd-badge">Navigate → /sp-search</span>
        </div>
        <div class="secops-cmd-item" data-url="/">
          <div class="secops-cmd-label">⚡ Workdesk Dashboard</div>
          <span class="secops-cmd-badge">Navigate → /</span>
        </div>
        <div class="secops-cmd-item" data-action="toggle-oled">
          <div class="secops-cmd-label">🎨 Toggle True OLED Black Theme</div>
          <span class="secops-cmd-badge">Theme Action</span>
        </div>
      </div>
      <div class="secops-cmd-footer">
        <span>Click any item or press <b>Enter</b></span>
        <span>Press <b>ESC</b> or click <b>✕</b> to close</span>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // 3. Methods & Event Bounding
  const input = document.getElementById('secops-cmd-input');
  const closeBtn = document.getElementById('secops-cmd-close');

  function openLauncher() {
    overlay.classList.add('active');
    input.value = '';
    setTimeout(() => input.focus(), 50);
  }

  function closeLauncher() {
    overlay.classList.remove('active');
  }

  function toggleLauncher() {
    if (overlay.classList.contains('active')) {
      closeLauncher();
    } else {
      openLauncher();
    }
  }

  // Close Button Click
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLauncher();
  });

  // Background Backdrop Click -> Close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeLauncher();
    }
  });

  // Global Keyboard Handler (Cmd+K, Ctrl+K, ESC)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      e.stopPropagation();
      toggleLauncher();
    } else if (e.key === 'Escape' && overlay.classList.contains('active')) {
      e.preventDefault();
      e.stopPropagation();
      closeLauncher();
    }
  }, true);

  // Item Clicks
  overlay.querySelectorAll('.secops-cmd-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const url = item.getAttribute('data-url');
      const action = item.getAttribute('data-action');
      closeLauncher();

      if (url) {
        window.location.href = url;
      } else if (action === 'toggle-oled') {
        const liveTheme = document.getElementById('secops-custom-theme-live');
        if (liveTheme) {
          liveTheme.disabled = !liveTheme.disabled;
        }
      }
    });
  });

  window.__secopsToggleLauncher = toggleLauncher;
  window.__secopsCloseLauncher = closeLauncher;

  console.log('⚡ Fully interactive SecOps Command Launcher bound!');
})();
