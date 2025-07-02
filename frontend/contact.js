const BACKEND_URL = "https://interactive-resume-6shg.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("messageForm");
  if (form) {
    form.addEventListener("submit", async e => {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const res = await fetch(`${BACKEND_URL}/send-message`, {
          method: "POST",
          body: formData
        });

        const result = await res.json();

        if (res.ok && result.success) {
          alert("✅ Message sent!");
          form.reset();
        } else {
          alert("❌ Failed to send: " + (result.error || "Unknown error"));
        }
      } catch (err) {
        console.error(err);
        alert("⚠️ Network error. Please try again.");
      }
    });
  }
});
