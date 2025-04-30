function loadSettings(onLoaded) {
  chrome.storage.sync.get("target", ({ target }) => {
    onLoaded(target || "claude");
  });
}

function saveSettings(value, onSaved) {
  chrome.storage.sync.set({ target: value }, onSaved);
}
