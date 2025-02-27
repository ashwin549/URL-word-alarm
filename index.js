const form = document.getElementById('trigger-form');
const input = document.getElementById('trigger-words');
const currentWordsDiv = document.getElementById('current-words');

// Load current trigger words on popup open
chrome.storage.local.get(['triggerWords'], (result) => {
  const words = result.triggerWords || [];
  currentWordsDiv.textContent = words.join(', ') || 'No trigger words set.';
});

// Save new trigger words
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const words = input.value.split(',').map(word => word.trim()).filter(Boolean);
  
  chrome.storage.local.set({ triggerWords: words }, () => {
    alert('Trigger words saved!');
    currentWordsDiv.textContent = words.join(', ') || 'No trigger words set.';
    input.value = '';
  });
});
