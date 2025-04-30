document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("save");

  loadSettings((target) => {
    const el = document.querySelector(`input[value="${target}"]`);
    if (el) el.checked = true;
  });

  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const selected = document.querySelector('input[name="assistant"]:checked');
    if (selected) {
      saveSettings(selected.value, () => {
        const status = document.getElementById("status");
        status.textContent = "Settings saved!";
        setTimeout(() => (status.textContent = ""), 2000);
      });
    }
  });
});
