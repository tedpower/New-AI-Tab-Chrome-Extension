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

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "SET_PROMPT") {
    handlePrompt(request.prompt);
    sendResponse({ success: true });
  }
  return true;
});

async function handlePrompt(prompt) {
  if (!prompt) return;

  try {
    // Find the form and input
    const form = await waitForElement('form[class*="bg-gradient-to-tr"]');
    const input = form.querySelector('input[name="query"]');

    if (!input) {
      throw new Error("Input element not found in form");
    }

    // Set the value and trigger events
    input.value = prompt;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));

    // Try to submit the form
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.click();
    }
  } catch (err) {
    console.error("Grok content script failed:", err);
  }
}
