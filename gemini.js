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
    // Step 1: Find contenteditable div inside rich-textarea
    const editor = await waitForElement(
      'rich-textarea div[contenteditable="true"].ql-editor'
    );

    // Step 2: Inject text as HTML
    editor.focus();
    editor.innerHTML = `<p>${prompt}</p>`;

    // Step 3: Dispatch input event so Angular picks it up
    editor.dispatchEvent(new Event("input", { bubbles: true }));
    editor.dispatchEvent(new Event("blur", { bubbles: true }));

    // Step 4: Wait and click the send button
    const sendButton = await waitForElement(
      'button.send-button[aria-label="Send message"]'
    );
    sendButton.click();
  } catch (err) {
    console.error("Gemini content script failed:", err);
  }
})();
