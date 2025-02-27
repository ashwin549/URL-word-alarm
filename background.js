// Check if URL contains any of the trigger words
function checkUrlForTriggerWords(url) {
  chrome.storage.local.get(['triggerWords'], (result) => {
    const triggerWords = result.triggerWords || [];
    for (const word of triggerWords) {
      if (url.includes(word)) {
        chrome.alarms.create('word-alarm', { delayInMinutes: 0 }); // Immediate alarm
        break;
      }
    }
  });
}

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    checkUrlForTriggerWords(changeInfo.url);
  }
});

// Handle alarms
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'word-alarm') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon128.png',
      title: 'Word Alarm',
      message: 'A trigger word was detected in the URL!',
      priority: 2
    });
  }
});
