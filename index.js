document.addEventListener('DOMContentLoaded', () => {
  const triggerWordsInput = document.getElementById('triggerWords');
  const saveBtn = document.getElementById('saveBtn');
  const wordList = document.getElementById('wordList');

  // Load and display current trigger words
  chrome.storage.local.get(['triggerWords'], (result) => {
    const triggerWords = result.triggerWords || [];
    triggerWords.forEach(word => {
      const li = document.createElement('li');
      li.textContent = word;
      wordList.appendChild(li);
    });
  });

  // Save new trigger words
  saveBtn.addEventListener('click', () => {
    const words = triggerWordsInput.value.split(',').map(word => word.trim()).filter(word => word);
    chrome.storage.local.set({ triggerWords: words }, () => {
      wordList.innerHTML = '';
      words.forEach(word => {
        const li = document.createElement('li');
        li.textContent = word;
        wordList.appendChild(li);
      });
      triggerWordsInput.value = '';
    });
  });
});