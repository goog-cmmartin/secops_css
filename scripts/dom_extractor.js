/**
 * Google SecOps DOM & CSS Token Extractor Script
 * Run this script in the Chrome DevTools Console (or via Chrome MCP evaluate_script)
 * when logged into Google SecOps.
 */

(function extractSecOpsThemeInfo() {
  console.log("==========================================");
  console.log("   Google SecOps CSS Extractor Starting   ");
  console.log("==========================================");

  // 1. Extract Active CSS Variables (--*)
  const styles = getComputedStyle(document.documentElement);
  const activeVars = {};
  for (let i = 0; i < styles.length; i++) {
    const prop = styles[i];
    if (prop.startsWith('--')) {
      activeVars[prop] = styles.getPropertyValue(prop).trim();
    }
  }

  // 2. Extract Active Custom Element Tags (e.g. mat-*, chronicle-*, secops-*)
  const customTags = new Set();
  document.querySelectorAll('*').forEach(el => {
    const tag = el.tagName.toLowerCase();
    if (tag.includes('-')) {
      customTags.add(tag);
    }
  });

  // 3. Extract Active Material / UI Component Classes
  const componentClasses = new Set();
  document.querySelectorAll('*').forEach(el => {
    el.classList.forEach(cls => {
      if (
        cls.startsWith('mat-') || 
        cls.startsWith('mdc-') || 
        cls.startsWith('chronicle-') || 
        cls.startsWith('secops-') ||
        cls.includes('header') ||
        cls.includes('card') ||
        cls.includes('table')
      ) {
        componentClasses.add('.' + cls);
      }
    });
  });

  const report = {
    totalCssVariables: Object.keys(activeVars).length,
    cssVariables: activeVars,
    customElementsCount: customTags.size,
    customElements: Array.from(customTags).sort(),
    uiClassesCount: componentClasses.size,
    uiClassesSample: Array.from(componentClasses).sort().slice(0, 100)
  };

  console.log("SecOps Modern UI Extraction Report:", report);
  return report;
})();
