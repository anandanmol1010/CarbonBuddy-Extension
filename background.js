// CarbonBuddy Background: Browsing CO₂ Tracker
const CO2_PER_SECOND = 0.025; // grams
let activeTabId = null;
let activeDomain = null;
let startTime = null;

function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function logTime(domain, seconds) {
  if (!domain || !seconds) return;
  const today = new Date().toISOString().slice(0, 10);
  const key = `browsing_${domain}_${today}`;
  
  chrome.storage.local.get([key], data => {
    const prev = data[key] || { seconds: 0, co2: 0 };
    const newSeconds = prev.seconds + seconds;
    const newCo2 = +(newSeconds * CO2_PER_SECOND).toFixed(2);
    
    chrome.storage.local.set({ [key]: { seconds: newSeconds, co2: newCo2 } }, () => {
      console.log(`[Background] Logged ${seconds}s on ${domain}, total: ${newCo2}g CO₂`);
    });
  });
}

function handleTabChange(tabId, url) {
  const now = Date.now();
  
  // Log previous tab time
  if (activeTabId !== null && activeDomain && startTime) {
    const elapsed = Math.floor((now - startTime) / 1000);
    if (elapsed > 0) {
      logTime(activeDomain, elapsed);
    }
  }
  
  // Set new active tab
  activeTabId = tabId;
  activeDomain = getDomain(url);
  startTime = now;
}

// Event listeners
chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    if (tab && tab.url) handleTabChange(tab.id, tab.url);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && tab.url && changeInfo.status === 'complete') {
    handleTabChange(tabId, tab.url);
  }
});

chrome.windows.onFocusChanged.addListener(windowId => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) return;
  chrome.tabs.query({ active: true, windowId }, tabs => {
    if (tabs[0] && tabs[0].url) handleTabChange(tabs[0].id, tabs[0].url);
  });
});

chrome.runtime.onSuspend.addListener(() => {
  if (activeDomain && startTime) {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    if (elapsed > 0) {
      logTime(activeDomain, elapsed);
    }
  }
  activeTabId = null;
  activeDomain = null;
  startTime = null;
});