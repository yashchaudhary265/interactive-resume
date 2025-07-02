const BACKEND_URL = "https://interactive-resume-6shg.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("messageForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", document.getElementById("user-name").value.trim());
      formData.append("email", document.getElementById("user-email").value.trim());
      formData.append("subject", document.getElementById("subject").value.trim());
      formData.append("message", document.getElementById("message").value.trim());

      const attachment = document.getElementById("attachment").files[0];
      if (attachment) {
        formData.append("attachment", attachment);
      }

      try {
        const res = await fetch(`${BACKEND_URL}/send-message`, {
          method: "POST",
          body: formData,
        });

        const result = await res.json();

        if (res.ok && result.success) {
          alert("✅ Message sent successfully!");
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
