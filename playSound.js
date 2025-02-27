const audio = new Audio(chrome.runtime.getURL('buzzer.mp3'));
audio.play().catch(error => console.error('Audio playback failed:', error));