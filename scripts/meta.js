function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function waitForElement(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const el = document.querySelector(selector);
      if (el) {
        clearInterval(interval);
        resolve(el);
      } else if (Date.now() - start > timeout) {
        clearInterval(interval);
        reject(new Error("Element not found: " + selector));
      }
    }, 100);
  });
}

(async function () {
  const prompt = getQueryParam("q");
  if (!prompt) return;

  try {
    // Find the textarea and set its value
    const textarea = await waitForElement('textarea[placeholder*="Message"]');
    textarea.focus();
    textarea.value = prompt;

    // Trigger input event
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  } catch (err) {
    console.error("Meta content script failed:", err);
  }
})();
