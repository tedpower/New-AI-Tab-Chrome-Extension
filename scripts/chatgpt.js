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
    }, 500);
  });
}

(async function () {
  const prompt = getQueryParam("q");
  if (!prompt) return;

  try {
    // Step 1: Find contenteditable div inside rich-textarea
    const editor = await waitForElement("#prompt-textarea");
    editor.focus();

    // Step 2: Replace existing content
    editor.innerHTML = `<p>${prompt}</p>`;

    // Step 3: Trigger input event for React to recognize the change
    editor.dispatchEvent(new Event("input", { bubbles: true }));
    editor.dispatchEvent(new Event("blur", { bubbles: true }));

    // Step 4: Wait and click the send button
    const sendButton = await waitForElement("#composer-submit-button");
    sendButton.click();
  } catch (err) {
    console.error("Failed to inject prompt into ChatGPT:", err);
  }
})();
