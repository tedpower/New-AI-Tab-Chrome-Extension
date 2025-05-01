function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function waitForElement(selector, timeout = 5000) {
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
    const textarea = await waitForElement("textarea");
    textarea.focus();
    textarea.value = prompt;

    // Simulate input event
    textarea.dispatchEvent(new Event("input", { bubbles: true }));

    // Wait for the send button (✈️ icon button)
    const sendButton = await waitForElement(
      'button[data-testid="send-button"]'
    );

    // Simulate click
    sendButton.click();
  } catch (err) {
    console.error("Failed to inject prompt into ChatGPT:", err);
  }
})();
