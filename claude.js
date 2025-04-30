function trySubmitClaudeForm() {
  const editableDiv = document.querySelector('div[contenteditable="true"]');
  if (!editableDiv) {
    setTimeout(trySubmitClaudeForm, 300);
    return;
  }

  // Fire an input event, just to be safe
  editableDiv.dispatchEvent(new Event("input", { bubbles: true }));

  // Fire a keydown event for Enter
  editableDiv.dispatchEvent(
    new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      key: "Enter",
      code: "Enter",
      keyCode: 13,
    })
  );

  // As backup, try clicking the send button if it exists
  const sendButton = document.querySelector(
    'button:has(svg[data-testid="SendIcon"])'
  );
  if (sendButton) {
    sendButton.click();
  }
}

window.addEventListener("load", () => {
  setTimeout(trySubmitClaudeForm, 1000);
});
