chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed')
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('amazon.com')) {
    console.log('Amazon page loaded')
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'checkStatus') {
        sendResponse({ status: 'active' });
    }
    return true;
}); 