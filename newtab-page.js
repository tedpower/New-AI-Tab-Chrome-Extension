document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("promptInput");
  const sendButton = document.getElementById("sendWrap");
  const form = document.getElementById("promptWrapper");

  textarea.addEventListener("keydown", async function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = textarea.value.trim();
      if (!query) return;

      // Load preferred target from settings
      chrome.storage.sync.get("target", ({ target }) => {
        const service = target || "claude";
        let url;

        switch (service) {
          case "gemini":
            url = `https://gemini.google.com/app?q=${encodeURIComponent(
              query
            )}`;
            break;
          case "chatgpt":
            url = `https://chat.openai.com/?q=${encodeURIComponent(query)}`;
            break;
          case "claude":
          default:
            url = `https://claude.ai/new?q=${encodeURIComponent(query)}`;
            break;
        }

        window.location.href = url;
      });
    }
  });

  textarea.addEventListener("input", () => {
    if (textarea.value.trim().length >= 1) {
      sendButton.style.display = "flex";
    } else {
      sendButton.style.display = "none";
    }
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  });

  const infoModal = document.getElementById("infoModal");
  const infoOpenBtn = document.getElementById("infoButton");
  const infoCloseBtn = document.getElementById("closeInfo");

  infoOpenBtn.addEventListener("click", () => {
    infoModal.showModal();
  });

  infoCloseBtn.addEventListener("click", () => {
    infoModal.close();
  });

  // saveBtn.addEventListener("click", (e) => {
  //   e.preventDefault(); // prevent form submission
  //   const selected = modal.querySelector('input[name="assistant"]:checked');
  //   if (selected) {
  //     saveSettings(selected.value, () => {
  //       modal.close();
  //     });
  //   }
  // });

  textarea.addEventListener("focus", () => {
    form.classList.add("focus");
  });

  textarea.addEventListener("blur", () => {
    form.classList.remove("focus");
  });

  const select = document.getElementById("assistantSelect");

  // Load current setting
  chrome.storage.sync.get("target", ({ target }) => {
    select.value = target || "claude";
  });

  // Save on change
  select.addEventListener("change", () => {
    chrome.storage.sync.set({ target: select.value });
  });
});
